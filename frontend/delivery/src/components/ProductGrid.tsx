"use client";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (!Array.isArray(products) || products.length === 0)
    return <p>Nenhum produto encontrado.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}