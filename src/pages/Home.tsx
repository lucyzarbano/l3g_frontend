/*import { motion } from 'framer-motion';*/
/*import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';*/
import Servizi from '../components/Servizi'
import HeroSlider from '../components/Slider'
import Places from '../components/Places'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // non sempre necessario ma non fa male
import AboutComponent from '../components/About';
import AnimatedTitle from '../components/common/AnimatedTitle';
import ScrollReveal from '../components/common/ScrollReveal';
import Rooms from '../components/Rooms';


export default function Home() {
  return (
    <div>
      {/* Hero / Slider 
      <div className="hero-slider">

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide><img src="/src/assets/img/gemma_1.jpg" alt="" /></SwiperSlide>
          <SwiperSlide><img src="/src/assets/img/gemma_2.jpg" alt="" /></SwiperSlide>
        </Swiper>
      </div>*/}
      <section className="section">
          <HeroSlider />
      </section>

       {/* Sezione Servizi */}
      <div className="section">
        <ScrollReveal>
          <AboutComponent />
        </ScrollReveal>
      </div>

      {/* Sezione Camere */}
      <section className="camere">
        <AnimatedTitle>Le nostre Camere</AnimatedTitle>
        <p className="camere-intro">
          Tre ambienti curati per riposare bene, sentirsi accolti e vivere Lentini con calma.
        </p>
        <ScrollReveal>
          <Rooms />
        </ScrollReveal>
      </section>


      {/* Sezione Servizi */}
      <div className="section">
         <ScrollReveal>
            <Servizi />
         </ScrollReveal>
      </div>

       {/* Sezione Servizi */}
      <div className="section section--home-places">
        <ScrollReveal>
         <Places />
        </ScrollReveal>
      </div>
     

      {/* Sezione Recensioni */}
      <section className="recensioni">
        <AnimatedTitle>Cosa dicono di noi</AnimatedTitle>
        <ScrollReveal>        

          <div className="recensioni-grid">
            <div className="recensione-card">
              <p>"Struttura accogliente e pulitissima. I proprietari gentilissimi."</p>
              <span className="author">– Maria R.</span>
            </div>

            <div className="recensione-card">
              <p>"Colazione ottima e camera molto confortevole. Torneremo!"</p>
              <span className="author">– Giovanni P.</span>
            </div>

            <div className="recensione-card">
              <p>"Posizione perfetta per visitare Assisi. Super consigliato."</p>
              <span className="author">– Elisa T.</span>
            </div>
          </div>
        </ScrollReveal>
        </section>
      </div>
  );
}
