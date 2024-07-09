import React, { useState, SyntheticEvent } from 'react';
import styles from './SupportForm.module.less';
import { FormComponentProps } from 'antd/lib/form';
import { Form, DatePicker, Button, Alert, Input } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { useProductTypeFetch, useSupportHelpFetching } from '../hooks';
import TextArea from 'antd/lib/input/TextArea';
import UserContex from 'src/services/UserContex';
import { SelectValue } from 'antd/lib/select';
import { useApplicationFetch } from '../hooks';
import ApplicationFilterType from 'src/types/ApplicationFilterType';
import Select from 'src/components/common/Select';
import Spin from 'src/components/common/Spin';
const { Option } = Select;

export type SupportFormProps = FormComponentProps & {
  onUpdate: (values: any, form: any) => void;
  value?: any;
  productType?: any;
};
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const tailFormItemLayout = {
  wrapperCol: { span: 14, offset: 4 },
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

const SupportForm: React.FC<SupportFormProps> = ({ onUpdate, form }: SupportFormProps) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const { data, loading, error } = useSupportHelpFetching();
  const [{ data: appidList, loading: loading1 }] = useApplicationFetch();
  const [{ data: productType, loading: loading2, error: error1 }] = useProductTypeFetch();

  const defaultAppId =
    appidList &&
    appidList.map((appidDetault: { name: any; ID: any }) => ({ name: appidDetault.name, ID: appidDetault.ID }));
  let detaultAppIdSelected = '-2';
  if (appidList !== null) {
    for (let i = 0; i < appidList.length; i++) {
      detaultAppIdSelected = defaultAppId && defaultAppId[0].ID;
    }
  }

  const [productTypess, setProductTypess] = React.useState('' || null || undefined);

  const handleProductTypeChange = (name: any) => {
    setProductTypess(name);
    form.setFieldsValue({ name });
    return;
  };

  const disableSubmit =
    hasErrors(getFieldsError()) ||
    (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
    !isFieldsTouched() ||
    loading;
  const [file, setFile] = useState<File>();
  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const responseLoaded = !loading && (data || error);
  const handleOwnerChange = (value: SelectValue) => {
    form.setFieldsValue({ value });
    return;
  };
  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: any) => {
      if (!err) {
        values.file = file;
        if (onUpdate) {
          onUpdate(values, form);
        }
      }
    });
    return false;
  };
  const defaultProductTypes: any = productType && productType.map(producttype => producttype.name);
  let defaultProductTypes2;
  for (let i = 0; i < defaultProductTypes?.length; i++) {
    defaultProductTypes2 = defaultProductTypes[0];
  }
  return (
    <div className={styles.matches_filter_wrapper}>
      {error && <Alert message={error} type="error" showIcon />}
      <h2>Submit a Support Request</h2>
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
          <div className={styles.supportPage}>
            <h5>
              QL2 technical support is available by e-mail, phone, or our support form.
              <br />
              E-mail: <span>{data && data.externalEmail}</span>
              <br />
              Phone: <span>{data && data.phone}</span>
            </h5>
            <Form {...formItemLayout} onSubmit={handleSubmit}>
              <Form.Item label="Subject">{getFieldDecorator('subject', formConfig.Subject)(<Input />)}</Form.Item>

              <Form.Item label="Problem description">
                {getFieldDecorator('description', formConfig.Description)(<TextArea />)}
              </Form.Item>
              {error1 === false ? (
                <Form.Item className={styles.form_item} label="Product Area">
                  {getFieldDecorator(
                    'producttype',
                    (formConfig.Producttype,
                    {
                      initialValue: defaultProductTypes2,
                    })
                  )(
                    <Select
                      loading={loading2}
                      onChange={handleProductTypeChange}
                      dropdownClassName={styles.owner_dropdown}
                      showSearch
                      allowClear={false}
                    >
                      {productType &&
                        productType.map(
                          (producttype: { name: string; value: boolean }): React.ReactNode => {
                            return producttype.value === true ? (
                              <Option value={producttype.name} key={`_producttype_${producttype.name}`}>
                                {producttype.name}
                              </Option>
                            ) : null;
                          }
                        )}
                    </Select>
                  )}
                </Form.Item>
              ) : (
                ''
              )}
              {productTypess === 'Data Scout' ||
              productTypess === '' ||
              productTypess === null ||
              productTypess === undefined ? (
                <Form.Item className={styles.form_item} label="Vertical">
                  {getFieldDecorator(
                    'appid',
                    (formConfig.Application,
                    {
                      initialValue: detaultAppIdSelected,
                    })
                  )(
                    <Select
                      loading={loading1}
                      onChange={handleOwnerChange}
                      dropdownClassName={styles.owner_dropdown}
                      showSearch
                    >
                      {appidList &&
                        appidList.map(
                          (appId: ApplicationFilterType): React.ReactNode => {
                            return (
                              <Option value={appId.ID} key={`_appId_${appId.ID}`}>
                                {appId.name}
                              </Option>
                            );
                          }
                        )}
                    </Select>
                  )}
                </Form.Item>
              ) : (
                <Form.Item className={styles.form_item} label="Vertical" style={{ display: 'none' }}>
                  {getFieldDecorator(
                    'appid',
                    (formConfig.Application,
                    {
                      initialValue: detaultAppIdSelected,
                    })
                  )(
                    <Select
                      loading={loading1}
                      onChange={handleOwnerChange}
                      dropdownClassName={styles.owner_dropdown}
                      showSearch
                    >
                      {appidList &&
                        appidList.map(
                          (appId: ApplicationFilterType): React.ReactNode => {
                            return (
                              <Option value={appId.ID} key={`_appId_${appId.ID}`}>
                                {appId.name}
                              </Option>
                            );
                          }
                        )}
                    </Select>
                  )}
                </Form.Item>
              )}

              {productTypess === 'Data Scout' ||
              productTypess === '' ||
              productTypess === null ||
              productTypess === undefined ? (
                <>
                  {' '}
                  <Form.Item label="Job Name">{getFieldDecorator('jobname', formConfig.Problem)(<Input />)}</Form.Item>
                  <Form.Item label="Site(s)">{getFieldDecorator('site', formConfig.Site)(<Input />)}</Form.Item>
                  <Form.Item label="Job Run Date">
                    {getFieldDecorator('date', formConfig.Date)(<DatePicker format={UserContex.getDateFormat()} />)}
                  </Form.Item>
                  <Form.Item label="Sample Inputs (if known)">
                    {getFieldDecorator('input', formConfig.Sampleinputs)(<TextArea />)}
                  </Form.Item>
                  <Form.Item label="First/Last Name	">
                    {getFieldDecorator(
                      'username',
                      (formConfig.Username,
                      {
                        initialValue: data && data.userName,
                      })
                    )(<Input />)}
                  </Form.Item>
                </>
              ) : (
                <></>
              )}
              <Form.Item label="Reply-to">
                {getFieldDecorator(
                  'replyto',
                  (formConfig.Replyto,
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Reply-to is required!',
                      },
                    ],
                    initialValue: data && data.userEmail,
                  })
                )(<Input />)}
              </Form.Item>
              {productTypess === 'Data Scout' ||
              productTypess === '' ||
              productTypess === null ||
              productTypess === undefined ? (
                <Form.Item label="CC">{getFieldDecorator('cc', formConfig.Cc)(<Input />)}</Form.Item>
              ) : (
                <></>
              )}
              <Form.Item label="Add Attachment" className={styles.form_item}>
                {getFieldDecorator(
                  'file',
                  formConfig.file
                )(<input type="file" className={styles.btn_pos} onChange={onFileChange} />)}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <h5 style={{ textAlign: 'left' }}>* = Required on the page</h5>
                <Button type="primary" htmlType="submit" disabled={disableSubmit}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        ))}
    </div>
  );
};
const WrappedJobPropertiesForm = Form.create<SupportFormProps>({ name: 'support' })(SupportForm);
export default WrappedJobPropertiesForm;
