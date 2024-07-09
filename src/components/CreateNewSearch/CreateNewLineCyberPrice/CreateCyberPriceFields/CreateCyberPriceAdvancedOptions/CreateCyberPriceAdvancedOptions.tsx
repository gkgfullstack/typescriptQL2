import React, { KeyboardEvent } from 'react';
import { Row, Col, Collapse, Input } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { options } from './CreateCyberPriceAdvancedOptions.config';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
const { Panel } = Collapse;

type CreateCyberPriceAdvancedOptionsProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  setFieldsValue: (values: {}) => void;
  onAdd: () => void;
};

const CreateCyberPriceAdvancedOptions: React.FC<CreateCyberPriceAdvancedOptionsProps> = ({
  getFieldDecorator,
  setFieldsValue,
  onAdd,
}) => {
  const collapseChangeHandler = () => {
    setFieldsValue({ siteUsername: '', sitePassword: '', secondPassword: '' });
  };

  const onHandleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Collapse defaultActiveKey={['0']} expandIconPosition="right" bordered={false} onChange={collapseChangeHandler}>
          <Panel forceRender={true} header={'Advanced options'} key={'1'} className={'advancedOptions'}>
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
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default CreateCyberPriceAdvancedOptions;
