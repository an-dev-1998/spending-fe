import React, { useEffect } from 'react';
import { Form, Input, FormInstance } from 'antd';
import { Category } from '../../utils/api';
import { useTranslation } from 'react-i18next';
interface CategoryFormProps {
  form: FormInstance;
  initialValues?: Partial<Category>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ form, initialValues }) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      <Form.Item
        name="name"
        label={t('category.name')}
        rules={[{ required: true, message: t('category.nameRequired') }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label={t('category.description')}>
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
