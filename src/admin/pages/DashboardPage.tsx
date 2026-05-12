import {
  ArrowRightOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  PlusOutlined,
  RiseOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Statistic, Table, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import AdminPageHeader from '../components/AdminPageHeader'
import { initialPlaces, initialRooms } from '../data/mockData'

export default function DashboardPage() {
  const navigate = useNavigate()
  const activeRooms = initialRooms.filter((room) => room.attiva).length
  const activePlaces = initialPlaces.filter((place) => place.attivo).length
  const averagePrice = Math.round(initialRooms.reduce((sum, room) => sum + room.prezzoBase, 0) / initialRooms.length)

  return (
    <Space direction="vertical" size={24} className="admin-page">
      <AdminPageHeader
        title="Dashboard"
        subtitle="Panoramica rapida dei contenuti principali del B&B."
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/camere')}>Nuova camera</Button>}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Camere attive" value={activeRooms} suffix={`/ ${initialRooms.length}`} prefix={<HomeOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Luoghi pubblicati" value={activePlaces} suffix={`/ ${initialPlaces.length}`} prefix={<EnvironmentOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Prezzo medio" value={averagePrice} suffix="EUR" prefix={<RiseOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="Camere in evidenza">
            <Table
              rowKey="id"
              dataSource={initialRooms}
              pagination={false}
              columns={[
                { title: 'Camera', dataIndex: 'nome' },
                { title: 'Prezzo', dataIndex: 'prezzoBase', render: (value: number) => `${value} EUR` },
                { title: 'Stato', dataIndex: 'attiva', render: (value: boolean) => <Tag color={value ? 'green' : 'default'}>{value ? 'Attiva' : 'Bozza'}</Tag> },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Azioni rapide" className="admin-actions-card">
            <Button block icon={<HomeOutlined />} onClick={() => navigate('/admin/camere')}>
              Gestisci camere <ArrowRightOutlined />
            </Button>
            <Button block icon={<EnvironmentOutlined />} onClick={() => navigate('/admin/luoghi-da-vedere')}>
              Gestisci luoghi <ArrowRightOutlined />
            </Button>
            <Typography.Text type="secondary">
              I dati sono mock locali, ma le chiamate passano gia da repository sostituibili con API REST.
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
