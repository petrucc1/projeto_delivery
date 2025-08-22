"use client";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Carregando..." }: LoadingProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Animação com CSS puro - sem bibliotecas externas */}
        <div className="relative mb-8">
          {/* Círculo principal */}
          <div
            className="w-16 h-16 border-4 border-green-100 rounded-full mx-auto relative"
            style={{
              borderTopColor: "#10b981",
              animation:
                "spin 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite",
            }}
          >
            {/* Ponto interno animado */}
            <div
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-500 rounded-full"
              style={{
                transform: "translate(-50%, -50%)",
                animation: "pulse 1.5s ease-in-out infinite alternate",
              }}
            />
          </div>

          {/* Círculos decorativos */}
          <div
            className="absolute top-0 left-1/2 w-1 h-1 bg-green-300 rounded-full"
            style={{
              transform: "translateX(-50%)",
              animation: "float 2s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 w-1 h-1 bg-green-300 rounded-full"
            style={{
              transform: "translateX(-50%)",
              animation: "float 2s ease-in-out infinite reverse",
            }}
          />
        </div>

        {/* Texto com fonte já definida para evitar flash */}
        <div
          className="space-y-2"
          style={{
            fontFamily:
              "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
            fontWeight: "500",
          }}
        >
          <h3 className="text-xl font-semibold text-gray-800">{message}</h3>
          <p className="text-gray-500 text-sm">Preparando tudo para você...</p>
        </div>

        {/* Barra de progresso decorativa */}
        <div className="mt-8 w-48 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              style={{
                width: "0%",
                animation: "progress 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* CSS das animações */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateX(-50%) translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateX(-50%) translateY(-8px);
            opacity: 1;
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 70%;
            transform: translateX(0%);
          }
          100% {
            width: 100%;
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
