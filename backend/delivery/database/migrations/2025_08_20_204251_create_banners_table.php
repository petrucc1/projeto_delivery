<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Retorna uma nova classe anônima que estende Migration
return new class extends Migration
{
    // Método chamado ao aplicar a migração
    public function up(): void
    {
        // Cria a tabela 'banners'
        Schema::create('banners', function (Blueprint $table) {
            $table->id(); // Adiciona coluna 'id' como chave primária
            $table->string('image_url'); // Adiciona coluna 'image_url' (URL da imagem)
            $table->string('title')->nullable(); // Adiciona coluna 'title' (título), pode ser nula
            $table->boolean('active')->default(true); // Adiciona coluna 'active' (ativo), padrão true
            $table->timestamps(); // Adiciona colunas 'created_at' e 'updated_at'
        });
    }

    // Método chamado ao desfazer a migração
    public function down(): void
    {
        Schema::dropIfExists('banners'); // Remove a tabela 'banners' se existir
    }
};
