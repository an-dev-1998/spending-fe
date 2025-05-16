import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import {
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;
const { Text, Link } = Typography;

const FooterComponent: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer style={{ 
      background: '#fff',
      padding: '24px 50px',
      borderTop: '1px solid #f0f0f0',
    }}>
      <Row gutter={[32, 24]} justify="space-between" align="middle">
        <Col xs={24} sm={12} md={8}>
          <Space direction="vertical" size="small">
            <Text strong>Spending Tracker</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Track your expenses and income with ease
            </Text>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Space direction="vertical" size="small">
            <Text strong>Quick Links</Text>
            <Space split="|">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/analytics">Analytics</Link>
              <Link href="/reports">Reports</Link>
              <Link href="/settings">Settings</Link>
            </Space>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Space direction="vertical" size="small">
            <Text strong>Connect</Text>
            <Space size="middle">
              <Link href="https://github.com" target="_blank">
                <GithubOutlined style={{ fontSize: '20px' }} />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <TwitterOutlined style={{ fontSize: '20px' }} />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <LinkedinOutlined style={{ fontSize: '20px' }} />
              </Link>
            </Space>
          </Space>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: '24px' }}>
        <Col>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Made with <HeartOutlined style={{ color: '#ff4d4f' }} /> © {currentYear} Spending Tracker
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent; 