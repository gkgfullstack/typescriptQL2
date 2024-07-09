import React, { SyntheticEvent, useEffect, useState } from 'react';
import styles from './SiteNotificationsForm.module.less';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Button, Alert, Radio, Collapse } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { useAppIdSiteNotificationsFetching, useTopSiteNotificationsFetching } from '../../hooks';
import Spin from 'src/components/common/Spin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from 'src/setupIcons';

import SiteList from '../SiteList';
const { Panel } = Collapse;
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

export type SiteNotificationsFormProps = FormComponentProps & {
  onUpdate: (values: any, form: any, onChange:any) => void;
  customFilter?: any;
  siteListData?:any
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
  Replyto: { rules: [{ required: true, message: 'Reply-To is required!' }], validateTrigger: 'onBlur' },
  Subject: { rules: [{ required: true, message: 'Subject is required!' }], validateTrigger: 'onBlur' },
  Description: { rules: [{ required: true, message: 'Description is required!' }], validateTrigger: 'onBlur' },
  SiteNotificationList: { rules: [{ required: true, message: 'Description is required!' }], validateTrigger: 'onBlur' },
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

const mapss = new Map<string, object>();
const mySet2 = new Set() 

const SiteNotificationsForm: React.FC<SiteNotificationsFormProps> = ({
  onUpdate,
  form,
}: SiteNotificationsFormProps) => {   
  const [, setIndeterminateDefault] = useState<boolean>();
  const [, setCheckedValuesAgin] = useState<any>([]);
  const [checkedValuesAllList, setCheckedValuesAllList] = useState<any>([]);
  const [checkedValues, setCheckedValues] = useState<any>([]);
 

  const arryLength = checkedValues.length;
 for(let i = 0; i < checkedValues.length; i++ ){
   console.log('checkedValues[i]====', checkedValues[i][i])
 }
  console.log('checkedValues=====', checkedValues)
  useEffect(() => { 
    if(arryLength > 0){
      setCheckedValues(checkedValues)
    } 
    if(checkedValues.length !== checkedValues.length ){
      setCheckedValuesAllList(true)
      setIndeterminateDefault(true)
    } else{
      setCheckedValuesAllList(false)
      setIndeterminateDefault(true)
    }  
  }, [arryLength, checkedValues])

  for(let i = 0; i < checkedValues.length; i++){
    mySet2.add(checkedValues[i])
  }


  const arrayPush:any = [];
  mySet2.forEach(v => arrayPush.push(v));
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const {
    data: topSiteNotificationsData,
    loading: topSiteNotificationLoading,
    error: topSiteNotificationError,
  } = useTopSiteNotificationsFetching();
  const {
    data: appIdSiteNotifications,
    loading: loadingAppId,
    error: errorAppId,
  } = useAppIdSiteNotificationsFetching();
 
  const [panels, setPanels] = useState<any>([]);
  const responseLoadedTopSiteNotification =
    !topSiteNotificationLoading && (topSiteNotificationsData || topSiteNotificationError);
  const responseLoadedAppId = !loadingAppId && (appIdSiteNotifications || errorAppId);
  console.log(responseLoadedAppId);
  const getDefaultOptMode = topSiteNotificationsData && topSiteNotificationsData.optInMode;
  const [changesRediobutton, setChangesRediobutton] = useState<any>(getDefaultOptMode === 'perscript' ? false : true);
  useEffect(() => {
    if (appIdSiteNotifications) {
      const verticalInitialCustomLabel = (appIdSiteNotifications.vertical || []).map(type => ({
        ID: type.ID,
        name: type.name,
        value: false,
      }));
      setPanels(verticalInitialCustomLabel);
      setChangesRediobutton(getDefaultOptMode === 'perscript' ? false : true);
    }
  }, [appIdSiteNotifications, getDefaultOptMode]);
  const disableSubmit =
    hasErrors(getFieldsError()) ||
    (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
    !isFieldsTouched();
 console.log(disableSubmit)
  function onChangeOptions(e: any) {
    form.setFieldsValue({ 'optMode': e.target.value });
    setChangesRediobutton(e.target.value !== 'perscript' ? true : false);
  };

    const onChangePanels = (keys: any) => {
      const updatedPanels = [...panels];
      keys.forEach((key: any) => {
        updatedPanels[key].value = true;                              
                              
      });
      setPanels(updatedPanels);
    };

    const mySet233 = new Set()
    mapss.forEach((value: any) => {
      for(let i = 0; i < value.length; i++){
        mySet233.add(value[i]);
      }      
  });
  const arrayDefault:any = [];
  mySet233.forEach(v => arrayDefault.push(v));
     const checkedvaluesList:any = arrayDefault.toString();
    const [checkedvaluesList2, setCheckedvaluesList2] = useState<any>(arrayPush);
    const arryLengthSubmit = arrayPush.length;
    useEffect(() => { 
      if(arryLengthSubmit > 0){
        setCheckedvaluesList2(arrayPush)
      }      
    }, [arryLengthSubmit, checkedValues, arrayPush ])

    useEffect(() => {
        if(changesRediobutton === false){
          setCheckedvaluesList2(checkedvaluesList)
        }else{
          setCheckedvaluesList2("")
        }      
    }, [checkedValues, checkedvaluesList2, changesRediobutton, checkedValuesAllList, checkedvaluesList])
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (!err && values.siteNotificationList !== undefined) {
        const newSite: any = {
          ...values,
        };
        onUpdate(newSite, form, checkedvaluesList2);
      } else {
        const newSite: any = {
          ...values,
          siteNotificationList: checkedvaluesList2
        };
        onUpdate(newSite, form, checkedvaluesList2);
      }  
    });    
    return false;
  };
 
  return (
    <>
      <div className={styles.matches_filter_wrapper}>
        <div className={styles.settingPage}>
          <h3>Site Notification Settings</h3>
          <Form {...formItemLayout} onSubmit={handleSubmit} layout="inline">
            {topSiteNotificationLoading && (
              <div className={styles.filters_spinner}>
                <Spin spinning={topSiteNotificationLoading} />
              </div>
            )}
            {responseLoadedTopSiteNotification &&
              (topSiteNotificationError ? (
                <div className={styles.filters_error}>
                  <Alert
                    message="An error
                 has occurred when trying to get site Notifications fields! Please try again later!"
                    type="error"
                    showIcon
                  />
                </div>
              ) : (
                <>
                  <h4>Select sites from the list below to receive email when a site undergoes maintenance.</h4>
                  <h5>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Indicates a site has been deactivated.
                  </h5>
                  <div className={styles.emailAddressSite}>
                    <Form.Item className={styles.formLable} label={'Email addresses:'}>
                      {getFieldDecorator(
                        'emailAddresses',
                        (formConfig.EmailAddresses,
                        {
                          rules: [
                            {
                              // type: 'email',
                               message: 'The input is not valid E-mail!',                      
                               pattern: /^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,4}\s*?,?\s*?)+$/,
                             }
                          ],
                          initialValue: topSiteNotificationsData && topSiteNotificationsData.notifyEmail,
                        })
                      )(<Input type="email" multiple />)}
                      <h6>Notify these email addresses. Separate individual addresses with a comma.</h6>
                    </Form.Item>
                  </div>
                  <Form.Item className={styles.formLable}>
                    {getFieldDecorator(
                      'optMode',
                      (formConfig.OptMode,
                      {
                        initialValue: topSiteNotificationsData && topSiteNotificationsData.optInMode,
                      })
                    )(
                      <Radio.Group className={styles.optMode} onChange={onChangeOptions}>
                        <Radio value={'none'}>Do not notify me at all</Radio>
                        <Radio value={'all'}>
                          Notify me whenever ANY site in the following list is deactivated or activated
                        </Radio>
                        <Radio value={'perscript'}>
                          Notify me whenever a site I have checked in the following list is deactivated or activated
                        </Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </>
              ))}
            <div className={styles.allAppIdData} style={{ marginTop: '30px' }}>
            {appIdSiteNotifications !== undefined
                  ? panels.length > 0 &&
                  panels.map((typess: any, i: number) => (
              <Collapse className={styles.usage_tabs} onChange={onChangePanels} expandIconPosition={'right'} defaultActiveKey={[i]}>
                
                    <Panel header={`${typess.name}`} key={i}>
                      <SiteList  setCheckedValues={setCheckedValues} application={typess.ID} dataList={i!== i ? false : true} setCheckedValuesAllList={setCheckedValuesAllList} onUpdate={onUpdate} keyId={i} disabled={changesRediobutton} setCheckedValuesAgin={setCheckedValuesAgin} setIndeterminateDefault={setIndeterminateDefault} map={mapss}/>                     
                    </Panel>
                  
              </Collapse>))
                  : null}
              
            </div>
            <Form.Item className={styles.siteNotificationBTN} >
              <Button type="primary" htmlType="submit" >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
const WrappedJobPropertiesForm = Form.create<SiteNotificationsFormProps>({ name: 'siteNotifications' })(
  SiteNotificationsForm
);
export default WrappedJobPropertiesForm;