"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import BannerCarousel from "@/components/Carrossel";
import Header from "@/components/Header";

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
        console.log("Buscando produtos...");
        const res = await api.get("/products");
        console.log("Resposta produtos:", res.data);
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
      console.log("Produto adicionado ao carrinho:", cart);

      // Opcional: chama API para confirmar
      await api.post("/cart", { product_id: product.id });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }

    setAdding(null);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Banner */}
      <div className="w-full h-80">
        <BannerCarousel />
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Nosso Cardápio
        </h2>
        <ProductGrid
          products={products}
          onAddToCart={handleAddToCart}
          adding={adding}
        />
      </div>
    </div>
  );
}
