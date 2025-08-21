<?php

namespace App\Providers;

// Importa o ServiceProvider do Laravel
use Illuminate\Support\ServiceProvider;

// Define a classe AppServiceProvider que estende ServiceProvider
class AppServiceProvider extends ServiceProvider
{
    /**
     * Registre quaisquer serviços de aplicação.
     */
    public function register(): void
    {
        // 
    }

    /**
     * Inicialize quaisquer serviços de aplicação.
     */
    public function boot(): void
    {
        // 
    }
}

