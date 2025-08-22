"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
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

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("Buscando todos os produtos...");
        const res = await api.get("/products");
        console.log("Resposta produtos:", res.data);
        const data = res.data as { products: Product[] };
        const products = Array.isArray(data.products) ? data.products : [];
        const processedProducts = products.map((p: Product) => ({
          ...p,
          price: Number(p.price),
        }));

        setProducts(processedProducts);
        setFilteredProducts(processedProducts);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

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
    return <Loading message="Carregando nossos produtos" />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div
        className="max-w-6xl mx-auto container-padding flex-grow"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        {/* Header da página */}
        <div className="text-center" style={{ marginBottom: "50px" }}>
          <h1 className="text-dark mb-4">Nossos Produtos</h1>
          <p
            className="text-gray text-lg max-w-2xl mx-auto"
            style={{ marginBottom: "50px" }}
          >
            Explore todo nosso cardápio com mais de {products.length} opções
            deliciosas para você
          </p>

          {/* Barra de pesquisa mais bonita e elegante */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full text-dark bg-gray-50 text-base font-medium focus:bg-white focus:ring-2 focus:ring-blood-red focus:ring-opacity-20 focus:border-blood-red outline-none transition-all duration-300"
                style={{
                  padding: "16px 16px 16px 48px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "50px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Resultados da busca */}
        {searchTerm && (
          <div style={{ marginBottom: "50px" }}>
            <p className="text-gray">
              {filteredProducts.length > 0
                ? `Encontrados ${filteredProducts.length} produto(s) para "${searchTerm}"`
                : `Nenhum produto encontrado para "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Grade de produtos */}
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          adding={adding}
        />
      </div>

      <Footer />
    </div>
  );
}
