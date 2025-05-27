import { Spin, DatePicker, Tag } from 'antd';
import { Pie } from '@ant-design/plots';
import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { isEqual } from 'lodash';
import { useGetIncomeAnalytics } from '../hooks/use-hook-get-income-analytics';
import AppSelect from '../components/common/AppSelect';
import { useGetUsers } from '../hooks/use-hook-get-users';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { CURRENCY } from '../constans';

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
        text: (d: any) => `${d.value.toLocaleString()} ${CURRENCY}`,
        position: 'outside',
        style: {
          fontSize: 12,
          fontWeight: 'bold',
        },
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
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  
  const { loading, data, error, refetch } = useGetIncomeAnalytics({
    startDate: dateRange?.[0],
    endDate: dateRange?.[1],
    userId: selectedUser || undefined,
  });
  
  const { users } = useGetUsers();

  const mappedData = data?.map(item => ({
    type: item.category.name,
    value: parseFloat(item.total_amount)
  })) || [];

  const analyticUsers = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const handleDateRangeChange: RangePickerProps['onChange'] = (dates) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
      refetch();
    } else {
      setDateRange(null);
      refetch();
    }
  };

  const handleUserChange = (value: number) => {
    setSelectedUser(value);
    refetch();
  };
  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>{t('analytics.title')}</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <DatePicker.RangePicker onChange={handleDateRangeChange} />
      </div>
      <AppSelect
        options={analyticUsers}
        onChange={handleUserChange}
        value={selectedUser}
        placeholder={t('analytics.selectUser')}
      />
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
