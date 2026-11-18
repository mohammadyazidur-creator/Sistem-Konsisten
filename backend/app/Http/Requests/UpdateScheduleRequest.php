<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScheduleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'time' => ['sometimes', 'required', 'string', 'max:10'],
            'end_time' => ['nullable', 'string', 'max:10'],
            'days' => ['sometimes', 'required', 'array'],
            'days.*' => ['integer', 'between:0,6'],
            'status' => ['sometimes', 'required', 'string', 'in:Aktif,Nonaktif'],
            'icon' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:50'],
        ];
    }
}
