import React from 'react';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import CreateAutopartYMME from './CreateAutopartYMME';
import { Collapse, Row, Col } from 'antd';
import { autopartOptions } from './CreateAutopartAdvancedOptions.config';
import FormFieldWrapper from 'src/components/CreateNewSearch/FormFieldWrapper';
import GeoFieldWrapper from '../../GeoFieldWrapper';

const { Panel } = Collapse;
const defaultLayout = {
  span: 16,
  offset: 4,
};

type CreateAutopartAdvancedOptionsProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  setFieldsValue: (object: object, callback?: Function) => void;
  getFieldValue: (fieldName: string) => any;
  getFieldsValue: (fieldNames?: Array<string>) => { [key: string]: any };
  enableYMME: boolean;
  searchType?: string;
  layout?: {
    span: number;
    offset?: number;
  };
  isDivider?: boolean;
  vertical: string;
};

const getAdvancedOptions = (type: string | undefined) => {
  if (
    type &&
    (type === 'keyword/url' ||
      type === 'bookmark' ||
      type === 'spider' ||
      type === 'fitment spider' ||
      type === 'category crawl' ||
      type === 'product pull')
  ) {
    return autopartOptions;
  }
  return [];
};

const CreateAutopartAdvancedOptions: React.FC<CreateAutopartAdvancedOptionsProps> = ({
  getFieldDecorator,
  enableYMME,
  searchType,
  setFieldsValue,
  getFieldValue,
  getFieldsValue,
  vertical,
  layout = defaultLayout,
  isDivider = true,
}: CreateAutopartAdvancedOptionsProps) => {
  const options = getAdvancedOptions(searchType);
  const isAdvancedOptionsVisible = (): boolean => enableYMME || options.length > 0;

  return isAdvancedOptionsVisible() ? (
    <Col {...layout}>
      <Collapse defaultActiveKey={['0']} expandIconPosition="right" bordered={false}>
        <Panel header={'Advanced options'} key={'1'} className={'advancedOptions'}>
          <Row>
            {enableYMME && (
              <CreateAutopartYMME
                vertical={vertical}
                isDivider={isDivider}
                getFieldsValue={getFieldsValue}
                getFieldValue={getFieldValue}
                setFieldsValue={setFieldsValue}
                getFieldDecorator={getFieldDecorator}
              />
            )}

            {options.map(({ label, name, content }) => (
              <FormFieldWrapper
                key={`advanced-option-${name}`}
                label={label}
                content={getFieldDecorator(name, {})(content)}
              />
            ))}
            <GeoFieldWrapper vertical={vertical} getFieldDecorator={getFieldDecorator} />
          </Row>
        </Panel>
      </Collapse>
    </Col>
  ) : null;
};

export default CreateAutopartAdvancedOptions;
