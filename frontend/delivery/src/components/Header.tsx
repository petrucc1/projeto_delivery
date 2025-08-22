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
      className="bg-white sticky top-0 z-50"
      style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)" }}
    >
      <div className="max-w-6xl mx-auto container-padding py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href="/">
              <h2 className="text-dark hover:text-blood-red transition-colors duration-200 mb-0">
                DeliveryApp
              </h2>
            </Link>
          </div>

          {/* Navegação com mais espaçamento entre os itens */}
          <div className="flex items-center" style={{ gap: "32px" }}>
            <Link
              href="/"
              className="text-gray hover:text-blood-red font-medium transition-colors duration-200"
              style={{ padding: "8px 12px" }}
            >
              Início
            </Link>

            <Link
              href="/produtos"
              className="text-gray hover:text-blood-red font-medium transition-colors duration-200"
              style={{ padding: "8px 12px" }}
            >
              Produtos
            </Link>

            <Link href="/cart">
              <div className="btn-red flex items-center gap-2 relative cursor-pointer text-sm">
                <svg
                  className="w-4 h-4"
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
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-blood-red text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs">
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
