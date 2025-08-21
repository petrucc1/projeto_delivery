<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CartController;

Route::apiResource('products', ProductController::class);
Route::apiResource('banners', BannerController::class);
Route::apiResource('orders', OrderController::class);

Route::get('cart', [CartController::class, 'index']); // Visualizar carrinho
Route::post('cart', [CartController::class, 'store']); // Adicionar item ao carrinho
Route::patch('cart/{productId}', [CartController::class, 'update']); // Atualizar quantidade de item
Route::delete('cart/{productId}', [CartController::class, 'destroy']); // Remover item do carrinho
Route::post('cart/checkout', [CartController::class, 'checkout']); // Finalizar pedido

Route::get('teste', function() {
    return ['message' => 'Rota funcionando!'];
});