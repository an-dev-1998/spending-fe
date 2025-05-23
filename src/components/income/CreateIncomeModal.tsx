import React from 'react';
import { Modal, Form } from 'antd';
import { incomeService } from '../../utils/api';
import { useTranslation } from 'react-i18next';
import IncomeForm from './IncomeForm';

interface CreateIncomeModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateIncomeModal: React.FC<CreateIncomeModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await incomeService.createIncome({
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      });
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating income:', error);
    }
  };

  return (
    <Modal
      title={t('income.createTitle')}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
    >
      <IncomeForm form={form} />
    </Modal>
  );
};

export default CreateIncomeModal; 