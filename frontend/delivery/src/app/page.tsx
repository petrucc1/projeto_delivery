"use client";
import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import BannerCarousel from "@/components/Carrossel";
import api from "@/lib/api";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/products");
        const data = res.data as { products: Product[] };
        setProducts(data.products.map((p: Product) => ({
          ...p,
          price: Number(p.price),
        })));
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    setAdding(product.id);
    await api.post("/cart", { product_id: product.id });
    setAdding(null);
  };

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BannerCarousel />
      <h1 className="text-2xl font-bold mb-4">Cardápio</h1>
      <ProductGrid products={products} onAddToCart={handleAddToCart} adding={adding} />
      <div className="flex justify-end mt-8">
        <Link href="/cart">
          <button className="bg-green-600 text-white px-6 py-2 rounded shadow">
            Ver Carrinho
          </button>
        </Link>
      </div>
    </div>
  );
}
