import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";


import { useState, type FC } from "react";

interface RoomGalleryProps {
  images: string[];
}

export const RoomGallery: FC<RoomGalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="room-gallery">
      {/* Slider principale */}
      <Swiper
        modules={[Thumbs, Navigation]}
        navigation
        loop
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        className="room-main-slider"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`Room image ${i}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slider thumbnails */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={10}
        slidesPerView={5}
        watchSlidesProgress
        className="room-thumb-slider"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`Thumbnail ${i}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
