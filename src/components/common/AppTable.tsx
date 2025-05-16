import { Table, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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
  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      scroll={scroll}
      {...rest}
    />
  );
};

export default AppTable;
