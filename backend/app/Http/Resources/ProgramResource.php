<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $userId = $request->user()?->id ?? $this->schedule?->user_id;

        return [
            'id' => $this->id,
            'schedule_id' => $this->schedule_id,
            'title' => $this->title,
            'duration' => $this->duration,
            'duration_seconds' => $this->duration_seconds,
            'quote' => $this->quote,
            'icon' => $this->icon,
            'sort_order' => $this->sort_order,
            'completed' => $this->isCompletedToday($userId),
        ];
    }
}
