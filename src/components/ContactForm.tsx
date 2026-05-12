import { useState } from 'react'
import { Button, Col, Form, Input, Row, message } from 'antd'

const { TextArea } = Input

const ContactForm = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: unknown) => {
    console.log('Dati inviati:', values)

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      message.success('Messaggio inviato con successo!')
      form.resetFields()
    } catch {
      message.error("Errore durante l'invio.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} className="contact-form">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item name="name" rules={[{ required: true, message: 'Inserisci il tuo nome' }]}>
            <Input size="large" placeholder="Nome" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item name="surname" rules={[{ required: true, message: 'Inserisci il tuo cognome' }]}>
            <Input size="large" placeholder="Cognome" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Inserisci la tua email' },
          { type: 'email', message: 'Email non valida' },
        ]}
      >
        <Input size="large" placeholder="Email" />
      </Form.Item>

      <Form.Item name="message" rules={[{ required: true, message: 'Scrivi un messaggio' }]}>
        <TextArea rows={5} placeholder="Scrivi qui la tua richiesta..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading} className="contact-form__submit">
          Invia messaggio
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ContactForm
