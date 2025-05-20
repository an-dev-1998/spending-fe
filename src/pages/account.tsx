import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Typography, Tabs, Upload, Image } from 'antd';
import { UserOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/userStore';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { userService } from '../utils/api/userService';
import { uploadService } from '../utils/api/uploadService';
import { API_BASE_URL } from '../utils/api/config';

const { Title } = Typography;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface ProfileFormValues {
    name: string;
    email: string;
}

// Helper function to get full image URL
const getFullImageUrl = (url: string | null): string | null => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    // If the URL starts with /storage, use it as is
    if (url.startsWith('/storage')) {
        return `${API_BASE_URL.replace('/api', '')}${url}`;
    }
    // Otherwise, assume it's a storage path
    return `${API_BASE_URL.replace('/api', '')}/storage/${url}`;
};

const AccountPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const name = useUserStore((state) => state.name);
    const setName = useUserStore((state) => state.setName);
    const email = useUserStore((state) => state.email);
    const setEmail = useUserStore((state) => state.setEmail);
    const avatar = useUserStore((state) => state.avatar);
    const setAvatar = useUserStore((state) => state.setAvatar);
    const userId = useUserStore((state) => state.userId);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // Initialize fileList with existing avatar
    useEffect(() => {
        if (avatar) {
            const fullAvatarUrl = getFullImageUrl(avatar);
            setFileList([
                {
                    uid: '-1',
                    name: 'avatar',
                    status: 'done',
                    url: fullAvatarUrl || undefined,
                },
            ]);
        }
    }, [avatar]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const beforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error(t('account.uploadImageOnly'));
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error(t('account.imageSizeLimit'));
        }
        return isImage && isLt2M;
    };

    const handleSubmit = async (values: ProfileFormValues) => {
        setLoading(true);
        try {
            if (!userId) {
                throw new Error('User ID not found');
            }
            await userService.updateUser(userId, {
                name: values.name,
                email: values.email,
                image_url: avatar || undefined,
                role: 2
            });

            setName(values.name);
            setEmail(values.email);
            message.success(t('account.updateSuccess'));
        } catch (error) {
            console.error('Error updating user:', error);
            message.error(t('account.updateError'));
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleUpload: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
        try {
            const fileObj = file as File;
            const response = await uploadService.uploadFile(fileObj);
            
            if (response && response.url) {
                setAvatar(response.url);
                onSuccess?.(response);
                message.success(t('account.avatarUpdateSuccess'));
            } else {
                throw new Error('Upload failed - invalid response format');
            }
        } catch (error: any) {
            console.error('Upload error:', error);
            onError?.(error as Error);
            message.error(t('account.avatarUpdateError'));
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
                            email: email || ''
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
                                { type: 'email', message: t('account.emailInvalid') }
                            ]}
                        >
                            <Input prefix={<MailOutlined />} />
                        </Form.Item>

                        <Form.Item label={t('account.avatar')}>
                            <Upload
                                customRequest={handleUpload}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                beforeUpload={beforeUpload}
                                maxCount={1}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                        </Form.Item>

                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {t('account.saveChanges')}
                            </Button>
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
