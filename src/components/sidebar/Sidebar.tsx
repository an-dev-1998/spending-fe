import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
  MoneyCollectOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import './slide.css';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../store/userStore';
const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const role = useUserStore((state) => state.role);
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: t('dashboard.title'),
      icon: <DashboardOutlined />,
    },
    {
      key: 'spending',
      label: t('spending.title'),
      icon: <MoneyCollectOutlined />
    },
    {
      key: 'category',
      label: t('category.title'),
      icon: <UnorderedListOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'setting',
      label: t('settings.title'),
      icon: <SettingOutlined />,
    },
    ...(role === 1 ? [
      {
        key: 'analytics',
        label: t('analytics.title'),
        icon: <BarChartOutlined />,
      },
      {
        key: 'user',
        label: t('user.title'),
        icon: <UserOutlined />,
      }
    ] : []),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
      trigger={
        collapsed ? <Button shape="circle"><CaretRightOutlined /></Button> : <Button shape="circle"><CaretLeftOutlined /></Button>
      }
    >
      <Menu
        theme="light"
        defaultSelectedKeys={['dashboard']}
        mode="inline"
        items={items}
        onClick={onClick}
        style={{
          padding: '16px 0',
        }}
      />
    </Sider>
  );
};

export default Sidebar;
