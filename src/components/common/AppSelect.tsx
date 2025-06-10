import React from 'react';
import { Select, SelectProps } from 'antd';

export interface AppSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface AppSelectProps extends Omit<SelectProps, 'options'> {
  options: AppSelectOption[];
  error?: string;
  fullWidth?: boolean;
}

const AppSelect: React.FC<AppSelectProps> = ({
  options,
  error,
  fullWidth = false,
  style,
  value,
  onChange,
  ...rest
}) => {
  const handleChange = (
    newValue: string | number,
    option?: AppSelectOption | AppSelectOption[]
  ) => {
    if (onChange) {
      onChange(newValue, option);
    }
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      style={{
        width: fullWidth ? '100%' : style?.width || 200,
        ...style,
      }}
      status={error ? 'error' : undefined}
      {...rest}
    />
  );
};

export default AppSelect;
