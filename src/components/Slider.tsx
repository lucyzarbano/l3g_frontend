import { A11y, Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import img1 from "../assets/img/optimized/sicilia_1.jpg";
import img2 from "../assets/img/optimized/sicilia_2.jpg";
import img3 from "../assets/img/optimized/sicilia_3.jpg";
import img4 from "../assets/img/optimized/sicilia_4.jpg";

export default function HeroSlider() {
  const slides = [
    { image: img1, title: 'Benvenuti alle Tre Gemme', description: 'Nel centro storico di Lentini, un luogo accogliente da cui iniziare il tuo viaggio in Sicilia.' },
    { image: img2, title: 'Il piacere di rallentare', description: 'Lascia spazio al riposo, alle passeggiate senza fretta e al tempo da dedicare a te.' },
    { image: img3, title: 'La Sicilia, tutta da scoprire', description: 'Tra mare, borghi e città d’arte, lasciati guidare dalla curiosità alla scoperta della Sicilia orientale.' },
    { image: img4, title: 'Ogni viaggio merita una pausa', description: 'Dopo una giornata di scoperte, ritrova la tranquillità della tua camera alle Tre Gemme.' },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade, A11y]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop
      autoplay={{ delay: 6500, disableOnInteraction: false }}
      a11y={{ prevSlideMessage: "Slide precedente", nextSlideMessage: "Slide successiva", paginationBulletMessage: "Vai alla slide {{index}}" }}
      navigation
      pagination={{ clickable: true }}
      className="hero-slider"
    >
      {slides.map(({ image, title, description }, index) => (
        <SwiperSlide className={`hero-slide hero-slide--${index + 1}`} key={image}>
          <img src={image} alt="" className="hero-slide-img" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding="async" />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-subtitle">{description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
