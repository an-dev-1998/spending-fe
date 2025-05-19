import { Table, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

interface AppTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: ColumnsType<T>;
  loading?: boolean;
  pagination?: TableProps<T>['pagination'] | false;
  scroll?: { x?: number | true; y?: number };
}

const AppTable = <T extends object>({
  columns,
  dataSource,
  loading = false,
  pagination = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total) => `Total ${total} items`,
  },
  scroll,
  ...rest
}: AppTableProps<T>) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const mobilePagination = isSmallScreen
    ? {
        ...pagination,
        showSizeChanger: false,
        showTotal: (total: number) => `${total} items`,
        size: 'small' as const,
      }
    : pagination;

  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={mobilePagination}
      scroll={isSmallScreen ? { x: 'max-content' } : scroll}
      {...rest}
      style={{
        backgroundColor: 'white',
        ...(isSmallScreen && {
          fontSize: '14px',
          overflowX: 'auto',
        }),
      }}
    />
  );
};

export default AppTable;
