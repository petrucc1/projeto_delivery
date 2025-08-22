<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    // Lista produtos com paginação (JSON limpo)
    public function index(): JsonResponse
    {
        try {
            $products = Product::paginate(20);

            return response()->json([
                'success' => true,
                'products' => $products->items(), // apenas os produtos
                'pagination' => [
                    'current_page' => $products->currentPage(),
                    'per_page' => $products->perPage(),
                    'total' => $products->total(),
                    'last_page' => $products->lastPage(),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao carregar produtos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Exibe um produto específico pelo ID
    public function show($id): JsonResponse
    {
        try {
            $product = Product::findOrFail($id);
            return response()->json([
                'success' => true,
                'product' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Produto não encontrado'
            ], 404);
        }
    }

    // Cria um novo produto
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'image_url' => 'nullable|url',
            ]);

            $product = Product::create($validated);

            return response()->json([
                'success' => true,
                'product' => $product,
                'message' => 'Produto criado com sucesso'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar produto',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    // Atualiza um produto existente
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $product = Product::findOrFail($id);

            $validated = $request->validate([
                'name' => 'string|max:255',
                'description' => 'nullable|string',
                'price' => 'numeric|min:0',
                'image_url' => 'nullable|url',
            ]);

            $product->update($validated);
            return response()->json([
                'success' => true,
                'product' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar produto',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    // Exclui um produto
    public function destroy($id): JsonResponse
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json(['success' => true, 'message' => 'Produto excluído']);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao excluir produto',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
