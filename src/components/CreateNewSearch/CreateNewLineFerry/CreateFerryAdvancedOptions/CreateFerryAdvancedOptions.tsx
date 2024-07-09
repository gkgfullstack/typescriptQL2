import React from 'react';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { Row, Collapse } from 'antd';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import { options } from './CreateFerryAdvancedOptions.config';

const { Panel } = Collapse;

type CreateFerryAdvancedOptions = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
};

const CreateFerryAdvancedOptions: React.FC<CreateFerryAdvancedOptions> = ({
  getFieldDecorator,
}: CreateFerryAdvancedOptions) => {
  return (
    <Collapse defaultActiveKey={['0']} expandIconPosition="right" bordered={false}>
      <Panel header={'Advanced options'} key={'1'} className={'advancedOptions'}>
        <Row>
          {options.length &&
            options.map(({ label, name, content, defaultValue }) => (
              <FormFieldWrapper
                key={`advanced-option-${name}`}
                label={label}
                content={getFieldDecorator(name, defaultValue)(content)}
              />
            ))}
        </Row>
      </Panel>
    </Collapse>
  );
};

export default CreateFerryAdvancedOptions;
