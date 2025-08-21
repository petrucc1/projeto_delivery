<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;

// Controlador responsável pelas operações CRUD de banners
class BannerController extends Controller
{
    // Retorna todos os banners ativos
    public function index(Request $request)
    {
        $banners = Banner::where('active', true)->get();
        return response()->json($banners);
    }

    // Retorna um banner específico pelo ID
    public function show($id)
    {
        $banner = Banner::findOrFail($id);
        return response()->json($banner);
    }

    // Cria um novo banner
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image_url' => 'required|string',
            'title' => 'nullable|string',
            'active' => 'boolean'
        ]);

        $banner = Banner::create($validated);
        return response()->json($banner, 201);
    }

    // Atualiza um banner existente
    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);

        $validated = $request->validate([
            'image_url' => 'string',
            'title' => 'nullable|string',
            'active' => 'boolean'
        ]);

        $banner->update($validated);
        return response()->json($banner);
    }

    // Exclui um banner
    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);
        $banner->delete();
        return response()->json(['message' => 'Banner excluído']);
    }
}
