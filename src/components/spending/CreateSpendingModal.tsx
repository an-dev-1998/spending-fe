import React from 'react';
import { Modal, Form, message } from 'antd';
import { spendingService } from '../../utils/api';
import SpendingForm from './SpendingForm';
import { useTranslation } from 'react-i18next';
interface CreateSpendingModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateSpendingModal: React.FC<CreateSpendingModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await spendingService.createSpending(values);
      message.success(t('spending.createSuccess'));
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      message.error(t('spending.createError'));
    }
  };

  return (
    <Modal
      title={t('spending.createTitle')}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnClose
    >
      <SpendingForm form={form} />
    </Modal>
  );
};

export default CreateSpendingModal; 