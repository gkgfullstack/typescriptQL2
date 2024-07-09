import React, { SyntheticEvent, useState } from 'react';
import { Button, Form, Col, DatePicker, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import styles from './DateFilterForm.module.less';
import DateFilterQueryParams from 'src/types/DateFilterQueryParams';
import UserContex from 'src/services/UserContex';
import moment from 'moment';
export type DateFilterFormProps = FormComponentProps & {
  visible: boolean;
  values?: any;
  createdStart: any;
  onSubmit: (
    values?: any) => void;
};

export const DateFilterForm: React.FC<DateFilterFormProps> = ({
  visible,
  form,
  createdStart,
  onSubmit,
}: DateFilterFormProps) => {
  const { getFieldDecorator } = form;
  const [createdDateVal1, setCreatedDateVal1] = useState(createdStart);
  const [createdDateVal2, setCreatedDateVal2] = useState(null);
  const [createdDateVal5, setCreatedDateVal5] = useState(null);
  const [createdDateVal6, setCreatedDateVal6] = useState(null);
  function onChange1(date: any, dateString: any) {
    console.log(date, dateString);
    setCreatedDateVal1(dateString);
  }
  function onChange2(date: any, dateString: any) {
    console.log(date, dateString);
    setCreatedDateVal2(dateString);
    setCreatedDateVal1(createdStart);
  }
  function onChange5(date: any, dateString: any) {
    console.log(date, dateString);
    setCreatedDateVal5(dateString);
    setCreatedDateVal1(createdStart);
  }
  function onChange6(date: any, dateString: any) {
    console.log(date, dateString);
    setCreatedDateVal6(dateString);
    setCreatedDateVal1(createdStart);
  }

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: DateFilterQueryParams) => {
      if (!err) {
        values.createdStart = createdDateVal1;
        if (createdDateVal1 !== undefined){
          values.createdStart = createdDateVal1;
          }
        if (createdDateVal2 !== undefined){
          values.createdEnd = createdDateVal2;
          }
        if (createdDateVal5 !== undefined){
          values.finishedStart = createdDateVal5;
          }
        if (createdDateVal6 !== undefined){
          values.finishedEnd = createdDateVal6;
          }
        if (onSubmit) {
          onSubmit(values);
        }
      }
    });
    return false;
  };
  let bAdminMode: boolean = false;
  let input = localStorage.getItem("bAdminMode");
  bAdminMode = (input === 'true');
  React.useEffect(() => {
    if (!visible) {
      setTimeout(() => {
      //form.resetFields();
      }, 10000)
    }
  }, [form, visible]);

  const dateFormat = UserContex.getDateFormat() !== undefined ? UserContex.getDateFormat() : "mm-dd-yy".toUpperCase();

  return (
    <Form onSubmit={handleSubmit} className={styles.form} >
      <Col span={12}>
        <Form.Item label="Started" className={styles.formItem}>
          {getFieldDecorator('createdStart', {
            initialValue: moment(createdStart !== undefined ? createdStart : createdDateVal1, dateFormat) 
          })(
            <DatePicker
              showTime={false}
              showToday={false}
              //name="createdStart"
              placeholder="created"
              onChange={onChange1}
              format={dateFormat}
              style={{ width: '130px', minWidth: 'auto' }}
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
              format={dateFormat}
              style={{ width: '130px', minWidth: 'auto' }}
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
              format={dateFormat}
              style={{ width: '130px', minWidth: 'auto' }}
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
              format={dateFormat}
              style={{ width: '130px', minWidth: 'auto' }}
            />,
          )}
        </Form.Item>
      </Col>
      {bAdminMode && (
        <Form.Item label="Owner" className={styles.formItem}>
          {getFieldDecorator('ownerName')(
            <Input placeholder="owner Name" style={{ width: '130px', minWidth: 'auto' }} />
          )}
        </Form.Item>
      )}
      <Form.Item className={styles.form_buttons_bar} style={{
        clear: 'both',
        display: 'block',
        lineHeight: '100%',
        margin: '0px',
        padding: '0px'
      }}>
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
