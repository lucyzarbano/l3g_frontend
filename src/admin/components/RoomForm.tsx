import { Form, Input, InputNumber, Select, Switch } from 'antd'
import type { RoomAdmin } from '../types'

interface RoomFormProps {
  formId: string
  initialValues?: RoomAdmin
  onSubmit: (values: RoomAdmin) => void
}

const serviceOptions = ['Wifi', 'Bagno privato', 'Balcone', 'Aria condizionata', 'TV', 'Parcheggio', 'Vista citta']

export default function RoomForm({ formId, initialValues, onSubmit }: RoomFormProps) {
  return (
    <Form<RoomAdmin>
      id={formId}
      layout="vertical"
      initialValues={initialValues ?? { attiva: true, servizi: [], prezzoBase: 70, capienza: 2 }}
      onFinish={onSubmit}
    >
      <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Inserisci un ID' }]}>
        <Input placeholder="camera-ambra" disabled={Boolean(initialValues)} />
      </Form.Item>
      <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Inserisci il nome' }]}>
        <Input placeholder="Camera Ambra" />
      </Form.Item>
      <Form.Item label="Descrizione" name="descrizione" rules={[{ required: true, message: 'Inserisci una descrizione' }]}>
        <Input.TextArea rows={4} placeholder="Descrizione breve della camera" />
      </Form.Item>
      <div className="admin-form-grid">
        <Form.Item label="Prezzo base" name="prezzoBase" rules={[{ required: true, message: 'Inserisci il prezzo' }]}>
          <InputNumber min={0} addonAfter="EUR" />
        </Form.Item>
        <Form.Item label="Capienza" name="capienza" rules={[{ required: true, message: 'Inserisci la capienza' }]}>
          <InputNumber min={1} addonAfter="ospiti" />
        </Form.Item>
      </div>
      <Form.Item label="Immagine copertina" name="immagineCopertina" rules={[{ required: true, message: 'Inserisci un percorso immagine' }]}>
        <Input placeholder="/src/assets/img/camera_ambra.png" />
      </Form.Item>
      <Form.Item label="Servizi" name="servizi">
        <Select mode="tags" options={serviceOptions.map((value) => ({ value }))} placeholder="Aggiungi servizi" />
      </Form.Item>
      <Form.Item label="Attiva" name="attiva" valuePropName="checked">
        <Switch checkedChildren="Si" unCheckedChildren="No" />
      </Form.Item>
    </Form>
  )
}
