<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScheduleRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Http\Resources\ScheduleResource;
use App\Models\Schedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Schedule::class, 'schedule', [
            'except' => ['toggleStatus']
        ]);
    }

    public function index(Request $request): JsonResponse
    {
        $schedules = $request->user()->schedules()
            ->with(['programs.completions'])
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'data' => ScheduleResource::collection($schedules),
        ]);
    }

    public function store(StoreScheduleRequest $request): JsonResponse
    {
        $schedule = $request->user()->schedules()->create([
            'name' => $request->name,
            'time' => $request->time,
            'end_time' => $request->end_time,
            'days' => $request->days,
            'status' => $request->status ?? 'Aktif',
            'icon' => $request->icon ?? 'sun',
            'color' => $request->color ?? '#3B82F6',
        ]);

        if ($request->has('programs') && is_array($request->programs)) {
            foreach ($request->programs as $idx => $progData) {
                $schedule->programs()->create([
                    'title' => $progData['title'],
                    'duration' => $progData['duration'] ?? '10 menit',
                    'duration_seconds' => $progData['duration_seconds'] ?? 600,
                    'sort_order' => $idx,
                ]);
            }
        }

        $schedule->load('programs.completions');

        return response()->json([
            'message' => 'Jadwal berhasil ditambahkan',
            'data' => new ScheduleResource($schedule),
        ], 201);
    }

    public function show(Schedule $schedule): JsonResponse
    {
        $schedule->load('programs.completions');

        return response()->json([
            'data' => new ScheduleResource($schedule),
        ]);
    }

    public function update(UpdateScheduleRequest $request, Schedule $schedule): JsonResponse
    {
        $schedule->update($request->validated());
        $schedule->load('programs.completions');

        return response()->json([
            'message' => 'Jadwal berhasil diperbarui',
            'data' => new ScheduleResource($schedule),
        ]);
    }

    public function destroy(Schedule $schedule): JsonResponse
    {
        $schedule->delete();

        return response()->json([
            'message' => 'Jadwal berhasil dihapus',
        ]);
    }

    public function toggleStatus(Request $request, Schedule $schedule): JsonResponse
    {
        $this->authorize('update', $schedule);

        $newStatus = $schedule->status === 'Aktif' ? 'Nonaktif' : 'Aktif';
        $schedule->update(['status' => $newStatus]);
        $schedule->load('programs.completions');

        return response()->json([
            'message' => "Status jadwal berhasil diubah menjadi {$newStatus}",
            'data' => new ScheduleResource($schedule),
        ]);
    }
}
