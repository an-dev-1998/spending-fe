import React, { useState } from 'react';
import { Card, Typography, Form, Input, Button, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../utils/api/authService';
import { fetchSanctumCsrfToken } from '../utils/api/sanctum';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = App.useApp();
  const { t } = useTranslation();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await fetchSanctumCsrfToken();
      
      const response = await authService.login({
        email: values.email,
        password: values.password
      });

      if (response && response.token) {
        authService.setToken(response.token);
        
        message.success(t('login.success'));
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        throw new Error(t('login.invalidResponse'));
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.message || t('login.failed');
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
          <Title level={2}>{t('login.welcomeBack')}</Title>
          <Typography.Text type="secondary">{t('login.pleaseSignIn')}</Typography.Text>
        </div>
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('login.emailRequired') },
              { type: 'email', message: t('login.emailInvalid') }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder={t('login.email')} 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('login.passwordRequired') }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('login.password')}
              size="large"
            />
          </Form.Item>

          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Typography.Text type="secondary">
              {t('login.dontHaveAccount')} <Typography.Link href="/register">{t('login.registerHere')}</Typography.Link>
            </Typography.Text>
          </div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              size="large"
            >
              {t('login.signIn')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
