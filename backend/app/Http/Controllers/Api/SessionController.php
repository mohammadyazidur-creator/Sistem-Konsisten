<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompleteSessionRequest;
use App\Http\Requests\StartSessionRequest;
use App\Http\Resources\SessionLogResource;
use App\Models\ProgramCompletion;
use App\Models\SessionLog;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function start(StartSessionRequest $request): JsonResponse
    {
        $session = $request->user()->sessionLogs()->create([
            'schedule_id' => $request->schedule_id,
            'started_at' => Carbon::now(),
            'status' => 'in_progress',
        ]);

        $session->load('schedule');

        return response()->json([
            'message' => 'Sesi fokus dimulai',
            'data' => new SessionLogResource($session),
        ], 201);
    }

    public function complete(CompleteSessionRequest $request, SessionLog $session): JsonResponse
    {
        $this->authorize('update', $session);

        $now = Carbon::now();
        $durationSeconds = $request->duration_seconds ?? max(0, $now->diffInSeconds($session->started_at));

        $session->update([
            'completed_at' => $now,
            'duration_seconds' => $durationSeconds,
            'status' => 'completed',
        ]);

        // If completed programs provided, record in program_completions
        if ($request->has('completed_program_ids') && is_array($request->completed_program_ids)) {
            foreach ($request->completed_program_ids as $progId) {
                ProgramCompletion::firstOrCreate(
                    [
                        'user_id' => $session->user_id,
                        'program_id' => $progId,
                        'completed_at' => $now,
                    ],
                    [
                        'session_log_id' => $session->id,
                    ]
                );
            }
        }

        $session->load('schedule');

        return response()->json([
            'message' => 'Sesi fokus berhasil diselesaikan! Selamat atas konsistensimu!',
            'data' => new SessionLogResource($session),
            'streak' => $session->user->getCurrentStreak(),
        ]);
    }
}
