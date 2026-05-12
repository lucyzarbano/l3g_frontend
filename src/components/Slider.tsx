import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import img1 from "../assets/img/sicilia_1.jpg";
import img2 from "../assets/img/sicilia_2.jpg";
import img3 from "../assets/img/sicilia_3.jpg";
import img4 from "../assets/img/sicilia_4.jpg";

export default function HeroSlider() {
  const slides = [img1, img2, img3, img4];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      className="hero-slider"
    >
      {slides.map((image, index) => (
        <SwiperSlide className={`hero-slide hero-slide--${index + 1}`} key={image}>
          <img src={image} alt={`slide-${index}`} className="hero-slide-img" />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">B&B LE TRE GEMME {index + 1}</h1>
            <p className="hero-subtitle">LOREM IPSUM LOREM IPSM LOREM IPSUM {index + 1}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
