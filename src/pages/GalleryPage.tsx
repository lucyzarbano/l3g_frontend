import { Alert, Empty, Image, Spin, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import PublicPageHeader from '../components/common/PublicPageHeader'
import { getImages } from '../services/galleryService'
import type { GalleryImage } from '../services/galleryService'

const { Text } = Typography
const allCategoriesLabel = 'Tutte'

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeCategory, setActiveCategory] = useState(allCategoriesLabel)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const controller = new AbortController()

    async function loadGalleryImages() {
      setLoading(true)
      setError(undefined)

      try {
        const galleryImages = await getImages(controller.signal)
        setImages(galleryImages)
      } catch (currentError) {
        if (currentError instanceof DOMException && currentError.name === 'AbortError') {
          return
        }

        setError('Non siamo riusciti a caricare le immagini. Riprova tra qualche minuto.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void loadGalleryImages()

    return () => controller.abort()
  }, [])

  const categories = useMemo(
    () => [allCategoriesLabel, ...Array.from(new Set(images.map((image) => image.category)))],
    [images],
  )

  const groupedImages = useMemo(() => {
    const visibleImages =
      activeCategory === allCategoriesLabel
        ? images
        : images.filter((image) => image.category === activeCategory)

    return visibleImages.reduce<Record<string, GalleryImage[]>>((groups, image) => {
      groups[image.category] = [...(groups[image.category] ?? []), image]
      return groups
    }, {})
  }, [activeCategory, images])

  return (
    <main className="gallery-page">
      <PublicPageHeader
        eyebrow="Momenti e dettagli"
        title="Galleria"
        intro="Camere, dintorni e piccoli frammenti di Sicilia da scoprire prima dell'arrivo."
      />

      <section className="gallery-page__content">
        {loading && (
          <div className="gallery-feedback">
            <Spin size="large" />
            <Text type="secondary">Caricamento immagini...</Text>
          </div>
        )}

        {!loading && error && (
          <Alert type="error" showIcon message="Galleria non disponibile" description={error} />
        )}

        {!loading && !error && images.length === 0 && (
          <Empty description="La galleria sara disponibile a breve" />
        )}

        {!loading && !error && images.length > 0 && (
          <>
            <div className="gallery-filters" aria-label="Filtra immagini per categoria">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={category === activeCategory ? 'is-active' : undefined}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <Image.PreviewGroup>
              <div className="gallery-groups">
                {Object.entries(groupedImages).map(([category, categoryImages]) => (
                  <section key={category} className="gallery-category">
                    <div className="gallery-category__header">
                      <h2>{category}</h2>
                      <span>{categoryImages.length} immagini</span>
                    </div>

                    <div className="gallery-grid">
                      {categoryImages.map((image, index) => (
                        <figure
                          key={image.id}
                          className={`gallery-tile ${index % 5 === 0 ? 'gallery-tile--wide' : ''}`}
                        >
                          <Image
                            src={image.url}
                            alt={image.title || 'Foto della galleria'}
                            className="gallery-tile__image"
                          />
                          <figcaption>
                            {image.title && <strong>{image.title}</strong>}
                            {image.description && <span>{image.description}</span>}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </Image.PreviewGroup>
          </>
        )}
      </section>
    </main>
  )
}
