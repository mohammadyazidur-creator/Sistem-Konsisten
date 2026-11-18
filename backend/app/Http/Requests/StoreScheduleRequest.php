<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScheduleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'time' => ['required', 'string', 'max:10'],
            'end_time' => ['nullable', 'string', 'max:10'],
            'days' => ['required', 'array'],
            'days.*' => ['integer', 'between:0,6'],
            'status' => ['nullable', 'string', 'in:Aktif,Nonaktif'],
            'icon' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:50'],
            'programs' => ['nullable', 'array'],
            'programs.*.title' => ['required_with:programs', 'string', 'max:255'],
            'programs.*.duration' => ['nullable', 'string'],
            'programs.*.duration_seconds' => ['nullable', 'integer'],
        ];
    }
}
