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
                'title' => 'Promoção Pizza',
                'image_url' => 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop'
            ],
            [
                'title' => 'Delivery Rápido',
                'image_url' => 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop'
            ],
            [
                'title' => 'Novos Sabores',
                'image_url' => 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=400&fit=crop'
            ]
        ];

        // Percorre cada banner e insere no banco de dados
        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}
