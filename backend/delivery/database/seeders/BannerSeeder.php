<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Banner;

// Seeder para popular a tabela de banners
class BannerSeeder extends Seeder
{
    // Método principal que executa a inserção dos dados
    public function run(): void
    {
        // Lista de banners para serem inseridos
        $banners = [
            [
                'image_url' => 'https://example.com/images/banner1.jpg',
                'title' => 'Promoção de Pizzas',
                'active' => true,
            ],
            [
                'image_url' => 'https://example.com/images/banner2.jpg',
                'title' => 'Combo Hambúrguer + Refrigerante',
                'active' => true,
            ],
            [
                'image_url' => 'https://example.com/images/banner3.jpg',
                'title' => 'Suco Natural do Dia',
                'active' => false, // inativo, não aparece no index
            ],
        ];

        // Percorre cada banner e insere no banco de dados
        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}
