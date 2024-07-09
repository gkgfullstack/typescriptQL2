import React, { SyntheticEvent } from 'react';
import styles from './EditTableForm.module.less';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Button, Alert, Radio, Checkbox } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import Spin from 'src/components/common/Spin';
import { useTablePageEidtGetList } from 'src/api/tablePageEdit';
import TextArea from 'antd/lib/input/TextArea';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export type EditTableFormProps = FormComponentProps & {
  editTableData: (values: any) => void;
  requestParams?: any;
  setVisible:boolean;
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
  TableId: { rules: [{ required: true, message: 'Table Id is required!' }], validateTrigger: 'onBlur' },
  Name: { rules: [{ required: true, message: 'Name is required!' }], validateTrigger: 'onBlur' },
  Columns: { rules: [{ required: true, message: 'Columns is required!' }], validateTrigger: 'onBlur' },
  Visibility: { rules: [{ required: true, message: 'Visibility is required!' }], validateTrigger: 'onBlur' },
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

const EditTableForm: React.FC<EditTableFormProps> = ({
  editTableData,
  form,
  requestParams,
}: EditTableFormProps) => {
  
  const [loadingData, allData] = useTablePageEidtGetList(requestParams);

  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;

  const responseLoadedTopEditTable =
    !loadingData && (allData || allData);

  const disableSubmit =
    hasErrors(getFieldsError()) ||
    (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
    !isFieldsTouched();
  console.log(disableSubmit)


  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err && values.siteNotificationList !== undefined) {        
        const newSite: any = {
          ...values,          
        };
        editTableData(newSite);        
      } else {
        const newSite: any = {
          ...values
        };
        editTableData(newSite);       
      }
      
    });
    
    return false;
  };
  
  const { user } = useAppStateContext();
  return (
    <>
      <div className={styles.matches_filter_wrapper}>
        <div className={styles.settingPage}>
          
          <Form onSubmit={handleSubmit} layout="inline">
            {loadingData && (
              <div className={styles.filters_spinner}>
                <Spin spinning={loadingData} />
              </div>
            )}
            {responseLoadedTopEditTable &&
              (!allData ? (
                <div className={styles.filters_error}>
                  <Alert
                    message="An error
                 has occurred when trying to get site Notifications fields! Please try again later!"
                    type="error"
                    showIcon
                  />
                </div>
              ) : (<>
                {allData.table?.owner === user?.userName ? 
                <div className={styles.emailAddressSite}>
                  
               
                <Form.Item label={''} className={styles.formLable}  {...formItemLayout}>
                    {getFieldDecorator('tableId', (
                      formConfig.TableId, {
                        initialValue: `${allData.table?.id}`,
                      }))(
                        <Input type="hidden"/>
                      )}
                  </Form.Item>
                  <Form.Item label={'Name'} className={styles.formLable}   {...formItemLayout}>
                    {getFieldDecorator('name', (
                      formConfig.Name, {
                        initialValue: `${allData.table?.name}`,
                      }))(
                        <Input />
                      )}
                  </Form.Item>
                  <Form.Item label={'Columns'} className={styles.formLable} {...formItemLayout}>
                    {getFieldDecorator('columns', (
                      formConfig.Columns, {
                        initialValue: `${allData.table?.columnNames}`,
                      }))(
                        <Input />
                      )}
                  </Form.Item>
                  <Form.Item label={'Description'} className={styles.formLable} {...formItemLayout}> 
                    {getFieldDecorator('desc', (
                      formConfig.Description, {
                        initialValue: `${allData.table?.description}`,
                      }))(
                        <TextArea rows={2} />
                      )}
                  </Form.Item>
                  <Form.Item label={'Visibility'} className={styles.formLable} {...formItemLayout}>
                    {getFieldDecorator('visibility', (
                      formConfig.Visibility, {
                        initialValue: `${allData.table?.visibility === "Shared" ? "s" : "p"}`,
                      }))(                        
                        <Radio.Group>
                          <Radio value="p">Private</Radio>
                          <Radio value="s">Shared</Radio>
                        </Radio.Group>
                       )}
                  </Form.Item>
                  <Form.Item label={''} className={styles.formLable} style={{marginLeft:'50px'}} {...formItemLayout}>
                    {getFieldDecorator('sharedEdit', {
                        valuePropName: 'checked',
                        initialValue: allData.allowSharedEdit,
                      })(
                        <Checkbox style={{ lineHeight: '32px' }}>
                        If shared, allow shared editing
                      </Checkbox>
                      )}
                  </Form.Item>
                  <Form.Item label={'Owner'}  {...formItemLayout}>                
                      <span className="ant-form-text">{allData.table?.owner}</span>
                  </Form.Item>
                  <Form.Item label="Created"  {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.created}</span>
                  </Form.Item>
                  <Form.Item label="Updated"  {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.updated}</span>
                  </Form.Item>
                  <Form.Item label="Delimiter"  {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.delimiterDescription}</span>
                  </Form.Item>
                  <Form.Item className={styles.siteNotificationBTN} >
                    <Button type="primary" htmlType="submit" >
                    Update
                    </Button>
                  </Form.Item>
                </div> : <div className={styles.emailAddressSite}>
                  <Form.Item label="Name" {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.name}</span>
                  </Form.Item>
                  <Form.Item label="Columns" {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.columnNames}</span>
                  </Form.Item>
                  <Form.Item label="Description" {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.description}</span>
                  </Form.Item>
                  <Form.Item label="Visibility" {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.visibility}</span>
                  </Form.Item>
                  <Form.Item label="Owner" {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.owner}</span>
                  </Form.Item>
                  <Form.Item label="Created" {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.created}</span>
                  </Form.Item>
                  <Form.Item label="Updated" {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.updated}</span>
                  </Form.Item>
                  <Form.Item label="Delimiter" {...formItemLayout}>
                    <span className="ant-form-text">{allData.table?.delimiterDescription}</span>
                  </Form.Item>
                </div>
                }
              </>))}

          </Form>
        </div>

      </div>
      <div style={{clear:'both', margin:'20px auto', padding:'0px', display: 'table'}}></div>
      
    </>
  );
};
const WrappedJobPropertiesForm = Form.create<EditTableFormProps>({ name: 'editTableForm' })(EditTableForm);
export default WrappedJobPropertiesForm;