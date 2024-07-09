import React, { SyntheticEvent,useState } from 'react';
import { Button, Form, Col, DatePicker, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
//import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';

import styles from './DateFilterForm.module.less';
import DateFilterQueryParams from 'src/types/DateFilterQueryParams';
import UserContex from 'src/services/UserContex';

export type DateFilterFormProps = FormComponentProps & {
  visible: boolean;
  values?:any;
 onSubmit: (
    values?: any) => void;
};

export const DateFilterForm: React.FC<DateFilterFormProps> = ({
  visible,
  form,
  onSubmit,
}: DateFilterFormProps) => {
  const { getFieldDecorator } = form;
  // const disableSubmit =
  //   hasErrors(getFieldsError()) ||
  //   (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
  //   !isFieldsTouched();
  const [createdDateVal1, setCreatedDateVal1] = useState(null); 
  const [createdDateVal2, setCreatedDateVal2] = useState(null); 
 const  [createdDateVal3, setCreatedDateVal3] = useState(null); 
  const [createdDateVal4, setCreatedDateVal4] = useState(null); 
  const [createdDateVal5, setCreatedDateVal5] = useState(null); 
  const [createdDateVal6, setCreatedDateVal6] = useState(null); 
  const [createdDateVal7, setCreatedDateVal7] = useState(null); 
  const [createdDateVal8, setCreatedDateVal8] = useState(null); 
  function onChange1(date:any,dateString:any) {
    console.log(date);
    setCreatedDateVal1(dateString);    
  }
  function onChange2(date:any,dateString:any) {
    console.log(date);
     setCreatedDateVal2(dateString);
  }
  function onChange3(date:any,dateString:any) {
    console.log(date);
     setCreatedDateVal3(dateString);
  }
  function onChange4(date:any,dateString:any) {
    console.log(date);
     setCreatedDateVal4(dateString);
  }
  function onChange5(date:any,dateString:any) {
    console.log(date);
     setCreatedDateVal5(dateString);
  }
  function onChange6(date:any,dateString:any) {
    console.log(date);
     setCreatedDateVal6(dateString);
  }
  function onChange7(date:any,dateString:any) {
    console.log(date);
     setCreatedDateVal7(dateString);
  }
  function onChange8(date:any,dateString:any) {
    console.log(date);
     setCreatedDateVal8(dateString);
  }
  let  bAdminMode:boolean=false;
  let input = localStorage.getItem("bAdminMode");
  bAdminMode = (input === 'true');
  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: DateFilterQueryParams) => {
      if (!err) {
         
          if(createdDateVal1!==undefined){
          values.createdStart=createdDateVal1;
          }
          if(createdDateVal2!==undefined){
          values.createdEnd=createdDateVal2;
          }
          if(createdDateVal3!==undefined){
          values.lastrunStart=createdDateVal3;
          }
         
          if(createdDateVal4!==undefined){
          values.lastrunEnd=createdDateVal4;
          }
        
         
          if(createdDateVal5!==undefined){
          values.finishedStart=createdDateVal5;
          }
        if(createdDateVal6!==undefined){
          values.finishedEnd=createdDateVal6;
          }
         if(createdDateVal7!==undefined){
          values.updatedStart=createdDateVal7;
          }
        
          if(createdDateVal8!==undefined){
          values.updatedEnd=createdDateVal8;
          }
          if (onSubmit) {
          onSubmit(values);
          }
        }
    });
    return false;
  };

  React.useEffect(() => {
    if (!visible) {
      //form.resetFields();
    }
  }, [form, visible]);


  return (
    <Form onSubmit={handleSubmit} className={styles.form} >
      <Col span={12}>
        <Form.Item label="created" className={styles.formItem}>
          {getFieldDecorator('createdStart')(
            <DatePicker 
            showTime={false} 
showToday={false}
            name="createdStart"
            placeholder="created"
            onChange={onChange1}
            format={UserContex.getDateFormat()}
            style={{width:'130px', minWidth: 'auto'}}
            />,           
          )}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="thru" className={styles.formItem}>
          {getFieldDecorator('createdEnd')(
            <DatePicker 
            showTime={false} 
            showToday={false} 
            name="createdEnd"
            placeholder="thru"
            onChange={onChange2}
            format={UserContex.getDateFormat()}
            style={{width:'130px', minWidth: 'auto'}}
             />,
          )}
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label="Last Run" className={styles.formItem}>
          {getFieldDecorator('lastrunStart')(
            <DatePicker 
            showTime={false} 
showToday={false} 
            name="lastrunStart"
            placeholder="Last Run"
            onChange={onChange3}
            format={UserContex.getDateFormat()}
            style={{width:'130px', minWidth: 'auto'}}            
            />,
          )}
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label="thru" className={styles.formItem}>
          {getFieldDecorator('lastrunEnd')(
            <DatePicker 
            showTime={false} 
showToday={false} 
            name="lastrunEnd"
            placeholder="thru"
            onChange={onChange4}
            format={UserContex.getDateFormat()}
            style={{width:'130px', minWidth: 'auto'}}            
            />,
          )}
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label="Finished" className={styles.formItem}>
          {getFieldDecorator('finishedStart')(
            <DatePicker 
            showTime={false} 
showToday={false} 
            name="finishedStart"
            placeholder="Finished"
            onChange={onChange5}
            format={UserContex.getDateFormat()}
            style={{width:'130px', minWidth: 'auto'}} 
            />,
          )}
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label="thru" className={styles.formItem}>
          {getFieldDecorator('finishedEnd')(
            <DatePicker 
            showTime={false} 
showToday={false} 
            name="finishedEnd"
            placeholder="thru"
            onChange={onChange6}
            format={UserContex.getDateFormat()}
            style={{width:'130px', minWidth: 'auto'}} 
            />,
          )}
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label="Updated" className={styles.formItem}>
          {getFieldDecorator('updatedStart')(
            <DatePicker 
            showTime={false} 
showToday={false} 
            name="updatedStart"
            placeholder="Updated"
           onChange={onChange7}
            format={UserContex.getDateFormat()}
            style={{width:'130px', minWidth: 'auto'}}
            />,
          )}
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label="thru" className={styles.formItem}>
          {getFieldDecorator('updatedEnd')(
            <DatePicker 
            showTime={false} 
showToday={false} 
            name="updatedEnd"
            placeholder="thru"
            onChange={onChange8}
            format={UserContex.getDateFormat()} 
           style={{width:'130px', minWidth: 'auto'}}
            />,
          )}
        </Form.Item>
        </Col>
       {bAdminMode&&(
        <Form.Item label="Owner" className={styles.formItem}>
          {getFieldDecorator('ownerName')(
          <Input placeholder="owner Name"  style={{width:'130px', minWidth: 'auto'}} />
          )}
        </Form.Item>
        )}
        <Form.Item className={styles.form_buttons_bar} style={{
          clear: 'both',
          display: 'block',
          lineHeight: '100%',
          margin: '0px',
          padding: '0px'}}>
          <Button
            className={styles.clear_button}
            onClick={(): void => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
    </Form>
  );
};

const WrappedDateFilterForm = Form.create<DateFilterFormProps>({ name: 'dateFilter' })(DateFilterForm);
export default WrappedDateFilterForm;
