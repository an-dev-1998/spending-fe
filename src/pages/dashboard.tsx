import { Col, Tag } from 'antd';
import { Card } from 'antd';
import { Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetDashboards } from '../hooks/use-hook-get-dashboards';
import { CURRENCY } from '../constans';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, error } = useGetDashboards();
  const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
    <>
      <h2>
        {t('dashboard.title')}
      </h2>
      {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <Card style={{ borderRadius: 16 }} title={t('dashboard.totalIncome')} variant="borderless" loading={loading}>
            <Tag color="green" style={{ borderRadius: 32 }}>{formatCurrency(data.totalIncome)} {CURRENCY}</Tag>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card style={{ borderRadius: 16 }} title={t('dashboard.totalSpending')} variant="borderless" loading={loading}>
            <Tag color="red" style={{ borderRadius: 32 }}>{formatCurrency(data.totalSpending)} {CURRENCY}</Tag>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card style={{ borderRadius: 16 }} title={t('dashboard.totalBalance')} variant="borderless" loading={loading}>
            <Tag color="blue" style={{ borderRadius: 32 }}>{formatCurrency(data.totalBalance)} {CURRENCY}</Tag>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card style={{ borderRadius: 16 }} title={t('dashboard.totalPerDay')} variant="borderless" loading={loading}>
            <Tag color="magenta" style={{ borderRadius: 32 }}>{formatCurrency(data.totalPerDay)} {CURRENCY}</Tag>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
