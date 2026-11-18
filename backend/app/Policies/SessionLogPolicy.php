<?php

namespace App\Policies;

use App\Models\SessionLog;
use App\Models\User;

class SessionLogPolicy
{
    public function view(User $user, SessionLog $sessionLog): bool
    {
        return $user->id === $sessionLog->user_id;
    }

    public function update(User $user, SessionLog $sessionLog): bool
    {
        return $user->id === $sessionLog->user_id;
    }
}
