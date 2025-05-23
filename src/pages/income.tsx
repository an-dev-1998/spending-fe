import React, { useState, useEffect } from 'react';
import AppTable from '../components/common/AppTable';
import { Space, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Income, incomeService } from '../utils/api';
import dayjs from 'dayjs';
import { useGetIncomes } from '../hooks/use-hook-get-incomes';
import EditIncomeModal from '../components/income/EditIncomeModal';
import CreateIncomeModal from '../components/income/CreateIncomeModal';
import DeleteItemModal from '../components/common/DeleteItemModal';
import { useTranslation } from 'react-i18next';

const IncomePage: React.FC = () => {
  const { loading, incomes, pagination, handleTableChange } = useGetIncomes();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isEditModalOpen && !isDeleteModalOpen) {
      setSelectedIncome(null);
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

  const columns = [
    {
      title: t("income.description"),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t("income.amount"),
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
      title: t("income.date"),
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: t("income.createdAt"),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY HH:mm'),
    },
    {
      title: t("income.action"),
      key: 'action',
      render: (_: any, record: Income) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}><EditOutlined /></a>
          <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];

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
    // Refresh the Incomes list
    handleTableChange(pagination);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedIncome) {
      try {
        await incomeService.deleteIncome(parseInt(selectedIncome.id));
        message.success(t('income.deleteSuccess'));
        handleSuccess();
        handleCloseDelete();
      } catch (error) {
        message.error(t('income.deleteFailed'));
      }
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
