import { useCallback } from 'react'
import PublicPageHeader from '../components/common/PublicPageHeader'
import RoomItem from '../components/room/RoomItem'
import RoomItemV2 from '../components/room/RoomItemV2'
import { rooms } from '../data/rooms'
import { useAsyncFallback } from '../hooks/useAsyncFallback'
import { contentApi } from '../services/contentApi'

export default function Camere() {
  const loadRooms = useCallback(() => contentApi.listRooms(), [])
  const { data } = useAsyncFallback(rooms, loadRooms)

  return (
    <div className="page page--camere">
      <PublicPageHeader
        eyebrow="Soggiorna da noi"
        title="Le nostre camere"
        intro="Esplora camere accoglienti, curate nei dettagli e pensate per un soggiorno rilassante."
      />

      <div className="page__content">
        <div className="rooms_list">
          <div className="rooms_list_item">
            {data.map((elem) => (
              <RoomItemV2
                key={elem.id}
                id={elem.id}
                src={elem.image.src}
                alt={elem.image.alt}
                title={elem.title}
                description={elem.description}
                reverse={elem.reverse}
                services={elem.services_base}
                badges={elem.badges}
                rate={elem.rate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CamereOriung() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Camere</h1>
      <p>Scopri le nostre camere accoglienti.</p>
      <div className="rooms_list">
        <div className="rooms_list_item">
          {rooms.map((elem) => (
            <RoomItem key={elem.id} src={elem.image.src} alt={elem.image.alt} />
          ))}
        </div>
      </div>
    </div>
  )
}
