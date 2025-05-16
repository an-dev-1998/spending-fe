import React, { useState } from 'react';
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

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    {
      key: 'analytics',
      label: t('analytics.title'),
      icon: <BarChartOutlined />,
    },
    {
      key: 'user',
      label: t('user.title'),
      icon: <UserOutlined />,
    },
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
