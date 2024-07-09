import React, { SyntheticEvent } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button } from 'antd';
import styles from './CreateNewSearchForm.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import SelectVertical from '../SelectVertical';
import { SearchNameRequest } from 'src/api/createNewSearchConfig';

export type AddSearchNameFormProps = FormComponentProps & {
  addSearchName: (values: SearchNameRequest, isUploadFile?: boolean) => void;
};
const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};
type FormFields = {
  [field: string]: any;
};

export type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

export const formConfig: FormConfig = {
  SearchName: { rules: [{ required: true, message: 'Search name is required!' }], validateTrigger: 'onBlur' },
  Vertical: { rules: [{ required: true, message: 'Select the Vertical name' }], validateTrigger: 'onChange' },
};

const hasNoSetupRequiredFields = (fields: FormFields): boolean => {
  return Object.keys(fields).some(
    field =>
      fields[field] === undefined &&
      formConfig[field] !== undefined &&
      formConfig[field].rules !== undefined &&
      formConfig[field].rules!.some(rule => rule.required !== undefined && rule.required)
  );
};

export const CreateNewSearchForm: React.FC<AddSearchNameFormProps> = ({
  form,
  addSearchName,
}: AddSearchNameFormProps) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const disableSubmit =
    hasErrors(getFieldsError()) ||
    (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
    !isFieldsTouched();

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: SearchNameRequest) => {
      if (!err) {
        if (addSearchName) {
          addSearchName(values);
        }
      }
    });
    return false;
  };

  const onUploadFile = () => {
    form.validateFields((err, values: SearchNameRequest) => {
      if (!err) {
        if (addSearchName) {
          addSearchName(values, true);
        }
      }
    });
  };

  return (
    <div className={styles.cnjobs}>
      <h1>Create a new search</h1>
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Search Name:">
                {getFieldDecorator(
                  'SearchName',
                  formConfig.SearchName
                )(<Input type="text" placeholder="Please enter Search Name" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Select Vertical:">
                {getFieldDecorator(
                  'vertical',
                  formConfig.Vertical
                )(
                  <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                    <SelectVertical />
                  </div>
                )}
              </Form.Item>
            </Col>
            <Col span={24} style={{ marginTop: '80px' }}>
              <Col span={10}>
                <Button
                  block
                  onClick={onUploadFile}
                  disabled={disableSubmit}
                  style={{
                    display: 'table',
                    maxWidth: '300px',
                    padding: '10px',
                    height: 'auto',
                  }}
                >
                  <FontAwesomeIcon
                    icon={['fal', 'upload']}
                    className={styles.icon}
                    style={{ margin: '0px 15px 0px 0px' }}
                  />{' '}
                  Upload File
                </Button>
              </Col>
              <Col span={4} style={{ fontSize: '16px', lineHeight: '42px' }}>
                or
              </Col>
              <Col span={10}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={disableSubmit}
                  style={{
                    margin: ' 0px auto',
                    display: 'table',
                    maxWidth: '300px',
                    padding: '10px',
                    height: 'auto',
                  }}
                >
                  <FontAwesomeIcon
                    icon={['fas', 'tools']}
                    className={styles.icon}
                    style={{ margin: '0px 15px 0px 0px' }}
                  />
                  Configure
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const WrappedDateFilterForm = Form.create<AddSearchNameFormProps>({ name: 'name' })(CreateNewSearchForm);
export default WrappedDateFilterForm;
