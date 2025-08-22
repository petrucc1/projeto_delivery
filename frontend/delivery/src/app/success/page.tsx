"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiCheckCircle, HiHome, HiShoppingBag } from "react-icons/hi2";
import Header from "@/components/Header";

export default function SuccessPage() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Limpa o carrinho após finalizar pedido
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));

    // Trigger animation
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-2xl mx-auto container-padding section-spacing">
        <div className="text-center">
          {/* Animação do Check */}
          <div className="mb-8 relative">
            <div
              className={`w-32 h-32 mx-auto rounded-full bg-green-100 flex items-center justify-center transition-all duration-700 ${
                showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <HiCheckCircle
                className={`w-20 h-20 text-green-600 transition-all duration-500 delay-300 ${
                  showAnimation ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />
            </div>
          </div>

          {/* Conteúdo */}
          <div
            className={`transition-all duration-700 delay-700 ${
              showAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-dark mb-6">Pedido Realizado!</h1>

            <div className="space-y-4 mb-10">
              <p className="text-gray text-xl leading-relaxed">
                Obrigado por escolher nossa plataforma! 🎉
              </p>
              <p className="text-gray">
                Seu pedido foi recebido com sucesso e em breve você receberá
                todos os detalhes por e-mail.
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 bg-blood-red hover:bg-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <HiHome className="w-5 h-5" />
                Voltar ao Início
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 border-2 border-blood-red text-blood-red hover:bg-blood-red hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
              >
                <HiShoppingBag className="w-5 h-5" />
                Fazer Novo Pedido
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
