"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import BannerCarousel from "@/components/Carrossel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

        setProducts(processedProducts.slice(0, 8));
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
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="w-full h-72 md:h-80 lg:h-96 shadow-lg">
        <BannerCarousel />
      </div>

      <div
        className="max-w-6xl mx-auto container-padding flex-grow"
        style={{ paddingTop: "50px", paddingBottom: "80px" }}
      >
        <div className="text-center" style={{ marginBottom: "50px" }}>
          <h1 className="text-dark mb-4">Destaques do Dia</h1>
          <p className="text-gray text-lg max-w-2xl mx-auto mb-8">
            Confira os pratos mais pedidos e deliciosos do nosso cardápio
            especial de hoje
          </p>
        </div>

        <ProductGrid
          products={products}
          onAddToCart={handleAddToCart}
          adding={adding}
        />
      </div>

      <Footer />
    </div>
  );
}
