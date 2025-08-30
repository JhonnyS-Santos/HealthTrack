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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nomeUsers')->nullable();
            $table->string('emailUsers')->unique()->nullable();
            $table->date('dataNUsers')->nullable();
            $table->string('estadoUsers')->nullable();
            $table->string('cepUsers')->nullable();
            $table->string('bairroUsers')->nullable();
            $table->string('ruaUsers')->nullable();
            $table->string('numUsers')->nullable();
            $table->string('fotoUsers')->nullable();
            $table->string('senhaUsers')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
