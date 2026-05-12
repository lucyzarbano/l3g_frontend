import { Pagination } from 'antd'
import { useCallback, useState } from 'react'
import PublicPageHeader from '../components/common/PublicPageHeader'
import PlaceItem from '../components/place/PlaceItem'
import { places } from '../data/places'
import { useAsyncFallback } from '../hooks/useAsyncFallback'
import { contentApi } from '../services/contentApi'

export default function PlacesPage() {
  const loadPlaces = useCallback(() => contentApi.listPlaces(), [])
  const { data } = useAsyncFallback(places, loadPlaces)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 3

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPlaces = data.slice(startIndex, endIndex)

  return (
    <div className="page page--places">
      <PublicPageHeader
        eyebrow="Scopri i dintorni"
        title="Luoghi da vedere"
        intro="Vicino al nostro B&B troverai luoghi storici, scorci naturali e mete perfette per una giornata di esplorazione."
      />

      <div className="page__content">
        <div className="places-list__content">
          {currentPlaces.map((elem) => (
            <div key={elem.title} className="places-list__item">
              <PlaceItem title={elem.title} image={elem.img} description={elem.description} info={elem.info} images={elem.images} />
            </div>
          ))}
        </div>
      </div>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: '2rem', textAlign: 'center' }}
      />
    </div>
  )
}
