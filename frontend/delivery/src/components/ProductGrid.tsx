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
          className="bg-white rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            // Sombra sutil e mais delicada
            boxShadow:
              "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          onMouseEnter={(e) => {
            // Hover muito mais sutil
            e.currentTarget.style.boxShadow =
              "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            // Volta suavemente ao estado original
            e.currentTarget.style.boxShadow =
              "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)";
            e.currentTarget.style.transform = "translateY(0px)";
          }}
        >
          {/* Imagem do produto */}
          <div
            className="h-48 bg-gray-100 overflow-hidden flex-shrink-0"
            style={{
              height: "192px",
              backgroundColor: "#f9fafb",
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
                  transition: "transform 0.4s ease",
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-400 text-sm">Sem imagem</p>
                </div>
              </div>
            )}
          </div>

          {/* Conteúdo do card */}
          <div
            className="p-5 flex flex-col flex-grow"
            style={{
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Preço e botão - sempre no final */}
            <div className="mt-auto space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-blood-red">
                  R$ {product.price.toFixed(2)}
                </div>
              </div>

              <button
                onClick={() => onAddToCart(product)}
                disabled={adding === product.id}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 ${
                  adding === product.id
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blood-red hover:bg-red-800 text-white shadow-md hover:shadow-lg"
                }`}
                style={{
                  borderRadius: "12px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
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
  );
}
