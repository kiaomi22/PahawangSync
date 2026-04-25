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
    Schema::create('boats', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // Nama kapal (misal: KM Lumba-Lumba)
        $table->integer('capacity'); // Kapasitas penumpang
        $table->decimal('price_per_day', 10, 2); // Harga sewa per hari
        $table->enum('status', ['available', 'maintenance', 'booked'])->default('available'); // Status kapal
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boats');
    }
};
