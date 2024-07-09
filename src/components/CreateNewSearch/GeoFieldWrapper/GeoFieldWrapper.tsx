import React from 'react';
import { Col, Form, Input } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { Contentsss16Pop } from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItemTooltip';
import { useAppParamFetch } from 'src/components/CreateNewSearch/CreateNewLineItem/hooks';

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

type GeoFieldWrapperProps = {
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  id?: string;
  vertical: string | undefined;
};

const GeoFieldWrapper: React.FC<GeoFieldWrapperProps> = ({
  id = 'geo',
  vertical = '',
  getFieldDecorator,
}: GeoFieldWrapperProps) => {
  const [{ data: AppParamResponse }] = useAppParamFetch(vertical);
  return (
    <>
      {AppParamResponse?.bAllowGeoShopping && (
        <Col span={24}>
          <Form.Item
            {...layout}
            label={
              <h6>
                Geo
                <Contentsss16Pop />
              </h6>
            }
          >
            {getFieldDecorator(id, {})(<Input placeholder="Please enter Geo" />)}
          </Form.Item>
        </Col>
      )}
    </>
  );
};

export default GeoFieldWrapper;
