<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Retorna uma nova classe anônima que estende Migration
return new class extends Migration
{
    // Método chamado ao aplicar a migration
    public function up(): void
    {
        // Cria a tabela 'orders' (pedidos)
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Cria uma coluna de ID auto-incrementável
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Cria uma coluna de chave estrangeira para 'user_id', vinculada à tabela 'users', com exclusão em cascata
            $table->decimal('total', 10, 2); // Cria uma coluna decimal chamada 'total' com precisão 10 e 2 casas decimais
            $table->timestamps(); // Cria colunas 'created_at' e 'updated_at'
        });
    }

    // Método chamado ao desfazer a migration
    public function down(): void
    {
        Schema::dropIfExists('orders'); // Remove a tabela 'orders' se existir
    }
};
