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

  // Auto-play simples
  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);

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
      <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Sem banners disponíveis</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-800">
      {/* Imagem atual */}
      <img
        src={banners[current]?.image_url}
        alt={`Banner ${current + 1}`}
        className="w-full h-full object-cover"
      />

      {/* Setas simples */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
          >
            ←
          </button>

          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
          >
            →
          </button>
        </>
      )}
    </div>
  );
}
