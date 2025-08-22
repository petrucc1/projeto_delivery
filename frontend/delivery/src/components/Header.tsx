"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const cart: CartItem[] = JSON.parse(storedCart);
          const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(totalItems);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("Erro ao atualizar contador do carrinho:", error);
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <header
      className="w-full bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors duration-200">
                DeliveryApp
              </h1>
            </Link>
          </div>

          {/* Navegação */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Cardápio
            </Link>

            <Link href="/cart">
              <div className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 relative cursor-pointer">
                {/* Ícone do carrinho */}
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0h6m-6 0h6m0 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  />
                </svg>
                Carrinho
                {/* Badge do contador */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
