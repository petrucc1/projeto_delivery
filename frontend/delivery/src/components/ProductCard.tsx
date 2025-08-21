"use client";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  adding?: boolean;
}

export default function ProductCard({ product, onAddToCart, adding }: ProductCardProps) {
  return (
    <div className="border rounded p-4 flex flex-col bg-white shadow">
      {product.image_url && (
        <Image
          src={product.image_url}
          alt={product.name}
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}
      <h2 className="font-bold">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.description}</p>
      <p className="mt-2 font-semibold">R$ {product.price.toFixed(2)}</p>
      <button
        className={`mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${adding ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => !adding && onAddToCart(product)}
        disabled={adding}
      >
        {adding ? "Adicionando..." : "Adicionar ao carrinho"}
      </button>
    </div>
  );
}