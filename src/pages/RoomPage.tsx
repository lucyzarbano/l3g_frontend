import { useCallback, useState, type FC } from "react";
import { Link, useParams } from "react-router-dom";

import { faEnvelope, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { rooms } from "../data/rooms";
import RoomService from "../components/room/RoomService";
import Box from "../components/room/Box";
import PublicPageHeader from "../components/common/PublicPageHeader";
import { useAsyncFallback } from "../hooks/useAsyncFallback";
import { contentApi } from "../services/contentApi";

export const RoomGallery: FC<{ images: string[] }> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="room-gallery">
      <Swiper modules={[Thumbs, Navigation]} navigation loop={images.length > 1} spaceBetween={10} thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} className="room-main-slider">
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Foto della camera ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={3}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 4, spaceBetween: 12 },
          992: { slidesPerView: 5, spaceBetween: 14 }
        }}
        watchSlidesProgress
        className="room-thumb-slider"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Anteprima ${index + 1}`} loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const AvailabilityWidget: FC = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [message, setMessage] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("Verifica disponibilita completata!");
  };

  return (
    <div className="availability-box">
      <h3>Check Availability</h3>
      <form onSubmit={submit}>
        <div className="field-group">
          <label>Check-in</label>
          <input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} />
        </div>
        <div className="field-group">
          <label>Check-out</label>
          <input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} />
        </div>
        <div className="field-group">
          <label>Adults</label>
          <input type="number" min={1} value={adults} onChange={(event) => setAdults(Number(event.target.value))} />
        </div>
        <div className="field-group">
          <label>Children</label>
          <input type="number" min={0} value={children} onChange={(event) => setChildren(Number(event.target.value))} />
        </div>
        <button type="submit">Check Now</button>
      </form>
      {message && <p className="result-msg">{message}</p>}
    </div>
  );
};

const RoomPage: FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const id = roomId || "ambra";
  const fallbackRoom = rooms.find((item) => item.id === id);
  const loadRoom = useCallback(async () => {
    const room = await contentApi.getRoom(id);
    return room ?? fallbackRoom;
  }, [fallbackRoom, id]);
  const { data: room } = useAsyncFallback(fallbackRoom, loadRoom);

  if (!room) return <h1>Camera non trovata!</h1>;

  const images = room.images?.length ? room.images.map((image) => image.src) : [room.image.src];

  return (
    <div className="page page--room-detail">
      <PublicPageHeader
        eyebrow="Le nostre camere"
        title={room.title}
        intro={room.short_description}
      />

      <div className="room-page">
        <div className="room-page_content">
          <div className="room-page_col1">
            <RoomGallery images={images} />

            <section className="room-content">
              <div className="room-description">
                <h2 className="pb_1">La tua camera</h2>
                <p>{room.description}</p>
                <div className="room_services_content mt_4">
                  <h3 className="pb_1">Servizi in camera</h3>
                  <div className="room_services">
                    {room.services_base.map((service: { icon: IconDefinition; description: string }, index) => (
                      <RoomService
                        key={index}
                        icon={service.icon}
                        description={service.description}
                      />
                    ))}
                  </div>

                  <h3 className="pb_1">Altri servizi</h3>
                  <div className="room_services">
                    {room.services_additional.map((service: { icon: IconDefinition; description: string }, index) => (
                      <RoomService
                        key={index}
                        icon={service.icon}
                        description={service.description}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="room-page_col2">
            <aside className="room-sidebar">
              <Box title="Il tuo soggiorno" icon={faEnvelope}>
                <div className="room-request">
                  <p>Ti piacerebbe soggiornare nella {room.title}? Scrivici per conoscere disponibilità e informazioni.</p>
                  <Link className="room-request__cta" to="/contatti">Chiedi disponibilità</Link>
                  <a className="room-request__phone" href="tel:+393200666325">Oppure chiamaci: 320 066 6325</a>
                  <div className="room-request__breakfast">
                    <h3>La colazione</h3>
                    <p>Colazione disponibile in struttura con prodotti freschi e opzioni semplici per iniziare bene la giornata.</p>
                  </div>
                </div>
              </Box>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
