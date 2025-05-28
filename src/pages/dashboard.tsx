import { Col, DatePicker, Tag } from 'antd';
import { Card } from 'antd';
import { Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetDashboards } from '../hooks/use-hook-get-dashboards';
import { CURRENCY } from '../constans';
import { useGetSpendingByDate } from '../hooks/use-hook-get-spending-by-date';
import '../assets/card-custom.css';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, error } = useGetDashboards();
  const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  const [date, setDate] = useState<string>('');

  const { loading: loadingSpendingByDate, data: dataSpendingByDate, refetch: refetchSpendingByDate } = useGetSpendingByDate({ date });

  useEffect(() => {
    refetchSpendingByDate();
  }, [date]);

  const handleDateChange = (date: any) => {
    if (date) {
      console.log(date.format('YYYY-MM-DD'));
      setDate(date.format('YYYY-MM-DD'));
    } else {
      setDate('');
    }
  };

  const today = dataSpendingByDate?.today?.date;
  const todayAmount = dataSpendingByDate?.today?.amount;
  const yesterday = dataSpendingByDate?.yesterday?.date;
  const yesterdayAmount = dataSpendingByDate?.yesterday?.amount;
  const differenceAmount = dataSpendingByDate?.difference?.amount;
  const differencePercentage = dataSpendingByDate?.difference?.percentage;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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
      <Row gutter={[24, 16]} style={{ padding: 16, border: "1px solid #E6E8EB", borderRadius: 16, marginLeft: 0, marginRight: 0, justifyContent: 'space-between' }}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <DatePicker onChange={handleDateChange} />
        </div>
        <Col xs={24} sm={12}>
          <Card style={{ borderRadius: 16 }} title={`${t('dashboard.chooseDate')}: ${today}`} variant="borderless" loading={loadingSpendingByDate}>
            <Tag color="green" style={{ borderRadius: 32 }}>{formatCurrency(todayAmount || 0)} {CURRENCY}</Tag>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card style={{ borderRadius: 16 }} title={`${t('dashboard.beforeDate')}: ${yesterday}`} variant="borderless" loading={loadingSpendingByDate}>
            <Tag color="red" style={{ borderRadius: 32 }}>{formatCurrency(yesterdayAmount || 0)} {CURRENCY}</Tag>
          </Card>
        </Col>
        <Col xs={24} sm={24}>
          <Card style={{ borderRadius: 16 }} className="card-custom" title={`${t('dashboard.difference')}`} variant="borderless" loading={loadingSpendingByDate}>
            <div>
              <span>{t('dashboard.status')}: </span>
              <Tag color={(todayAmount || 0) < (yesterdayAmount || 0) ? "lime" : "volcano"} style={{ borderRadius: 32 }}>
                {(todayAmount || 0) < (yesterdayAmount || 0) ? t('dashboard.save') : t('dashboard.overuse')}
              </Tag>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <span>{t('dashboard.differenceAmount')}: </span>
                <Tag color="magenta" style={{ borderRadius: 32 }}>{formatCurrency(differenceAmount || 0)} {CURRENCY}</Tag>
              </div>
              <div>
                <span>{t('dashboard.differencePercentage')}: </span>
                <Tag color="purple" style={{ borderRadius: 32 }}>{differencePercentage}%</Tag>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
