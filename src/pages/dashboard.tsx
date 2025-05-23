import { Col, Tag } from 'antd';
import { Card } from 'antd';
import { Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetDashboards } from '../hooks/use-hook-get-dashboards';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, error } = useGetDashboards();

  return (
    <>
      <h2>
        {t('dashboard.title')}
      </h2>
      {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card style={{ borderRadius: 16 }} title={t('dashboard.totalIncome')} variant="borderless" loading={loading}>
            <Tag color="green">$ {data.totalIncome}</Tag>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ borderRadius: 16 }} title={t('dashboard.totalSpending')} variant="borderless" loading={loading}>
            <Tag color="red">$ {data.totalSpending}</Tag>
          </Card>
        </Col>
        <Col span={24}>
          <Card style={{ borderRadius: 16 }} title={t('dashboard.totalBalance')} variant="borderless" loading={loading}>
            <Tag color="blue">$ {data.totalBalance}</Tag>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
