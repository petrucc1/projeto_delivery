<?php

// Define o namespace do modelo
namespace App\Models;

// Importa o trait HasFactory para criação de instâncias de modelo
use Illuminate\Database\Eloquent\Factories\HasFactory;
// Importa a classe base Model do Eloquent
use Illuminate\Database\Eloquent\Model;

// Define a classe Banner que estende Model
class Banner extends Model
{
    // Usa o trait HasFactory
    use HasFactory;

    // Define os campos que podem ser preenchidos em massa
    protected $fillable = [
        'image_url', // URL da imagem do banner
        'title',     // Título do banner
        'active',    // Status de ativação do banner
    ];
}
