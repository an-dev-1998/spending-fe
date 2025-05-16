import React from 'react';
import { Layout, Button, Typography, Space, Avatar, Dropdown } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import LanguageSwitcher from '../common/LanguageSwitch';
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
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
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
      <Title level={4} style={{ margin: 0 }}>Spending</Title>
      <Space size="middle">
        <Button type="text" icon={<BellOutlined />} />
        <LanguageSwitcher />
        <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} />
            <span>John Doe</span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderComponent; 