import React, { useState, useEffect } from 'react';
import AppTable from '../components/common/AppTable';
import { Space, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Spending, spendingService } from '../utils/api';
import dayjs from 'dayjs';
import { useGetSpendings } from '../hooks/use-hook-get-spendings';
import EditSpendingModal from '../components/spending/EditSpendingModal';
import CreateSpendingModal from '../components/spending/CreateSpendingModal';
import DeleteItemModal from '../components/common/DeleteItemModal';
import { useTranslation } from 'react-i18next';

const SpendingPage: React.FC = () => {
  const { loading, spendings, pagination, handleTableChange } = useGetSpendings();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSpending, setSelectedSpending] = useState<Spending | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isEditModalOpen && !isDeleteModalOpen) {
      setSelectedSpending(null);
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

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
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        return formattedAmount;
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
    {
      title: t("spending.createdAt"),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY HH:mm'),
    },
    {
      title: t("spending.action"),
      key: 'action',
      render: (_: any, record: Spending) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}><EditOutlined /></a>
          <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
        </Space>
      ),
    },
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
    // Refresh the Spendings list
    handleTableChange(pagination);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedSpending) {
      try {
        await spendingService.deleteSpending(parseInt(selectedSpending.id));
        message.success(t('spending.deleteSuccess'));
        handleSuccess();
        handleCloseDelete();
      } catch (error) {
        message.error(t('spending.deleteFailed'));
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
