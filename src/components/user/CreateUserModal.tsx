import React from 'react';
import { Modal, Form, message } from 'antd';
import { userService } from '../../utils/api';
import UserForm from './UserForm';
import { useTranslation } from 'react-i18next';
interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await userService.createUser(values);
      message.success(t('user.createSuccess'));
      onSuccess();
      onClose();
      form.resetFields();
    } catch (error) {
      message.error(t('user.createError'));
    }
  };

  return (
    <Modal
      title={t('user.createTitle')}
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      destroyOnHidden
    >
      <UserForm form={form} type="create" />
    </Modal>
  );
};

export default CreateUserModal; 