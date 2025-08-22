"use client";

import { useState } from "react";
import { HiTrash, HiMinus, HiPlus } from "react-icons/hi2";

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
          <h3 className="font-semibold text-gray-900 mb-1 text-lg">
            {item.name}
          </h3>
          <p className="text-green-600 font-semibold text-xl">
            R$ {item.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Preço unitário</p>
        </div>

        {/* Controles de Quantidade */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-xl shadow-sm">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-3 hover:bg-gray-200 rounded-l-xl transition-colors hover:scale-105"
              disabled={item.quantity <= 1}
            >
              <HiMinus
                className={`w-4 h-4 ${
                  item.quantity <= 1 ? "text-gray-400" : "text-gray-600"
                }`}
              />
            </button>

            <span className="px-6 py-3 font-bold text-gray-900 min-w-[3rem] text-center text-lg">
              {item.quantity}
            </span>

            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-3 hover:bg-gray-200 rounded-r-xl transition-colors hover:scale-105"
            >
              <HiPlus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="p-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all hover:scale-110 shadow-sm"
            title="Remover item"
          >
            <HiTrash className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Subtotal do Item */}
      <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          {item.quantity}x R$ {item.price.toFixed(2)}
        </span>
        <span className="text-lg font-bold text-gray-900">
          R$ {(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
