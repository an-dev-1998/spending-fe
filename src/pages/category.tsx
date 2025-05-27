import React, { useState, useEffect } from 'react';
import AppTable from '../components/common/AppTable';
import { Space, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Category, categoryService } from '../utils/api';
import dayjs from 'dayjs';
import { useGetCategories } from '../hooks/use-hook-get-categories';
import EditCategoryModal from '../components/category/EditCategoryModal';
import CreateCategoryModal from '../components/category/CreateCategoryModal';
import DeleteItemModal from '../components/common/DeleteItemModal';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/userStore';

const CategoryPage: React.FC = () => {
  const { loading, categories, pagination, handleTableChange } = useGetCategories();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { t } = useTranslation();
  const userRole = useUserStore((state) => state.role);

  useEffect(() => {
    if (!isEditModalOpen && !isDeleteModalOpen) {
      setSelectedCategory(null);
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

  const baseColumns = [
    {
      title: t('category.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('category.description'),
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const actionColumn = {
    title: t('category.action'),
    key: 'action',
    render: (_: any, record: Category) => (
      <Space size="middle">
        <a onClick={() => handleEdit(record)}><EditOutlined /></a>
        <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
      </Space>
    ),
  };

  const columns = userRole === 1 ? baseColumns : [...baseColumns, actionColumn];

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
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
    if (selectedCategory) {
      try {
        await categoryService.deleteCategory(selectedCategory.id);
        message.success(t('category.deleteSuccess'));
        handleSuccess();
        handleCloseDelete();
      } catch (error) {
        message.error(t('category.deleteFailed'));
      }
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>{t('category.title')}</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
          {t('category.create')}
        </Button>
      </div>
      <AppTable<Category>
        columns={columns}
        dataSource={categories}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
      />
      <EditCategoryModal
        category={selectedCategory}
        visible={isEditModalOpen}
        onClose={handleCloseEdit}
        onSuccess={handleSuccess}
      />
      <CreateCategoryModal
        visible={isCreateModalOpen}
        onClose={handleCloseCreate}
        onSuccess={handleSuccess}
      />
      <DeleteItemModal
        visible={isDeleteModalOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        itemName={selectedCategory?.name}
        title={t('category.deleteTitle')}
      />
    </>
  );
};

export default CategoryPage;
