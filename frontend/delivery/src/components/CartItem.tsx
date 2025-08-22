"use client";

import { useState } from "react";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi2";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(item.id), 300);
  };

  return (
    <div
      className={`p-6 hover:bg-gray-50 transition-all duration-300 ${
        isRemoving ? "opacity-0 transform translate-x-full" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Imagem do Produto com gradiente */}
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <div className="w-8 h-8 bg-green-400 rounded-lg opacity-60"></div>
        </div>

        {/* Informações do Produto */}
        <div className="flex-1">
          <h4
            className="text-lg font-semibold text-dark mb-1"
            style={{ paddingTop: "10px" }}
          >
            {item.name}
          </h4>
          <p className="text-blood-red font-bold text-xl">
            R$ {item.price.toFixed(2)}
          </p>
        </div>

        {/* Controles de Quantidade e Remoção com 8px entre eles */}
        <div className="flex items-center" style={{ gap: "8px" }}>
          {/* Controle de Quantidade */}
          <div className="flex items-center bg-gray-100 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
              disabled={item.quantity <= 1}
            >
              <HiMinus
                className={`w-4 h-4 ${
                  item.quantity <= 1 ? "text-gray-400" : "text-gray-600"
                }`}
              />
            </button>

            <span className="px-3 py-2 min-w-[3rem] text-center font-semibold text-dark">
              {item.quantity}
            </span>

            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
            >
              <HiPlus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Botão Remover - sem sombra */}
          <button
            onClick={handleRemove}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-105"
            title="Remover item"
          >
            <HiTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
