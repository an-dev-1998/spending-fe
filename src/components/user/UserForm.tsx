import React from 'react';
import { Form, Input } from 'antd';
import { User } from '../../utils/api';
import { useTranslation } from 'react-i18next';

interface UserFormProps {
  form: any;
  initialValues?: Partial<User>;
  type: 'create' | 'edit';
}

const UserForm: React.FC<UserFormProps> = ({ form, initialValues, type }) => {
  const { t } = useTranslation();
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label={t('user.name')}
        rules={[{ required: true, message: t('user.nameRequired') }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label={t('user.email')}
        rules={[
          { required: true, message: t('user.emailRequired') },
          { type: 'email', message: t('user.emailInvalid') }
        ]}
      >
        <Input />
      </Form.Item>
      {type === 'create' && (
        <>
        <Form.Item
        name="password"
        label={t('user.password')}
        rules={[
          { required: true, message: t('user.passwordRequired') },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password_confirmation"
        label={t('user.passwordConfirmation')}
        rules={[
          { required: true, message: t('user.passwordConfirmationRequired') },
        ]}
      >
        <Input />
      </Form.Item></>
      )}
    </Form>
  );
};

export default UserForm; 