import React, { SyntheticEvent, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button, Tabs, Checkbox, Radio, Collapse, Divider, DatePicker, Select } from 'antd';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import AirFareLineItemType from 'src/types/AirFareLineItemType';
import SiteCodeType from 'src/types/SiteCodeType';
import { useSiteCodeFetch } from 'src/components/CreateNewSearch/SiteCode/hooks';
import UserContex from 'src/services/UserContex';
import CreateCarLocation from './CreateCarLocation/CreateCarLocation';
import moment from 'moment';

import {
  PointOfSaleTooltip,
  Contentsss1Pop,
  Contentsss2Pop,
} from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItemTooltip';
import {
  CheckInDOWTooltip,
  CheckInTooltip,
  CheckOutDOWTooltip,
  DiscountTooltip,
  PickupReturnTimeTooltip,
  RACTooltip,
  WeekPickupTooltip
} from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import { SelectValue } from 'antd/lib/select';
import { CustomTooltip } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import GeoFieldWrapper from 'src/components/CreateNewSearch/GeoFieldWrapper';

const { TextArea } = Input;
const { Panel } = Collapse;
const { Option } = Select;

const searchTypes: any = [
  {
    name: 'Airport',
    id: 'Airport',
  },
  {
    name: 'Off-Airport',
    id: 'Off-Airport',
  },
];

const timeOptions: any = [];

export type AddSearchNameFormProps = FormComponentProps & {
  addLineItem: (values: AirFareLineItemType, form: any) => void;
  searchName?: string | undefined;
  vertical?: string;
  jobId?: number;
  sites?: any;
  value?: any;
  specap1?: any;
  specap2?: any;
  sDateRangeEnd?: any;
  sDateRangeStart?: any;
  form: any;
};

type FormFields = {
  [field: string]: any;
};

const { TabPane } = Tabs;

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const getCheckListValues = (checklist: string[], count: number) => {
  if (checklist.length > 0 && checklist.length < count) {
    return checklist.join(',');
  }

  return '';
};

