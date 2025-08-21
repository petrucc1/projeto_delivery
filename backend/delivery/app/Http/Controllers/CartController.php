<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // Mostrar o carrinho
    public function index()
    {
        $cart = session()->get('cart', []);
        return response()->json($cart);
    }

    // Adicionar item ao carrinho
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $productId = $request->product_id;
        $product = Product::findOrFail($productId);
        $cart = session()->get('cart', []);

        if(isset($cart[$productId])) {
            $cart[$productId]['quantity']++;
        } else {
            $cart[$productId] = [
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => 1
            ];
        }

        session()->put('cart', $cart);
        return response()->json(['message' => 'Produto adicionado ao carrinho', 'cart' => $cart]);
    }

    // Atualizar quantidade de um item
    public function update(Request $request, $productId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = session()->get('cart', []);

        if(isset($cart[$productId])) {
            $cart[$productId]['quantity'] = $request->quantity;
            session()->put('cart', $cart);
            return response()->json(['message' => 'Carrinho atualizado', 'cart' => $cart]);
        }

        return response()->json(['message' => 'Produto não encontrado no carrinho'], 404);
    }

    // Remover item do carrinho
    public function destroy($productId)
    {
        $cart = session()->get('cart', []);

        if(isset($cart[$productId])) {
            unset($cart[$productId]);
            session()->put('cart', $cart);
            return response()->json(['message' => 'Produto removido', 'cart' => $cart]);
        }

        return response()->json(['message' => 'Produto não encontrado no carrinho'], 404);
    }

    // Finalizar pedido
    public function checkout()
    {
        $cart = session()->get('cart', []);
        if(empty($cart)) {
            return response()->json(['message' => 'Carrinho vazio'], 400);
        }

        // Criar um pedido simples
        $order = Order::create([
            'items' => json_encode($cart),
            'total' => collect($cart)->sum(function($item) {
                return $item['price'] * $item['quantity'];
            })
        ]);

        // Limpar o carrinho
        session()->forget('cart');

        return response()->json(['message' => 'Pedido finalizado', 'order' => $order]);
    }
}
