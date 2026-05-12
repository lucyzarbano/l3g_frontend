import {
  BankOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Layout, Menu, Space, Typography } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'

const { Header, Sider, Content } = Layout

const menuItems = [
  { key: '/admin/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/admin/camere', icon: <HomeOutlined />, label: 'Camere' },
  { key: '/admin/chi-siamo', icon: <InfoCircleOutlined />, label: 'Chi siamo' },
  { key: '/admin/luoghi-da-vedere', icon: <EnvironmentOutlined />, label: 'Luoghi da vedere' },
  { key: '/admin/galleria', icon: <PictureOutlined />, label: 'Galleria immagini' },
]

interface AdminLayoutProps {
  onLogout?: () => void
}

export default function AdminLayout({ onLogout }: AdminLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedKey = menuItems.find((item) => location.pathname.startsWith(item.key))?.key ?? '/admin/dashboard'

  const handleLogout = () => {
    logout()
    onLogout?.()
    navigate('/admin/login', { replace: true })
  }

  return (
    <Layout className="admin-shell">
      <Sider className="admin-sidebar" width={268} breakpoint="lg" collapsedWidth={76} trigger={null}>
        <div className="admin-brand">
          <BankOutlined />
          <div>
            <span>Gemma B&B</span>
            <small>Area admin</small>
          </div>
        </div>
        <Menu
          className="admin-menu"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <Button className="admin-mobile-menu" type="text" icon={<MenuUnfoldOutlined />} aria-label="Apri menu" />
          <Space direction="vertical" size={0}>
            <Typography.Text className="admin-eyebrow">Gestionale</Typography.Text>
            <Typography.Title level={4}>Contenuti e camere</Typography.Title>
          </Space>
          <Space className="admin-user">
            <Avatar>LZ</Avatar>
            <div>
              <Typography.Text strong>Admin</Typography.Text>
              <Typography.Text type="secondary">B&B manager</Typography.Text>
            </div>
            <Button type="text" icon={<LogoutOutlined />} aria-label="Esci" onClick={handleLogout} />
          </Space>
          <Button className="admin-collapse-icon" type="text" icon={<MenuFoldOutlined />} aria-label="Menu laterale" />
        </Header>
        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
