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
  adding: number | null;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (!Array.isArray(products) || products.length === 0)
    return <p>Nenhum produto encontrado.</p>;

  return (
    <div className="bg-white flex flex-row">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}