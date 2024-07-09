import React from 'react';
import { Row, Col, Collapse } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { options } from './CreateCruiseAdvancedOptions.config';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import GeoFieldWrapper from 'src/components/CreateNewSearch/GeoFieldWrapper';

const { Panel } = Collapse;

type CreateCruiseAdvancedOptionsProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  vertical: string;
};

const CreateCruiseAdvancedOptions: React.FC<CreateCruiseAdvancedOptionsProps> = ({
  getFieldDecorator,
  vertical,
}: CreateCruiseAdvancedOptionsProps) => {
  return (
    <Row>
      <Col span={16} offset={4}>
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
              <GeoFieldWrapper vertical={vertical} getFieldDecorator={getFieldDecorator} />
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default CreateCruiseAdvancedOptions;
