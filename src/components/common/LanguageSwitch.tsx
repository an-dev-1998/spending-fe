import { useTranslation } from 'react-i18next';
import { Select } from 'antd';


const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    return (
        <Select
            defaultValue="en"
            style={{ width: 120 }}
            options={[
                { value: 'en', label: 'English' },
                { value: 'vi', label: 'Tiếng Việt' },
            ]}
            onChange={(value) => i18n.changeLanguage(value)}
            value={i18n.language}
        />
    );
};

export default LanguageSwitcher;