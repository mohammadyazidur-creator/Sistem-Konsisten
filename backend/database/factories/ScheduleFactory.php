<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ScheduleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->randomElement(['Rutinitas Pagi', 'Belajar Mandiri', 'Gerak Sehat', 'Istirahat Malam']),
            'time' => fake()->randomElement(['06.00', '16.30', '19.00', '21.00']),
            'days' => [0, 1, 2, 3, 4, 5, 6],
            'status' => 'Aktif',
            'icon' => fake()->randomElement(['sun', 'book', 'activity', 'moon']),
            'color' => '#3B82F6',
        ];
    }
}
