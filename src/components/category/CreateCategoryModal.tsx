import React from 'react';
import { Modal, Form, message } from 'antd';
import { categoryService } from '../../utils/api';
import CategoryForm from './CategoryForm';

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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await categoryService.createCategory(values);
      message.success('Category created successfully');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Failed to create category');
    }
  };

  return (
    <Modal
      title="Create Category"
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnClose
    >
      <CategoryForm form={form} type="create" />
    </Modal>
  );
};

export default CreateCategoryModal; 