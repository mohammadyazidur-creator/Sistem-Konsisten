<?php

namespace Database\Seeders;

use App\Models\Program;
use App\Models\ProgramCompletion;
use App\Models\Schedule;
use App\Models\SessionLog;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with demo user & Figma data.
     */
    public function run(): void
    {
        // 1. Create primary demo user
        $user = User::create([
            'name' => 'Raka Pratama',
            'email' => 'raka@konsisten.id',
            'password' => Hash::make('password'),
            'email_verified_at' => Carbon::now(),
        ]);

        // 2. Create the 4 Schedules exactly as in Figma design
        // Schedule 1: Rutinitas Pagi (06.00, Sun, #3B82F6, Sen – Min)
        $pagi = $user->schedules()->create([
            'name' => 'Rutinitas Pagi',
            'time' => '06.00',
            'end_time' => '06.17',
            'days' => [0, 1, 2, 3, 4, 5, 6],
            'status' => 'Aktif',
            'icon' => 'sun',
            'color' => '#3B82F6',
        ]);

        $progAir = $pagi->programs()->create([
            'title' => 'Minum air putih',
            'duration' => '2 menit',
            'duration_seconds' => 120,
            'icon' => 'leaf',
            'sort_order' => 0,
        ]);

        $progRegang = $pagi->programs()->create([
            'title' => 'Peregangan',
            'duration' => '5 menit',
            'duration_seconds' => 300,
            'icon' => 'activity',
            'sort_order' => 1,
        ]);

        $progMeditasi = $pagi->programs()->create([
            'title' => 'Meditasi',
            'duration' => '10 menit',
            'duration_seconds' => 600,
            'quote' => "Tarik napas perlahan.\nFokus pada momen ini.",
            'icon' => 'leaf',
            'sort_order' => 2,
        ]);

        // Schedule 2: Belajar Mandiri (19.00, Book, #3B82F6, Sen – Jum)
        $belajar = $user->schedules()->create([
            'name' => 'Belajar Mandiri',
            'time' => '19.00',
            'end_time' => '19.50',
            'days' => [0, 1, 2, 3, 4],
            'status' => 'Aktif',
            'icon' => 'book',
            'color' => '#3B82F6',
        ]);

        $progDoc = $belajar->programs()->create([
            'title' => 'Membaca Dokumentasi & Teori',
            'duration' => '20 menit',
            'duration_seconds' => 1200,
            'icon' => 'book',
            'sort_order' => 0,
        ]);

        $progCoding = $belajar->programs()->create([
            'title' => 'Latihan Koding & Proyek',
            'duration' => '30 menit',
            'duration_seconds' => 1800,
            'icon' => 'activity',
            'sort_order' => 1,
        ]);

        // Schedule 3: Gerak Sehat (16.30, Activity, #20A586, Sel, Kam, Sab)
        $gerak = $user->schedules()->create([
            'name' => 'Gerak Sehat',
            'time' => '16.30',
            'end_time' => '16.55',
            'days' => [1, 3, 5],
            'status' => 'Aktif',
            'icon' => 'activity',
            'color' => '#20A586',
        ]);

        $gerak->programs()->create([
            'title' => 'Jogging Sore',
            'duration' => '20 menit',
            'duration_seconds' => 1200,
            'icon' => 'activity',
            'sort_order' => 0,
        ]);

        $gerak->programs()->create([
            'title' => 'Pendinginan Tubuh',
            'duration' => '5 menit',
            'duration_seconds' => 300,
            'icon' => 'leaf',
            'sort_order' => 1,
        ]);

        // Schedule 4: Istirahat Malam (21.00, Moon, #8060C2, Sen – Min, Nonaktif)
        $malam = $user->schedules()->create([
            'name' => 'Istirahat Malam',
            'time' => '21.00',
            'end_time' => '21.15',
            'days' => [0, 1, 2, 3, 4, 5, 6],
            'status' => 'Nonaktif',
            'icon' => 'moon',
            'color' => '#8060C2',
        ]);

        $malam->programs()->create([
            'title' => 'Review Hari & Matikan Layar',
            'duration' => '15 menit',
            'duration_seconds' => 900,
            'icon' => 'moon',
            'sort_order' => 0,
        ]);

        // 3. Seed historical sessions & program completions to establish 7-day streak & record 12
        // Days 12 down to 0
        for ($day = 11; $day >= 0; $day--) {
            $date = Carbon::today()->subDays($day);

            // Create completed session log
            $session = SessionLog::create([
                'user_id' => $user->id,
                'schedule_id' => $pagi->id,
                'started_at' => $date->copy()->setTime(6, 0),
                'completed_at' => $date->copy()->setTime(6, 17),
                'duration_seconds' => 1020,
                'status' => 'completed',
            ]);

            // Programs completed on this day
            if ($day === 0) {
                // Today: 3 of 5 programs completed (Minum air putih, Peregangan, Jogging Sore) -> 60%
                ProgramCompletion::create([
                    'user_id' => $user->id,
                    'program_id' => $progAir->id,
                    'session_log_id' => $session->id,
                    'completed_at' => $date->copy()->setTime(6, 2),
                ]);

                ProgramCompletion::create([
                    'user_id' => $user->id,
                    'program_id' => $progRegang->id,
                    'session_log_id' => $session->id,
                    'completed_at' => $date->copy()->setTime(6, 7),
                ]);
            } else {
                // Past days completions
                ProgramCompletion::create([
                    'user_id' => $user->id,
                    'program_id' => $progAir->id,
                    'session_log_id' => $session->id,
                    'completed_at' => $date->copy()->setTime(6, 2),
                ]);

                ProgramCompletion::create([
                    'user_id' => $user->id,
                    'program_id' => $progRegang->id,
                    'session_log_id' => $session->id,
                    'completed_at' => $date->copy()->setTime(6, 7),
                ]);

                ProgramCompletion::create([
                    'user_id' => $user->id,
                    'program_id' => $progMeditasi->id,
                    'session_log_id' => $session->id,
                    'completed_at' => $date->copy()->setTime(6, 17),
                ]);
            }
        }
    }
}
