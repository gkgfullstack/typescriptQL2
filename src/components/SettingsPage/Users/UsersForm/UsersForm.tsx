import React, { SyntheticEvent, Fragment } from 'react';
import styles from './UsersForm.module.less';
import { FormComponentProps } from 'antd/lib/form';
import {
  Form,
  Input,
  Button,
  Alert,
} from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { useSettingsFetching } from '../../hooks';
import Select from 'src/components/common/Select';
import Spin from 'src/components/common/Spin';
import { SelectValue } from 'antd/lib/select';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const { Option } = Select;
export type SupportFormProps = FormComponentProps & {
  onUpdate: (values: any, form: any) => void;
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
console.log(hasErrors)
const formConfig: FormConfig = {
  Replyto: { rules: [{ required: true, message: 'Reply-To is required!' }], validateTrigger: 'onBlur' },
  Subject: { rules: [{ required: true, message: 'Subject is required!' }], validateTrigger: 'onBlur' },
  Description: { rules: [{ required: true, message: 'Description is required!' }], validateTrigger: 'onBlur' },
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
console.log(hasNoSetupRequiredFields)

const UsersForm: React.FC<SupportFormProps> = ({
  onUpdate,
  form }: SupportFormProps) => {
  const {
    getFieldDecorator,
    //getFieldsError,
    //getFieldsValue,
    //isFieldsTouched,
  } = form;
  const { data, loading, error } = useSettingsFetching();
  const responseLoaded = !loading && (data || error);
  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err) {
        const newSite: any = {
          ...values,
        };
        onUpdate(newSite, form);
      }
    });
    return false;
  };


  let timeZoneList: any = [];
  timeZoneList.push(data && data.TimeZoneList.map((timezone: any, key: number) => {
    return (
      <Option key={key} >
        {timezone}
      </Option >
    );
  }
  ));
  const onDurHoursChange = (value: SelectValue) => {
    form.setFieldsValue({ job_stop_dur_hour: value });
    return;
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
      ) : (<div className={styles.settingPage}>
        <Form  {...formItemLayout} onSubmit={handleSubmit}>
          <table>
            <thead><tr><td></td><td></td></tr></thead>
            <tbody>
              <tr data-row-key={`index-${11}` + 2} className={styles.labelTitlehead}>
                <td><h3 className={styles.labelTitle}>{'General'}</h3></td>
                <td></td>
              </tr>

              <tr data-row-key={`index-${12}` + 2} className={styles.labelTitlehead2}>
                <td>
                  <p>{'TimeZoneList'}</p></td>
                <td><Form.Item className={styles.formLable}>
                  {getFieldDecorator('timezone', (
                    formConfig.General, {
                      initialValue: data && data.userTimeZone,
                    }))(
                      <Select
                        onChange={onDurHoursChange}
                        className={styles.widthinput}
                      >
                        {timeZoneList}
                      </Select>
                    )}
                </Form.Item></td>
              </tr>
              
              {data && data.Settings.map((typesss: any, i: number) => (
                <Fragment>
                  <tr data-row-key={`index-${typesss.ApplicationName}` + i} className={styles.labelTitlehead}>
                    <td style={{ width: '50%' }}><h3 className={styles.labelTitle}>{typesss.ApplicationName}</h3></td>
                    <td style={{ width: '50%' }}></td>
                  </tr>
                  {typesss && typesss.Properties.map((types: any, i: number) => (
                    <tr data-row-key={`index-${types.id}` + i} className={styles.labelTitlehead2}>
                      <td style={{ width: '50%' }}><p className={styles.labelTitle}>{types.name}</p>
                        <Form.Item className={styles.formLable}>
                          {getFieldDecorator('settingsvaluesliststr', (
                            formConfig.Account, {
                              initialValue: types.id,
                            }))(
                              <Input type="hidden" />
                            )}
                        </Form.Item>
                      </td>
                      <td style={{ width: '50%' }}>
                        {types.type === "string" ? <Form.Item className={styles.formLable}>
                          {getFieldDecorator(`${types.id}`, (
                            formConfig.Hotels, {
                              initialValue: types.defaultvalue,
                            }))(
                              <Input />
                            )}
                        </Form.Item> : types.type === "number" ?
                            <Form.Item className={styles.formLable}>
                              {getFieldDecorator(`${types.id}`, (
                                formConfig.Hotels, {
                                  initialValue: types.defaultvalue,
                                }))(
                                  <Input type="number" />
                                )}
                            </Form.Item> : types.type === "select" ?
                              <Form.Item className={styles.formLable}>
                                {getFieldDecorator(`${types.id}`, (
                                  formConfig.Hotels, {
                                    initialValue: types.defaultvalue,
                                  }))(
                                    <Select
                                      onChange={onDurHoursChange}
                                      className={styles.widthinput}
                                    >
                                      {types.listvaluestr && types.listvaluestr.map((jobTable: { value: any; label: any; }) => {
                                        return (<Option value={jobTable.value} key={jobTable.value}>{jobTable.label}</Option >);
                                      }
                                      )}
                                    </Select>
                                  )}
                              </Form.Item>
                              : types.type === "checkbox" ?
                                <Form.Item className={styles.formLable}>
                                  {getFieldDecorator(`${types.id}`, (
                                    formConfig.Hotels, {
                                      initialValue: types.defaultvalue,
                                    }))(
                                      <input type="checkbox" />
                                    )}
                                </Form.Item> : ''}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td> <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
          </Button>
                </Form.Item></td>
              </tr>
            </tfoot>
          </table>
        </Form></div>))}

  </div>
  );

}
const WrappedJobPropertiesForm = Form.create<SupportFormProps>({ name: 'settings' })(UsersForm);
export default WrappedJobPropertiesForm;
