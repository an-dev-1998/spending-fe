import { Spin } from 'antd';
import { Pie } from '@ant-design/plots';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { isEqual } from 'lodash';
import { useGetAnalytics } from '../hooks/use-hook-get-analytics';

interface PieData {
  type: string;
  value: number;
}

interface DemoPieProps {
  data: PieData[];
  onReady: (params: { chart: any }) => void;
}

const DemoPie = memo<DemoPieProps>(
  ({ data, onReady }) => {
    const config = {
      data,
      angleField: 'value',
      colorField: 'type',
      label: {
        text: 'value',
        position: 'outside',
      },
      onReady,
    };
    return <Pie {...config} />;
  },
  (prev, next) => {
    return isEqual(prev.data, next.data);
  },
);

const Analytics: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, error } = useGetAnalytics();
  
  const mappedData = data?.map(item => ({
    type: item.category.name,
    value: parseFloat(item.total_amount)
  })) || [];
  
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>{t('analytics.title')}</h2>
      </div>
      <div style={{ padding: '24px' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
      ) : (
        <DemoPie data={mappedData} onReady={() => {}} />
      )}
    </div>
    </>
    
  );
};

export default Analytics;
