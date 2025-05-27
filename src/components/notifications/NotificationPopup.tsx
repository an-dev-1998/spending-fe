import React from 'react';
import { Popover, List, Badge, Typography, Space, Button } from 'antd';
import { BellOutlined, ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationPopupProps {
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onRefresh?: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  notifications,
  onNotificationClick,
  onRefresh,
}) => {
  const { t } = useTranslation();
  const unreadCount = notifications.filter(n => !n.read).length;

  const content = (
    <List
      style={{ width: 300, maxHeight: 400, overflow: 'auto' }}
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item
          onClick={() => onNotificationClick?.(item)}
          style={{
            cursor: 'pointer',
            backgroundColor: item.read ? 'transparent' : '#f0f7ff',
            padding: '8px 12px',
            borderRadius: '4px',
          }}
        >
          <List.Item.Meta
            title={
              <Space>
                {!item.read && <Badge status="processing" />}
                <Typography.Text strong>{item.title}</Typography.Text>
              </Space>
            }
            description={
              <Space direction="vertical" size={0}>
                <Typography.Text type="secondary">{item.message}</Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                  {item.timestamp}
                </Typography.Text>
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );

  const title = (
    <Space style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>{t('notification.title')}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Button style={{ borderRadius: '32px' }}>{t('notification.markAllAsRead')}</Button>
        <Button
          type="text"
          icon={<ReloadOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onRefresh?.();
          }}
          size="small"
        />
      </div>
    </Space>
  );

  return (
    <Popover
      content={content}
      title={title}
      trigger="click"
      placement="bottomRight"
    >
      <Badge count={unreadCount} offset={[-2, 2]}>
        <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
      </Badge>
    </Popover>
  );
};

export default NotificationPopup;
