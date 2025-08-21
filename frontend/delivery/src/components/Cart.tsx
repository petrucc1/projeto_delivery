"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  onClose?: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  function fetchCart() {
    api.get("/cart").then(res => {
      setCart(res.data as Record<string, CartItem>);
      setLoading(false);
    });
  }

  function handleQuantityChange(productId: string, quantity: number) {
    api.patch(`/cart/${productId}`, { quantity }).then(res => {
      setCart((res.data as { cart: Record<string, CartItem> }).cart);
    });
  }

  function handleRemove(productId: string) {
    api.delete(`/cart/${productId}`).then(res => {
      const data = res.data as { cart: Record<string, CartItem> };
      setCart(data.cart);
    });
  }

  function handleCheckout() {
    api.post("/cart/checkout").then(() => {
      setCart({});
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

  const subtotal = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) return <p>Carregando carrinho...</p>;
  if (success)
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-2">Pedido finalizado!</h2>
        <p className="mb-4">Obrigado pela compra.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleGoBack}>
          Voltar
        </button>
      </div>
    );
  if (Object.keys(cart).length === 0)
    return (
      <div className="p-4 text-center">
        <p>Carrinho vazio.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleGoBack}>
          Voltar
        </button>
      </div>
    );

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Carrinho de Compras</h2>
      <ul>
        {Object.entries(cart).map(([productId, item]) => (
          <li key={productId} className="flex items-center gap-2 mb-2">
            <span className="flex-1">{item.name}</span>
            <span>R$ {item.price.toFixed(2)}</span>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={e =>
                handleQuantityChange(productId, Number(e.target.value))
              }
              className="w-12 border rounded px-1"
            />
            <button
              onClick={() => handleRemove(productId)}
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