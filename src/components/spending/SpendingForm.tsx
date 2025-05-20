import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, DatePicker } from 'antd';
import { Spending } from '../../types/spending';
import AppSelect from '../common/AppSelect';
import { categoryService } from '../../utils/api';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface SpendingFormProps {
  form: any;
  initialValues?: Partial<Spending>;
}

interface Category {
  id: number;
  name: string;
}
const SpendingForm: React.FC<SpendingFormProps> = ({ form, initialValues }) => {
  const { t } = useTranslation();
  
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    if (initialValues) {
      const formattedValues = {
        ...initialValues,
        date: initialValues.date ? dayjs(initialValues.date) : '2025-12-12'
      };
      form.setFieldsValue(formattedValues);
    }
  }, [initialValues, form]);

  useEffect(() => {
    const fetchCategories = async () => {
      const cateResponse = await categoryService.getCategories();
      setCategories(cateResponse as Category[]);
    };
    fetchCategories();
  }, []);

  const spendingCategories = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item
        name="category_id"
        label={t('spending.categoryId')}
        rules={[{ required: true, message: t('spending.categoryIdRequired') }]}
        style={{ width: '50%' }}
      >
        <AppSelect
          options={spendingCategories}
          placeholder={t('spending.selectSpendingName')}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name="date"
        label={t('spending.date')}
        style={{ width: '50%' }}
      >
        <DatePicker 
          style={{ width: '100%' }}
          format="YYYY-MM-DD"
          showTime={false}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label={t('spending.description')}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="amount"
        label={t('spending.amount')}
        rules={[{ required: true, message: t('spending.amountRequired') }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          precision={2}
          placeholder={t('spending.enterAmount')}
        />
      </Form.Item>
    </Form>
  );
};

export default SpendingForm; 