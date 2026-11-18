<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'time',
        'end_time',
        'days',
        'status',
        'icon',
        'color',
    ];

    protected $casts = [
        'days' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function programs(): HasMany
    {
        return $this->hasMany(Program::class)->orderBy('sort_order', 'asc')->orderBy('id', 'asc');
    }

    public function sessionLogs(): HasMany
    {
        return $this->hasMany(SessionLog::class);
    }

    /**
     * Check if this schedule is scheduled for today (0=Senin, ..., 6=Minggu)
     */
    public function isScheduledForToday(): bool
    {
        $todayIndex = (Carbon::today()->dayOfWeek + 6) % 7;
        return in_array($todayIndex, $this->days ?? []);
    }

    /**
     * Total duration in minutes formatted as "17 mnt"
     */
    public function getTotalDurationAttribute(): string
    {
        $seconds = $this->programs->sum('duration_seconds');
        $minutes = round($seconds / 60);
        return $minutes . ' mnt';
    }

    /**
     * Human-readable days summary e.g. "Sen – Min" or "Sen – Jum"
     */
    public function getDaysSummaryAttribute(): string
    {
        $days = $this->days ?? [];
        if (count($days) === 7) return 'Sen – Min';
        if (count($days) === 5 && !in_array(5, $days) && !in_array(6, $days)) return 'Sen – Jum';

        $labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
        $named = array_map(fn($d) => $labels[$d] ?? '', $days);
        return implode(', ', $named);
    }
}
