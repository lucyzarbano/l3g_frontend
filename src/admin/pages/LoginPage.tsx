import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

interface LoginFormValues {
  username: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/admin/dashboard'

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true)
    setError(null)

    try {
      await login(values)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Accesso non riuscito')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <Card className="admin-login-card">
        <Typography.Text className="admin-eyebrow">Area riservata</Typography.Text>
        <Typography.Title level={2}>Accedi al gestionale</Typography.Title>
        {error && <Alert type="error" message={error} showIcon />}
        <Form<LoginFormValues> layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Inserisci lo username' }]}>
            <Input prefix={<UserOutlined />} autoComplete="username" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Inserisci la password' }]}>
            <Input.Password prefix={<LockOutlined />} autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Accedi
          </Button>
        </Form>
      </Card>
    </div>
  )
}

