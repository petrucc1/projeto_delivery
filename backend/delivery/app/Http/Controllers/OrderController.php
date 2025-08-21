<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    // Lista todos os pedidos.
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    // Mostra um pedido específico.
    public function show($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Pedido não encontrado'], 404);
        }
        return response()->json($order);
    }

    // Cria um novo pedido.
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'items' => 'required|array',
            'total' => 'required|numeric',
        ]);

        $order = Order::create($validated);
        return response()->json($order, 201);
    }

    // Atualiza um pedido existente.
    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Pedido não encontrado'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'integer',
            'items' => 'array',
            'total' => 'numeric',
        ]);

        $order->update($validated);
        return response()->json($order);
    }

    // Exclui um pedido.
    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Pedido não encontrado'], 404);
        }

        $order->delete();
        return response()->json(['message' => 'Pedido excluído']);
    }
}
