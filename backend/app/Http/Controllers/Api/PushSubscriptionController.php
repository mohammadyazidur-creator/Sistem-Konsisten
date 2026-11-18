<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePushSubscriptionRequest;
use App\Models\PushSubscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PushSubscriptionController extends Controller
{
    public function store(StorePushSubscriptionRequest $request): JsonResponse
    {
        $subscription = $request->user()->pushSubscriptions()->updateOrCreate(
            ['endpoint' => $request->endpoint],
            ['keys' => $request->keys]
        );

        return response()->json([
            'message' => 'Langganan notifikasi web push berhasil disimpan',
            'data' => $subscription,
        ], 201);
    }

    public function destroy(Request $request): JsonResponse
    {
        $request->validate(['endpoint' => 'required|string']);

        $request->user()->pushSubscriptions()
            ->where('endpoint', $request->endpoint)
            ->delete();

        return response()->json([
            'message' => 'Langganan notifikasi web push berhasil dihapus',
        ]);
    }
}
