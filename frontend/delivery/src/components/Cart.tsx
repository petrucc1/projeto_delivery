"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  onClose?: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  function fetchCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setLoading(false);
  }

  function handleQuantityChange(productId: number, quantity: number) {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function handleRemove(productId: number) {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function handleCheckout() {
    api.post("/cart/checkout", { cart }).then(() => {
      setCart([]);
      localStorage.removeItem("cart");
      setSuccess(true);
    });
  }

  const handleGoBack = () => {
    if (onClose) {
      onClose();
    } else {
      window.location.href = "/";
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) return <p>Carregando carrinho...</p>;
  if (success)
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-2">Pedido finalizado!</h2>
        <p className="mb-4">Obrigado pela compra.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleGoBack}
        >
          Voltar
        </button>
      </div>
    );
  if (cart.length === 0)
    return (
      <div className="p-4 text-center">
        <p>Carrinho vazio.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleGoBack}
        >
          Voltar
        </button>
      </div>
    );

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Carrinho de Compras</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex items-center gap-2 mb-2">
            <span className="flex-1">{item.name}</span>
            <span>R$ {item.price.toFixed(2)}</span>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, Number(e.target.value))
              }
              className="w-12 border rounded px-1"
            />
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-semibold">
        Subtotal: R$ {subtotal.toFixed(2)}
      </div>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleCheckout}
      >
        Finalizar pedido
      </button>
      <button
        className="mt-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
        onClick={handleGoBack}
      >
        Voltar
      </button>
    </div>
  );
}
