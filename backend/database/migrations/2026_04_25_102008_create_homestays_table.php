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
        Schema::create('homestays', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama homestay (misal: Homestay Pak Kumis)
            $table->integer('total_rooms'); // Jumlah kamar yang tersedia
            $table->decimal('price_per_night', 10, 2); // Harga per malam
            $table->enum('status', ['available', 'full', 'maintenance'])->default('available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('homestays');
    }
};
