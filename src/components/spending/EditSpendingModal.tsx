import React, { useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { spendingService } from '../../utils/api';
import { Spending } from '../../types/spending';
import SpendingForm from './SpendingForm';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

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
      const date = spending.date ? dayjs(spending.date) : undefined;
      form.setFieldsValue({
        description: spending.description,
        amount: parseFloat(spending.amount),
        date: date?.isValid() ? date : undefined,
        category_id: spending.category_id,
      });
    }
  }, [spending, visible, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (spending) {
        await spendingService.updateSpending(parseInt(spending.id), values);
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
      destroyOnHidden
    >
      <SpendingForm form={form} initialValues={spending || undefined} />
    </Modal>
  );
};

export default EditSpendingModal; 