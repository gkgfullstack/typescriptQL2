import React, { ReactElement, SyntheticEvent, useEffect } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button, Select } from 'antd';
import styles from './EditUserAccountForm.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { SelectValue } from 'antd/lib/select';
import { useSettingsFetching } from 'src/components/SettingsPage/hooks';
import { UserAccountInfo } from 'src/types/UserAccountInfo';

const { Option } = Select;

type EditUserAccountFormProps = FormComponentProps & {
  onSave: (values: UserAccountInfo) => void;
  userAccount: UserAccountInfo;
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

export const EditUserAccountForm: React.FC<EditUserAccountFormProps> = ({
  form,
  onSave,
  userAccount,
  errorMessage,
}: EditUserAccountFormProps) => {
  const { data } = useSettingsFetching();
  const timeZoneOptions: any = data ? data.TimeZoneList : [];
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const disableSubmit = hasErrors(getFieldsError()) || hasRequiredFields(getFieldsValue());

  useEffect(() => {
    if (userAccount && form) {
      form.setFieldsValue({ name: userAccount.accountName });
      form.setFieldsValue({ timeZone: userAccount.timeZone });
      if (userAccount.userEmail) {
        form.setFieldsValue({ email: userAccount.userEmail });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAccount]);

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: UserAccountInfo) => {
      if (!err) {
        const updatedAccount: any = {
          name: values.name,
          password: values.password,
          timeZone: values.timeZone,
          email: values.email,
          accountId: userAccount.accountId,
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
    <div className={styles.edit_account_form}>
      <h1>Edit Account id: {userAccount.accountId}</h1>
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Name:">
                {getFieldDecorator('name', formConfig.name)(<Input type="text" placeholder="Please enter Name" />)}
              </Form.Item>
              {errorMessage && <span className={styles.error_message}>{errorMessage}</span>}
            </Col>
            <Col span={24}>
              <Form.Item label="Password:">
                {getFieldDecorator(
                  'password',
                  formConfig.password
                )(<Input type="text" placeholder="Please change Password here" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Email:">
                {getFieldDecorator('email', formConfig.email)(<Input type="text" placeholder="Please enter Email" />)}
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
              <Col span={24}>
                <Button block type="primary" htmlType="submit" disabled={disableSubmit} className={styles.save_account}>
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

const WrappedEditUserAccountFormForm = Form.create<EditUserAccountFormProps>({ name: 'name' })(EditUserAccountForm);
export default WrappedEditUserAccountFormForm;
