"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
        console.log("Buscando produtos para homepage...");
        const res = await api.get("/products");
        console.log("Resposta produtos:", res.data);
        const data = res.data as { products: Product[] };
        const products = Array.isArray(data.products) ? data.products : [];
        const processedProducts = products.map((p: Product) => ({
          ...p,
          price: Number(p.price),
        }));

        // Pega apenas os primeiros 6 produtos para a homepage
        setProducts(processedProducts.slice(0, 6));
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
      const storedCart = localStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];

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

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      await api.post("/cart", { product_id: product.id });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }

    setAdding(null);
  };

  if (loading) {
    return <Loading message="Carregando nossa homepage" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner */}
      <div className="w-full h-72 md:h-80 lg:h-96 shadow-lg">
        <BannerCarousel />
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto container-padding section-spacing-bottom">
        {/* Seção Destaques */}
        <div className="text-center mb-12">
          <h1 className="text-dark mb-4">Destaques do Cardápio</h1>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            Confira alguns dos nossos pratos mais pedidos e deliciosos
          </p>
        </div>

        <ProductGrid
          products={products}
          onAddToCart={handleAddToCart}
          adding={adding}
        />

        {/* Call to Action para ver mais produtos */}
        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-dark mb-4">Quer ver mais opções?</h3>
            <p className="text-gray mb-6">
              Temos muito mais sabores esperando por você! Explore nosso
              cardápio completo com mais de 20 produtos deliciosos.
            </p>
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 bg-blood-red hover:bg-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Ver Cardápio Completo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
