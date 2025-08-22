"use client";

import Link from "next/link";
import { HiHome, HiShoppingBag } from "react-icons/hi2";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Conteúdo centralizado vertical e horizontalmente */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center container-padding">
          {/* Ícone de sucesso sem check */}
          <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full opacity-80"></div>
          </div>

          {/* Mensagem principal */}
          <h1 className="text-dark mb-6">Pedido Realizado com Sucesso!</h1>

          <p className="text-gray text-lg mb-4 leading-relaxed">
            Obrigado pela sua compra! Seu pedido foi recebido e está sendo
            preparado com muito carinho.
          </p>

          <p className="text-gray mb-10 leading-relaxed">
            Em breve você receberá uma confirmação por email com todos os
            detalhes do seu pedido.
          </p>

          {/* Container dos botões com 30px de padding */}
          <div style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            {/* Botões de ação - com gap de 10px entre eles */}
            <div
              className="flex flex-col sm:flex-row justify-center"
              style={{ gap: "10px" }}
            >
              <Link
                href="/"
                className="btn-red inline-flex items-center justify-center"
                style={{ gap: "8px" }}
              >
                <HiHome className="w-5 h-5" />
                Voltar ao Início
              </Link>

              <Link
                href="/produtos"
                className="btn-red-outline inline-flex items-center justify-center"
                style={{ gap: "8px" }}
              >
                <HiShoppingBag className="w-5 h-5" />
                Fazer Novo Pedido
              </Link>
            </div>
          </div>

          {/* Mensagem final */}
          <p className="text-gray text-sm mt-12">
            Esperamos que você tenha uma experiência incrível com nossos
            produtos!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
