import React, { useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { Spending, spendingService } from '../../utils/api';
import SpendingForm from './SpendingForm';
import { useTranslation } from 'react-i18next';

interface EditSpendingModalProps {
  spending: Spending | null;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditSpendingModal: React.FC<EditSpendingModalProps> = ({
  spending,
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  // Reset form when spending changes
  useEffect(() => {
    if (spending && visible) {
      form.setFieldsValue({
        name: spending.name,
        description: spending.description,
        amount: spending.amount,
      });
    }
  }, [spending, visible, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (spending) {
        await spendingService.updateSpending(spending.id, values);
        message.success(t('spending.updateSuccess'));
        onSuccess();
        onClose();
      }
    } catch (error) {
      message.error(t('spending.updateError'));
    }
  };

  return (
    <Modal
      title={t('spending.editTitle')}
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnClose
    >
      <SpendingForm form={form} initialValues={spending || undefined} />
    </Modal>
  );
};

export default EditSpendingModal; 