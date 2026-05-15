import { UploadOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useState } from 'react'

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: unknown, result: CloudinaryUploadResult) => void,
      ) => { open: () => void }
    }
  }
}

interface CloudinaryUploadResult {
  event?: string
  info?: {
    secure_url?: string
  }
}

interface CloudinaryUploadButtonProps {
  onUpload: (url: string) => void
}

const widgetScriptUrl = 'https://upload-widget.cloudinary.com/global/all.js'
let scriptPromise: Promise<void> | null = null

function loadCloudinaryWidget(): Promise<void> {
  if (window.cloudinary) {
    return Promise.resolve()
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = widgetScriptUrl
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Cloudinary widget non disponibile'))
      document.body.appendChild(script)
    })
  }

  return scriptPromise
}

export default function CloudinaryUploadButton({ onUpload }: CloudinaryUploadButtonProps) {
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  const disabled = !cloudName || !uploadPreset

  const openWidget = async () => {
    if (disabled) {
      messageApi.error('Configura Cloudinary nelle variabili ambiente')
      return
    }

    setLoading(true)
    try {
      await loadCloudinaryWidget()
      const widget = window.cloudinary?.createUploadWidget(
        {
          cloudName,
          uploadPreset,
          sources: ['local', 'url', 'camera'],
          multiple: false,
          resourceType: 'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
          maxFileSize: 5000000,
        },
        (error, result) => {
          if (error) {
            messageApi.error('Upload non riuscito')
            return
          }

          const url = result.info?.secure_url
          if (result.event === 'success' && url) {
            onUpload(url)
            messageApi.success('Immagine caricata')
          }
        },
      )
      widget?.open()
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Upload non disponibile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <Button icon={<UploadOutlined />} loading={loading} onClick={openWidget}>
        Carica
      </Button>
    </>
  )
}

