import React, { ReactElement, SyntheticEvent, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button, Select } from 'antd';
import styles from './CreateUserAccountForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { SelectValue } from 'antd/lib/select';
import { useSettingsFetching } from '../../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { UserAccountInfo } from 'src/types/UserAccountInfo';

const { Option } = Select;
const faToggleOffIcon = faToggleOff as IconProp;
const faToggleOnIcon = faToggleOn as IconProp;

type CreateUserAccountFormProps = FormComponentProps & {
  onSave: (values: UserAccountInfo) => void;
  errorMessage: string;
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
  name: { rules: [{ required: true, message: 'Account name is required!' }], validateTrigger: 'onBlur' },
  password: { rules: [{ required: true, message: 'Password is required!' }], validateTrigger: 'onBlur' },
  timeZone: { rules: [{ required: true, message: 'Time Zone is required!' }], validateTrigger: 'onBlur' },
};

const hasRequiredFields = (fields: FormFields): boolean => {
  return Object.keys(fields).some(
    field =>
      fields[field] === undefined &&
      formConfig[field] !== undefined &&
      formConfig[field].rules !== undefined &&
      formConfig[field].rules!.some(rule => rule.required !== undefined && rule.required)
  );
};

export const CreateUserAccountForm: React.FC<CreateUserAccountFormProps> = ({
  form,
  onSave,
  errorMessage,
}: CreateUserAccountFormProps) => {
  const { data } = useSettingsFetching();
  const timeZoneOptions: any = data ? data.TimeZoneList : [];
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const disableSubmit =
    hasErrors(getFieldsError()) || (isFieldsTouched() && hasRequiredFields(getFieldsValue())) || !isFieldsTouched();
  const [statusEnabled, setStatusEnabled] = useState(true);

  const onToggle = () => {
    const isStatusEnabled = !statusEnabled;
    setStatusEnabled(isStatusEnabled);
  };

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: UserAccountInfo) => {
      if (!err) {
        const updatedAccount: any = {
          name: values.name,
          password: values.password,
          timeZone: values.timeZone,
          email: values.email,
          accountId: '-1',
          enableAccount: statusEnabled,
        };
        onSave(updatedAccount);
      }
    });
    return false;
  };

  const onTimeZoneChange = (value: SelectValue) => {
    form.setFieldsValue({ timeZone: value });
    return;
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <div className={styles.create_new_account_form}>
      <h1>Create New Account</h1>
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Name:">
                {getFieldDecorator('name', formConfig.Name)(<Input type="text" placeholder="Please enter Name" />)}
              </Form.Item>
              {errorMessage && <span className={styles.error_message}>{errorMessage}</span>}
            </Col>
            <Col span={24}>
              <Form.Item label="Password:">
                {getFieldDecorator(
                  'password',
                  formConfig.Password
                )(<Input type="text" placeholder="Please enter Password" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Email:">
                {getFieldDecorator('email', formConfig.Email)(<Input type="text" placeholder="Please enter Email" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Time Zone:">
                {getFieldDecorator(
                  'timeZone',
                  formConfig.timeZone
                )(
                  <Select
                    placeholder="Select Time Zone"
                    onChange={onTimeZoneChange}
                    allowClear
                    showSearch
                    filterOption={onSearchFilter}
                  >
                    {timeZoneOptions &&
                      timeZoneOptions.map(
                        (option: any, i: number): React.ReactNode => {
                          return (
                            <Option value={option} key={`user-account-time-zone-${option}-${i}`}>
                              {option}
                            </Option>
                          );
                        }
                      )}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <p className={styles.user_status}>
                <span className={styles.user_status_label} onClick={onToggle}>
                  Enable Account
                </span>
                {statusEnabled ? (
                  <FontAwesomeIcon
                    icon={faToggleOnIcon}
                    className={styles.status_active_icon}
                    onClick={onToggle}
                    size="lg"
                  />
                ) : (
                  <FontAwesomeIcon
                    onClick={onToggle}
                    icon={faToggleOffIcon}
                    className={styles.status_inactive_icon}
                    size="lg"
                  />
                )}
              </p>
            </Col>
            <Col span={24}>
              <Col span={24}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={disableSubmit}
                  className={styles.save_new_account}
                >
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

const WrappedCreateUserAccountFormForm = Form.create<CreateUserAccountFormProps>({ name: 'name' })(
  CreateUserAccountForm
);
export default WrappedCreateUserAccountFormForm;
