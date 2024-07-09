import React, { Fragment } from 'react';
import styles from './SettingsForm.module.less';
import { FormComponentProps } from 'antd/lib/form';
import {
  Form,
  Input,
  Button,
  Alert,
  Checkbox,
  Popover,
  //message
} from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { useSettingsFetching } from '../../hooks';
import Select from 'src/components/common/Select';
import Spin from 'src/components/common/Spin';
import { SelectValue } from 'antd/lib/select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from 'src/setupIcons';
// export type TooltipProps = {
//   content?: string;
// };
// export const ContentsssPop: React.FC<TooltipProps> = () => {
//   return (
//     <span className={styles.cnjobs}>
//       <Popover placement="top" content={contentsss2} >
//         <FontAwesomeIcon icon={['fas', 'question-circle']} className={styles.tooltipPopover} />
//       </Popover>
//     </span>
//   );
// };
// const contentsss2 = (
//   <div className={styles.contentsss}>
//     <p>This is a free form field you can use for sorting, formatting or filtering your output.</p>
//   </div>
// );
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

// type FormFields = {
//   [field: string]: any;
// };

type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};

// const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// };

const formConfig: FormConfig = {
  Replyto: { rules: [{ required: true, message: 'Reply-To is required!' }], validateTrigger: 'onBlur' },
  Subject: { rules: [{ required: true, message: 'Subject is required!' }], validateTrigger: 'onBlur' },
  Description: { rules: [{ required: true, message: 'Description is required!' }], validateTrigger: 'onBlur' },
};

// const hasNoSetupRequiredFields = (fields: FormFields): boolean => {
//   return Object.keys(fields).some(
//     field =>
//       fields[field] === undefined &&
//       formConfig[field] !== undefined &&
//       formConfig[field].rules !== undefined &&
//       formConfig[field].rules!.some(rule => rule.required !== undefined && rule.required)
//   );
// };

