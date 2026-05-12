import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Drawer, Empty, Form, Image, Input, Modal, Select, Space, Tag, Upload, message } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { useMemo, useState } from 'react'
import AdminPageHeader from '../components/AdminPageHeader'
import cameraAmbra from '../../assets/img/camera_ambra.png'
import cameraTopazio from '../../assets/img/camera_topazio.png'
import etnaImage from '../../assets/img/01_ETNA.jpg'
import siciliaImage from '../../assets/img/sicilia_1.jpg'

type GalleryRelation = 'camera' | 'luogo'

interface GalleryImage {
  id: string
  url: string
  title?: string
  relatedTo?: GalleryRelation
}

interface GalleryFormValues {
  title?: string
  relatedTo?: GalleryRelation
}

const formId = 'gallery-image-form'

const relationLabels: Record<GalleryRelation, string> = {
  camera: 'Camera',
  luogo: 'Luogo da vedere',
}

const initialGalleryImages: GalleryImage[] = [
  {
    id: 'gallery-ambra',
    url: cameraAmbra,
    title: 'Camera Ambra',
    relatedTo: 'camera',
  },
  {
    id: 'gallery-topazio',
    url: cameraTopazio,
    title: 'Camera Topazio',
    relatedTo: 'camera',
  },
  {
    id: 'gallery-etna',
    url: etnaImage,
    title: 'Escursione Etna',
    relatedTo: 'luogo',
  },
  {
    id: 'gallery-sicilia',
    url: siciliaImage,
    title: 'Sicilia',
  },
]

const createImageId = () => `gallery-${crypto.randomUUID()}`

const getBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(initialGalleryImages)
  const [editingImage, setEditingImage] = useState<GalleryImage | undefined>()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>()
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm<GalleryFormValues>()
  const [messageApi, contextHolder] = message.useMessage()
  const [modalApi, modalContextHolder] = Modal.useModal()

  const isEditing = Boolean(editingImage)

  const uploadProps: UploadProps = useMemo(
    () => ({
      accept: 'image/*',
      beforeUpload: async (file) => {
        const preview = await getBase64(file)
        setPreviewUrl(preview)
        setUploadFileList([
          {
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: preview,
          },
        ])
        return Upload.LIST_IGNORE
      },
      fileList: uploadFileList,
      maxCount: 1,
      onRemove: () => {
        setPreviewUrl(undefined)
        setUploadFileList([])
      },
    }),
    [uploadFileList],
  )

  const openCreateDrawer = () => {
    setEditingImage(undefined)
    setPreviewUrl(undefined)
    setUploadFileList([])
    form.resetFields()
    setDrawerOpen(true)
  }

  const openEditDrawer = (image: GalleryImage) => {
    setEditingImage(image)
    setPreviewUrl(image.url)
    setUploadFileList([
      {
        uid: image.id,
        name: image.title || 'immagine',
        status: 'done',
        url: image.url,
      },
    ])
    form.setFieldsValue({
      title: image.title,
      relatedTo: image.relatedTo,
    })
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditingImage(undefined)
    setPreviewUrl(undefined)
    setUploadFileList([])
    form.resetFields()
  }

  const handleSubmit = (values: GalleryFormValues) => {
    if (!previewUrl) {
      messageApi.warning('Seleziona una immagine prima di salvare')
      return
    }

    const nextImage: GalleryImage = {
      id: editingImage?.id ?? createImageId(),
      url: previewUrl,
      title: values.title?.trim() || undefined,
      relatedTo: values.relatedTo,
    }

    setImages((currentImages) =>
      editingImage
        ? currentImages.map((image) => (image.id === editingImage.id ? nextImage : image))
        : [nextImage, ...currentImages],
    )

    messageApi.success(editingImage ? 'Immagine aggiornata' : 'Immagine aggiunta')
    closeDrawer()
  }

  const confirmDelete = (image: GalleryImage) => {
    modalApi.confirm({
      title: 'Eliminare questa immagine?',
      content: image.title ? `L'immagine "${image.title}" verra rimossa dalla galleria.` : "L'immagine verra rimossa dalla galleria.",
      okText: 'Elimina',
      okButtonProps: { danger: true },
      cancelText: 'Annulla',
      onOk: () => {
        setImages((currentImages) => currentImages.filter((currentImage) => currentImage.id !== image.id))
        messageApi.success('Immagine eliminata')
      },
    })
  }

  return (
    <Space direction="vertical" size={24} className="admin-page">
      {contextHolder}
      {modalContextHolder}
      <AdminPageHeader
        title="Galleria immagini"
        subtitle="Carica, modifica e organizza le immagini del sito."
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateDrawer}>
            Nuova immagine
          </Button>
        }
      />

      {images.length > 0 ? (
        <div className="admin-gallery-grid">
          {images.map((image) => (
            <Card
              key={image.id}
              className="admin-gallery-card"
              cover={<Image src={image.url} alt={image.title || 'Immagine galleria'} className="admin-gallery-image" />}
              actions={[
                <Button type="text" icon={<EditOutlined />} onClick={() => openEditDrawer(image)}>
                  Modifica
                </Button>,
                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => confirmDelete(image)}>
                  Elimina
                </Button>,
              ]}
            >
              <Card.Meta
                title={image.title || 'Senza titolo'}
                description={image.relatedTo ? <Tag color="green">{relationLabels[image.relatedTo]}</Tag> : <Tag>Nessun collegamento</Tag>}
              />
            </Card>
          ))}
        </div>
      ) : (
        <Empty description="Nessuna immagine caricata" />
      )}

      <Drawer
        title={isEditing ? 'Modifica immagine' : 'Nuova immagine'}
        open={drawerOpen}
        onClose={closeDrawer}
        width={520}
        destroyOnHidden
        extra={
          <Button type="primary" htmlType="submit" form={formId}>
            Salva
          </Button>
        }
      >
        <Form id={formId} form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Immagine">
            <Upload {...uploadProps} listType="picture-card">
              {uploadFileList.length >= 1 ? null : (
                <button type="button" className="admin-upload-button">
                  <UploadOutlined />
                  <span>Carica</span>
                </button>
              )}
            </Upload>
          </Form.Item>

          {previewUrl && (
            <Form.Item label="Anteprima">
              <Image src={previewUrl} alt="Anteprima immagine" className="admin-gallery-preview" />
            </Form.Item>
          )}

          <Form.Item label="Titolo" name="title">
            <Input placeholder="Es. Camera Ambra" maxLength={80} showCount />
          </Form.Item>

          <Form.Item label="Collegamento futuro" name="relatedTo">
            <Select
              allowClear
              placeholder="Seleziona una destinazione"
              options={[
                { value: 'camera', label: 'Camera' },
                { value: 'luogo', label: 'Luogo da vedere' },
              ]}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </Space>
  )
}