export const CreateNewLineCar: React.FC<AddSearchNameFormProps> = ({
  form,
  addLineItem,
  searchName,
  vertical,
  jobId,
  sites,
  specap1,
  specap2,
  sDateRangeStart,
  sDateRangeEnd,
}: AddSearchNameFormProps) => {
  type FormConfig = {
    [field: string]: GetFieldDecoratorOptions;
  };
  const verticalID = vertical === 'Carrental' || vertical === '106' ? '106' : '102';
  const [startDays, setStartDays] = React.useState(specap1);
  const [endDays, setEndDays] = React.useState(specap2);
  const [startDate, setStartDate] = React.useState(specap1 ? moment(specap1) : undefined);
  const [endDate, setEndDate] = React.useState(specap2 ? moment(specap2) : undefined);
  const [dateRange, setDateRange] = React.useState('');
  const [customSpanStartDays, setCustomSpanStartDays] = React.useState(specap1);
  const [customSpanEndDays, setCustomSpanEndDays] = React.useState(specap2);
  const [customSpanStartDate, setCustomSpanStartDate] = React.useState(specap1 ? moment(specap1) : undefined);
  const [customSpanEndDate, setCustomSpanEndDate] = React.useState(specap2 ? moment(specap2) : undefined);
  const [customSpanDateRange, setCustomSpanDateRange] = React.useState('');
  const [dateRangeLength, setDateRangeLength] = React.useState('');
  const [locations, setLocations] = React.useState<Array<{ [key: string]: string }>>([]);
  const [searchType, setSearchType] = React.useState<any>('');

  const formConfig: FormConfig = {
    searchName: {
      initialValue: searchName,
      rules: [{ required: true, message: 'Search name is required!' }],
      validateTrigger: 'onBlur',
    },
    Vertical: {
      initialValue: 'Cars',
    },
    jobId: {
      initialValue: jobId,
      rules: [{ required: true, message: 'Job ID is required!' }],
      validateTrigger: 'onBlur',
    },
    searchRadius: { initialValue: 0 },
    pas: { initialValue: '1' },
    flc: { initialValue: 'E' },
    sites: { initialValue: sites },
    sDateRangeEnd: { initialValue: sDateRangeEnd },
    sDateRangeStart: { initialValue: sDateRangeStart },
  };

  const getTimeOptions = () => {
    if (timeOptions.length === 0) {
      for (let index = 0; index < 24; index++) {
        const hour: string | number = index < 10 ? `0${index}` : index;
        timeOptions.push({
          name: `${hour}:00`,
        });
      }
    }

    return timeOptions;
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

  const { getFieldDecorator, getFieldsError, getFieldsValue, isFieldsTouched } = form;
  const disableSubmit =
    hasErrors(getFieldsError()) ||
    (isFieldsTouched() && hasNoSetupRequiredFields(getFieldsValue())) ||
    !isFieldsTouched() || locations.length === 0;

  const contextDateFormat = UserContex.getDateFormat();
  const dateFormat = contextDateFormat;

  const onChangeDepartureDate = (selectedValue: any) => {
    setStartDate(selectedValue);
  };

  const onChangeReturnDate = (selectedValue: any) => {
    setEndDate(selectedValue);
  };

  const onChangeCustomSpanStartDate = (selectedValue: any) => {
    if (selectedValue === null) {
      setCustomSpanStartDate(undefined);
    } else {
      setCustomSpanStartDate(selectedValue);
    }
  };

  const onChangeCustomSpanEndDate = (selectedValue: any) => {
    if (selectedValue === null) {
      setCustomSpanEndDate(undefined);
    } else {
      setCustomSpanEndDate(selectedValue);
    }
  };

  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
  };
  const CheckboxGroup = Checkbox.Group;
  const monthOptions = ['1W', '2W', '3W', '4W', '5W'];
  const weekOptions = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthCheckedList = ['1W', '2W', '3W', '4W', '5W'];
  const weekCheckedList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const [monthReturnList, setMonthReturnList] = React.useState({
    checkedList: monthCheckedList,
    indeterminate: false,
    checkAll: true,
  });
  const [monthPickupList, setMonthPickupList] = React.useState({
    checkedList: monthCheckedList,
    indeterminate: false,
    checkAll: true,
  });
  const [weekReturnList, setWeekReturnList] = React.useState({
    checkedList: weekCheckedList,
    indeterminate: false,
    checkAll: true,
  });
  const [weekPickupList, setWeekPickupList] = React.useState({
    checkedList: weekCheckedList,
    indeterminate: false,
    checkAll: true,
  });

  const onChangeMonthReturnList = (checkedList: any) => {
    setMonthReturnList({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < monthOptions.length,
      checkAll: checkedList.length === monthOptions.length,
    });
  };

  const onChangeMonthPickupList = (checkedList: any) => {
    setMonthPickupList({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < monthOptions.length,
      checkAll: checkedList.length === monthOptions.length,
    });
  };

  const onChangeWeekReturnList = (checkedList: any) => {
    setWeekReturnList({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < weekOptions.length,
      checkAll: checkedList.length === weekOptions.length,
    });
  };

  const onChangeWeekPickupList = (checkedList: any) => {
    setWeekPickupList({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < weekOptions.length,
      checkAll: checkedList.length === weekOptions.length,
    });
  };

  const onCheckAllPickupWeek = (e: any) => {
    setWeekPickupList({
      checkedList: e.target.checked ? weekOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  const onCheckAllReturnWeek = (e: any) => {
    setWeekReturnList({
      checkedList: e.target.checked ? weekOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  const onCheckAllReturnChange = (e: any) => {
    setMonthReturnList({
      checkedList: e.target.checked ? monthOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  const onCheckAllPickupChange = (e: any) => {
    setMonthPickupList({
      checkedList: e.target.checked ? monthOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  const [{ data }] = useSiteCodeFetch(verticalID);

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err: any, values: AirFareLineItemType) => {
      values.limitOfMonthReturn = getCheckListValues(monthReturnList.checkedList, monthOptions.length);
      values.limitOfMonthPickup = getCheckListValues(monthPickupList.checkedList, monthOptions.length);
      values.limitOfWeekReturn = getCheckListValues(weekReturnList.checkedList, weekOptions.length);
      values.limitOfWeekPickup = getCheckListValues(weekPickupList.checkedList, weekOptions.length);

      if (values.sites) {
        let sitesva = '';
        for (let i = 0; i < values.sites.length; i++) {
          const sitevalues = values.sites[i].split('-');
          sitesva = sitesva ? sitevalues[0] + ',' + sitesva : sitevalues[0];
        }
        values.sites = sitesva;
      }
      if (locations.length > 0) {
        values.locations = [];
        locations.forEach((location: any) => {
          if (searchType === 'Off-Airport') {
            values.locationPickup = values.locationPickup
              ? `${values.locationPickup}, ${location.location}`
              : location.location;
            values.locationDropoff = values.locationDropoff
              ? `${values.locationDropoff}, ${location.return.replace(/Same as pickup/g, '')}`
              : location.return.replace(/Same as pickup/g, '');
            values.address = values.address
              ? `${values.address}, ${location.address}`
              : location.address
              ? location.address
              : '';
            values.searchRadius = values.searchRadius
              ? `${values.searchRadius}, ${location.searchRadius}`
              : location.searchRadius
              ? location.searchRadius
              : '0 mi';
          } else {
            values.locations.push({
              pickup: location.location,
              dropoff: location.return.replace(/Same as pickup/g, ''),
            });
          }
          values.city = values.city ? `${values.city}, ${location.city}` : location.city;
          values.state = values.state ? `${values.state}, ${location.state}` : location.state;
          values.postalCode = values.postalCode ? `${values.postalCode}, ${location.postalCode}` : location.postalCode;
          values.country = values.country ? `${values.country}, ${location.country}` : location.country;
        });
      }
      if (dateRange) {
        dateRange
          .replace(/\n/g, ',')
          .split(',')
          .forEach(range => {
            const startDate = range.split(' ')[0];
            const endDate = range.split(' ')[1];
            values.sDateRangeStart = values.sDateRangeStart ? `${values.sDateRangeStart},${startDate}` : startDate;
            values.sDateRangeEnd = values.sDateRangeEnd ? `${values.sDateRangeEnd},${endDate}` : endDate;
          });
      }
      if (customSpanDateRange) {
        customSpanDateRange
          .replace(/\n/g, ',')
          .split(',')
          .forEach(range => {
            const startDate = range.split(' ')[0];
            const endDate = range.split(' ')[1];
            values.sDateRangeStart = values.sDateRangeStart ? `${values.sDateRangeStart},${startDate}` : startDate;
            values.sDateRangeEnd = values.sDateRangeEnd ? `${values.sDateRangeEnd},${endDate}` : endDate;
          });
      }
      if (dateRangeLength) {
        values.dateRangeLength = dateRangeLength;
      }
      if (!err) {
        if (addLineItem) {
          addLineItem(values, form);
        }
      }
    });
    return false;
  };

  const childrensss = [];
  childrensss.push(
    data &&
      data.map(
        (sites: SiteCodeType): React.ReactNode => {
          return (
            <Option key={sites.siteCode + '-' + sites.siteName} value={sites.siteCode + '-' + sites.siteName}>
              {sites.siteCode} - {sites.siteName}
            </Option>
          );
        }
      )
  );

  const [valuess, setValuess] = useState(1);
  const [selectedCustomSpanTab, setSelectedCustomSpanTab] = useState(1);

  const onResetFormValues = () => {
    setDateRange('');
    setStartDays('');
    setEndDays('');
    setStartDate(undefined);
    setEndDate(undefined);
    setCustomSpanDateRange('');
    setCustomSpanStartDays('');
    setCustomSpanEndDays('');
    setDateRangeLength('');
    setCustomSpanStartDate(undefined);
    setCustomSpanEndDate(undefined);
    setDateRangeLength('');
  };

  const onChangeDateformat = (e: any) => {
    setValuess(e.target.value);
    onResetFormValues();
  };

  const onChangeTab = (_: any) => {
    onResetFormValues();
  };

  const handleChange = (value: SelectValue) => {
    form.setFieldsValue({ sites: value });
    return;
  };

  const onChangePickupTime = (value: SelectValue) => {
    form.setFieldsValue({ pickTime: value });
    return;
  };

  const onChangeDropOffTime = (value: SelectValue) => {
    form.setFieldsValue({ dropTime: value });
    return;
  };

  const onSearchTypeChange = (value: SelectValue) => {
    form.setFieldsValue({ searchType: value, sites: undefined });
    setSearchType(value);
    onResetFormValues();
  };

  const onAddDateRange = () => {
    if (startDays && endDays) {
      setDateRange(dateRange ? dateRange + `\n${startDays} ${endDays}` : `${startDays} ${endDays}`);
      setStartDays('');
      setEndDays('');
    }
    if (startDate && endDate) {
      setDateRange(
        dateRange
          ? dateRange + `\n${startDate.format(dateFormat)} ${endDate.format(dateFormat)}`
          : `${startDate.format(dateFormat)} ${endDate.format(dateFormat)}`
      );
      setStartDate(undefined);
      setEndDate(undefined);
    }
  };

  const onAddCustomSpanDateRange = () => {
    if (customSpanStartDays && customSpanEndDays) {
      setCustomSpanDateRange(
        customSpanDateRange
          ? customSpanDateRange + `\n${customSpanStartDays} ${customSpanEndDays}`
          : `${customSpanStartDays} ${customSpanEndDays}`
      );
      setCustomSpanStartDays('');
      setCustomSpanEndDays('');
    }
    if (customSpanStartDate && customSpanEndDate) {
      setCustomSpanDateRange(
        customSpanDateRange
          ? customSpanDateRange + `\n${customSpanStartDate.format(dateFormat)} ${customSpanEndDate.format(dateFormat)}`
          : `${customSpanStartDate.format(dateFormat)} ${customSpanEndDate.format(dateFormat)}`
      );
      setCustomSpanStartDate(undefined);
      setCustomSpanEndDate(undefined);
    }
  };

  const onHandleDatesKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onAddDateRange();
      onAddCustomSpanDateRange();
    }
  };

  const onChangeCustomSpanTab = (e: any) => {
    setSelectedCustomSpanTab(e.target.value);
    onResetFormValues();
  };

  return (
    <div className="create_new_client_form_wrapper">
      <Form hideRequiredMark>
        <div>
          <Row>
            <Col span={16} offset={4}>
              <Form.Item>
                {getFieldDecorator('jobId', formConfig.jobId)(<Input type="hidden" placeholder="Please enter jobId" />)}
              </Form.Item>
              <Form.Item {...layout} label={<h6>Search Name</h6>}>
                {getFieldDecorator(
                  'searchName',
                  formConfig.searchName
                )(<Input type="text" placeholder="Please enter Search Name" className={styles.readOnly} disabled />)}
              </Form.Item>
              <Divider className="dividerCustom" />
              <Form.Item {...layout} label={<h6>Vertical</h6>}>
                {getFieldDecorator(
                  'vertical',
                  formConfig.Vertical
                )(<Input type="text" className={styles.readOnly} disabled />)}
              </Form.Item>
              <Divider className="dividerCustom" />
              <Form.Item {...layout} label={<h6>Search Type</h6>}>
                {getFieldDecorator('searchType', {
                  initialValue: 'Airport',
                })(
                  <Select showArrow placeholder="Search Types" onChange={onSearchTypeChange}>
                    {searchTypes.map(
                      (type: any): React.ReactNode => {
                        return (
                          <Option key={type.id} value={type.id}>
                            {type.name}
                          </Option>
                        );
                      }
                    )}
                  </Select>
                )}
              </Form.Item>
              <Divider className="dividerCustom" />
              <Form.Item
                {...layout}
                label={
                  <h6>
                    Site Code
                    <Contentsss1Pop />
                    <span>Site codes space delimited</span>
                  </h6>
                }
              >
                {getFieldDecorator(
                  'sites',
                  formConfig.sites
                )(
                  <Select
                    showArrow
                    mode="multiple"
                    className="siteCodeSelect"
                    placeholder="Site Code"
                    onChange={handleChange}
                  >
                    {childrensss}
                  </Select>
                )}
              </Form.Item>
              <Divider className="dividerCustom" />
              <CreateCarLocation searchType={searchType} locations={locations} setLocations={setLocations} />
              <Divider className="dividerCustom" />
              <Form.Item
                {...layout}
                label={
                  <h6>
                    Point of sale <PointOfSaleTooltip />
                  </h6>
                }
              >
                {getFieldDecorator(
                  'pointOfSale',
                  formConfig.pointOfSale
                )(<Input type="text" placeholder="Please enter Point of sale (default US)" className="searchName" />)}
              </Form.Item>
              <Divider className="dividerCustom" />
            </Col>
          </Row>
          <Row>
            <Col span={16} offset={4}>
              <label className="ant-col ant-col-9 ant-form-item-label" style={{ fontWeight: 700, fontSize: '12px' }}>
                Rental Dates <span style={{ marginRight: '10px' }}> :</span>{' '}
              </label>
              <div className="ant-col ant-col-15 ant-form-item-control-wrapper">
                <Tabs defaultActiveKey="1" onChange={onChangeTab} type="card" tabPosition="top" className="travelTab">
                  <TabPane tab=" Specific Range" key="1" className="travelTab2">
                    <Col span={24} className="departureDate">
                      <Form.Item
                        label={
                          <h6 style={{ textAlign: 'left' }}>
                            Departure & Return Date
                            <CheckInTooltip styles={{ right: '5px' }} />
                            <span>Days in future or &quot;{UserContex.getDateFormat()}&quot;.</span>
                          </h6>
                        }
                      >
                        <Radio.Group onChange={onChangeDateformat} value={valuess} style={{ float: 'left' }}>
                          <Radio value={1}>Days in the Future</Radio>
                          <Radio value={2}>Actual Dates</Radio>
                        </Radio.Group>
                        {valuess === 1 ? (
                          <div className={styles.create_new_line_date}>
                            <Input
                              type="number"
                              value={startDays}
                              onChange={(event: any) => setStartDays(event.target.value)}
                              placeholder="Departure Date"
                            />
                            <Input
                              type="number"
                              value={endDays}
                              onChange={(event: any) => setEndDays(event.target.value)}
                              placeholder="Return Date"
                              onKeyDown={onHandleDatesKeyDown}
                            />
                            <Button type="primary" onClick={onAddDateRange}>
                              Add
                            </Button>
                          </div>
                        ) : (
                          <div className={styles.create_new_line_date}>
                            <DatePicker
                              onChange={onChangeDepartureDate}
                              placeholder="Departure Date"
                              showToday={false}
                              defaultValue={moment()}
                              value={startDate}
                              format={dateFormat}
                            />
                            <DatePicker
                              onChange={onChangeReturnDate}
                              placeholder="Return Date"
                              showToday={false}
                              format={dateFormat}
                              defaultValue={moment()}
                              value={endDate}
                            />
                            <Button type="primary" onClick={onAddDateRange}>
                              Add
                            </Button>
                          </div>
                        )}
                      </Form.Item>
                      <TextArea
                        rows={3}
                        value={dateRange}
                        onChange={(event: any) => setDateRange(event.target.value)}
                      />
                    </Col>
                  </TabPane>
                  <TabPane tab="Shopping Span" key="2" className="travelTab3">
                    <Col span={24} className="sDateRangeEnd">
                      <Form.Item
                        label={
                          <h6 style={{ textAlign: 'left' }}>
                            Departure & Return Date
                            <CheckInTooltip styles={{ right: '5px' }} />
                            <span>Days in future or &quot;{UserContex.getDateFormat()}&quot;.</span>
                          </h6>
                        }
                      >
                        <Radio.Group
                          onChange={onChangeCustomSpanTab}
                          value={selectedCustomSpanTab}
                          style={{ float: 'left' }}
                        >
                          <Radio value={1}>Days in the Future</Radio>
                          <Radio value={2}>Actual Dates</Radio>
                        </Radio.Group>
                        {selectedCustomSpanTab === 1 ? (
                          <div className={styles.create_new_line_date}>
                            <Input
                              type="number"
                              value={customSpanStartDays}
                              onChange={(event: any) => setCustomSpanStartDays(event.target.value)}
                              placeholder="First Departure Date"
                            />
                            <Input
                              type="number"
                              value={customSpanEndDays}
                              onChange={(event: any) => setCustomSpanEndDays(event.target.value)}
                              placeholder="Last Departure Date"
                              onKeyDown={onHandleDatesKeyDown}
                            />
                            <Button
                              type="primary"
                              onClick={onAddCustomSpanDateRange}
                              disabled={Boolean(customSpanDateRange)}
                            >
                              Add
                            </Button>
                          </div>
                        ) : (
                          <div className={styles.create_new_line_date}>
                            <DatePicker
                              onChange={onChangeCustomSpanStartDate}
                              placeholder="First Departure Date"
                              showToday={false}
                              defaultValue={moment()}
                              value={customSpanStartDate}
                              format={dateFormat}
                            />
                            <DatePicker
                              onChange={onChangeCustomSpanEndDate}
                              placeholder="Last Departure Date"
                              showToday={false}
                              format={dateFormat}
                              defaultValue={moment()}
                              value={customSpanEndDate}
                            />
                            <Button
                              type="primary"
                              onClick={onAddCustomSpanDateRange}
                              disabled={Boolean(customSpanDateRange)}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Form.Item>
                      <TextArea
                        rows={3}
                        value={customSpanDateRange}
                        onChange={(event: any) => setCustomSpanDateRange(event.target.value)}
                      />
                      <Col span={24}>
                        <Form.Item label={<h6>Length of rent</h6>}>
                          <Input
                            value={dateRangeLength}
                            onChange={(event: any) => setDateRangeLength(event.target.value)}
                            type="text"
                            style={{ width: '100%' }}
                            placeholder="Length of rent"
                          />
                          <span>Multiple values can be entered, separated by spaces or commas.</span>
                        </Form.Item>
                      </Col>
                    </Col>
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={16} offset={4}>
              <Divider className="dividerCustom" />
              <Form.Item
                {...layout}
                label={
                  <h6>
                    Reference <Contentsss2Pop />
                    <span>Free-form, see help</span>
                  </h6>
                }
              >
                {getFieldDecorator('ref', formConfig.ref)(<Input type="text" placeholder="Reference" />)}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={16} offset={4}>
            <Collapse defaultActiveKey={['0']} expandIconPosition="right" bordered={false}>
              <Panel header="Advanced options" key="1" className="advancedOptions">
                <Row>
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Custom
                          <CustomTooltip />
                        </h6>
                      }
                    >
                      {getFieldDecorator('custom', formConfig.custom)(<Input placeholder="Please enter Custom" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          RAC <RACTooltip />
                        </h6>
                      }
                    >
                      {getFieldDecorator('RAC', {})(<Input placeholder="Please enter RAC" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Discount <DiscountTooltip />
                        </h6>
                      }
                    >
                      {getFieldDecorator('discount', {})(<Input placeholder="Please enter Discount" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Pickup Time <PickupReturnTimeTooltip />
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'pickTime',
                        formConfig.pickTime
                      )(
                        <Select
                          showArrow
                          className="siteCodeSelect"
                          placeholder="Select Pickup Time"
                          onChange={onChangePickupTime}
                        >
                          {getTimeOptions().map(
                            (time: any): React.ReactNode => {
                              return (
                                <Option key={time.name} value={time.name}>
                                  {time.name}
                                </Option>
                              );
                            }
                          )}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Return Time <PickupReturnTimeTooltip />
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'dropTime',
                        formConfig.dropTime
                      )(
                        <Select
                          showArrow
                          className="siteCodeSelect"
                          placeholder="Select Return Time"
                          onChange={onChangeDropOffTime}
                        >
                          {getTimeOptions().map(
                            (time: any): React.ReactNode => {
                              return (
                                <Option key={time.name} value={time.name}>
                                  {time.name}
                                </Option>
                              );
                            }
                          )}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <>
                    <Col span={24}>
                      <Form.Item
                        {...layout}
                        label={
                          <h6>
                            Limit to these days of week (pickup) <CheckInDOWTooltip />
                          </h6>
                        }
                      >
                        {getFieldDecorator(
                          'limitOfWeekPickup',
                          {}
                        )(
                          <span>
                            <Checkbox
                              indeterminate={weekPickupList.indeterminate}
                              onChange={onCheckAllPickupWeek}
                              checked={weekPickupList.checkAll}
                            >
                              All
                            </Checkbox>
                            <CheckboxGroup
                              options={weekOptions}
                              value={weekPickupList.checkedList}
                              onChange={onChangeWeekPickupList}
                            />
                          </span>
                        )}
                      </Form.Item>
                    </Col>
                    <Divider className="dividerCustom" />
                    <Col span={24}>
                      <Form.Item
                        {...layout}
                        label={
                          <h6>
                            Limit to these days of week (return)
                            <CheckOutDOWTooltip />
                          </h6>
                        }
                      >
                        {getFieldDecorator(
                          'limitOfWeekReturn',
                          {}
                        )(
                          <span>
                            <Checkbox
                              indeterminate={weekReturnList.indeterminate}
                              onChange={onCheckAllReturnWeek}
                              checked={weekReturnList.checkAll}
                            >
                              All
                            </Checkbox>
                            <CheckboxGroup
                              options={weekOptions}
                              value={weekReturnList.checkedList}
                              onChange={onChangeWeekReturnList}
                            />
                          </span>
                        )}
                      </Form.Item>
                    </Col>
                    <Divider className="dividerCustom" />
                    <Col span={24}>
                      <Form.Item {...layout} label={
                      <h6>
                      Limit to these weeks of the month (pickup)
                      <WeekPickupTooltip />
                      </h6>}
                      >
                        {getFieldDecorator(
                          'limitOfMonthPickup',
                          {}
                        )(
                          <span>
                            <Checkbox
                              indeterminate={monthPickupList.indeterminate}
                              onChange={onCheckAllPickupChange}
                              checked={monthPickupList.checkAll}
                            >
                              All
                            </Checkbox>
                            <CheckboxGroup
                              options={monthOptions}
                              value={monthPickupList.checkedList}
                              onChange={onChangeMonthPickupList}
                            />
                          </span>
                        )}
                      </Form.Item>
                    </Col>
                    <Divider className="dividerCustom" />
                    <Col span={24}>
                      <Form.Item {...layout} label={
                      <h6>Limit to these weeks of the month (return) 
                      <WeekPickupTooltip />
                      </h6>}
                      >
                        {getFieldDecorator(
                          'limitOfMonthReturn',
                          {}
                        )(
                          <span>
                            <Checkbox
                              indeterminate={monthReturnList.indeterminate}
                              onChange={onCheckAllReturnChange}
                              checked={monthReturnList.checkAll}
                            >
                              All
                            </Checkbox>
                            <CheckboxGroup
                              options={monthOptions}
                              value={monthReturnList.checkedList}
                              onChange={onChangeMonthReturnList}
                            />
                          </span>
                        )}
                      </Form.Item>
                    </Col>
                    <Divider className="dividerCustom" />
                  </>

                  <GeoFieldWrapper getFieldDecorator={getFieldDecorator} vertical={vertical} />
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
        <Col span={16} offset={4}>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={disableSubmit}
            className="submitBtn"
            style={{ margin: '20px auto', display: 'table' }}
          >
            Submit
          </Button>
        </Col>
      </Form>
    </div>
  );
};

const WrappedCreateNewLineCarForm = Form.create<AddSearchNameFormProps>({ name: 'name' })(CreateNewLineCar);
export default WrappedCreateNewLineCarForm;
