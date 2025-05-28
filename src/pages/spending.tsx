import React, { useState, useEffect } from 'react';
import AppTable from '../components/common/AppTable';
import { Space, Button, DatePicker, Tag, notification } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Spending, spendingService } from '../utils/api';
import dayjs from 'dayjs';
import { useGetSpendings } from '../hooks/use-hook-get-spendings';
import { useGetCategories } from '../hooks/use-hook-get-categories';
import EditSpendingModal from '../components/spending/EditSpendingModal';
import CreateSpendingModal from '../components/spending/CreateSpendingModal';
import DeleteItemModal from '../components/common/DeleteItemModal';
import { useTranslation } from 'react-i18next';
import type { RangePickerProps } from 'antd/es/date-picker';
import { CURRENCY } from '../constans';
import { useUserStore } from '../store/userStore';
import AppSelect from '../components/common/AppSelect';
import '../assets/date-picker.css';

const SpendingPage: React.FC = () => {
  const { loading, spendings, pagination, handleTableChange, handleDateRangeChange, handleCategoryChange } = useGetSpendings();
  const { categories } = useGetCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSpending, setSelectedSpending] = useState<Spending | null>(null);
  const { t } = useTranslation();
  const role = useUserStore((state) => state.role);

  useEffect(() => {
    if (!isEditModalOpen && !isDeleteModalOpen) {
      setSelectedSpending(null);
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

  const onDateRangeChange: RangePickerProps['onChange'] = (dates) => {
    if (dates && dates[0] && dates[1]) {
      handleDateRangeChange([dates[0], dates[1]]);
    } else {
      handleDateRangeChange(null);
    }
  };

  const onCategoryChange = (value: number | null) => {
    setSelectedCategory(value);
    handleCategoryChange(value);
  };

  const columns = [
    {
      title: t("spending.description"),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t("spending.amount"),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => {
        const formattedAmount = parseFloat(amount).toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        return <><Tag style={{ borderRadius: 32 }} color="gray">{formattedAmount} {CURRENCY}</Tag></>;
      }
    },
    {
      title: t("spending.date"),
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: t("spending.category.name"),
      dataIndex: ['category', 'name'],
      key: 'category.name',
    },
    ...(role !== 1 ? [{
      title: t("spending.action"),
      key: 'action',
      render: (_: any, record: Spending) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}><EditOutlined /></a>
          <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
        </Space>
      ),
    }] : []),
  ];

  const handleEdit = (spending: Spending) => {
    setSelectedSpending(spending);
    setIsEditModalOpen(true);
  };

  const handleDelete = (spending: Spending) => {
    setSelectedSpending(spending);
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
    handleTableChange(pagination, {}, [], { currentDataSource: spendings });
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedSpending) {
      try {
        await spendingService.deleteSpending(parseInt(selectedSpending.id));
        notification.success({
          message: t('spending.deleteSuccess'),
          duration: 2,
        });
        handleSuccess();
        handleCloseDelete();
      } catch (error) {
        notification.error({
          message: t('spending.deleteFailed'),
          duration: 2,
        });
      }
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>{t('spending.title')}</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
          {t('spending.create')}
        </Button>
      </div>
      <div style={{ marginBottom: 16, display: 'flex', gap: '16px' }}>
        <DatePicker.RangePicker onChange={onDateRangeChange} />
        <AppSelect
          options={categories.map(category => ({
            label: category.name,
            value: category.id
          }))}
          onChange={onCategoryChange}
          value={selectedCategory}
          placeholder={t('spending.category.name')}
          style={{ minWidth: '200px' }}
          allowClear
        />
      </div>
      <AppTable<Spending>
        columns={columns}
        dataSource={spendings}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
      />
      <EditSpendingModal
        spending={selectedSpending}
        visible={isEditModalOpen}
        onClose={handleCloseEdit}
        onSuccess={handleSuccess}
      />
      <CreateSpendingModal
        visible={isCreateModalOpen}
        onClose={handleCloseCreate}
        onSuccess={handleSuccess}
      />
      <DeleteItemModal
        visible={isDeleteModalOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        itemName={selectedSpending?.description}
        title={t('spending.deleteTitle')}
      />
    </>
  );
};

export default SpendingPage;
