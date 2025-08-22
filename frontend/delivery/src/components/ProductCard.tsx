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
    <div className="bg-white border rounded-lg p-4 flex flex-col bg-red-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
      {product.image_url && (
        <Image
          src={product.image_url}
          alt={product.name}
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-md mb-2"
          style={{ width: "auto", height: "auto" }}
          priority
        />
      )}
      <h2 className="font-bold text-lg mb-1">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-2">{product.description}</p>
      <p className="mt-auto font-semibold text-blue-600">R$ {product.price.toFixed(2)}</p>
      <button
        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${adding ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => !adding && onAddToCart(product)}
        disabled={adding}
      >
        {adding ? "Adicionando..." : "Adicionar ao carrinho"}
      </button>
    </div>
  );
}