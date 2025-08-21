<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

// Seeder para popular a tabela de produtos
class ProductSeeder extends Seeder
{
    // Método principal que executa a inserção dos dados
    public function run(): void
    {
        // Lista de produtos para serem inseridos no banco de dados
        $products = [
            [
                'name' => 'Pizza Margherita',
                'description' => 'Clássica pizza italiana com molho de tomate e queijo.',
                'price' => 35.50,
                'image_url' => 'https://img.cdndsgni.com/preview/12118796-m.jpg',
            ],
            [
                'name' => 'Hambúrguer Especial',
                'description' => 'Hambúrguer artesanal com queijo, bacon e molho especial.',
                'price' => 28.00,
                'image_url' => 'https://img.cdndsgni.com/preview/13009358.jpg',
            ],
            [
                'name' => 'Suco Natural de Laranja',
                'description' => 'Suco 100% natural, sem adição de açúcar.',
                'price' => 8.50,
                'image_url' => 'https://img.cdndsgni.com/preview/10136074.jpg',
            ],
        ];

        // Percorre cada produto e insere no banco de dados
        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
