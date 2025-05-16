import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2>
        {t('dashboard.title')}
      </h2>
    </>
  );
};

export default Dashboard;
