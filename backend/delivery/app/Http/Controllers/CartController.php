<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // Mostrar o carrinho - agora recebe do frontend
    public function index(Request $request)
    {
        $cart = $request->input('cart', []);
        return response()->json($cart);
    }

    // Adicionar item ao carrinho - retorna apenas dados do produto
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $productId = $request->product_id;
        $product = Product::findOrFail($productId);

        return response()->json([
            'success' => true,
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
            ]
        ]);
    }

    // Finalizar pedido
    public function checkout(Request $request)
    {
        $cart = $request->input('cart', []);
        if (empty($cart)) {
            return response()->json(['message' => 'Carrinho vazio'], 400);
        }

        $total = collect($cart)->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });

        $order = Order::create([
            'user_id' => 1, // usuário padrão por enquanto
            'total' => $total
        ]);

        return response()->json(['message' => 'Pedido finalizado', 'order' => $order]);
    }

    // Remove métodos update e destroy pois serão gerenciados no frontend
}
