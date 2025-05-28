import React from 'react';
import { Layout, Space, Avatar, Dropdown, Tag, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import LanguageSwitcher from '../common/LanguageSwitch';
import { useUserStore } from '../../store/userStore';
import NotificationPopup from '../notifications/NotificationPopup';
import { useGetNotifications, Notification } from '../../hooks/use-hook-get-notifications';

const { Header } = Layout;

const userMenuItems: MenuProps['items'] = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: 'Profile',
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    label: 'Logout',
  },
];

const HeaderComponent: React.FC = () => {
  const clearRole = useUserStore((state) => state.clearRole);
  const clearName = useUserStore((state) => state.clearName);
  const clearImageUrl = useUserStore((state) => state.clearImageUrl);
  const name = useUserStore((state) => state.name);
  const role = useUserStore((state) => state.role);
  const image_url = useUserStore((state) => state.image_url);
  const { notifications, markAsRead, refetch, markAllAsRead } = useGetNotifications();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('token');
      clearRole();
      clearName();
      clearImageUrl();
      window.location.href = '/login';
    }
    if (key === 'profile') {
      window.location.href = '/account';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
  };

  return (
    <Header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#fff',
      padding: '0 24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundImage: 'linear-gradient(45deg, pink, transparent)'
    }}>
      <Image
        width={48}
        src="/spending-logo.png"
      />
      <Space size="middle" style={{ overflow: 'hidden' }}>
        <NotificationPopup
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
          onRefresh={refetch}
          onMarkAllAsRead={markAllAsRead}
        />
        <LanguageSwitcher />
        <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar src={image_url} icon={<UserOutlined />} />
            <span>{name}</span>
            {role === 1 ? <Tag color="red">Admin</Tag> : <Tag color="blue">Customer</Tag>}
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderComponent; 