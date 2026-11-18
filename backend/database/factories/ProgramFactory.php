<?php

namespace Database\Factories;

use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProgramFactory extends Factory
{
    public function definition(): array
    {
        return [
            'schedule_id' => Schedule::factory(),
            'title' => fake()->sentence(3),
            'duration' => '10 menit',
            'duration_seconds' => 600,
            'quote' => fake()->optional()->sentence(),
            'icon' => 'leaf',
            'sort_order' => 0,
        ];
    }
}
