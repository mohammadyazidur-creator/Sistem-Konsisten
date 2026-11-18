<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StartSessionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'schedule_id' => ['nullable', 'exists:schedules,id'],
            'program_id' => ['nullable', 'exists:programs,id'],
        ];
    }
}
