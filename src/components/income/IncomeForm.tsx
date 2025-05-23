import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, DatePicker, Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetCategories } from '../../hooks/use-hook-get-categories';
import AppSelect from '../common/AppSelect';
import { SUGGESTED_AMOUNTS } from '../../constans';
import '../../assets/app.css';

interface IncomeFormProps {
  form: any;
  initialValues?: any;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ form, initialValues }) => {
  const { t } = useTranslation();
  const { categories } = useGetCategories();

  const incomeCategories = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
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

  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      <Form.Item
        name="description"
        label={t('income.description')}
        rules={[{ required: true, message: t('income.descriptionRequired') }]}
      >
        <Input.TextArea rows={4} placeholder={t('income.description')} />
      </Form.Item>
      <Form.Item
        name="amount"
        label={t('income.amount')}
        rules={[{ required: true, message: t('income.amountRequired') }]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <InputNumber<number>
            placeholder={t('income.amount')}
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
      <Form.Item
        name="date"
        label={t('income.date')}
        rules={[{ required: true, message: t('income.dateRequired') }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="category_id"
        label={t('income.categoryId')}
        rules={[{ required: true, message: t('income.categoryIdRequired') }]}
      >
        <AppSelect
          options={incomeCategories}
          placeholder={t('income.categoryIdRequired')}
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Form>
  );
};

export default IncomeForm; 