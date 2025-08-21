<?php

namespace App\Models;

// Importa o trait HasFactory para criar instâncias de modelos usando factories
use Illuminate\Database\Eloquent\Factories\HasFactory;
// Importa a classe base Model do Eloquent
use Illuminate\Database\Eloquent\Model;

// Define a classe Order que representa o modelo de pedidos
class Order extends Model
{
    // Usa o trait HasFactory para habilitar factories
    use HasFactory;

    // Define os campos que podem ser preenchidos em massa
    protected $fillable = ['user_id', 'total'];

    // Define o relacionamento muitos-para-muitos com o modelo Product
    public function products()
    {
        // Retorna o relacionamento belongsToMany com Product,
        // incluindo os campos extras 'quantity' e 'price' na tabela pivô,
        // e registra timestamps na tabela pivô
        return $this->belongsToMany(Product::class)
                    ->withPivot('quantity', 'price')
                    ->withTimestamps();
    }
}

