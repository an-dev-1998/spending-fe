import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { authService } from '../utils/api/authService';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const SettingPage: React.FC = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await authService.changePassword({
        current_password: values.current_password,
        new_password: values.new_password,
        new_password_confirmation: values.new_password_confirmation,
      });

      setSuccess(t('setting.passwordChangedSuccess'));
      form.resetFields();
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err: any) {
      setError(err.response?.data?.message || t('setting.passwordChangeFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {t('setting.title')}
      </Title>

      <Card title={t('setting.changePassword')} style={{ marginBottom: '2rem' }}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="current_password"
            label={t('setting.currentPassword')}
            rules={[{ required: true, message: t('setting.currentPasswordRequired') }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            name="new_password"
            label={t('setting.newPassword')}
            rules={[
              { required: true, message: t('setting.newPasswordRequired') },
              { min: 8, message: t('setting.passwordMinLength') },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            name="new_password_confirmation"
            label={t('setting.confirmNewPassword')}
            rules={[
              { required: true, message: t('setting.confirmNewPasswordRequired') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('setting.passwordMismatch')));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          {error && <Alert type="error" message={error} style={{ marginBottom: '1rem' }} />}
          {success && <Alert type="success" message={success} style={{ marginBottom: '1rem' }} />}

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t('setting.changePassword')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SettingPage;
