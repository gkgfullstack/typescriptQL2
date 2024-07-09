import React, { useState } from 'react';
import CreateCyberPriceAdvancedOptions from './CreateCyberPriceAdvancedOptions';
import { Button, Input } from 'antd';
import CreateCyberPriceInputValues from './CreateCyberPriceInputValues';
import styles from './CreateCyberPriceFields.module.less';
import Form, { GetFieldDecoratorOptions } from 'antd/lib/form/Form';

type CreateCyberPriceFieldsProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  setFieldsValue: (values: {}) => void;
  getFieldsValue: (fieldNames?: Array<string>) => { [field: string]: any };
  onSetInputValues: (values: string) => void;
};

export type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};
export const formConfig: FormConfig = {
  Addname: { rules: [{ required: true, message: 'Input Values is required!' }], validateTrigger: 'onBlur' },
};

const { TextArea } = Input;

const CreateCyberPriceFields: React.FC<CreateCyberPriceFieldsProps> = ({
  getFieldDecorator,
  setFieldsValue,
  getFieldsValue,
  onSetInputValues,
}) => {
  const [fieldsResult, setFieldsResult] = useState<any>('');

  const onAddInputValues = () => {
    let result = Object.values(
      getFieldsValue([
        'productNumber',
        'secondaryProductNumber',
        'manufacturer',
        'reference',
        'zipCode',
        'siteUsername',
        'sitePassword',
        'secondPassword',
      ])
    ).join(', ');

    if (fieldsResult) {
      result = fieldsResult + `\n${result}`;
    }

    setFieldsResult(result);
    setFieldsValue({ productNumber: '', secondaryProductNumber: '', manufacturer: '', reference: '', zipCode: '' });
    onSetInputValues(result);
  };
  const onHandleKeyDown = (event: any) => {
    setFieldsResult(event.target.value)
    setFieldsValue(event.target.value);
    onSetInputValues(event.target.value);
  };

  return (
    <div className={'ant-row ant-form-item'}>
      <div className="ant-col ant-col-9 ant-form-item-label">
        <label>
          <h6>Input Values</h6>
        </label>
      </div>
      <div className={`ant-col ant-col-15 ant-form-item-control-wrapper ${styles.cyberPrice_fields_wrapper}`}>
        <CreateCyberPriceInputValues getFieldDecorator={getFieldDecorator} onAdd={onAddInputValues} />
        <CreateCyberPriceAdvancedOptions
          getFieldDecorator={getFieldDecorator}
          setFieldsValue={setFieldsValue}
          onAdd={onAddInputValues}
        />
        <div className={styles.cyberprice_button_wrapper}>
          <Button type="primary" onClick={onAddInputValues} disabled={Boolean(fieldsResult)}>
            Add
          </Button>
        </div>
        <Form.Item>
                {getFieldDecorator(
                  'addname',
                  formConfig.Addname
                )( <TextArea
                  rows={3}
                  value={fieldsResult.replaceAll(' ,', '')}
                  onChange={onHandleKeyDown}
                />)}
              </Form.Item>
       
      </div>
    </div>
  );
};

export default CreateCyberPriceFields;
