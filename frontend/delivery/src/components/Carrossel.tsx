import { useEffect, useState } from "react";
import api from "@/lib/api";
import Image from "next/image";

interface Banner {
  id: number;
  image: string;
  title?: string;
}

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.get("/banners").then(res => setBanners(res.data.banners));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="w-full h-48 relative overflow-hidden rounded-xl mb-6">
      {banners.map((banner, idx) => (
        <Image
          key={banner.id}
          src={banner.image}
          alt={banner.title || `Banner ${idx + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {/* Se quiser, adicione indicadores */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <span key={idx} className={`w-2 h-2 rounded-full ${idx === current ? "bg-blue-500" : "bg-gray-300"}`}></span>
        ))}
      </div>
    </div>
  );
}