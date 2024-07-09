import React, { SyntheticEvent, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Button, Select, Tabs, Checkbox } from 'antd';
import styles from './AddScheduleForm.module.less';

import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import AddScheduleType from 'src/types/AddScheduleType';
const { TabPane } = Tabs;
//const { MonthPicker } = DatePicker;

export type AddSearchNameFormProps = FormComponentProps & {
  addSchedule: (values: AddScheduleType) => void;
  onClose: () => void;
  timeZone?: any;
};

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};
type FormFields = {
  [field: string]: any;
};

export type FormConfig = {
  [field: string]: GetFieldDecoratorOptions;
};
const date: Date = new Date();
const sDay: any = date.getDate();
const fullYr: any = date.getFullYear();
const iMonth = date.getMonth() + 1;
const sMonth: string = iMonth.toString();

export const formConfig: FormConfig = {
  months: { initialValue: sMonth, validateTrigger: 'onChange' },
  year: { initialValue: fullYr, validateTrigger: 'onChange' },
  hours: { initialValue: '12 midnight', validateTrigger: 'onChange' },
  minute: { initialValue: '0', validateTrigger: 'onChange' },
  date: { initialValue: sDay, validateTrigger: 'onChange' },
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

export const AddScheduleForm: React.FC<AddSearchNameFormProps> = ({
  form,
  addSchedule,
  onClose,
  timeZone,
}: AddSearchNameFormProps) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const [addType, setAddType] = useState<string>('Once');
  const disableSubmit =
    hasErrors(getFieldsError()) ||
    (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
    !isFieldsTouched();

  function callback(key: any) {
    setAddType(key);
  }

  const { Option } = Select;

  const children = [];
  for (let i = 1; i <= 31; i++) {
    children.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  const children2 = [];
  for (let i = 1; i <= 31; i++) {
    children2.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  const children3 = [];
  for (let i = 1; i <= 31; i++) {
    children3.push(
      <Option key={i} value={'' + i + ''}>
        {i}
      </Option>
    );
  }
  const optioHours1 = [];
  const plainHours = [
    '12 midnight',
    '1 am',
    '2 am',
    '3 am',
    '4 am',
    '5 am',
    '6 am',
    '7 am',
    '8 am',
    '9 am',
    '10 am',
    '11 am',
    '12 noon',
    '1 pm',
    '2 pm',
    '3 pm',
    '4 pm',
    '5 pm',
    '6 pm',
    '7 pm',
    '8 pm',
    '9 pm',
    '10 pm',
    '11 pm',
  ];
  for (let i = 0; i < plainHours.length; i++) {
    optioHours1.push(
      <Option key={plainHours[i]} value={i}>
        {plainHours[i]}
      </Option>
    );
  }

  const children4 = [];
  for (let i = 1; i <= 31; i++) {
    children4.push(
      <Option key={'' + i + ''} value={i}>
        {i}
      </Option>
    );
  }

  const CheckboxGroup = Checkbox.Group;
  const plainOptions = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const defaultCheckedList = [''];
  const [state, setState] = React.useState({
    checkedList: defaultCheckedList,
    indeterminate: false,
    checkAll: false,
  });
  const onChangessss = (checkedList: any) => {
    setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };
  const onCheckAllChange = (e: any) => {
    setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };
  const plainOptions2 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const defaultCheckedList2 = [''];
  const [state2, setState2] = React.useState({
    checkedList2: defaultCheckedList2,
    indeterminate2: false,
    checkAll2: false,
  });
  const onChangessss2 = (checkedList2: any) => {
    setState2({
      checkedList2,
      indeterminate2: !!checkedList2.length && checkedList2.length < plainOptions2.length,
      checkAll2: checkedList2.length === plainOptions2.length,
    });
  };
  const onCheckAllChange2 = (e: any) => {
    setState2({
      checkedList2: e.target.checked ? plainOptions2 : [],
      indeterminate2: false,
      checkAll2: e.target.checked,
    });
  };

  const [state2b, setState2b] = React.useState({
    checkedList2b: defaultCheckedList2,
    indeterminate2b: false,
    checkAll2b: false,
  });
  const onChangessss2b = (checkedList2b: any) => {
    setState2b({
      checkedList2b,
      indeterminate2b: !!checkedList2b.length && checkedList2b.length < plainOptions2.length,
      checkAll2b: checkedList2b.length === plainOptions2.length,
    });
  };
  const onCheckAllChange2b = (e: any) => {
    setState2b({
      checkedList2b: e.target.checked ? plainOptions2 : [],
      indeterminate2b: false,
      checkAll2b: e.target.checked,
    });
  };

  const plainOptions3 = [
    '12 midnight',
    '1 am',
    '2 am',
    '3 am',
    '4 am',
    '5 am',
    '6 am',
    '7 am',
    '8 am',
    '9 am',
    '10 am',
    '11 am',
    '12 noon',
    '1 pm',
    '2 pm',
    '3 pm',
    '4 pm',
    '5 pm',
    '6 pm',
    '7 pm',
    '8 pm',
    '9 pm',
    '10 pm',
    '11 pm',
  ];
  const defaultCheckedList3 = [''];
  const [state3, setState3] = React.useState({
    checkedList3: defaultCheckedList3,
    indeterminate3: false,
    checkAll3: false,
  });
  const onChangessss3 = (checkedList3: any) => {
    setState3({
      checkedList3,
      indeterminate3: !!checkedList3.length && checkedList3.length < plainOptions3.length,
      checkAll3: checkedList3.length === plainOptions3.length,
    });
  };
  const onCheckAllChange3 = (e: any) => {
    setState3({
      checkedList3: e.target.checked ? plainOptions3 : [],
      indeterminate3: false,
      checkAll3: e.target.checked,
    });
  };
  const onceMonth1 = [];
  for (let i = 0; i < plainOptions.length; i++) {
    const mon = i + 1;
    onceMonth1.push(
      <Option key={i} value={'' + mon + ''}>
        {plainOptions[i]}
      </Option>
    );
  }

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err, values: AddScheduleType) => {
      if (addType === 'Daily') {
        if (state3.checkedList3.length > 0) {
          let dHours = '';
          for (let i = 0; i < state3.checkedList3.length; i++) {
            dHours = state3.checkedList3[i] + ',' + dHours;
          }
          values.hours = dHours;
        }
      }
      if (addType === 'Monthly') {
        if (state.checkedList.length > 0) {
          let months = '';
          for (let i = 0; i < state.checkedList.length; i++) {
            switch (state.checkedList[i]) {
              case 'January':
                months = '0' + ',' + months;
                break;
              case 'February':
                months = '1' + ',' + months;
                break;
              case 'March':
                months = '2' + ',' + months;
                break;
              case 'April':
                months = '3' + ',' + months;
                break;
              case 'May':
                months = '4' + ',' + months;
                break;
              case 'June':
                months = '5' + ',' + months;
                break;
              case 'July':
                months = '6' + ',' + months;
                break;
              case 'August':
                months = '7' + ',' + months;
                break;
              case 'September':
                months = '8' + ',' + months;
                break;
              case 'October':
                months = '9' + ',' + months;
                break;
              case 'November':
                months = '10' + ',' + months;
                break;
              case 'December':
                months = '11' + ',' + months;
                break;
            }
          }
          values.months = months;
        }
      }
      if (addType === 'Weekly') {
        if (state2.checkedList2.length > 0) {
          let weeks = '';
          for (let i = 0; i < state2.checkedList2.length; i++) {
            //weeks=state2.checkedList2[i]+","+weeks
            switch (state2.checkedList2[i]) {
              case 'Sunday':
                weeks = '1' + ',' + weeks;
                break;
              case 'Monday':
                weeks = '2' + ',' + weeks;
                break;
              case 'Tuesday':
                weeks = '3' + ',' + weeks;
                break;
              case 'Wednesday':
                weeks = '4' + ',' + weeks;
                break;
              case 'Thursday':
                weeks = '5' + ',' + weeks;
                break;
              case 'Friday':
                weeks = '6' + ',' + weeks;
                break;
              case 'Saturday':
                weeks = '7' + ',' + weeks;
                break;
            }
          }
          values.days = weeks;
        }
      }
      if (addType === 'BiWeekly') {
        if (state2b.checkedList2b.length > 0) {
          let weeks = '';
          for (let i = 0; i < state2b.checkedList2b.length; i++) {
            //weeks=state2.checkedList2[i]+","+weeks
            switch (state2b.checkedList2b[i]) {
              case 'Sunday':
                weeks = '1' + ',' + weeks;
                break;
              case 'Monday':
                weeks = '2' + ',' + weeks;
                break;
              case 'Tuesday':
                weeks = '3' + ',' + weeks;
                break;
              case 'Wednesday':
                weeks = '4' + ',' + weeks;
                break;
              case 'Thursday':
                weeks = '5' + ',' + weeks;
                break;
              case 'Friday':
                weeks = '6' + ',' + weeks;
                break;
              case 'Saturday':
                weeks = '7' + ',' + weeks;
                break;
            }
          }
          values.days = weeks;
        }
      }
      if (values.hours === '12 midnight') {
        values.hours = '0';
      }
      if (!err) {
        if (addSchedule) {
          values.addType = addType;
          addSchedule(values);
          onClose();
        }
      }
    });
    return false;
  };
  return (
    <div className={styles.cnjobs}>
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <h1>Add a Schedule</h1>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Once" key="Once">
            <div style={{ marginTop: '30px' }}>
              <Row gutter={12} style={{ width: '50%', float: 'left' }}>
                <Col span={24}>
                  <h4>Date</h4>
                  <Form.Item label="Month">
                    {getFieldDecorator(
                      'months',
                      formConfig.months
                    )(
                      <Select
                        placeholder={'months'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        {onceMonth1}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Day">
                    {getFieldDecorator(
                      'date',
                      formConfig.date
                    )(
                      <Select placeholder={'days'} style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}>
                        {children3}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Year">
                    {getFieldDecorator(
                      'year',
                      formConfig.year
                    )(
                      <Select placeholder={'Year'} style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>
                        <Option value="2022">2022</Option>
                        <Option value="2023">2023</Option>
                        <Option value="2024">2024</Option>
                        <Option value="2025">2025</Option>
                        <Option value="2026">2026</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row
                gutter={12}
                style={{ width: '50%', float: 'left', paddingLeft: '10px', borderLeft: '1px solid #C4C4C4' }}
              >
                <Col span={24}>
                  <h4>Time</h4>
                  <Form.Item label="Hour">
                    {getFieldDecorator(
                      'hours',
                      formConfig.hours
                    )(
                      <Select
                        placeholder={'hours'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        {optioHours1}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Minute">
                    {getFieldDecorator(
                      'minute',
                      formConfig.minute
                    )(
                      <Select
                        placeholder={'minute'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        <Option value="0">0</Option>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="20">20</Option>
                        <Option value="25">25</Option>
                        <Option value="30">30</Option>
                        <Option value="35">35</Option>
                        <Option value="40">40</Option>
                        <Option value="45">45</Option>
                        <Option value="50">50</Option>
                        <Option value="55">55</Option>
                      </Select>
                    )}
                  </Form.Item>
                  <Col span={24}>
                    <label>Timezone : {timeZone}</label>
                  </Col>
                </Col>
              </Row>
              <Row style={{ clear: 'both' }}>
                <Col>
                  <p className={styles.disclaimerMessage}>
                    * Date will default to last day of the month for those months with shorter lengths.
                  </p>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tab="Monthly" key="Monthly">
            <div style={{ marginTop: '30px' }}>
              <Row gutter={12} style={{ width: '50%', float: 'left' }}>
                <Col span={24}>
                  <h4>Months</h4>
                  <Form.Item>
                    {getFieldDecorator(
                      'months',
                      formConfig.months
                    )(
                      <span>
                        <Checkbox
                          indeterminate={state.indeterminate}
                          onChange={onCheckAllChange}
                          checked={state.checkAll}
                        >
                          All
                        </Checkbox>
                        <CheckboxGroup options={plainOptions} value={state.checkedList} onChange={onChangessss} />
                      </span>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row
                gutter={12}
                style={{ width: '50%', float: 'left', paddingLeft: '20px', borderLeft: '1px solid #C4C4C4' }}
              >
                <Col span={24}>
                  <h4>Days</h4>
                  <Form.Item label="Day">
                    {getFieldDecorator(
                      'date',
                      formConfig.date
                    )(
                      <Select placeholder={'days'} style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}>
                        {children2}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Hour">
                    {getFieldDecorator(
                      'hours',
                      formConfig.hours
                    )(
                      <Select
                        placeholder={'hours'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        {optioHours1}
                      </Select>
                      //<TimePicker use12Hours format="h A" onChange={handleChange7} style={{ width: 'calc(100% - 20px)', border: '1px solid #C4C4C4', float: 'left', borderRadius: '5px' }} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Minute">
                    {getFieldDecorator(
                      'minute',
                      formConfig.minute
                    )(
                      <Select
                        placeholder={'minute'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        <Option value="0">0</Option>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="20">20</Option>
                        <Option value="25">25</Option>
                        <Option value="30">30</Option>
                        <Option value="35">35</Option>
                        <Option value="40">40</Option>
                        <Option value="45">45</Option>
                        <Option value="50">50</Option>
                        <Option value="55">55</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <label>Timezone : {timeZone}</label>
                </Col>
              </Row>
              <Row style={{ clear: 'both' }}>
                <Col>
                  <p className={styles.disclaimerMessage}>
                    * Date will default to last day of the month for those months with shorter lengths.
                  </p>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tab="Weekly" key="Weekly">
            <div style={{ marginTop: '30px' }}>
              <Row gutter={12} style={{ width: '50%', float: 'left' }}>
                <Col span={24}>
                  <h4>Weekdays</h4>
                  <Form.Item>
                    {getFieldDecorator(
                      'days',
                      formConfig.days
                    )(
                      <span>
                        <Checkbox
                          indeterminate={state2.indeterminate2}
                          onChange={onCheckAllChange2}
                          checked={state2.checkAll2}
                        >
                          All
                        </Checkbox>
                        <CheckboxGroup options={plainOptions2} value={state2.checkedList2} onChange={onChangessss2} />
                      </span>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row
                gutter={12}
                style={{ width: '50%', float: 'left', paddingLeft: '20px', borderLeft: '1px solid #C4C4C4' }}
              >
                <Col span={24}>
                  <h4>Time</h4>
                  <Form.Item label="Hour">
                    {getFieldDecorator(
                      'hours',
                      formConfig.hours
                    )(
                      <Select
                        placeholder={'hours'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        {optioHours1}
                      </Select>
                      // <TimePicker use12Hours format="h A" onChange={handleChange9} style={{ width: 'calc(100% - 20px)', border: '1px solid #C4C4C4', float: 'left', borderRadius: '5px' }} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Minute">
                    {getFieldDecorator(
                      'minute',
                      formConfig.minute
                    )(
                      <Select
                        placeholder={'minute'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        <Option value="0">0</Option>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="20">20</Option>
                        <Option value="25">25</Option>
                        <Option value="30">30</Option>
                        <Option value="35">35</Option>
                        <Option value="40">40</Option>
                        <Option value="45">45</Option>
                        <Option value="50">50</Option>
                        <Option value="55">55</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <label>Timezone : {timeZone}</label>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tab="BiWeekly" key="BiWeekly">
            <div style={{ marginTop: '30px' }}>
              <Row gutter={12} style={{ width: 'calc(40% - 10px)', float: 'left' }}>
                <Col span={24}>
                  <h4>Weekdays</h4>
                  <Form.Item>
                    {getFieldDecorator(
                      'days',
                      formConfig.days
                    )(
                      <span>
                        <Checkbox
                          indeterminate={state2b.indeterminate2b}
                          onChange={onCheckAllChange2b}
                          checked={state2b.checkAll2b}
                        >
                          All
                        </Checkbox>
                        <CheckboxGroup
                          options={plainOptions2}
                          value={state2b.checkedList2b}
                          onChange={onChangessss2b}
                        />
                      </span>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row
                gutter={12}
                style={{ width: '33%', float: 'left', paddingLeft: '10px', borderLeft: '1px solid #C4C4C4' }}
              >
                <Col span={24}>
                  <h4>Time</h4>
                  <Form.Item label="Hour">
                    {getFieldDecorator(
                      'hours',
                      formConfig.hours
                    )(
                      <Select
                        placeholder={'hours'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        {optioHours1}
                      </Select>
                      // <TimePicker use12Hours format="h A" onChange={handleChange11} style={{ width: 'calc(100% - 20px)', border: '1px solid #C4C4C4', float: 'left', borderRadius: '5px' }} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Minute">
                    {getFieldDecorator(
                      'minute',
                      formConfig.minute
                    )(
                      <Select
                        placeholder={'minute'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        <Option value="0">0</Option>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="20">20</Option>
                        <Option value="25">25</Option>
                        <Option value="30">30</Option>
                        <Option value="35">35</Option>
                        <Option value="40">40</Option>
                        <Option value="45">45</Option>
                        <Option value="50">50</Option>
                        <Option value="55">55</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row
                gutter={12}
                style={{ width: '33%', float: 'left', paddingLeft: '10px', borderLeft: '1px solid #C4C4C4' }}
              >
                <Col span={24}>
                  <h4>Starting Date</h4>
                  <Form.Item label="Month">
                    {getFieldDecorator(
                      'months',
                      formConfig.months
                    )(
                      <Select
                        placeholder={'months'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        {onceMonth1}
                      </Select>

                      //<MonthPicker onChange={handleChange13} style={{ width: 'calc(100% - 20px)', border: '1px solid #C4C4C4', borderRadius: '5px', float: 'left' }} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Day">
                    {getFieldDecorator(
                      'date',
                      formConfig.date
                    )(
                      <Select placeholder={'Day'} style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}>
                        {children2}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Year">
                    {getFieldDecorator(
                      'year',
                      formConfig.year
                    )(
                      <Select placeholder={'Year'} style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <label>Timezone : {timeZone}</label>
                </Col>
              </Row>
              <Row style={{ clear: 'both' }}>
                <Col>
                  <p className={styles.disclaimerMessage}>
                    * Date will default to last day of the month for those months with shorter lengths.
                  </p>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tab="Daily" key="Daily">
            <div style={{ marginTop: '30px' }}>
              <Row gutter={12} style={{ width: '50%', float: 'left' }}>
                <Col span={24}>
                  <h4>Daily</h4>
                  <Form.Item>
                    {getFieldDecorator(
                      'hours',
                      formConfig.hours
                    )(
                      <span>
                        <Checkbox
                          indeterminate={state3.indeterminate3}
                          onChange={onCheckAllChange3}
                          checked={state3.checkAll3}
                        >
                          All
                        </Checkbox>
                        <CheckboxGroup options={plainOptions3} value={state3.checkedList3} onChange={onChangessss3} />
                      </span>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row
                gutter={12}
                style={{ width: '50%', float: 'left', paddingLeft: '20px', borderLeft: '1px solid #C4C4C4' }}
              >
                <Col span={24}>
                  <h4>Time</h4>
                  <Form.Item label="Minutes">
                    {getFieldDecorator(
                      'minute',
                      formConfig.minute
                    )(
                      <Select
                        placeholder={'Minutes'}
                        style={{ width: 'calc(100% - 20px)', border: '0px', float: 'left' }}
                      >
                        <Option value="0">0</Option>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                        <Option value="20">20</Option>
                        <Option value="25">25</Option>
                        <Option value="30">30</Option>
                        <Option value="35">35</Option>
                        <Option value="40">40</Option>
                        <Option value="45">45</Option>
                        <Option value="50">50</Option>
                        <Option value="55">55</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <label>Timezone : {timeZone}</label>
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
        <Row gutter={12} style={{ marginTop: '20px' }}>
          <Col span={12}></Col>
          <Col span={12}>
            <Button type="link" onClick={onClose}>
              {' '}
              Cancel{' '}
            </Button>
            <Button type="primary" htmlType="submit" disabled={disableSubmit} className={styles.configureBTN}>
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const WrappedDateFilterForm = Form.create<AddSearchNameFormProps>({ name: 'name' })(AddScheduleForm);
export default WrappedDateFilterForm;