const SettingsForm: React.FC<SupportFormProps> = ({ onUpdate, form }: SupportFormProps) => {
  const {
    getFieldDecorator,
    //getFieldsError,
    //getFieldsValue,
    //isFieldsTouched,
  } = form;
  const { data, loading, error } = useSettingsFetching();
  //const emailListParamsList = data && data.emailListParams.map(emailList => (emailList))
  // const emailListParamsList = data
  //   ? (data.Settings[0].Properties || []).map(emailList => ({
  //     emailList:emailList.validation
  //   })) : [];
  const responseLoaded = !loading && (data || error);
  const onDurHoursChange = (value: SelectValue) => {
    console.log(`selected ${value}`);
  };
  const handleSubmit = (event: any): boolean => {
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

  const timeZoneList: any = [];
  timeZoneList.push(
    data &&
      data.TimeZoneList.map((label: any) => {
        return (
          <Option value={label} key={label}>
            {label}
          </Option>
        );
      })
  );

  // const _value =
  // !loading && !error
  //   ? valuess &&
  //   data &&
  //   data.Settings.Properties.listvaluestr.some((appId: any) => {
  //       return appId.ID === valuess;
  //     })
  //     ? valuess
  //     : undefined
  //   : undefined;

  return (
    <div className={styles.matches_filter_wrapper}>
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
            <Form {...formItemLayout} onSubmit={handleSubmit}>
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr data-row-key={`index-${11}` + 2}>
                    <td>
                      <h3 className={styles.labelTitle}>{'General'}</h3>
                    </td>
                    <td></td>
                  </tr>
                  <tr data-row-key={`index-${12}` + 2}>
                    <td>
                      <p>{'Time Zone'}</p>
                    </td>
                    <td>
                      <Form.Item className={styles.formLable}>
                        {getFieldDecorator(
                          'timezone',
                          (formConfig.General,
                          {
                            initialValue: data && data.userTimeZone,
                          })
                        )(
                          <Select onChange={onDurHoursChange} className={styles.widthinput} showSearch>
                            {timeZoneList}
                          </Select>
                        )}
                      </Form.Item>
                    </td>
                  </tr>
                  <tr className={styles.labelTitlehead}>
                    <td></td>
                    <td></td>
                  </tr>
                  {data &&
                    data.Settings.map((typesss: any, i: number) => (
                      <Fragment>
                        <tr data-row-key={`index-${typesss.ApplicationName}` + i}>
                          <td style={{ width: '50%' }}>
                            <h3 className={styles.labelTitle}>{typesss.ApplicationName}</h3>
                          </td>
                          <td style={{ width: '50%' }}></td>
                        </tr>

                        {typesss &&
                          typesss.Properties.map((types: any, i: number) => (
                            <tr data-row-key={`index-${types.id}` + i}>
                              <td style={{ width: '50%' }}>
                                {types.name === 'Custom Date Format' ? (
                                  <Form.Item className={styles.formLable}>
                                    {getFieldDecorator(
                                      'validateparam',
                                      (formConfig.Account,
                                      {
                                        initialValue: types.id,
                                      })
                                    )(<Input type="hidden" />)}
                                  </Form.Item>
                                ) : (
                                  ''
                                )}
                                {types.validation === 'email' ? (
                                  <p className={styles.labelTitle}>
                                    {types.name}
                                    <span className={styles.cnjobs}>
                                      <Popover
                                        className={styles.popoverLayout}
                                        placement="topRight"
                                        title={
                                          <Fragment>
                                            <h5>{types.helpcompany} Help</h5>
                                            <p>{types.helptitle}</p>
                                          </Fragment>
                                        }
                                        content={
                                          <Fragment>
                                            <p>{types.helpcontent.split('<p>')}</p>
                                          </Fragment>
                                        }
                                        trigger="click"
                                        arrowPointAtCenter
                                      >
                                        <FontAwesomeIcon
                                          icon={faQuestion}
                                          className={styles.tooltipPopover}
                                          size={'sm'}
                                        />
                                      </Popover>
                                    </span>
                                  </p>
                                ) : (
                                  <p className={styles.labelTitle}>{types.name}</p>
                                )}
                              </td>
                              <td style={{ width: '50%' }}>
                                {types.validation === 'email' ? (
                                  <Form.Item className={styles.formLable}>
                                    {getFieldDecorator(
                                      `${types.id}`,
                                      (formConfig.Hotels + `${types.id}`,
                                      {
                                        rules: [
                                          {
                                            // type: 'email',
                                            message: 'The input is not valid E-mail!',
                                            pattern: /^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,4}\s*?,?\s*?)+$/,
                                          },
                                        ],
                                        initialValue:
                                          types.defaultvalue === 'null' || '' || null ? '' : types.defaultvalue,
                                      })
                                    )(<Input type="email" multiple />)}
                                  </Form.Item>
                                ) : types.type === 'string' ? (
                                  <Form.Item className={styles.formLable}>
                                    {getFieldDecorator(
                                      `${types.id}`,
                                      (formConfig.Hotels + `${types.id}`,
                                      {
                                        initialValue: types.defaultvalue,
                                      })
                                    )(<Input />)}
                                  </Form.Item>
                                ) : types.type === 'number' ? (
                                  <Form.Item className={styles.formLable}>
                                    {getFieldDecorator(
                                      `${types.id}`,
                                      (formConfig.Hotels + `${types.id}`,
                                      {
                                        initialValue: types.defaultvalue,
                                      })
                                    )(<Input type="number" min={0} max={100} />)}
                                  </Form.Item>
                                ) : types.type === 'select' ? (
                                  <Form.Item className={styles.formLable}>
                                    {getFieldDecorator(
                                      `${types.id}`,
                                      (formConfig.Hotels + `${types.id}`,
                                      {
                                        initialValue: types.defaultvalue,
                                      })
                                    )(
                                      <Select
                                        onChange={onDurHoursChange}
                                        className={styles.widthinput}
                                        value={types.defaultvalue}
                                      >
                                        {types.listvaluestr &&
                                          types.listvaluestr.map((jobTable: { value: any; label: any }) => {
                                            return (
                                              <Option value={jobTable.value.toString()} key={jobTable.value.toString()}>
                                                {jobTable.label}
                                              </Option>
                                            );
                                          })}
                                      </Select>
                                    )}
                                  </Form.Item>
                                ) : types.type === 'checkbox' ? (
                                  <Form.Item className={styles.formLable}>
                                    {getFieldDecorator(
                                      `${types.id}`,
                                      (formConfig.Hotels + `${types.id}`,
                                      {
                                        initialValue: types.defaultvalue,
                                      })
                                    )(
                                      <Checkbox
                                        indeterminate={false}
                                        defaultChecked={types.defaultvalue === '1' ? true : false}
                                      >
                                      </Checkbox>
                                    )}
                                  </Form.Item>
                                ) : (
                                  ''
                                )}
                              </td>
                            </tr>
                          ))}
                        <tr className={styles.labelTitlehead}>
                          <td></td>
                          <td></td>
                        </tr>
                      </Fragment>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td>
                      {' '}
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Form>
          </div>
        ))}
    </div>
  );
};
const WrappedJobPropertiesForm = Form.create<SupportFormProps>({ name: 'settings' })(SettingsForm);
export default WrappedJobPropertiesForm;
