import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Image, Popconfirm, Space, Table, Tag, Typography, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import AdminPageHeader from '../components/AdminPageHeader'
import RoomForm from '../components/RoomForm'
import { useCrudResource } from '../hooks/useCrudResource'
import { roomsRepository } from '../services/adminRepositories'
import type { RoomAdmin } from '../types'

const formId = 'room-admin-form'

export default function RoomsPage() {
  const { items, loading, createItem, updateItem, deleteItem } = useCrudResource(roomsRepository)
  const [editingRoom, setEditingRoom] = useState<RoomAdmin | undefined>()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditingRoom(undefined)
  }

  const handleSubmit = async (values: RoomAdmin) => {
    if (editingRoom) {
      await updateItem(editingRoom.id, values)
      messageApi.success('Camera aggiornata')
    } else {
      await createItem(values)
      messageApi.success('Camera creata')
    }
    closeDrawer()
  }

  const columns: ColumnsType<RoomAdmin> = [
    {
      title: 'Camera',
      dataIndex: 'nome',
      render: (value: string, record) => (
        <Space>
          <Image src={record.immagineCopertina} alt={record.nome} width={64} height={44} preview={false} className="admin-thumb" />
          <Space direction="vertical" size={0}>
            <Typography.Text strong>{value}</Typography.Text>
            <Typography.Text type="secondary">{record.id}</Typography.Text>
          </Space>
        </Space>
      ),
    },
    { title: 'Prezzo base', dataIndex: 'prezzoBase', render: (value: number) => `${value} EUR` },
    { title: 'Capienza', dataIndex: 'capienza', render: (value: number) => `${value} ospiti` },
    {
      title: 'Servizi',
      dataIndex: 'servizi',
      render: (servizi: string[]) => servizi.slice(0, 3).map((servizio) => <Tag key={servizio}>{servizio}</Tag>),
    },
    { title: 'Stato', dataIndex: 'attiva', render: (value: boolean) => <Tag color={value ? 'green' : 'default'}>{value ? 'Attiva' : 'Non attiva'}</Tag> },
    {
      title: 'Azioni',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => { setEditingRoom(record); setDrawerOpen(true) }}>Modifica</Button>
          <Popconfirm
            title="Eliminare questa camera?"
            okText="Elimina"
            cancelText="Annulla"
            onConfirm={async () => {
              await deleteItem(record.id)
              messageApi.success('Camera eliminata')
            }}
          >
            <Button danger icon={<DeleteOutlined />}>Elimina</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Space direction="vertical" size={24} className="admin-page">
      {contextHolder}
      <AdminPageHeader
        title="Camere"
        subtitle="Crea, modifica e organizza le camere disponibili nel B&B."
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>Nuova camera</Button>}
      />
      <Table rowKey="id" loading={loading} columns={columns} dataSource={items} scroll={{ x: 980 }} />
      <Drawer
        title={editingRoom ? 'Modifica camera' : 'Nuova camera'}
        open={drawerOpen}
        onClose={closeDrawer}
        width={520}
        destroyOnHidden
        extra={<Button type="primary" htmlType="submit" form={formId}>Salva</Button>}
      >
        <RoomForm formId={formId} initialValues={editingRoom} onSubmit={handleSubmit} />
      </Drawer>
    </Space>
  )
}
