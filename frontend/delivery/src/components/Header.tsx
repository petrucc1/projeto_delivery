"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Título */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">DeliveryApp</h1>
        </div>

        {/* Navegação */}
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            Cardápio
          </Link>

          <Link href="/cart">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
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
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
