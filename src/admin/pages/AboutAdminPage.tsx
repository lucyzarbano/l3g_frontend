import { Button, Form, Input, Space, message } from 'antd'
import { useEffect, useState } from 'react'
import AdminPageHeader from '../components/AdminPageHeader'
import { aboutRepository } from '../services/aboutRepository'
import type { AboutAdmin } from '../types'

interface AboutFormValues {
  id: string
  eyebrow: string
  title: string
  paragraphsText: string
  imageOneSrc: string
  imageOneAlt: string
  imageTwoSrc: string
  imageTwoAlt: string
}

const toFormValues = (about: AboutAdmin): AboutFormValues => ({
  id: about.id,
  eyebrow: about.eyebrow,
  title: about.title,
  paragraphsText: about.paragraphs.join('\n\n'),
  imageOneSrc: about.images[0]?.src ?? '',
  imageOneAlt: about.images[0]?.alt ?? '',
  imageTwoSrc: about.images[1]?.src ?? '',
  imageTwoAlt: about.images[1]?.alt ?? '',
})

const toPayload = (values: AboutFormValues): AboutAdmin => ({
  id: values.id,
  eyebrow: values.eyebrow,
  title: values.title,
  paragraphs: values.paragraphsText
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean),
  images: [
    { src: values.imageOneSrc, alt: values.imageOneAlt, className: 'img_1' },
    { src: values.imageTwoSrc, alt: values.imageTwoAlt, className: 'img_2' },
  ].filter((image) => image.src),
})

export default function AboutAdminPage() {
  const [form] = Form.useForm<AboutFormValues>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const about = await aboutRepository.get()
        form.setFieldsValue(toFormValues(about))
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [form])

  const handleSubmit = async (values: AboutFormValues) => {
    setSaving(true)
    try {
      const saved = await aboutRepository.update(toPayload(values))
      form.setFieldsValue(toFormValues(saved))
      messageApi.success('Chi siamo aggiornato')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Space direction="vertical" size={24} className="admin-page">
      {contextHolder}
      <AdminPageHeader
        title="Chi siamo"
        subtitle="Gestisci il testo e le immagini della sezione di presentazione."
      />

      <Form<AboutFormValues>
        form={form}
        layout="vertical"
        disabled={loading}
        initialValues={{ id: 'home-about' }}
        onFinish={handleSubmit}
      >
        <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Inserisci un ID' }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="Eyebrow" name="eyebrow" rules={[{ required: true, message: 'Inserisci il testo piccolo' }]}>
          <Input placeholder="Nel cuore di Lentini" />
        </Form.Item>
        <Form.Item label="Titolo" name="title" rules={[{ required: true, message: 'Inserisci il titolo' }]}>
          <Input placeholder="Chi Siamo" />
        </Form.Item>
        <Form.Item label="Paragrafi" name="paragraphsText" rules={[{ required: true, message: 'Inserisci almeno un paragrafo' }]}>
          <Input.TextArea rows={10} placeholder="Separa i paragrafi con una riga vuota" />
        </Form.Item>

        <div className="admin-form-grid">
          <Form.Item label="Immagine 1" name="imageOneSrc">
            <Input placeholder="/src/assets/img/chi-siamo_1.jpg" />
          </Form.Item>
          <Form.Item label="Alt immagine 1" name="imageOneAlt">
            <Input placeholder="Dettaglio accogliente del B&B" />
          </Form.Item>
        </div>

        <div className="admin-form-grid">
          <Form.Item label="Immagine 2" name="imageTwoSrc">
            <Input placeholder="/src/assets/img/chi-siamo_2.jpg" />
          </Form.Item>
          <Form.Item label="Alt immagine 2" name="imageTwoAlt">
            <Input placeholder="Ambiente luminoso del B&B" />
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" loading={saving}>
          Salva
        </Button>
      </Form>
    </Space>
  )
}
