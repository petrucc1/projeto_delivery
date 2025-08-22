"use client";
import { HiShoppingCart } from "react-icons/hi2";

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

export default function ProductGrid({
  products,
  onAddToCart,
  adding,
}: ProductGridProps) {
  // Debug: vamos ver quantos produtos temos
  console.log("ProductGrid - Quantidade de produtos:", products.length);
  console.log("ProductGrid - Produtos:", products);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          Nenhum produto disponível no momento
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col h-full"
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Imagem do produto */}
            <div
              className="h-48 bg-gray-200 overflow-hidden flex-shrink-0"
              style={{
                height: "192px",
                backgroundColor: "#e5e7eb",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Conteúdo do card */}
            <div
              className="p-4 flex flex-col flex-grow"
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>

              {product.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">
                  {product.description}
                </p>
              )}

              {/* Preço e botão - sempre no final */}
              <div className="mt-auto space-y-3">
                <div className="text-xl font-bold text-green-600">
                  R$ {product.price.toFixed(2)}
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  disabled={adding === product.id}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    adding === product.id
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white hover:scale-105 shadow-md hover:shadow-lg"
                  }`}
                >
                  {adding === product.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adicionando...
                    </>
                  ) : (
                    <>
                      <HiShoppingCart className="w-5 h-5" />
                      Adicionar ao Carrinho
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
