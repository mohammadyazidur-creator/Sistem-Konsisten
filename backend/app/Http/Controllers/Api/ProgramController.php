<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReorderProgramsRequest;
use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;
use App\Http\Resources\ProgramResource;
use App\Models\Program;
use App\Models\ProgramCompletion;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index(Request $request, Schedule $schedule): JsonResponse
    {
        $this->authorize('view', $schedule);

        $programs = $schedule->programs()->with('completions')->get();

        return response()->json([
            'data' => ProgramResource::collection($programs),
        ]);
    }

    public function store(StoreProgramRequest $request, Schedule $schedule): JsonResponse
    {
        $this->authorize('update', $schedule);

        $maxOrder = $schedule->programs()->max('sort_order') ?? -1;

        $program = $schedule->programs()->create([
            'title' => $request->title,
            'duration' => $request->duration ?? '10 menit',
            'duration_seconds' => $request->duration_seconds ?? 600,
            'quote' => $request->quote,
            'icon' => $request->icon ?? 'leaf',
            'sort_order' => $request->sort_order ?? ($maxOrder + 1),
        ]);

        return response()->json([
            'message' => 'Program berhasil ditambahkan',
            'data' => new ProgramResource($program),
        ], 201);
    }

    public function update(UpdateProgramRequest $request, Program $program): JsonResponse
    {
        $this->authorize('update', $program);

        $program->update($request->validated());

        return response()->json([
            'message' => 'Program berhasil diperbarui',
            'data' => new ProgramResource($program),
        ]);
    }

    public function destroy(Request $request, Program $program): JsonResponse
    {
        $this->authorize('delete', $program);

        $program->delete();

        return response()->json([
            'message' => 'Program berhasil dihapus',
        ]);
    }

    public function reorder(ReorderProgramsRequest $request, Schedule $schedule): JsonResponse
    {
        $this->authorize('update', $schedule);

        foreach ($request->program_ids as $order => $progId) {
            $schedule->programs()->where('id', $progId)->update(['sort_order' => $order]);
        }

        $programs = $schedule->programs()->orderBy('sort_order', 'asc')->get();

        return response()->json([
            'message' => 'Urutan program berhasil diperbarui',
            'data' => ProgramResource::collection($programs),
        ]);
    }

    public function toggleCompletion(Request $request, Program $program): JsonResponse
    {
        $this->authorize('view', $program);
        $user = $request->user();

        $today = Carbon::today();
        $existing = ProgramCompletion::where('user_id', $user->id)
            ->where('program_id', $program->id)
            ->whereDate('completed_at', $today)
            ->first();

        if ($existing) {
            $existing->delete();
            $completed = false;
            $message = 'Program ditandai belum selesai';
        } else {
            ProgramCompletion::create([
                'user_id' => $user->id,
                'program_id' => $program->id,
                'completed_at' => Carbon::now(),
            ]);
            $completed = true;
            $message = 'Program berhasil diselesaikan';
        }

        return response()->json([
            'message' => $message,
            'completed' => $completed,
            'program' => new ProgramResource($program),
        ]);
    }
}
