"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HiArrowLeft,
  HiSparkles,
  HiShieldCheck,
  HiTruck,
} from "react-icons/hi2";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import CartItem from "@/components/CartItem";
import Footer from "@/components/Footer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setLoading(false);
    };

    loadCart();
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(newCart);
  };

  const removeItem = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateCart(newCart);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getSavings = () => {
    return getTotalPrice() * 0.05;
  };

  const handleCheckout = () => {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    window.location.href = "/obrigado";
  };

  if (loading) {
    return <Loading message="Carregando seu carrinho" />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div
        className="w-full max-w-4xl mx-auto container-padding section-spacing flex-grow"
        style={{ maxWidth: "800px" }}
      >
        {cart.length === 0 ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="text-center max-w-md mx-auto">
              <h1 className="text-dark mb-6">Seu carrinho está vazio</h1>

              <p className="text-gray text-lg mb-10 leading-relaxed">
                Que tal explorar nosso delicioso cardápio e descobrir pratos
                especiais preparados com muito carinho?
              </p>

              <Link
                href="/"
                className="btn-red inline-flex items-center"
                style={{ gap: "8px" }}
              >
                <HiSparkles className="w-6 h-6" />
                Explorar Cardápio
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <nav className="flex items-center space-x-2 text-sm text-gray mb-6">
                <Link
                  href="/"
                  className="hover:text-blood-red transition-colors"
                >
                  Início
                </Link>
                <span>/</span>
                <span className="text-dark font-medium">Carrinho</span>
              </nav>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h1 className="text-dark">Seu Carrinho</h1>
                  <p className="text-gray text-lg">
                    {getTotalItems()}{" "}
                    {getTotalItems() === 1
                      ? "item selecionado"
                      : "itens selecionados"}
                  </p>
                </div>

                <Link
                  href="/"
                  className="btn-red-outline inline-flex items-center"
                  style={{ gap: "8px" }}
                >
                  <HiArrowLeft className="w-5 h-5" />
                  Continuar Comprando
                </Link>
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}></div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div
                className="bg-white rounded-2xl shadow-sm"
                style={{ padding: "15px" }}
              >
                <div
                  className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl"
                  style={{ margin: "-15px -15px 20px -15px" }}
                >
                  <h2 className="text-dark mb-2">Itens do seu Pedido</h2>
                  <p className="text-gray">
                    Revise os itens e ajuste as quantidades conforme necessário
                  </p>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>

              <div
                className="bg-white rounded-2xl shadow-sm"
                style={{ padding: "15px" }}
              >
                <div
                  className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl"
                  style={{ margin: "-15px -15px 20px -15px" }}
                >
                  <h2 className="text-dark mb-2 font-semibold">
                    Resumo do Pedido
                  </h2>
                  <p className="text-gray">Confira os detalhes do seu pedido</p>
                </div>

                <div
                  className="p-6"
                  style={{ margin: "-15px", paddingTop: "20px" }}
                >
                  <div className="space-y-5 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-gray">
                        Subtotal ({getTotalItems()}{" "}
                        {getTotalItems() === 1 ? "item" : "itens"})
                      </span>
                      <span className="font-semibold text-dark">
                        R$ {getTotalPrice().toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray">Taxa de entrega</span>
                      <span className="text-green-600 font-bold">Grátis</span>
                    </div>

                    {getSavings() > 0 && (
                      <div className="flex justify-between items-center text-green-600">
                        <span className="flex items-center gap-1">
                          <HiSparkles className="w-4 h-4" />
                          Economia
                        </span>
                        <span className="font-semibold">
                          -R$ {getSavings().toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div
                      className="border-t border-gray-200"
                      style={{ paddingTop: "14px", marginTop: "10px" }}
                    >
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-dark">Total</span>
                        <span className="text-blood-red">
                          R$ {(getTotalPrice() - getSavings()).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                    <button
                      onClick={handleCheckout}
                      className="btn-red w-full text-lg py-4"
                    >
                      Finalizar Pedido
                    </button>
                  </div>

                  <div className="text-center space-y-3">
                    <div
                      className="flex items-center justify-center text-sm text-gray"
                      style={{ gap: "8px" }}
                    >
                      <HiShieldCheck className="w-5 h-5 text-gray" />
                      <span>Pagamento 100% seguro</span>
                    </div>
                    <div
                      className="flex items-center justify-center text-sm text-gray"
                      style={{ gap: "8px" }}
                    >
                      <HiTruck className="w-5 h-5 text-gray" />
                      <span>Entrega rápida e confiável</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
