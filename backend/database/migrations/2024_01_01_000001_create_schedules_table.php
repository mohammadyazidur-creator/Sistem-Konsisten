<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('time'); // e.g. "06.00" or "06:00"
            $table->jsonb('days');  // e.g. [0,1,2,3,4,5,6]
            $table->string('status')->default('Aktif'); // 'Aktif' | 'Nonaktif'
            $table->string('icon')->default('sun');     // 'sun', 'book', 'activity', 'moon'
            $table->string('color')->default('#3B82F6');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
