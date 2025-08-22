"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className="bg-white sticky top-0 z-50"
      style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)" }}
    >
      <div
        className="max-w-6xl mx-auto container-padding"
        style={{ paddingTop: "18px", paddingBottom: "18px" }}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href="/" onClick={closeMenu}>
              <h2 className="text-dark hover:text-blood-red transition-colors duration-200 mb-0">
                DeliveryApp
              </h2>
            </Link>
          </div>

          {/* Menu Desktop - visible acima de 720px */}
          <div
            className="hidden min-[720px]:flex items-center"
            style={{ gap: "32px" }}
          >
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
              <div
                className="btn-red flex items-center relative cursor-pointer text-sm"
                style={{ padding: "10px 20px" }}
              >
                Carrinho
              </div>
            </Link>
          </div>

          {/* Menu Mobile/Tablet - visible apenas em 720px ou menos */}
          <div
            className="min-[720px]:hidden flex items-center"
            style={{ gap: "16px" }}
          >
            {/* Carrinho Mobile */}
            <Link href="/cart" onClick={closeMenu}>
              <div
                className="btn-red flex items-center relative cursor-pointer text-sm"
                style={{ padding: "8px 16px" }}
              >
                Carrinho
              </div>
            </Link>

            {/* Botão Hambúrguer - ícone maior com +5px */}
            <button
              onClick={toggleMenu}
              className="text-gray hover:text-blood-red transition-colors duration-200 p-2"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <HiXMark className="w-10 h-10" />
              ) : (
                <HiBars3 className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile/Tablet Dropdown - visible apenas em 720px ou menos */}
        {isMenuOpen && (
          <div className="min-[720px]:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-gray hover:text-blood-red font-medium transition-colors duration-200 py-2"
              >
                Início
              </Link>

              <Link
                href="/produtos"
                onClick={closeMenu}
                className="text-gray hover:text-blood-red font-medium transition-colors duration-200 py-2"
              >
                Produtos
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
