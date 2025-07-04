import { useState } from 'react';
import { Card, Form, Input, Button, message, Typography, Tabs, Image } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/userStore';
import { userService } from '../utils/api/userService';

const { Title } = Typography;

interface ProfileFormValues {
  name: string;
  email: string;
  link_avatar: string;
  role: number;
}

const AccountPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const { t } = useTranslation();
  const name = useUserStore((state) => state.name);
  const setName = useUserStore((state) => state.setName);
  const email = useUserStore((state) => state.email);
  const setEmail = useUserStore((state) => state.setEmail);
  const userId = useUserStore((state) => state.userId);
  const image_url = useUserStore((state) => state.image_url);
  const setImageUrl = useUserStore((state) => state.setImageUrl);

  const handleSubmit = async (values: ProfileFormValues) => {
    setLoading(true);
    try {
      if (!userId) {
        throw new Error('User ID not found');
      }
      await userService.updateUser(userId, {
        name: values.name,
        email: values.email,
        image_url: values.link_avatar,
        role: 2,
      });

      setName(values.name);
      setEmail(values.email);
      setImageUrl(values.link_avatar);
      setPreviewImageUrl(values.link_avatar);
      message.success(t('account.updateSuccess'));
    } catch (error) {
      console.error('Error updating user:', error);
      message.error(t('account.updateError'));
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      key: 'profile',
      label: t('account.profile'),
      children: (
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              name: name || '',
              email: email || '',
              link_avatar: image_url || '',
            }}
            onValuesChange={(changedValues) => {
              if (changedValues.link_avatar !== undefined) {
                setPreviewImageUrl(changedValues.link_avatar);
              }
            }}
          >
            <Form.Item
              name="name"
              label={t('account.name')}
              rules={[{ required: true, message: t('account.nameRequired') }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="email"
              label={t('account.email')}
              rules={[
                { required: true, message: t('account.emailRequired') },
                { type: 'email', message: t('account.emailInvalid') },
              ]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item name="link_avatar" label={t('account.linkAvatar')}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {t('account.saveChanges')}
              </Button>
            </Form.Item>
            <Form.Item>
              <Image width={200} src={previewImageUrl || image_url || ''} />
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {t('account.title')}
      </Title>
      <Tabs items={items} />
    </div>
  );
};

export default AccountPage;
