<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    public function sessionLogs(): HasMany
    {
        return $this->hasMany(SessionLog::class);
    }

    public function programCompletions(): HasMany
    {
        return $this->hasMany(ProgramCompletion::class);
    }

    public function pushSubscriptions(): HasMany
    {
        return $this->hasMany(PushSubscription::class);
    }

    /**
     * Calculate current streak of consecutive days with completed sessions or programs.
     */
    public function getCurrentStreak(): int
    {
        // Unique active dates where a session was completed or program completed
        $sessionDates = $this->sessionLogs()
            ->where('status', 'completed')
            ->selectRaw("DATE(completed_at) as date")
            ->pluck('date');

        $completionDates = $this->programCompletions()
            ->selectRaw("DATE(completed_at) as date")
            ->pluck('date');

        $activeDates = $sessionDates->merge($completionDates)
            ->unique()
            ->sortDesc()
            ->values();

        if ($activeDates->isEmpty()) {
            return 0;
        }

        $today = Carbon::today()->toDateString();
        $yesterday = Carbon::yesterday()->toDateString();

        // If neither today nor yesterday has activity, streak is broken
        $firstDate = $activeDates->first();
        if ($firstDate !== $today && $firstDate !== $yesterday) {
            return 0;
        }

        $streak = 0;
        $checkDate = Carbon::parse($firstDate);

        foreach ($activeDates as $dateStr) {
            if ($dateStr === $checkDate->toDateString()) {
                $streak++;
                $checkDate->subDay();
            } else {
                break;
            }
        }

        return $streak;
    }

    /**
     * Calculate historical record streak.
     */
    public function getRecordStreak(): int
    {
        $sessionDates = $this->sessionLogs()
            ->where('status', 'completed')
            ->selectRaw("DATE(completed_at) as date")
            ->pluck('date');

        $completionDates = $this->programCompletions()
            ->selectRaw("DATE(completed_at) as date")
            ->pluck('date');

        $dates = $sessionDates->merge($completionDates)
            ->unique()
            ->sort()
            ->values();

        if ($dates->isEmpty()) {
            return 0;
        }

        $maxStreak = 1;
        $currentStreak = 1;

        for ($i = 1; $i < $dates->count(); $i++) {
            $prev = Carbon::parse($dates[$i - 1]);
            $curr = Carbon::parse($dates[$i]);

            if ($prev->copy()->addDay()->toDateString() === $curr->toDateString()) {
                $currentStreak++;
                if ($currentStreak > $maxStreak) {
                    $maxStreak = $currentStreak;
                }
            } else {
                $currentStreak = 1;
            }
        }

        return max($maxStreak, $this->getCurrentStreak());
    }

    /**
     * Get 7-day consistency stats ending today.
     * Maps to Sel, Rab, Kam, Jum, Sab, Min, Sen as in Figma.
     */
    public function getWeeklyConsistency(): array
    {
        $labels = [
            0 => 'Sen',
            1 => 'Sel',
            2 => 'Rab',
            3 => 'Kam',
            4 => 'Jum',
            5 => 'Sab',
            6 => 'Min',
        ];

        $days = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            // In Indonesian: 0=Senin, 1=Selasa, etc.
            // Carbon dayOfWeek: 0=Sunday, 1=Monday ... 6=Saturday
            // Convert to 0=Mon..6=Sun
            $dayIndex = ($date->dayOfWeek + 6) % 7;
            $dateStr = $date->toDateString();

            // Total programs scheduled on this day of week
            $schedulesOnDay = $this->schedules()
                ->where('status', 'Aktif')
                ->get()
                ->filter(fn($s) => in_array($dayIndex, $s->days ?? []));

            $totalPrograms = $schedulesOnDay->reduce(fn($carry, $s) => $carry + $s->programs->count(), 0);

            // Completed on this date
            $completedCount = $this->programCompletions()
                ->whereDate('completed_at', $dateStr)
                ->distinct('program_id')
                ->count('program_id');

            // If no schedules or newly created, use fallback / sample ratio
            $percent = $totalPrograms > 0 ? min(100, round(($completedCount / $totalPrograms) * 100)) : 0;

            $days[] = [
                'day_index' => $dayIndex,
                'label' => $labels[$dayIndex],
                'date' => $date->format('d M'),
                'is_today' => $i === 0,
                'percent' => (int) $percent,
                'completed' => $completedCount,
                'total' => $totalPrograms,
            ];
        }

        return $days;
    }
}
