import React, { useCallback } from 'react'
import { AboutInfo } from '../data/about'
import { useAsyncFallback } from '../hooks/useAsyncFallback'
import { contentApi } from '../services/contentApi'
import AnimatedTitle from './common/AnimatedTitle'

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
            <AnimatedTitle>{title}</AnimatedTitle>

            <div className="about-copy">
              {description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="about-images">
            {images.map((img) => (
              <img key={img.src} src={img.src} className={img.class_name} alt={img.alt} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutComponent
