import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Image, Popconfirm, Space, Table, Tag, Typography, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import AdminPageHeader from '../components/AdminPageHeader'
import PlaceForm from '../components/PlaceForm'
import { useCrudResource } from '../hooks/useCrudResource'
import { placesRepository } from '../services/adminRepositories'
import type { PlaceAdmin } from '../types'

const formId = 'place-admin-form'

export default function PlacesAdminPage() {
  const { items, loading, createItem, updateItem, deleteItem } = useCrudResource(placesRepository)
  const [editingPlace, setEditingPlace] = useState<PlaceAdmin | undefined>()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditingPlace(undefined)
  }

  const handleSubmit = async (values: PlaceAdmin) => {
    if (editingPlace) {
      await updateItem(editingPlace.id, values)
      messageApi.success('Luogo aggiornato')
    } else {
      await createItem(values)
      messageApi.success('Luogo creato')
    }
    closeDrawer()
  }

  const columns: ColumnsType<PlaceAdmin> = [
    {
      title: 'Luogo',
      dataIndex: 'nome',
      render: (value: string, record) => (
        <Space>
          <Image src={record.immagine} alt={record.nome} width={64} height={44} preview={false} className="admin-thumb" />
          <Space direction="vertical" size={0}>
            <Typography.Text strong>{value}</Typography.Text>
            <Typography.Text type="secondary">{record.indirizzo}</Typography.Text>
          </Space>
        </Space>
      ),
    },
    { title: 'Categoria', dataIndex: 'categoria', render: (value: string) => <Tag color="blue">{value}</Tag> },
    { title: 'Distanza', dataIndex: 'distanzaKm', render: (value: number) => `${value} km` },
    { title: 'Stato', dataIndex: 'attivo', render: (value: boolean) => <Tag color={value ? 'green' : 'default'}>{value ? 'Attivo' : 'Non attivo'}</Tag> },
    {
      title: 'Azioni',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => { setEditingPlace(record); setDrawerOpen(true) }}>Modifica</Button>
          <Popconfirm
            title="Eliminare questo luogo?"
            okText="Elimina"
            cancelText="Annulla"
            onConfirm={async () => {
              await deleteItem(record.id)
              messageApi.success('Luogo eliminato')
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
        title="Luoghi da vedere"
        subtitle="Gestisci i contenuti turistici da mostrare agli ospiti."
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>Nuovo luogo</Button>}
      />
      <Table rowKey="id" loading={loading} columns={columns} dataSource={items} scroll={{ x: 900 }} />
      <Drawer
        title={editingPlace ? 'Modifica luogo' : 'Nuovo luogo'}
        open={drawerOpen}
        onClose={closeDrawer}
        width={520}
        destroyOnHidden
        extra={<Button type="primary" htmlType="submit" form={formId}>Salva</Button>}
      >
        <PlaceForm formId={formId} initialValues={editingPlace} onSubmit={handleSubmit} />
      </Drawer>
    </Space>
  )
}
