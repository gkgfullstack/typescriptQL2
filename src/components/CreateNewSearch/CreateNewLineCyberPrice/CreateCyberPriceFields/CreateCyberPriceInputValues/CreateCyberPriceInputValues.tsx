import React, { KeyboardEvent } from 'react';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { Input, Row } from 'antd';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import { options } from './CreateCyberPriceInputValues.config';

type CreateCyberPriceInputValuesProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  onAdd: () => void;
};

const CreateCyberPriceInputValues: React.FC<CreateCyberPriceInputValuesProps> = ({ getFieldDecorator,onAdd }) => {
  const onHandleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <Row>
      {options.map(({ label, name, placeholder }) => (
        <FormFieldWrapper
          key={`advanced-option-${name}`}
          label={label}
          content={getFieldDecorator(
            name,
            {}
          )(<Input type="text" placeholder={placeholder} onKeyDown={onHandleKeyDown} />)}
          isDivider={false}
        />
      ))}
    </Row>
  );
};

export default CreateCyberPriceInputValues;
