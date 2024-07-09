import React from 'react';
import { Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
type selectOption = { [key: string]: string };

type FormSelectWrapperProps = {
  label: React.ReactNode;
  options: selectOption[];
  onChange: (value: SelectValue) => void;
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  name: string;
  placeholder: string;
};

const { Option } = Select;

const FormSelectWrapper: React.FC<FormSelectWrapperProps> = ({
  label,
  options,
  onChange,
  getFieldDecorator,
  name,
  placeholder,
}: FormSelectWrapperProps) => {
  return (
    <FormFieldWrapper
      label={label}
      content={getFieldDecorator(
        name,
        {}
      )(
        <Select showArrow className="select" placeholder={`Select ${placeholder}`} onChange={onChange}>
          {options.map(
            (option): React.ReactNode => {
              return (
                <Option key={`advanced-option-${name}-${option.name}`} value={option.name}>
                  {option.name}
                </Option>
              );
            }
          )}
        </Select>
      )}
    />
  );
};

export default FormSelectWrapper;
