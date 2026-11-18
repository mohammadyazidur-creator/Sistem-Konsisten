<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'schedule_id',
        'title',
        'duration',
        'duration_seconds',
        'quote',
        'icon',
        'sort_order',
    ];

    protected $casts = [
        'duration_seconds' => 'integer',
        'sort_order' => 'integer',
    ];

    public function schedule(): BelongsTo
    {
        return $this->belongsTo(Schedule::class);
    }

    public function completions(): HasMany
    {
        return $this->hasMany(ProgramCompletion::class);
    }

    /**
     * Check if this program has been completed today by the given user (or schedule owner)
     */
    public function isCompletedToday(?int $userId = null): bool
    {
        $uid = $userId ?? $this->schedule?->user_id;
        if (!$uid) return false;

        return $this->completions()
            ->where('user_id', $uid)
            ->whereDate('completed_at', Carbon::today())
            ->exists();
    }
}
