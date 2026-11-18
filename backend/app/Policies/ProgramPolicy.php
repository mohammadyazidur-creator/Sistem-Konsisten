<?php

namespace App\Policies;

use App\Models\Program;
use App\Models\User;

class ProgramPolicy
{
    public function view(User $user, Program $program): bool
    {
        return $user->id === $program->schedule->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Program $program): bool
    {
        return $user->id === $program->schedule->user_id;
    }

    public function delete(User $user, Program $program): bool
    {
        return $user->id === $program->schedule->user_id;
    }
}
