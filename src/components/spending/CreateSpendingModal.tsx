import React from 'react';
import { Modal, Form, notification } from 'antd';
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
      notification.success({
        message: t('spending.createSuccess'),
        duration: 2,
      });
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      notification.error({
        message: t('spending.createError'),
        duration: 2,
      });
    }
  };

  return (
    <Modal
      title={t('spending.createTitle')}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnHidden
    >
      <SpendingForm form={form} />
    </Modal>
  );
};

export default CreateSpendingModal;
