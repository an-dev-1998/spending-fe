import React, { useState } from 'react';
import { Card, Typography, Form, Input, Button, App } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { authService, RegisterCredentials } from '../utils/api/authService';
import { fetchSanctumCsrfToken } from '../utils/api/sanctum';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { t } = useTranslation();
  const onFinish = async (values: RegisterCredentials) => {
    setLoading(true);
    try {
      await fetchSanctumCsrfToken();
      await authService.register(values);
      message.success(t('register.success'));
      navigate('/login');
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || error.message || t('register.failed');
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: '#f0f2f5',
      backgroundImage: 'linear-gradient(45deg, pink, transparent)'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>{t('register.title')}</Title>
          <Typography.Text type="secondary">{t('register.description')}</Typography.Text>
        </div>
        
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: t('register.nameRequired') }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder={t('register.name')} 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('register.emailRequired') },
              { type: 'email', message: t('register.emailInvalid') }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder={t('register.email')} 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: t('register.passwordRequired') },
              { min: 8, message: t('register.passwordMinLength') }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('register.password')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            dependencies={['password']}
            rules={[
              { required: true, message: t('register.passwordConfirmationRequired') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('register.passwordMismatch')));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('register.passwordConfirmation')}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              size="large"
            >
              {t('register.register')}
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Typography.Text>
              {t('register.alreadyHaveAccount')} <Link to="/login">{t('register.login')}</Link>
            </Typography.Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
