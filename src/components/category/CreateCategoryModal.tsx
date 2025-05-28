import React from 'react';
import { Modal, Form, notification } from 'antd';
import { categoryService } from '../../utils/api';
import CategoryForm from './CategoryForm';
import { useTranslation } from 'react-i18next';

interface CreateCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await categoryService.createCategory(values);
      notification.success({
        message: t('category.createSuccess'),
        duration: 2,
      });
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      notification.error({
        message: t('category.createError'),
        duration: 2,
      });
    }
  };

  return (
    <Modal
      title={t('category.createTitle')}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnHidden
    >
      <CategoryForm form={form} />
    </Modal>
  );
};

export default CreateCategoryModal; 