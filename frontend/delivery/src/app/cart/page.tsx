"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiShoppingBag, HiArrowLeft, HiSparkles } from "react-icons/hi2";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import CartItem from "@/components/CartItem";

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
    // Carrega carrinho do localStorage
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
    window.location.href = "/success";
  };

  if (loading) {
    return <Loading message="Carregando seu carrinho" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Container responsivo com largura máxima de 800px */}
      <div
        className="w-full max-w-4xl mx-auto container-padding section-spacing"
        style={{ maxWidth: "800px" }}
      >
        {/* Header da Página */}
        <div className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-gray mb-6">
            <Link href="/" className="hover:text-blood-red transition-colors">
              Início
            </Link>
            <span>/</span>
            <span className="text-dark font-medium">Carrinho</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-dark">Seu Carrinho</h1>
              <p className="text-gray text-lg">
                {cart.length === 0
                  ? "Seu carrinho está vazio"
                  : `${getTotalItems()} ${
                      getTotalItems() === 1
                        ? "item selecionado"
                        : "itens selecionados"
                    }`}
              </p>
            </div>

            <Link
              href="/"
              className="btn-red-outline inline-flex items-center gap-2"
            >
              <HiArrowLeft className="w-5 h-5" />
              Continuar Comprando
            </Link>
          </div>
        </div>

        {cart.length === 0 ? (
          // Estado Vazio
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <HiShoppingBag className="w-16 h-16 text-gray" />
              </div>

              <h2 className="text-dark mb-4">Seu carrinho está vazio</h2>

              <p className="text-gray text-lg mb-10 leading-relaxed">
                Que tal explorar nosso delicioso cardápio e descobrir sabores
                incríveis?
              </p>

              <Link href="/" className="btn-red inline-flex items-center gap-3">
                <HiSparkles className="w-6 h-6" />
                Explorar Cardápio
              </Link>
            </div>
          </div>
        ) : (
          // Layout do Carrinho - Uma única coluna em telas menores
          <div className="space-y-8">
            {/* Lista de Itens */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
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

            {/* Resumo do Pedido */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 bg-blood-red text-white">
                <h3 className="text-white mb-2">Resumo do Pedido</h3>
                <p className="text-red-100">
                  Confira os detalhes do seu pedido
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-8">
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

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-dark">Total</span>
                      <span className="text-blood-red">
                        R$ {(getTotalPrice() - getSavings()).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn-red w-full text-lg py-4"
                >
                  Finalizar Pedido
                </button>

                <div className="mt-6 text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Pagamento 100% seguro</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray">
                    <div className="w-2 h-2 bg-blood-red rounded-full"></div>
                    <span>Entrega rápida e confiável</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
