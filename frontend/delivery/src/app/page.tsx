"use client";
import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import Cart from "@/components/Cart";
import api from "@/lib/api";

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
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products.map((p: Product) => ({
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
    await api.post("/cart", { product_id: product.id });
    setShowCart(true);
  };

  const handleCloseCart = () => setShowCart(false);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cardápio</h1>
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
      {showCart && <Cart onClose={handleCloseCart} />}
      {!showCart && (
        <button
          className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowCart(true)}
        >
          Ver Carrinho
        </button>
      )}
    </div>
  );
}
