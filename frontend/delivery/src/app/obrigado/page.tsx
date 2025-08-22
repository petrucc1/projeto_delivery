"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiCheckCircle, HiHome, HiShoppingBag } from "react-icons/hi2";
import Header from "@/components/Header";

export default function ThankYouPage() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
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

            {/* Particles animados */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 bg-green-400 rounded-full transition-all duration-1000 delay-500 ${
                    showAnimation ? "opacity-100 animate-bounce" : "opacity-0"
                  }`}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 20}%`,
                    animationDelay: `${0.5 + i * 0.1}s`,
                  }}
                />
              ))}
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

            {/* Informações do pedido */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-10 text-left">
              <h3 className="text-dark mb-4">Próximos passos:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blood-red rounded-full mt-2.5 flex-shrink-0"></div>
                  <span className="text-gray">
                    Você receberá uma confirmação por e-mail em até 5 minutos
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blood-red rounded-full mt-2.5 flex-shrink-0"></div>
                  <span className="text-gray">
                    Nossa equipe entrará em contato para confirmar os detalhes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blood-red rounded-full mt-2.5 flex-shrink-0"></div>
                  <span className="text-gray">
                    Estimativa de entrega: 30-45 minutos
                  </span>
                </li>
              </ul>
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

            {/* Mensagem final */}
            <div className="mt-12 p-6 bg-green-50 rounded-2xl">
              <p className="text-green-800 font-medium">
                💚 Agradecemos sua confiança e esperamos que você tenha uma
                experiência incrível!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS para animações adicionais */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
