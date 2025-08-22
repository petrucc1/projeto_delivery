<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Pizzas
            [
                'name' => 'Pizza Margherita',
                'description' => 'Pizza tradicional com molho de tomate, mussarela e manjericão fresco',
                'price' => 32.90,
                'image_url' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Pizza Pepperoni',
                'description' => 'Pizza clássica com pepperoni, queijo e molho especial',
                'price' => 36.90,
                'image_url' => 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Pizza Quatro Queijos',
                'description' => 'Deliciosa combinação de mussarela, gorgonzola, provolone e parmesão',
                'price' => 39.90,
                'image_url' => 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop'
            ],

            // Hambúrgueres
            [
                'name' => 'Hambúrguer Artesanal',
                'description' => 'Hambúrguer de carne bovina, queijo cheddar, alface, tomate e molho especial',
                'price' => 28.50,
                'image_url' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Cheeseburger Duplo',
                'description' => 'Dois hambúrgueres suculentos com queijo derretido e molho barbecue',
                'price' => 34.90,
                'image_url' => 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Hambúrguer Vegano',
                'description' => 'Hambúrguer plant-based com queijo vegano e vegetais frescos',
                'price' => 31.90,
                'image_url' => 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop'
            ],

            // Comida Japonesa
            [
                'name' => 'Sushi Variado',
                'description' => 'Combinado com 20 peças de sushi, sashimi e hot rolls',
                'price' => 45.90,
                'image_url' => 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Temaki Salmão',
                'description' => 'Temaki fresquinho com salmão, cream cheese e pepino',
                'price' => 18.90,
                'image_url' => 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Yakisoba',
                'description' => 'Macarrão oriental refogado com legumes e molho shoyu',
                'price' => 26.90,
                'image_url' => 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop'
            ],

            // Massas
            [
                'name' => 'Lasanha Bolonhesa',
                'description' => 'Lasanha tradicional com molho bolonhesa, queijo e molho bechamel',
                'price' => 24.90,
                'image_url' => 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Espaguete Carbonara',
                'description' => 'Espaguete cremoso com bacon, ovos e parmesão',
                'price' => 29.90,
                'image_url' => 'https://images.unsplash.com/photo-1621647428937-c12abd4d1322?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Ravioli de Ricota',
                'description' => 'Ravioli artesanal recheado com ricota e espinafre ao molho de tomate',
                'price' => 27.90,
                'image_url' => 'https://images.unsplash.com/photo-1587740908075-1060312d7d44?w=400&h=300&fit=crop'
            ],

            // Comida Mexicana
            [
                'name' => 'Tacos Mexicanos',
                'description' => 'Trio de tacos com carne, frango e vegetariano, acompanha molhos',
                'price' => 35.90,
                'image_url' => 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Burrito Supreme',
                'description' => 'Burrito gigante com carne, feijão, queijo, guacamole e salsa',
                'price' => 32.90,
                'image_url' => 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Quesadilla',
                'description' => 'Tortilla crocante recheada com queijo e frango desfiado',
                'price' => 22.90,
                'image_url' => 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop'
            ],

            // Sobremesas e Açaí
            [
                'name' => 'Açaí Premium',
                'description' => 'Açaí cremoso com granola, banana, morango e leite condensado',
                'price' => 18.90,
                'image_url' => 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Brownie Gourmet',
                'description' => 'Brownie artesanal com sorvete de baunilha e calda de chocolate',
                'price' => 16.90,
                'image_url' => 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Cheesecake de Frutas',
                'description' => 'Cheesecake cremoso com cobertura de frutas vermelhas',
                'price' => 19.90,
                'image_url' => 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop'
            ],

            // Bebidas e Lanches
            [
                'name' => 'Sanduíche Natural',
                'description' => 'Pão integral com peito de peru, queijo branco e salada',
                'price' => 14.90,
                'image_url' => 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop'
            ],
            [
                'name' => 'Wrap de Frango',
                'description' => 'Wrap integral com frango grelhado, cream cheese e vegetais',
                'price' => 21.90,
                'image_url' => 'https://images.unsplash.com/photo-1565299585323-38174c259311?w=400&h=300&fit=crop'
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
