import React, { SyntheticEvent, Fragment } from 'react';
import styles from './ChangePasswordForm.module.less';
import { FormComponentProps } from 'antd/lib/form';
import {
  Form,
  Input,
  Button,
  Alert,
  Popover,
} from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { useChangePasswordFetching } from '../../hooks';
import Spin from 'src/components/common/Spin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from 'src/setupIcons';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
const tailFormItemLayout = {
  wrapperCol: { span: 14, offset: 8 },
};
export type SupportFormProps = FormComponentProps & {
  onUpdate: (values: any, form: any) => void;
};
type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};
const formConfig: FormConfig = {
  OldPassword: { rules: [{ required: true, message: 'Old Password is required!' }], validateTrigger: 'onBlur' },
  NewPassword: { rules: [{ required: true, message: 'New Password is required!' }], validateTrigger: 'onBlur' },
  VerifyNewPassword: { rules: [{ required: true, message: 'Verify New Password is required!' }], validateTrigger: 'onBlur' },
};

const ChangePasswordForm: React.FC<SupportFormProps> = ({
  onUpdate, form }: SupportFormProps) => {
  const {
    getFieldDecorator,
    getFieldsError,
  } = form;
  const { data: helpdata, loading, error } = useChangePasswordFetching();
  const responseLoaded = !loading && (helpdata || error);
  const [checkNick, setCheckNick] = React.useState(true);
  React.useEffect(() => {
    form.validateFields(['passwordold', 'passwordnew', 'passwordverify']);
  }, [checkNick]);
  const onCheck = (event: SyntheticEvent): any => {
    event.preventDefault();
    setCheckNick(true);
    onUpdate({ ischangepasswordflag: false }, form);
  };
  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    setCheckNick(false);
    form.validateFields((err, values: any) => {
      if (!err) {
        const newSite: any = {
          ...values,
          ischangepasswordflag: true
        };
        onUpdate(newSite, form);
      }
    });
    return false;
  };
  return (<div className={styles.matches_filter_wrapper}>
    {loading && (
      <div className={styles.filters_spinner}>
        <Spin spinning={loading} />
      </div>
    )}
    {responseLoaded &&
      (error ? (
        <div className={styles.filters_error}>
          <Alert
            message="An error
        has occurred when trying to get support fields! Please try again later!"
            type="error"
            showIcon
          />
        </div>
      ) : (
          <div className={styles.settingPage}>
            <span className={styles.cnjobs} style={{ marginLeft: '15px' }}>
              <Popover className={styles.popoverLayout} placement="topRight"
                title={<Fragment><h5>
                  {helpdata && helpdata?.sWebsiteName} Help</h5><p>Change Password</p></Fragment>}
                content={<Fragment><h5>To change your password, fill in the fields within the Change Password box.</h5>
                  <p>Below are restrictions regarding passwords: </p>
                  <ul>
                    <li>All passwords must be a minimum of 6 characters in length.
                          </li><li>All passwords must have at least 5 different characters.
                          </li><li>A password cannot be based on an English dictionary word.
                          </li><li>A username cannot be part of a password.
                          </li><li>If you change your password you cannot reuse your last two passwords.
                        </li></ul>
                  <p>Error messages will alert you to any violations of these restrictions.</p></Fragment>} trigger="click" arrowPointAtCenter>
                <FontAwesomeIcon icon={faQuestion} className={styles.tooltipPopover} size={"sm"} />
              </Popover>
            </span>
            <Form  {...formItemLayout} >

              <Form.Item label="Old password">
                {getFieldDecorator('passwordold', (
                  formConfig.OldPassword, {
                    rules: [
                      {
                        required: checkNick === false ? false : true,
                        message: 'Please input your Old password',
                      },
                    ],
                  }))(
                    <Input type="password" />
                  )}
              </Form.Item>
              <Form.Item label="New password">
                {getFieldDecorator('passwordnew', (
                  formConfig.NewPassword, {
                    rules: [
                      {
                        required: checkNick === false ? false : true,
                        message: 'Please input your New password',
                      },
                    ],
                  }))(
                    <Input type="password" />
                  )}
              </Form.Item>
              <Form.Item label="Verify new password">
                {getFieldDecorator('passwordverify', (
                  formConfig.VerifyNewPassword, {
                    rules: [
                      {
                        required: checkNick === true ? true : false,
                        message: 'Please input your Verify new password',
                      },
                    ],
                  }))(
                    <Input type="password" />
                  )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button onClick={onCheck} style={{ border: '1px solid #DDD' }} htmlType="submit">
                  Cancel
          </Button>
                <Button onClick={handleSubmit} disabled={hasErrors(getFieldsError())} type="primary" htmlType="submit">
                  Change Password
          </Button>

              </Form.Item>
            </Form>
          </div>
        ))}
  </div>
  );
}
const WrappedChangePasswordForm = Form.create<SupportFormProps>({ name: 'changePassword' })(ChangePasswordForm);
export default WrappedChangePasswordForm;
