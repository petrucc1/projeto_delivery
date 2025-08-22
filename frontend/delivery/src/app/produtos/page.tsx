"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
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

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
    // Filtra produtos baseado no termo de busca
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
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
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto container-padding section-spacing">
        {/* Header da página */}
        <div className="text-center mb-12">
          <h1 className="text-dark mb-4">Nossos Produtos</h1>
          <p className="text-gray text-lg max-w-2xl mx-auto mb-8">
            Explore todo nosso cardápio com mais de {products.length} opções
            deliciosas para você
          </p>

          {/* Barra de pesquisa */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blood-red focus:border-blood-red outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Resultados da busca */}
        {searchTerm && (
          <div className="mb-6">
            <p className="text-gray">
              {filteredProducts.length > 0
                ? `Encontrados ${filteredProducts.length} produto(s) para "${searchTerm}"`
                : `Nenhum produto encontrado para "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Grid de produtos */}
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          adding={adding}
        />

        {filteredProducts.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-dark mb-3">Nenhum produto encontrado</h3>
              <p className="text-gray mb-6">
                Tente pesquisar com outros termos ou navegue por todas as nossas
                opções.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-blood-red hover:bg-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Ver Todos os Produtos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
