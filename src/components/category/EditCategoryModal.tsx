import React, { useEffect } from 'react';
import { Modal, Form, notification } from 'antd';
import { Category, categoryService } from '../../utils/api';
import CategoryForm from './CategoryForm';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
        notification.success({
          message: t('category.updateSuccess'),
          duration: 2,
        });
        onSuccess();
        onClose();
      }
    } catch (error) {
      notification.error({
        message: t('category.updateError'),
        duration: 2,
      });
    }
  };

  return (
    <Modal
      title={t('category.editTitle')}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnHidden
    >
      <CategoryForm form={form} initialValues={category || undefined} />
    </Modal>
  );
};

export default EditCategoryModal;
