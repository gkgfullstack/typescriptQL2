import React, { SyntheticEvent, useEffect } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button } from 'antd';
import styles from './EditDiagnosticForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';

type EditDiagnosticFormProps = FormComponentProps & {
  maxRun: any;
  onSave: (values: any) => void;
};

type FormFields = {
  [field: string]: any;
};

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const formConfig: FormConfig = {};

const hasRequiredFields = (fields: FormFields): boolean => {
  return Object.keys(fields).some(
    field =>
      (fields[field] === undefined || fields[field] === '') &&
      formConfig[field] !== undefined &&
      formConfig[field].rules !== undefined &&
      formConfig[field].rules!.some(rule => rule.required !== undefined && rule.required)
  );
};

export const EditDiagnosticForm: React.FC<EditDiagnosticFormProps> = ({
  maxRun,
  form,
  onSave,
}: EditDiagnosticFormProps) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const disableSubmit =
    hasErrors(getFieldsError()) ||
    hasRequiredFields(getFieldsValue()) ||
    !getFieldsValue().name ||
    getFieldsValue().name === '';

  useEffect(() => {
    if (maxRun && maxRun.name) {
      form.setFieldsValue({ name: maxRun.name });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxRun]);

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err) {
        const newMaxRun = {
          ...values,
        };
        onSave(newMaxRun);
      }
    });
    return false;
  };

  return (
    <div className={styles.max_run_form_wrapper}>
      <h1 className={styles.form_title}>Rename Run</h1>
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit} className={styles.form_wrapper}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Run Name:">
                {getFieldDecorator('name', formConfig.City)(<Input type="text" placeholder="Please enter Run Name" />)}
              </Form.Item>
            </Col>
            <Col className={styles.buttons_wrapper} span={24}>
              <Col span={24}>
                <Button block type="primary" htmlType="submit" disabled={disableSubmit} className={styles.save_max_run}>
                  Save
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const WrappedEditDiagnosticForm = Form.create<EditDiagnosticFormProps>({ name: 'name' })(EditDiagnosticForm);
export default WrappedEditDiagnosticForm;
