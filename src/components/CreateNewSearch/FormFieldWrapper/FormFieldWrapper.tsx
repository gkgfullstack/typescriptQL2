import React from 'react';

import { Col, Form, Divider } from 'antd';

type FormFieldWrapperProps = {
  label: React.ReactNode;
  content: any;
  isDivider?: boolean;
  layout?: {
    labelCol: { span: number };
    wrapperCol: { span: number };
  };
};

const defaultLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  label,
  content,
  isDivider = true,
  layout = defaultLayout,
}: FormFieldWrapperProps) => {
  return (
    <>
      <Col span={24}>
        <Form.Item {...layout} label={label}>
          {content}
        </Form.Item>
      </Col>
      {isDivider && <Divider className="dividerCustom" />}
    </>
  );
};

export default FormFieldWrapper;
