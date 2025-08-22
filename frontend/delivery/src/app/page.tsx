"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import BannerCarousel from "@/components/Carrossel";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
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
        const products = Array.isArray(data.products) ? data.products : [];
        setProducts(
          products.map((p: Product) => ({
            ...p,
            price: Number(p.price),
          }))
        );
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

    try {
      // Busca carrinho atual do localStorage
      const storedCart = localStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];

      // Verifica se produto já existe no carrinho
      const existingItem = cart.find(
        (item: CartItem) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }

      // Salva no localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Opcional: chama API para confirmar
      await api.post("/cart", { product_id: product.id });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }

    setAdding(null);
  };

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="h-64 mb-8 rounded-lg overflow-hidden">
        <BannerCarousel />
      </div>
      <h1 className="text-2xl font-bold mb-4">Cardápio</h1>
      <ProductGrid
        products={products}
        onAddToCart={handleAddToCart}
        adding={adding}
      />
      <div className="flex justify-end mt-8">
        <Link href="/cart">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
            Ver Carrinho
          </button>
        </Link>
      </div>
    </div>
  );
}
