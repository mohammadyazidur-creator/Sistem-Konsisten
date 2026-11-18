<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReorderProgramsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'program_ids' => ['required', 'array'],
            'program_ids.*' => ['integer', 'exists:programs,id'],
        ];
    }
}
