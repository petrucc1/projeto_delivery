<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Registra rotas API
        Route::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));

        // Registra rotas Web
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }
}
