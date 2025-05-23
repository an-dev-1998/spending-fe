import React, { useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { Income, incomeService } from '../../utils/api';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import IncomeForm from './IncomeForm';

interface EditIncomeModalProps {
  income: Income | null;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditIncomeModal: React.FC<EditIncomeModalProps> = ({
  income,
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (income && visible) {
      const date = income.date ? dayjs(income.date) : undefined;
      form.setFieldsValue({
        description: income.description,
        amount: parseFloat(income.amount),
        date: date?.isValid() ? date : undefined,
        category_id: income.category?.id,
      });
    }
  }, [income, visible, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (income) {
        await incomeService.updateIncome(parseInt(income.id), values);
        message.success(t('income.updateSuccess'));
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  return (
    <Modal
      title={t('income.editTitle')}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnHidden
    >
      <IncomeForm form={form} initialValues={income || undefined} />
    </Modal>
  );
};

export default EditIncomeModal; 