import { Space, Typography } from 'antd'
import type { ReactNode } from 'react'

interface AdminPageHeaderProps {
  title: string
  subtitle: string
  extra?: ReactNode
}

export default function AdminPageHeader({ title, subtitle, extra }: AdminPageHeaderProps) {
  return (
    <div className="admin-page-header">
      <Space direction="vertical" size={4}>
        <Typography.Title level={2}>{title}</Typography.Title>
        <Typography.Text type="secondary">{subtitle}</Typography.Text>
      </Space>
      {extra}
    </div>
  )
}
