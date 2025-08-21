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
        // Cria a tabela 'products'
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Chave primária auto-incrementável
            $table->string('name'); // Nome do produto
            $table->text('description')->nullable(); // Descrição do produto (opcional)
            $table->decimal('price', 10, 2); // Preço do produto com precisão de 10 dígitos e 2 casas decimais
            $table->string('image_url')->nullable(); // URL da imagem do produto (opcional)
            $table->timestamps(); // Campos de data de criação e atualização
        });
    }

    // Método chamado ao desfazer a migração
    public function down(): void
    {
        Schema::dropIfExists('products'); // Remove a tabela 'products' se existir
    }
};
