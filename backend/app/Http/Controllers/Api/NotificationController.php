<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function upcoming(Request $request): JsonResponse
    {
        $user = $request->user();
        $todayIndex = (Carbon::today()->dayOfWeek + 6) % 7;

        $schedules = $user->schedules()
            ->where('status', 'Aktif')
            ->with('programs')
            ->get();

        $notifications = [];

        // Check active schedules for today
        foreach ($schedules as $sch) {
            if (in_array($todayIndex, $sch->days ?? [])) {
                $notifications[] = [
                    'schedule_id' => $sch->id,
                    'title' => 'Waktunya mulai konsisten!',
                    'body' => "{$sch->name} dimulai pukul {$sch->time} WIB. {$sch->programs->count()} program siap untuk dirimu.",
                    'time' => $sch->time,
                    'schedule_name' => $sch->name,
                    'icon' => $sch->icon,
                    'color' => $sch->color,
                    'is_current' => $sch->name === 'Belajar Mandiri',
                ];
            }
        }

        // Sort by time
        usort($notifications, fn($a, $b) => strcmp($a['time'], $b['time']));

        return response()->json([
            'data' => [
                'current_alert' => $notifications[0] ?? null,
                'upcoming_list' => $notifications,
                'quote' => "Pengingat kecil untuk kebiasaan yang berarti.",
            ],
        ]);
    }
}
