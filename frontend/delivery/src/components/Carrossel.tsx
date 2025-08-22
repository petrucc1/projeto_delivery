"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import api from "@/lib/api";

// Importar CSS do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Banner {
  id: number;
  image_url: string;
  title?: string;
}

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/banners")
      .then((res) => {
        setBanners(res.data.banners || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar banners:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center">
        <p className="text-gray-600">Carregando banners...</p>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Nenhum banner disponível</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 9000,
          disableOnInteraction: false,
        }}
        navigation={banners.length > 1}
        pagination={{
          clickable: true,
          enabled: banners.length > 1,
        }}
        loop={false}
        className="w-full h-full custom-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="w-full h-full relative">
              <img
                src={banner.image_url}
                alt={banner.title || "Banner"}
                className="w-full h-full object-cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
