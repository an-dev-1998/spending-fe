import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Space, Button } from 'antd';
import { Spending } from '../../types/spending';
import AppSelect from '../common/AppSelect';
import { categoryService } from '../../utils/api';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { SUGGESTED_AMOUNTS } from '../../constans';
import '../../assets/app.css';

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
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const suggestedAmounts = SUGGESTED_AMOUNTS;

  useEffect(() => {
    if (initialValues?.amount) {
      const amount = parseFloat(initialValues.amount);
      setSelectedAmount(amount);
      form.setFieldValue('amount', amount);
    }
  }, [initialValues, form]);

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    form.setFieldValue('amount', amount);
  };

  useEffect(() => {
    if (initialValues) {
      const formattedValues = {
        ...initialValues,
        date: initialValues.date ? dayjs(initialValues.date) : null,
      };
      console.log(formattedValues);
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
    <Form form={form} layout="vertical" initialValues={initialValues}>
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
      <Form.Item name="date" label={t('spending.date')} style={{ width: '50%' }}>
        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" showTime={false} />
      </Form.Item>
      <Form.Item name="description" label={t('spending.description')}>
        <Input.TextArea rows={4} placeholder={t('spending.description')} />
      </Form.Item>
      <Form.Item
        name="amount"
        label={t('spending.amount')}
        rules={[{ required: true, message: t('spending.amountRequired') }]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <InputNumber<number>
            placeholder={t('spending.amount')}
            style={{ width: '100%' }}
            value={selectedAmount}
            onChange={(value) => setSelectedAmount(value)}
            step={5000}
            min={0}
          />
          <Space wrap className="custom-space">
            {suggestedAmounts.map((amount) => (
              <Button
                key={amount}
                type={selectedAmount === amount ? 'primary' : 'default'}
                onClick={() => handleAmountClick(amount)}
                style={{ width: '100%', fontSize: '12px' }}
              >
                ${amount.toLocaleString()}
              </Button>
            ))}
          </Space>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default SpendingForm;
