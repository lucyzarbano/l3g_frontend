import { useCallback, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeerMugEmpty, faClock, faMugSaucer, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
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
      <Swiper modules={[Thumbs, Navigation]} navigation loop spaceBetween={10} thumbs={{ swiper: thumbsSwiper }} className="room-main-slider">
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt="room" />
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
            <img src={img} alt="thumb" />
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

  const fallbackImages = [
    "../src/assets/img/camere/camera_ambra/camera_ambra_01.jpeg",
    "../src/assets/img/camere/camera_ambra/camera_ambra_02.jpeg",
    "../src/assets/img/camere/camera_ambra/camera_ambra_03.jpeg",
    "../src/assets/img/camere/camera_ambra/camera_ambra_04.jpeg",
    "../src/assets/img/camere/camera_ambra/camera_ambra_05.jpeg",
    "../src/assets/img/camere/camera_ambra/camera_ambra_06.jpeg"
  ];
  const images = room.images?.map((image) => image.src) ?? fallbackImages;

  return (
    <div className="page page--room-detail">
      <PublicPageHeader
        eyebrow="Le nostre camere"
        title={room.title}
        intro={room.description}
      />

      <div className="room-page">
        <div className="room-page_content">
          <div className="room-page_col1">
            <RoomGallery images={images} />

            <section className="room-content">
              <div className="room-description">
                <h2 className="pb_1">Dettagli della Stanza</h2>
                <p>La camera ambra offre comfort e altri servizi ai suoi client</p>
                <div className="room_services_content mt_4">
                  <h3 className="pb_1">Servizi Base</h3>
                  <div className="room_services">
                    {room.services_base.map((service: { icon: IconDefinition; description: string }, index) => (
                      <RoomService
                        key={index}
                        icon={service.icon}
                        description={service.description}
                      />
                    ))}
                  </div>

                  <h3 className="pb_1">Servizi Aggiuntivi</h3>
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
              <Box title="Info utili" icon={faMugSaucer}>
                <div className="room-info-panel">
                  <div className="room-info-panel__section room-info-panel__section--highlight">
                    <span className="room-info-panel__eyebrow">Colazione</span>
                    <p>Colazione disponibile in struttura con prodotti freschi e opzioni semplici per iniziare bene la giornata.</p>
                  </div>

                  <div className="room-info-panel__section">
                    <h3><FontAwesomeIcon icon={faClock} /> Tutti i giorni</h3>
                    <p>Dalle 7:30 alle 10:00</p>
                  </div>

                  <div className="room-info-panel__section">
                    <h3><FontAwesomeIcon icon={faBeerMugEmpty} /> Cosa trovi</h3>
                    <ul className="room-info-panel__chips">
                      <li>Pane</li>
                      <li>Burro</li>
                      <li>Affettati</li>
                      <li>Cereali</li>
                    </ul>
                  </div>

                  <div className="room-info-panel__section">
                    <h3>Servizi in camera</h3>
                    <ul className="room-info-panel__services">
                      {room.services_base.map((service) => (
                        <li key={service.description}>
                          <FontAwesomeIcon icon={service.icon} />
                          <span>{service.description}</span>
                        </li>
                      ))}
                    </ul>
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
