import cameraAmbra from '../assets/img/camera_ambra.png'
import cameraTopazio from '../assets/img/camera_topazio.png'
import cameraZaffiro from '../assets/img/camera_zaffiro.jpeg'
import etnaImage from '../assets/img/01_ETNA.jpg'
import lagoLentiniImage from '../assets/img/01_LAGO_LENTINI.jpg'
import siciliaImage from '../assets/img/sicilia_1.jpg'
import siciliaDetailImage from '../assets/img/sicilia_3.jpg'
import chiesaMadreImage from '../assets/img/01_CHIESA_MADRE.jpg'

export type GalleryImage = {
  id: string
  url: string
  category: string
  title?: string
  description?: string
}

const galleryEndpoint = '/api/gallery'
const useMockGallery = true

const mockGalleryImages: GalleryImage[] = [
  {
    id: 'camera-ambra',
    url: cameraAmbra,
    category: 'Camere',
    title: 'Camera Ambra',
    description: 'Toni caldi, dettagli luminosi e un riposo tranquillo.',
  },
  {
    id: 'camera-topazio',
    url: cameraTopazio,
    category: 'Camere',
    title: 'Camera Topazio',
    description: 'Una camera accogliente pensata per soggiorni rilassati.',
  },
  {
    id: 'camera-zaffiro',
    url: cameraZaffiro,
    category: 'Camere',
    title: 'Camera Zaffiro',
    description: 'Atmosfera fresca, linee semplici e comfort quotidiano.',
  },
  {
    id: 'etna',
    url: etnaImage,
    category: 'Dintorni',
    title: 'Etna',
    description: 'Una meta speciale per scoprire la Sicilia da vicino.',
  },
  {
    id: 'lago-lentini',
    url: lagoLentiniImage,
    category: 'Dintorni',
    title: 'Lago di Lentini',
    description: 'Una pausa lenta tra acqua, natura e silenzi aperti.',
  },
  {
    id: 'chiesa-madre',
    url: chiesaMadreImage,
    category: 'Dintorni',
    title: 'Chiesa Madre',
    description: 'Storia, pietra chiara e dettagli del centro di Lentini.',
  },
  {
    id: 'sicilia',
    url: siciliaImage,
    category: 'Sicilia',
    title: 'Dettagli di Sicilia',
    description: 'Colori, luce e piccoli scorci da vivere durante il soggiorno.',
  },
  {
    id: 'sicilia-luce',
    url: siciliaDetailImage,
    category: 'Sicilia',
    title: 'Luce siciliana',
    description: 'Paesaggi e atmosfere da portare con se dopo il viaggio.',
  },
]

export async function getImages(signal?: AbortSignal): Promise<GalleryImage[]> {
  if (useMockGallery) {
    return Promise.resolve(mockGalleryImages)
  }

  const response = await fetch(galleryEndpoint, { signal })

  if (!response.ok) {
    throw new Error('Impossibile caricare la galleria')
  }

  return response.json() as Promise<GalleryImage[]>
}
