import { useState } from 'react';
import { App } from 'antd';
import { expectationService, MonthlyExpectations } from '../utils/api/expectationService';

export const useSaveExpectations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { message } = App.useApp();

  const saveExpectations = async (data: MonthlyExpectations[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await expectationService.saveSpendingExpectations(data);

      // Handle partial success with errors
      if (response.errors && response.errors.length > 0) {
        message.warning(
          `Expectations saved with ${response.errors.length} warnings. Check console for details.`
        );
        console.warn('Save warnings:', response.errors);
      } else {
        message.success('Expectations saved successfully');
      }

      return response;
    } catch (error: any) {
      let errorMessage = 'Failed to save expectations data';

      // Handle validation errors
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.messages;
        errorMessage = 'Validation failed. Please check your data.';
        console.error('Validation errors:', validationErrors);
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setError(errorMessage);
      message.error(errorMessage);
      console.error('Error saving expectations data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveExpectations,
  };
};
