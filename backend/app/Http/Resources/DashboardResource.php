<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $this->resource;

        // Today's scheduled schedules
        $todayIndex = (Carbon::today()->dayOfWeek + 6) % 7;
        $activeSchedules = $user->schedules()
            ->where('status', 'Aktif')
            ->with(['programs.completions'])
            ->get();

        $todaySchedules = $activeSchedules->filter(fn($s) => in_array($todayIndex, $s->days ?? []))->values();

        // Calculate today's total programs and completed programs
        $todayTotalPrograms = 0;
        $todayCompletedPrograms = 0;

        foreach ($todaySchedules as $sch) {
            foreach ($sch->programs as $prog) {
                $todayTotalPrograms++;
                if ($prog->isCompletedToday($user->id)) {
                    $todayCompletedPrograms++;
                }
            }
        }

        $progressPercent = $todayTotalPrograms > 0
            ? (int) round(($todayCompletedPrograms / $todayTotalPrograms) * 100)
            : 0;

        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'today_date' => Carbon::now()->isoFormat('dddd, D MMMM Y'),
            'today_progress' => [
                'percent' => $progressPercent,
                'completed' => $todayCompletedPrograms,
                'total' => $todayTotalPrograms,
                'headline' => 'Terus bertumbuh.',
                'subtext' => "{$todayCompletedPrograms} dari {$todayTotalPrograms} program selesai",
            ],
            'streak' => [
                'current' => $user->getCurrentStreak(),
                'record' => $user->getRecordStreak(),
                'message' => 'Kebiasaan baik mulai terbentuk!',
            ],
            'weekly_consistency' => [
                'trend' => '+20%',
                'days' => $user->getWeeklyConsistency(),
            ],
            'today_schedules' => ScheduleResource::collection($todaySchedules),
        ];
    }
}
