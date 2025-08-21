<?php

namespace App\Models;

// Importa o trait HasFactory para usar factories
use Illuminate\Database\Eloquent\Factories\HasFactory;
// Importa a classe base Model do Eloquent
use Illuminate\Database\Eloquent\Model;

// Define a classe Product que representa o modelo de produto
class Product extends Model
{
    // Usa o trait HasFactory para permitir criação de instâncias via factory
    use HasFactory;

    // Define os campos que podem ser preenchidos em massa
    protected $fillable = ['name', 'description', 'price', 'image_url'];

    // Define o relacionamento muitos-para-muitos com o modelo Order
    public function orders()
    {
        // Retorna o relacionamento belongsToMany com a tabela pivot contendo quantidade e preço
        return $this->belongsToMany(Order::class)
                    ->withPivot('quantity', 'price') // Inclui os campos extras da tabela pivot
                    ->withTimestamps(); // Adiciona timestamps na tabela pivot
    }
}

