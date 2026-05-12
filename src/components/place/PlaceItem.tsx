import { useState } from "react"
import { truncate } from "../../utils/text"
import { Modal, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


export interface ImageProps {
  src: string;
  alt: string;
}
export interface InfoItem {
  icon: IconDefinition;
  title: string;
  description: string;

}


export interface PlaceItemProps {
  title: string;
  image: string;
  images: ImageProps[];
  description: string;
  info: InfoItem[]
}


export default function PlaceItem({ title, images, description, info }: PlaceItemProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const short_description =
    description.length < 260 ? description : truncate(description, 260);

  return (
    <div className="place-item__wrapper">
      <div className="place-item__content">

        {/* FOTO */}
        {/*<div className="place-item__content__img col">
          <img src={image} alt={title} />
        </div>*/}
        <div className="place-item__content__img col">

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            loop
          >
            {images.map((img)=> (
              <SwiperSlide key={img.src}>
                <img src={img.src} alt={img.alt} />
              </SwiperSlide>

            ))}
          </Swiper></div>

        {/* DESCRIZIONE */}
        <div className="place-item__content__description col">
          <h3 className="t-center">{title}</h3>
          <div className="separator"></div>


          {/* Modale Ant Design */}
          <Modal
            title={title}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            centered
            width={600}
            bodyStyle={{
              maxHeight: "70vh",
              overflowY: "auto",
              lineHeight: "1.8rem",
              padding: "1.5rem",
            }}
            className="place-modal"
          >
            <p>{description}</p>
            {/* Info opzionali */}
            {info && (
              <div className="modal-info">
                {info.map((item, idx) => (
                  <div key={idx} className="modal-info-item">
                    <span className="icon-wrapper">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    <span className="modal-info-text">
                      <strong>{item.title}</strong>
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Modal>

          {/* Testo breve nella card */}
          <p>{short_description}</p>
          {/* Bottone Ant Design */}
          <Button type="text" className="btn__inverse" onClick={() => setIsModalOpen(true)}>
            Leggi tutto
          </Button>

        </div>

        {/* DETTAGLI */}
        <div className="place-item__content__detail col-small">
          <ul>
            {info.map((item, index) => (
              <li key={index} className="info-item">
                <span className="icon-wrapper">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <div className="info-text">
                  <span className="name">{item.title}</span>
                  {item.description && <span className="type">{item.description}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
