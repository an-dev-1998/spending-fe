import React from 'react';
import { Modal, Typography } from 'antd';

interface DeleteItemModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title = 'Delete Item',
  itemName = 'this item',
}) => {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onConfirm}
      onCancel={onClose}
      okText="Delete"
      okButtonProps={{ danger: true }}
      destroyOnHidden
    >
      <Typography.Text>
        Are you sure you want to delete {itemName}? This action cannot be undone.
      </Typography.Text>
    </Modal>
  );
};

export default DeleteItemModal;
