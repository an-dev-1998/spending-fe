import React, { useState } from 'react';
import { Card, Typography, Form, Input, Button, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../utils/api/authService';
import { fetchSanctumCsrfToken } from '../utils/api/sanctum';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/userStore';
import LanguageSwitcher from '../components/common/LanguageSwitch';

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
  const setRole = useUserStore((state) => state.setRole);
  const setName = useUserStore((state) => state.setName);
  const setEmail = useUserStore((state) => state.setEmail);
  const setUserId = useUserStore((state) => state.setUserId);
  const setImageUrl = useUserStore((state) => state.setImageUrl);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      console.log('Starting login process...');
      await fetchSanctumCsrfToken();

      const response = await authService.login({
        email: values.email,
        password: values.password,
      });
      console.log('Login response:', response);

      if (!response) {
        console.error('No response received from login attempt');
        throw new Error(t('login.invalidResponse'));
      }

      const responseData = response.data || response;

      if (!responseData.token || !responseData.user) {
        console.error('Invalid response format:', responseData);
        throw new Error(t('login.invalidResponseFormat'));
      }

      console.log('Setting auth token and user data...');
      authService.setToken(responseData.token);
      setRole(responseData.user.role);
      setName(responseData.user.name);
      setEmail(responseData.user.email);
      setUserId(responseData.user.id.toString());
      setImageUrl(responseData.user.image_url);

      message.success(t('login.success'));
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      const errorMessage = error.response?.data?.message || error.message || t('login.failed');
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5',
        backgroundImage: 'linear-gradient(45deg, pink, transparent)',
      }}
    >
      <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'right', marginBottom: 16 }}>
          <LanguageSwitcher />
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>{t('login.welcomeBack')}</Title>
          <Typography.Text type="secondary">{t('login.pleaseSignIn')}</Typography.Text>
        </div>

        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t('login.emailRequired') },
              { type: 'email', message: t('login.emailInvalid') },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder={t('login.email')} size="large" />
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
              {t('login.dontHaveAccount')}{' '}
              <Typography.Link href="/register">{t('login.registerHere')}</Typography.Link>
            </Typography.Text>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              {t('login.signIn')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
