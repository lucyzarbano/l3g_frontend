import React, { useCallback } from 'react'
import { AboutInfo } from '../data/about'
import { useAsyncFallback } from '../hooks/useAsyncFallback'
import { contentApi } from '../services/contentApi'
import { Link } from 'react-router-dom'

const AboutComponent: React.FC = () => {
  const loadAbout = useCallback(() => contentApi.getAbout(), [])
  const { data } = useAsyncFallback(AboutInfo, loadAbout)
  const { title, eyebrow, description, images } = data

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-header">
            <span className="about-eyebrow">{eyebrow}</span>
            <h2>{title}</h2>

            <div className="about-copy">
              {description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link to="/camere" className="about-link">
              Scopri le camere <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="about-images">
            {images.slice(0, 2).map((img, index) => (
              <img key={img.src} src={img.src} className={index === 0 ? 'about-image-primary' : 'about-image-secondary'} alt={img.alt} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutComponent
