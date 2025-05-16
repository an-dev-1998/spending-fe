import React, { useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { Category, categoryService } from '../../utils/api';
import CategoryForm from './CategoryForm';

interface EditCategoryModalProps {
  category: Category | null;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  // Reset form when category changes
  useEffect(() => {
    if (category && visible) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
      });
    }
  }, [category, visible, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (category) {
        await categoryService.updateCategory(category.id, values);
        message.success('Category updated successfully');
        onSuccess();
        onClose();
      }
    } catch (error) {
      message.error('Failed to update category');
    }
  };

  return (
    <Modal
      title="Edit Category"
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnClose
    >
      <CategoryForm form={form} initialValues={category || undefined} />
    </Modal>
  );
};

export default EditCategoryModal; 