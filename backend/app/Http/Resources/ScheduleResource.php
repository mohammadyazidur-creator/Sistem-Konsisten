<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $programs = ProgramResource::collection($this->whenLoaded('programs', $this->programs, []));

        return [
            'id' => $this->id,
            'name' => $this->name,
            'time' => $this->time,
            'end_time' => $this->end_time,
            'days' => $this->days,
            'days_summary' => $this->days_summary,
            'status' => $this->status,
            'icon' => $this->icon,
            'color' => $this->color,
            'total_duration' => $this->total_duration,
            'is_today' => $this->isScheduledForToday(),
            'programs' => $programs,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
