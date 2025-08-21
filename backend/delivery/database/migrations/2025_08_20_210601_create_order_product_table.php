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
        // Cria a tabela 'order_product'
        Schema::create('order_product', function (Blueprint $table) {
            $table->id(); // Chave primária auto-incrementada
            $table->foreignId('order_id')->constrained()->onDelete('cascade'); // Chave estrangeira para 'orders', exclui em cascata
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Chave estrangeira para 'products', exclui em cascata
            $table->integer('quantity')->default(1); // Quantidade do produto, padrão 1
            $table->decimal('price', 10, 2); // Preço do produto, até 10 dígitos e 2 casas decimais
            $table->timestamps(); // Colunas 'created_at' e 'updated_at'
            $table->unique(['order_id', 'product_id']); // Garante que não haja duplicidade de produto por pedido
        });
    }

    // Método chamado ao desfazer a migração
    public function down(): void
    {
        Schema::dropIfExists('order_product'); // Remove a tabela 'order_product' se existir
    }
};
