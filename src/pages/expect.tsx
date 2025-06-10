import { Tabs, Select, Input, Button, Space, Form, Spin, Tag } from 'antd';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { useSaveExpectations } from '../hooks/use-save-expectations';
import { useGetCategories } from '../hooks/use-hook-get-categories';
import { useGetExpectations } from '../hooks/use-get-expectations';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const FormRow: React.FC<{
  formKey: string;
  onFormChange?: (formKey: string, values: any) => void;
  initialValues?: any;
}> = ({ formKey, onFormChange, initialValues }) => {
  const { t } = useTranslation();
  const { categories } = useGetCategories();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      let categoryId;

      if (typeof initialValues.category === 'number') {
        categoryId = initialValues.category;
      } else if (typeof initialValues.category === 'string') {
        categoryId = categories.find((cat) => cat.name === initialValues.category)?.id;
      }

      const formValues = {
        category: categoryId,
        description: initialValues.description,
        amount: initialValues.amount,
      };
      form.setFieldsValue(formValues);
    }
  }, [initialValues, categories, form]);

  useEffect(() => {
    if (initialValues && onFormChange && categories.length > 0) {
      let categoryId;

      if (typeof initialValues.category === 'number') {
        categoryId = initialValues.category;
      } else if (typeof initialValues.category === 'string') {
        categoryId = categories.find((cat) => cat.name === initialValues.category)?.id;
      }

      const formValues = {
        category: categoryId,
        description: initialValues.description,
        amount: initialValues.amount,
      };
      onFormChange(formKey, formValues);
    }
  }, [initialValues, categories, formKey, onFormChange]);

  const handleValuesChange = useCallback(() => {
    const values = form.getFieldsValue();
    if (onFormChange) {
      onFormChange(formKey, values);
    }
  }, [onFormChange, formKey, form]);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      style={{
        width: '100%',
        border: '1px solid #ccc',
        padding: '16px',
        marginBottom: '16px',
        borderRadius: '8px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <Space
        direction="vertical"
        style={{ display: 'flex', gap: '16px' }}
        className="expect-custom"
      >
        <Form.Item
          name="category"
          label={t('expect.category', 'Category')}
          rules={[
            { required: true, message: t('expect.categoryRequired', 'Please select a category') },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Select
            placeholder={t('expect.selectCategory', 'Select a category')}
            options={categoryOptions}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={t('expect.description', 'Description')}
          rules={[
            {
              required: true,
              message: t('expect.descriptionRequired', 'Please enter a description'),
            },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Input placeholder={t('expect.enterDescription', 'Enter description')} />
        </Form.Item>

        <Form.Item
          name="amount"
          label={t('expect.amount', 'Amount')}
          rules={[
            { required: true, message: t('expect.amountRequired', 'Please enter an amount') },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Input placeholder={t('expect.enterAmount', 'Enter amount')} />
        </Form.Item>
      </Space>
    </Form>
  );
};

const TabContent: React.FC<{
  tabKey: string;
  onTabDataChange?: (tabKey: string, data: any) => void;
  initialData?: any[];
}> = ({ tabKey, onTabDataChange, initialData }) => {
  const { t } = useTranslation();
  const [forms, setForms] = useState<string[]>(['form-0']);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const formCounter = useRef(1);

  useEffect(() => {
    setIsInitialized(false);
  }, [tabKey]);

  useEffect(() => {
    if (initialData && initialData.length > 0 && !isInitialized) {
      const newForms = initialData.map((_, index) => `form-${index}`);
      setForms(newForms);

      const newFormData = initialData.reduce(
        (acc, expectation, index) => {
          acc[`form-${index}`] = {
            category: expectation.category,
            description: expectation.description,
            amount: expectation.amount,
          };
          return acc;
        },
        {} as { [key: string]: any }
      );

      setFormData(newFormData);
      formCounter.current = initialData.length;
      setIsInitialized(true);
    }
  }, [initialData, tabKey, isInitialized]);

  useEffect(() => {
    if (onTabDataChange) {
      const dataArray = Object.values(formData);
      onTabDataChange(tabKey, dataArray);
    }
  }, [formData, tabKey, onTabDataChange]);

  const handleAddRow = () => {
    const newFormKey = `form-${formCounter.current++}`;
    setForms((prev) => [...prev, newFormKey]);
    setFormData((prev) => ({
      ...prev,
      [newFormKey]: { category: undefined, description: '', amount: '' },
    }));
  };

  const handleFormChange = useCallback((formKey: string, values: any) => {
    setFormData((prev) => ({ ...prev, [formKey]: values }));
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {forms.map((formKey, index) => (
        <FormRow
          key={formKey}
          formKey={formKey}
          onFormChange={handleFormChange}
          initialValues={initialData && initialData[index] ? initialData[index] : undefined}
        />
      ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddRow}
          style={{ width: '100px' }}
        >
          {t('expect.addRow', 'Add Row')}
        </Button>
        <Tag color="blue">
          {t('expect.total', 'Total')}:{' '}
          {Object.values(formData)
            .reduce((sum, data: any) => {
              const amount = parseFloat(data?.amount || '0');
              return sum + (isNaN(amount) ? 0 : amount);
            }, 0)
            .toFixed(2)}
        </Tag>
      </div>
    </div>
  );
};

const ExpectPage: React.FC = () => {
  const { t } = useTranslation();
  const [tabsData, setTabsData] = useState<{ [key: string]: any[] }>({});
  const newTabIndex = useRef(0);
  const { loading: saveLoading, saveExpectations } = useSaveExpectations();
  const { loading: fetchLoading, data: expectationsData } = useGetExpectations();
  const { categories } = useGetCategories();

  const handleTabDataChange = useCallback((tabKey: string, data: any[]) => {
    setTabsData((prev) => ({ ...prev, [tabKey]: data }));
  }, []);

  const createInitialItems = () => [
    {
      label: '07/2025',
      children: <TabContent tabKey="1" onTabDataChange={handleTabDataChange} />,
      key: '1',
    },
  ];

  const [activeKey, setActiveKey] = useState('1');
  const [items, setItems] = useState(createInitialItems());

  useEffect(() => {
    if (expectationsData && expectationsData.length > 0) {
      const sortedExpectationsData = [...expectationsData].sort((a, b) => {
        const [monthA, yearA] = a.month.split('/').map(Number);
        const [monthB, yearB] = b.month.split('/').map(Number);

        if (yearA !== yearB) {
          return yearA - yearB;
        }
        return monthA - monthB;
      });

      const newItems = sortedExpectationsData.map((monthData, index) => ({
        label: monthData.month,
        children: (
          <TabContent
            tabKey={`${index + 1}`}
            onTabDataChange={handleTabDataChange}
            initialData={monthData.expectations}
          />
        ),
        key: `${index + 1}`,
      }));
      setItems(newItems);
      setActiveKey('1');

      const initialTabsData = sortedExpectationsData.reduce(
        (acc, monthData, index) => {
          acc[`${index + 1}`] = monthData.expectations;
          return acc;
        },
        {} as { [key: string]: any[] }
      );
      setTabsData(initialTabsData);
    }
  }, [expectationsData]);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const handleSave = async () => {
    const allExpectationsData = items.map((item: any) => ({
      month: item.label,
      expectations: (tabsData[item.key] || []).map((expectation: any) => {
        let categoryId = expectation.category;

        if (typeof expectation.category === 'string') {
          const foundCategory = categories.find((cat) => cat.name === expectation.category);
          categoryId = foundCategory ? foundCategory.id : expectation.category;
        }

        return {
          ...expectation,
          category: categoryId,
        };
      }),
    }));

    await saveExpectations(allExpectationsData);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];

    const lastLabel = newPanes[newPanes.length - 1].label;
    const [month, year] = lastLabel.split('/').map(Number);

    let nextMonth = month + 1;
    let nextYear = year;

    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }

    const nextLabel = `${nextMonth.toString().padStart(2, '0')}/${nextYear}`;

    newPanes.push({
      label: nextLabel,
      children: <TabContent tabKey={newActiveKey} onTabDataChange={handleTabDataChange} />,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item: any, i: number) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item: any) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
          alignItems: 'center',
        }}
      >
        <h2>{t('expect.title')}</h2>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={saveLoading}
          style={{ width: '100px' }}
        >
          {t('expect.save', 'Save')}
        </Button>
      </div>
      {fetchLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
          items={items}
          tabPosition="left"
        />
      )}
    </>
  );
};

export default ExpectPage;
