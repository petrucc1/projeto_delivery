"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import BannerCarousel from "@/components/Carrossel";
import Header from "@/components/Header";
import Loading from "@/components/Loading";

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

      // Dispara evento para atualizar contador do carrinho
      window.dispatchEvent(new Event("cartUpdated"));

      // Opcional: chama API para confirmar
      await api.post("/cart", { product_id: product.id });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }

    setAdding(null);
  };

  // Loading bonito sem flash de fonte
  if (loading) {
    return <Loading message="Carregando nosso delicioso cardápio" />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - deve aparecer sempre */}
      <Header />

      {/* Banner com altura padronizada */}
      <div className="w-full h-72 md:h-80 lg:h-96 shadow-lg">
        <BannerCarousel />
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nosso Cardápio
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubra os sabores únicos que preparamos especialmente para você
          </p>
        </div>

        <ProductGrid
          products={products}
          onAddToCart={handleAddToCart}
          adding={adding}
        />
      </div>
    </div>
  );
}
