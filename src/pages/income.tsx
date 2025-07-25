import React, { useState, useEffect } from 'react';
import AppTable from '../components/common/AppTable';
import { Space, Button, DatePicker, Tag, notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Income, incomeService } from '../utils/api';
import dayjs from 'dayjs';
import { useGetIncomes } from '../hooks/use-hook-get-incomes';
import EditIncomeModal from '../components/income/EditIncomeModal';
import CreateIncomeModal from '../components/income/CreateIncomeModal';
import DeleteItemModal from '../components/common/DeleteItemModal';
import { useTranslation } from 'react-i18next';
import type { RangePickerProps } from 'antd/es/date-picker';
import { CURRENCY } from '../constans';
import { useUserStore } from '../store/userStore';

const IncomePage: React.FC = () => {
  const { loading, incomes, pagination, handleTableChange, handleDateRangeChange } =
    useGetIncomes();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const { t } = useTranslation();
  const userRole = useUserStore((state) => state.role);

  useEffect(() => {
    if (!isEditModalOpen && !isDeleteModalOpen) {
      setSelectedIncome(null);
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

  const baseColumns = [
    {
      title: t('income.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('income.amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => {
        const formattedAmount = parseFloat(amount).toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
        return (
          <>
            <Tag style={{ borderRadius: 32 }} color="gray">
              {formattedAmount} {CURRENCY}
            </Tag>
          </>
        );
      },
    },
    {
      title: t('income.date'),
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: t('income.category.name'),
      dataIndex: ['category', 'name'],
      key: 'category.name',
    },
  ];

  const actionColumn = {
    title: t('income.action'),
    key: 'action',
    render: (_: any, record: Income) => (
      <Space size="middle">
        <a onClick={() => handleEdit(record)}>
          <EditOutlined />
        </a>
        <a onClick={() => handleDelete(record)}>
          <DeleteOutlined />
        </a>
      </Space>
    ),
  };

  const columns = userRole === 1 ? baseColumns : [...baseColumns, actionColumn];

  const handleEdit = (income: Income) => {
    setSelectedIncome(income);
    setIsEditModalOpen(true);
  };

  const handleDelete = (income: Income) => {
    setSelectedIncome(income);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateModalOpen(false);
  };

  const handleSuccess = () => {
    handleTableChange(pagination);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedIncome) {
      try {
        await incomeService.deleteIncome(parseInt(selectedIncome.id));
        notification.success({
          message: t('income.deleteSuccess'),
          duration: 2,
        });
        handleSuccess();
        handleCloseDelete();
      } catch (error) {
        notification.error({
          message: t('income.deleteFailed'),
          duration: 2,
        });
      }
    }
  };

  const onDateRangeChange: RangePickerProps['onChange'] = (dates) => {
    if (dates && dates[0] && dates[1]) {
      handleDateRangeChange([dates[0], dates[1]]);
    } else {
      handleDateRangeChange(null);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>{t('income.title')}</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
          {t('income.create')}
        </Button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <DatePicker.RangePicker onChange={onDateRangeChange} />
      </div>
      <AppTable<Income>
        columns={columns}
        dataSource={incomes}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
      />
      <EditIncomeModal
        income={selectedIncome}
        visible={isEditModalOpen}
        onClose={handleCloseEdit}
        onSuccess={handleSuccess}
      />
      <CreateIncomeModal
        visible={isCreateModalOpen}
        onClose={handleCloseCreate}
        onSuccess={handleSuccess}
      />
      <DeleteItemModal
        visible={isDeleteModalOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        itemName={selectedIncome?.description}
        title={t('income.deleteTitle')}
      />
    </>
  );
};

export default IncomePage;
