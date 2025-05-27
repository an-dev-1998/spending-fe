import React from 'react';
import { Layout, Typography, Space, Avatar, Dropdown, Tag } from 'antd';
import { MoneyCollectTwoTone, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import LanguageSwitcher from '../common/LanguageSwitch';
import { useUserStore } from '../../store/userStore';
import NotificationPopup from '../notifications/NotificationPopup';
import { useGetNotifications, Notification } from '../../hooks/use-hook-get-notifications';

const { Header } = Layout;
const { Title } = Typography;

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
  const name = useUserStore((state) => state.name);
  const role = useUserStore((state) => state.role);
  const { notifications, markAsRead, refetch, markAllAsRead } = useGetNotifications();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('token');
      clearRole();
      clearName();
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
      <Title level={4} style={{ margin: 0 }}><MoneyCollectTwoTone /></Title>
      <Space size="middle">
        <NotificationPopup 
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
          onRefresh={refetch}
          onMarkAllAsRead={markAllAsRead}
        />
        <LanguageSwitcher />
        <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar src="" icon={<UserOutlined />} />
            <span>{name}</span>
            {role === 1 ? <Tag color="red">Admin</Tag> : <Tag color="blue">User</Tag>}
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderComponent; 