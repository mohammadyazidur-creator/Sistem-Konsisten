<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\PushSubscriptionController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\SessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| API for Sistem Konsisten application.
|
*/

// Public Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    // Auth & Profile
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Dashboard Overview (streak, 7-day consistency, today's progress & schedules)
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Schedules CRUD + Toggle Active Status
    Route::apiResource('schedules', ScheduleController::class);
    Route::patch('/schedules/{schedule}/toggle-status', [ScheduleController::class, 'toggleStatus']);

    // Programs (nested under schedule & standalone)
    Route::get('/schedules/{schedule}/programs', [ProgramController::class, 'index']);
    Route::post('/schedules/{schedule}/programs', [ProgramController::class, 'store']);
    Route::put('/programs/{program}', [ProgramController::class, 'update']);
    Route::delete('/programs/{program}', [ProgramController::class, 'destroy']);
    Route::post('/schedules/{schedule}/programs/reorder', [ProgramController::class, 'reorder']);
    Route::post('/programs/{program}/toggle-completion', [ProgramController::class, 'toggleCompletion']);

    // Focus Sessions (Start / Complete)
    Route::post('/sessions/start', [SessionController::class, 'start']);
    Route::post('/sessions/{session}/complete', [SessionController::class, 'complete']);

    // Upcoming Notifications
    Route::get('/notifications/upcoming', [NotificationController::class, 'upcoming']);

    // Web Push Subscriptions
    Route::post('/push-subscriptions', [PushSubscriptionController::class, 'store']);
    Route::delete('/push-subscriptions', [PushSubscriptionController::class, 'destroy']);
});
