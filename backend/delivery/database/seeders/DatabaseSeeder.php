<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// Classe responsável por popular o banco de dados com dados iniciais
class DatabaseSeeder extends Seeder
{
    /**
     * Popula o banco de dados da aplicação.
     */
    public function run(): void
    {
        // Cria usuário de teste
        User::factory()->create([
            'name' => 'Test User', // Nome do usuário de teste
            'email' => 'test@example.com', // E-mail do usuário de teste
        ]);

        // Popula produtos
        $this->call(\Database\Seeders\ProductSeeder::class);

        // Popula banners
        $this->call(\Database\Seeders\BannerSeeder::class);
    }
}
