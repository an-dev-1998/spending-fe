import React, { useState } from 'react';
import AppTable from '../components/common/AppTable';
import { Space, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { User, userService } from '../utils/api';
import dayjs from 'dayjs';
import { useGetUsers } from '../hooks/use-hook-get-users';
import EditUserModal from '../components/user/EditUserModal';
import CreateUserModal from '../components/user/CreateUserModal';
import DeleteItemModal from '../components/common/DeleteItemModal';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/userStore';

const UserPage: React.FC = () => {
  const { loading, users, pagination, handleTableChange } = useGetUsers();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { t } = useTranslation();
  const userRole = useUserStore((state) => state.role);

  const baseColumns = [
    {
      title: t('user.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('user.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('user.createdAt'),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: t('user.updatedAt'),
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
  ];

  const actionColumn = {
    title: t('user.action'),
    key: 'action',
    render: (_: any, record: User) => (
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

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
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
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await userService.deleteUser(selectedUser.id.toString());
        message.success(t('user.deleteSuccess'));
        handleSuccess();
        handleCloseDelete();
      } catch (error) {
        message.error(t('user.deleteFailed'));
      }
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>{t('user.title')}</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
          {t('user.create')}
        </Button>
      </div>
      <AppTable<User>
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="id"
      />
      <EditUserModal
        user={selectedUser}
        visible={isEditModalOpen}
        onClose={handleCloseEdit}
        onSuccess={handleSuccess}
      />
      <CreateUserModal
        visible={isCreateModalOpen}
        onClose={handleCloseCreate}
        onSuccess={handleSuccess}
      />
      <DeleteItemModal
        visible={isDeleteModalOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        itemName={selectedUser?.name}
        title={t('user.deleteTitle')}
      />
    </>
  );
};

export default UserPage;
