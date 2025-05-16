import React, { useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { User } from '../../utils/api';
import { userService } from '../../utils/api';
import UserForm from './UserForm';
import { useTranslation } from 'react-i18next';

interface EditUserModalProps {
  user: User | null;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (visible && user) {
      form.setFieldsValue(user);
    }
  }, [visible, user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (user) {
        await userService.updateUser(user.id.toString(), values);
        message.success(t('user.updateSuccess'));
        onSuccess();
        onClose();
        form.resetFields();
      }
    } catch (error) {
      message.error(t('user.updateError'));
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={t('user.editTitle')}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      destroyOnClose
    >
      <UserForm form={form} initialValues={user || undefined} type="edit" />
    </Modal>
  );
};

export default EditUserModal; 