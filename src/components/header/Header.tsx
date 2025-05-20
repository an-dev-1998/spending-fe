import React from 'react';
import { Layout, Button, Typography, Space, Avatar, Dropdown, Tag } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import LanguageSwitcher from '../common/LanguageSwitch';
import { useUserStore } from '../../store/userStore';
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
  const avatar = useUserStore((state) => state.avatar);
  const clearAvatar = useUserStore((state) => state.clearAvatar);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('token');
      clearRole();
      clearName();
      clearAvatar();
      window.location.href = '/login';
    }
    if (key === 'profile') {
      window.location.href = '/account';
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
            <Avatar src={avatar} icon={<UserOutlined />} />
            <span>{name}</span>
            {role === 1 ? <Tag color="red">Admin</Tag> : <Tag color="blue">User</Tag>}
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderComponent; 