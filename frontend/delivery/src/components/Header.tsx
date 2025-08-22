"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Título menor e mais elegante */}
          <Link href="/" className="group">
            <h1 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
              DeliveryApp
            </h1>
          </Link>

          {/* Navegação com estilo melhorado */}
          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium transition-all duration-200 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:transition-all after:duration-200 hover:after:w-full"
            >
              Cardápio
            </Link>

            <Link href="/cart">
              <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2.5">
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
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
