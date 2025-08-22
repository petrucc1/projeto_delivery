"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Banner {
  id: number;
  image_url: string;
  title?: string;
}

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Buscando banners...");
    api
      .get("/banners")
      .then((res) => {
        console.log("Banners recebidos:", res.data);
        setBanners(res.data.banners || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar banners:", err);
        setLoading(false);
      });
  }, []);

  // Auto-play mais suave
  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 7000); // 7 segundos

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-gray-300 border-t-green-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Carregando banners...</p>
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-sm">Nenhum banner disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden group">
      {/* Container da imagem com altura padronizada */}
      <div className="w-full h-full">
        <img
          src={banners[current]?.image_url}
          alt={`Banner ${current + 1}`}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />

        {/* Overlay sutil para melhor contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Setas elegantes */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full w-12 h-12 flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Banner anterior"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full w-12 h-12 flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Próximo banner"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Indicadores mais elegantes */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === current
                  ? "w-8 h-2 bg-white shadow-lg"
                  : "w-2 h-2 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Ir para banner ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
