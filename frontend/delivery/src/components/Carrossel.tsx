"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api";

interface Banner {
  id: number;
  image_url: string;
  title?: string;
}

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.get<{ banners: Banner[] }>("/banners").then(res => setBanners(res.data.banners || []));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      {banners.map((banner, idx) => (
        <Image
          key={banner.id}
          src={banner.image_url}
          alt={banner.title || `Banner ${idx + 1}`}
          fill
          sizes="100vw"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? "opacity-100" : "opacity-0"}`}
          priority={idx === 0}
        />
      ))}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <span key={idx} className={`w-2 h-2 rounded-full ${idx === current ? "bg-blue-500" : "bg-gray-300"}`}></span>
        ))}
      </div>
    </div>
  );
}