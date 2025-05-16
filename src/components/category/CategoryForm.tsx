import React, { useEffect } from 'react';
import { Form, Input, FormInstance } from 'antd';
import { Category } from '../../utils/api';

interface CategoryFormProps {
  form: FormInstance;
  initialValues?: Partial<Category>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ form, initialValues }) => {
  // Update form values when initialValues change
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the category name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default CategoryForm; 