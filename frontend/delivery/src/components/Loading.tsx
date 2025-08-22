"use client";

import { PuffLoader, ScaleLoader } from "react-spinners";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Carregando..." }: LoadingProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Animação elegante com react-spinners */}
        <div className="relative mb-8">
          {/* Loader principal */}
          <div className="flex justify-center mb-4">
            <PuffLoader color="#8B0000" size={80} speedMultiplier={0.8} />
          </div>

          {/* Loader secundário menor */}
          <div className="flex justify-center">
            <ScaleLoader
              color="#6b7280"
              height={20}
              width={3}
              radius={2}
              margin={3}
              speedMultiplier={1.2}
            />
          </div>
        </div>

        {/* Texto com fonte já definida para evitar flash */}
        <div
          className="space-y-3"
          style={{
            fontFamily:
              "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
            fontWeight: "500",
          }}
        >
          <h3 className="text-xl font-semibold text-dark">{message}</h3>
          <p className="text-gray text-base">Preparando tudo para você...</p>
        </div>

        {/* Barra de progresso sutil */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blood-red to-red-600 rounded-full animate-pulse"
              style={{
                width: "60%",
                animation: "loading-progress 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Pontos decorativos */}
        <div className="mt-6 flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blood-red rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.4s",
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS customizado para animação da barra */}
      <style jsx>{`
        @keyframes loading-progress {
          0% {
            width: 20%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 20%;
            margin-left: 80%;
          }
        }
      `}</style>
    </div>
  );
}
