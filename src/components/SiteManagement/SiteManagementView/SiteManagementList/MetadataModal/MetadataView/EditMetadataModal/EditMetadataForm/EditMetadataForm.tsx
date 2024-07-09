import React, { SyntheticEvent, useEffect } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, InputNumber, Button } from 'antd';
import styles from './EditMetadataForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import SiteInfo from 'src/components/common/SiteInfo';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import MetadataInfo from 'src/types/MetadataInfo';

type EditMetadataFormProps = FormComponentProps & {
  site: SiteManagementInfo;
  schema: string | undefined;
  onSave: (values: MetadataInfo) => void;
  metadata: MetadataInfo;
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

const formConfig: FormConfig = {
  name: { rules: [{ required: true, message: 'Metadata Name is required!' }], validateTrigger: 'onBlur' },
  label: { rules: [{ required: true, message: 'Metadata Label is required!' }], validateTrigger: 'onBlur' },
  tableRef: { rules: [{ required: true, message: 'Database Table/Field is required!' }], validateTrigger: 'onBlur' },
  weight: { rules: [{ required: true, message: 'Weight is required!' }], validateTrigger: 'onBlur' },
};

const hasRequiredFields = (fields: FormFields): boolean => {
  return Object.keys(fields).some(
    field =>
      (fields[field] === undefined || fields[field] === '') &&
      formConfig[field] !== undefined &&
      formConfig[field].rules !== undefined &&
      formConfig[field].rules!.some(rule => rule.required !== undefined && rule.required)
  );
};

export const EditMetadataForm: React.FC<EditMetadataFormProps> = ({
  site,
  schema,
  form,
  onSave,
  metadata,
}: EditMetadataFormProps) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const disableSubmit =
    hasErrors(getFieldsError()) ||
    hasRequiredFields(getFieldsValue()) ||
    !getFieldsValue().name ||
    getFieldsValue().name === '';

  useEffect(() => {
    if (metadata && form) {
      if (metadata.name) {
        form.setFieldsValue({ name: metadata.name });
      }
      if (metadata.label) {
        form.setFieldsValue({ label: metadata.label });
      }
      if (metadata.tableRef) {
        form.setFieldsValue({ tableRef: metadata.tableRef });
      }
      if (metadata.weight) {
        form.setFieldsValue({ weight: metadata.weight });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata]);

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: MetadataInfo) => {
      if (!err) {
        const newMetadata = {
          ...values,
          ID: metadata.ID,
        };
        onSave(newMetadata);
      }
    });
    return false;
  };

  const getTitle = (metadata: MetadataInfo) => {
    return metadata.ID ? 'Edit Metadata' : 'Add Metadata';
  };

  const getButtonLabel = (metadata: MetadataInfo) => {
    return metadata.ID ? 'Save' : 'Create Metadata';
  };

  return (
    <div className={styles.create_metadata_form_wrapper}>
      <h1 className={styles.create_metadata_title}>{getTitle(metadata)}</h1>
      <SiteInfo site={site} schema={schema} />
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit} className={styles.create_metadata_form}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Metadata Label:">
                {getFieldDecorator(
                  'label',
                  formConfig.Label
                )(<Input type="text" placeholder="Please enter Metadata Label" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Metadata Name:">
                {getFieldDecorator(
                  'name',
                  formConfig.Name
                )(<Input type="text" placeholder="Please enter Metadata Name" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Database Table/Field:">
                {getFieldDecorator(
                  'tableRef',
                  formConfig.Table
                )(<Input type="text" placeholder="Please enter Database Table/Field" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Weight:">
                {getFieldDecorator(
                  'weight',
                  formConfig.Weight
                )(
                  <InputNumber
                    placeholder="Please enter Weight from 0 to 1.00"
                    min={0}
                    max={1}
                    step={0.01}
                    precision={2}
                  />
                )}
              </Form.Item>
            </Col>
            <Col className={styles.create_metadata_buttons_wrapper} span={24}>
              <Col span={24}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={disableSubmit}
                  className={styles.save_new_metadata}
                >
                  {getButtonLabel(metadata)}
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const WrappedEditMetadataForm = Form.create<EditMetadataFormProps>({ name: 'name' })(EditMetadataForm);
export default WrappedEditMetadataForm;
