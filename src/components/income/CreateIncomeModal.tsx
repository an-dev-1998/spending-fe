import React from 'react';
import { Modal, Form, notification } from 'antd';
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
      notification.success({
        message: t('income.createSuccess'),
        duration: 2,
      });
      onSuccess();
      onClose();
    } catch (error) {
      notification.error({
        message: t('income.createError'),
        duration: 2,
      });
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