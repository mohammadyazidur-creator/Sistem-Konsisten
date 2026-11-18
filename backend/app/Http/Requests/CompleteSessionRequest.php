<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompleteSessionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'duration_seconds' => ['nullable', 'integer', 'min:0'],
            'completed_program_ids' => ['nullable', 'array'],
            'completed_program_ids.*' => ['integer', 'exists:programs,id'],
        ];
    }
}
