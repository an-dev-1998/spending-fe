import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { GithubOutlined, FacebookOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
const { Footer } = Layout;
const { Text, Link } = Typography;

const FooterComponent: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <Footer
      style={{
        background: '#fff',
        padding: '24px 50px',
        borderTop: '1px solid #f0f0f0',
      }}
    >
      <Row gutter={[32, 24]} justify="space-between" align="middle">
        <Col xs={24} sm={12} md={8}>
          <Space direction="vertical" size="small">
            <Text strong>{t('footer.spendingTracker')}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {t('footer.trackYourExpensesAndIncome')}
            </Text>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Space direction="vertical" size="small" style={{ color: 'red', alignItems: 'center' }}>
            <Text strong>{t('footer.quickLinks')}</Text>
            <Space split="|">
              <Link href="/income">{t('footer.income')}</Link>
              <Link href="/spending">{t('footer.spending')}</Link>
              <Link href="/setting">{t('footer.setting')}</Link>
            </Space>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Space direction="vertical" size="small">
            <Text strong>{t('footer.connect')}</Text>
            <Space size="middle">
              <Link href="https://github.com/an-dev-1998" target="_blank">
                <GithubOutlined style={{ fontSize: '20px' }} />
              </Link>
              <Link href="https://www.facebook.com/IT.1611061291/" target="_blank">
                <FacebookOutlined style={{ fontSize: '20px' }} />
              </Link>
            </Space>
          </Space>
        </Col>
      </Row>

      <Row
        justify="center"
        style={{ marginTop: '24px', justifyContent: 'end', textDecoration: 'underline' }}
      >
        <Col>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {t('footer.madeWithLove', { year: currentYear })}
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
