import { Form, Input, InputNumber, Select, Switch } from 'antd'
import type { PlaceAdmin } from '../types'
import CloudinaryUploadButton from './CloudinaryUploadButton'

interface PlaceFormProps {
  formId: string
  initialValues?: PlaceAdmin
  onSubmit: (values: PlaceAdmin) => void
}

const categoryOptions = ['Natura', 'Cultura', 'Mare', 'Esperienze', 'Centro storico']

export default function PlaceForm({ formId, initialValues, onSubmit }: PlaceFormProps) {
  const [form] = Form.useForm<PlaceAdmin>()

  return (
    <Form<PlaceAdmin>
      form={form}
      id={formId}
      layout="vertical"
      initialValues={initialValues ?? { attivo: true, categoria: 'Natura', distanzaKm: 1 }}
      onFinish={onSubmit}
    >
      <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Inserisci un ID' }]}>
        <Input placeholder="etna" disabled={Boolean(initialValues)} />
      </Form.Item>
      <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Inserisci il nome' }]}>
        <Input placeholder="Etna" />
      </Form.Item>
      <Form.Item label="Descrizione" name="descrizione" rules={[{ required: true, message: 'Inserisci una descrizione' }]}>
        <Input.TextArea rows={4} placeholder="Descrizione breve del luogo" />
      </Form.Item>
      <Form.Item label="Indirizzo" name="indirizzo" rules={[{ required: true, message: 'Inserisci un indirizzo' }]}>
        <Input placeholder="Piazza Duomo, Lentini" />
      </Form.Item>
      <div className="admin-form-grid">
        <Form.Item label="Distanza" name="distanzaKm" rules={[{ required: true, message: 'Inserisci la distanza' }]}>
          <InputNumber min={0} step={0.1} addonAfter="km" />
        </Form.Item>
        <Form.Item label="Categoria" name="categoria" rules={[{ required: true, message: 'Scegli una categoria' }]}>
          <Select options={categoryOptions.map((value) => ({ value }))} />
        </Form.Item>
      </div>
      <Form.Item label="Immagine" required>
        <Input.Group compact>
          <Form.Item name="immagine" noStyle rules={[{ required: true, message: 'Inserisci un percorso immagine' }]}>
            <Input placeholder="https://res.cloudinary.com/..." style={{ width: 'calc(100% - 96px)' }} />
          </Form.Item>
          <CloudinaryUploadButton onUpload={(url) => form.setFieldValue('immagine', url)} />
        </Input.Group>
      </Form.Item>
      <Form.Item label="Attivo" name="attivo" valuePropName="checked">
        <Switch checkedChildren="Si" unCheckedChildren="No" />
      </Form.Item>
    </Form>
  )
}
