import React, { SyntheticEvent, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button, Tabs, Checkbox, Radio, Collapse, Divider, DatePicker, Select } from 'antd';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import SiteCodeType from 'src/types/SiteCodeType';
import { useSiteCodeFetch } from 'src/components/CreateNewSearch/SiteCode/hooks';
import UserContex from 'src/services/UserContex';
import moment from 'moment';
import { Contentsss1Pop } from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItemTooltip';
import { SelectValue } from 'antd/lib/select';
import CreateHotelLocation from './CreateHotelLocation';
import { useCreateHotelJobSearch } from 'src/api/hotelJobSearch';
import {
  BrandTooltip,
  CheckInDOWTooltip,
  CheckInTooltip,
  CheckOutDOWTooltip,
  CustomTooltip,
  MaxPropertiesTooltip,
  POSTooltip,
  ProximityTooltip,
  RatesTooltip,
  ReferenceTooltip,
  SortByTooltip,
  StarsTooltip,
  ZoneIdTooltip,
  ZoneNameTooltip,
} from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import GeoFieldWrapper from 'src/components/CreateNewSearch/GeoFieldWrapper';

const { TextArea } = Input;
const { Panel } = Collapse;
const { Option } = Select;

export type AddSearchNameFormProps = FormComponentProps & {
  searchName?: string | undefined;
  vertical: string;
  jobId?: number;
  sites?: any;
  value?: any;
  specap1?: any;
  specap2?: any;
  sDateRangeEnd?: any;
  sDateRangeStart?: any;
  form: any;
};

const { TabPane } = Tabs;

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

type FormFields = {
  [field: string]: any;
};

export const CreateNewLineHotel: React.FC<AddSearchNameFormProps> = ({
  form,
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
  const [hotelData, setHotelData] = React.useState(undefined);
  const [hotelLocation, setHotelLocation] = React.useState([]);
  useCreateHotelJobSearch(hotelData);

  const formConfig: FormConfig = {
    searchName: {
      initialValue: searchName,
      rules: [{ required: true, message: 'Search name is required!' }],
      validateTrigger: 'onBlur',
    },
    Vertical: {
      initialValue: 'Hotel',
    },
    jobId: {
      initialValue: jobId,
      rules: [{ required: true, message: 'Job ID is required!' }],
      validateTrigger: 'onBlur',
    },
    stars: {
      initialValue: '1+',
    },
    occupancy: { initialValue: 2 },
    proximity: { initialValue: 15 },
    rooms: { initialValue: 1 },
    maximumProperties: { initialValue: 25 },
    sites: { initialValue: sites },
    sDateRangeEnd: { initialValue: sDateRangeEnd },
    sDateRangeStart: { initialValue: sDateRangeStart },
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
    !isFieldsTouched();

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
  const plainOptions = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const plainOptions2 = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const defaultCheckedList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const defaultCheckedList2 = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const [state, setState] = React.useState({
    checkedList: defaultCheckedList,
    indeterminate: false,
    checkAll: true,
  });

  const [state2, setState2] = React.useState({
    checkedList2: defaultCheckedList2,
    indeterminate2: false,
    checkAll2: true,
  });

  const onChangessss = (checkedList: any) => {
    setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

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

  const onCheckAllChange = (e: any) => {
    setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  const [{ data }] = useSiteCodeFetch(vertical);

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err: any, values: any) => {
      if (hotelLocation.length > 0) {
        Object.keys(hotelLocation[0]).forEach(key => {
          values[key] = hotelLocation[0][key];
        });
      }
      if (state.checkedList.length > 0 && state.checkedList.length < 7) {
        values.limitOfMonth = state.checkedList.join(',');
      }
      if (state2.checkedList2.length > 0 && state2.checkedList2.length < 7) {
        values.limitOfWeek = state2.checkedList2.join(',');
      }
      if (values.sites) {
        let sitesva = '';
        for (let i = 0; i < values.sites.length; i++) {
          const sitevalues = values.sites[i].split('-');
          sitesva = sitesva ? sitevalues[0] + ',' + sitesva : sitevalues[0];
        }
        values.sites = sitesva;
      }
      if (dateRange) {
        dateRange
          .replace(/\n/g, ',')
          .split(',')
          .forEach(range => {
            const startDate = range.split(' ')[0];
            const endDate = range.split(' ')[1];
            values.checkIn = values.sDateRangeStart ? `${values.sDateRangeStart},${startDate}` : startDate;
            values.checkOut = values.sDateRangeEnd ? `${values.sDateRangeEnd},${endDate}` : endDate;
          });
      }
      if (customSpanDateRange) {
        customSpanDateRange
          .replace(/\n/g, ',')
          .split(',')
          .forEach(range => {
            const startDate = range.split(' ')[0];
            const endDate = range.split(' ')[1];
            values.checkIn2 = values.sDateRangeStart ? `${values.sDateRangeStart},${startDate}` : startDate;
            values.checkOut2 = values.sDateRangeEnd ? `${values.sDateRangeEnd},${endDate}` : endDate;
          });
      }
      if (dateRangeLength) {
        values.dateRangeLength = dateRangeLength;
      }
      if (!err) {
        setHotelData(values);
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

  const [selectedOption, setSelectedOption] = useState(1);
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
    setSelectedOption(e.target.value);
    onResetFormValues();
  };
  const onChangeTab = (_: any) => {
    onResetFormValues();
  };

  const handleChange = (value: SelectValue) => {
    form.setFieldsValue({ sites: value });
    return;
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
              <Form.Item {...layout} label={<h6 className="tooltiplayout">Search Name</h6>}>
                {getFieldDecorator(
                  'searchName',
                  formConfig.searchName
                )(<Input type="text" placeholder="Please enter Search Name" className={styles.readOnly} disabled />)}
              </Form.Item>
              <Divider className="dividerCustom" />
              <Form.Item {...layout} label={<h6 className="tooltiplayout">Select Vertical</h6>}>
                {getFieldDecorator(
                  'vertical',
                  formConfig.Vertical
                )(<Input type="text" placeholder="Hotel" className={styles.readOnly} disabled />)}
              </Form.Item>
              <Divider className="dividerCustom" />
              <Form.Item
                {...layout}
                label={
                  <h6 className="tooltiplayout">
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
              <Col span={24}>
                <div className={'ant-row ant-form-item'}>
                  <div className="ant-col ant-col-9 ant-form-item-label">
                    <label>
                      <h6 className="tooltiplayout">Locations</h6>
                    </label>
                  </div>
                  <CreateHotelLocation onUpdate={setHotelLocation} />
                </div>
              </Col>
              <Divider className="dividerCustom" />
            </Col>
          </Row>
          <Row>
            <Col span={16} offset={4}>
              <label className="ant-col ant-col-9 ant-form-item-label" style={{ fontWeight: 700, fontSize: '12px' }}>
                Hotel Dates <span style={{ marginRight: '10px' }}> :</span>{' '}
              </label>
              <div className="ant-col ant-col-15 ant-form-item-control-wrapper">
                <Tabs defaultActiveKey="1" onChange={onChangeTab} type="card" tabPosition="top" className="travelTab">
                  <TabPane tab=" Specific Range" key="1" className="travelTab2">
                    <Col span={24} className="departureDate">
                      <Form.Item
                        label={
                          <h6 className="tooltiplayout" style={{ textAlign: 'left' }}>
                            Departure & Return Date
                            <CheckInTooltip styles={{ right: '5px' }} />
                            <span>Days in future or &quot;{UserContex.getDateFormat()}&quot;.</span>
                          </h6>
                        }
                      >
                        <Radio.Group onChange={onChangeDateformat} value={selectedOption} style={{ float: 'left' }}>
                          <Radio value={1}>Days in the Future</Radio>
                          <Radio value={2}>Actual Dates</Radio>
                        </Radio.Group>
                        {selectedOption === 1 ? (
                          <div className={styles.create_new_line_date}>
                            <Input
                              type="number"
                              min={0}
                              value={startDays}
                              onChange={(event: any) => setStartDays(event.target.value)}
                              placeholder="Check-in Date"
                            />
                            <Input
                              type="number"
                              value={endDays}
                              min={0}
                              onChange={(event: any) => setEndDays(event.target.value)}
                              placeholder="Check-out Date"
                            />
                            <Button type="primary" onClick={onAddDateRange}>
                              Add
                            </Button>
                          </div>
                        ) : (
                          <div className={styles.create_new_line_date}>
                            <DatePicker
                              onChange={onChangeDepartureDate}
                              placeholder="Check-in Date"
                              showToday={false}
                              defaultValue={moment()}
                              value={startDate}
                              format={dateFormat}
                            />
                            <DatePicker
                              onChange={onChangeReturnDate}
                              placeholder="Check-out Date"
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
                          <h6 className="tooltiplayout" style={{ textAlign: 'left' }}>
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
                              min={0}
                              value={customSpanStartDays}
                              onChange={(event: any) => setCustomSpanStartDays(event.target.value)}
                              placeholder="First Check-in"
                            />
                            <Input
                              type="number"
                              min={0}
                              value={customSpanEndDays}
                              onChange={(event: any) => setCustomSpanEndDays(event.target.value)}
                              placeholder="Last Check-in"
                            />
                            <Button type="primary" onClick={onAddCustomSpanDateRange}>
                              Add
                            </Button>
                          </div>
                        ) : (
                          <div className={styles.create_new_line_date}>
                            <DatePicker
                              onChange={onChangeCustomSpanStartDate}
                              placeholder="First Check-in"
                              showToday={false}
                              defaultValue={moment()}
                              value={customSpanStartDate}
                              format={dateFormat}
                            />
                            <DatePicker
                              onChange={onChangeCustomSpanEndDate}
                              placeholder="Last Check-in"
                              showToday={false}
                              format={dateFormat}
                              defaultValue={moment()}
                              value={customSpanEndDate}
                            />
                            <Button type="primary" onClick={onAddCustomSpanDateRange}>
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
                        <Form.Item label={<h6>Length of stay</h6>}>
                          <Input
                            value={dateRangeLength}
                            min={0}
                            onChange={(event: any) => setDateRangeLength(event.target.value)}
                            type="text"
                            style={{ width: '100%' }}
                            placeholder="Length of stay"
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
                    Reference
                    <ReferenceTooltip />
                  </h6>
                }
              >
                {getFieldDecorator('reference', formConfig.custom)(<Input placeholder="Please enter Reference" />)}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={16} offset={4}>
            <Collapse defaultActiveKey={['0']} expandIconPosition="right" bordered={false}>
              <Panel header="Advanced options" key="1" className="advancedOptions">
                <Row>
                  <Form.Item
                    {...layout}
                    label={
                      <h6 className="tooltiplayout">
                        Stars
                        <StarsTooltip />
                      </h6>
                    }
                  >
                    {getFieldDecorator(
                      'stars',
                      formConfig.stars
                    )(<Input type="text" placeholder="Please enter Stars" className="searchName" />)}
                  </Form.Item>
                  <Divider className="dividerCustom" />
                  <Form.Item
                    {...layout}
                    label={
                      <h6 className="tooltiplayout">
                        Occupancy<span># of adults</span>
                      </h6>
                    }
                  >
                    {getFieldDecorator(
                      'occupancy',
                      formConfig.occupancy
                    )(<Input type="text" placeholder="Please enter Occupancy" className="searchName" />)}
                  </Form.Item>
                  <Divider className="dividerCustom" />
                  <Form.Item
                    {...layout}
                    label={
                      <h6 className="tooltiplayout">
                        Brand
                        <BrandTooltip />
                      </h6>
                    }
                  >
                    {getFieldDecorator(
                      'brand',
                      formConfig.brand
                    )(<Input type="text" placeholder="Please enter Brand" className="searchName" />)}
                  </Form.Item>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Proximity
                          <ProximityTooltip />
                          <span>miles from search location</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'proximity',
                        formConfig.proximity
                      )(<Input placeholder="Please enter Proximity" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Rooms<span># of rooms to search for</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator('rooms', formConfig.rooms)(<Input placeholder="Please enter Rooms" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Maximum properties
                          <MaxPropertiesTooltip />
                          <span># of properties to return</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'maximumProperties',
                        formConfig.maximumProperties
                      )(<Input placeholder="Please enter Maximum properties" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Sort By
                          <SortByTooltip />
                          <span>Sort before selecting properties on site</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator('sortBy', {
                        initialValue: '',
                      })(
                        <Radio.Group className={styles.create_new_line_radio_group}>
                          <Radio value={''}>Site default</Radio>
                          <Radio value={'p'}>Sort by price</Radio>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Point of Sale
                          <POSTooltip />
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'pointOfSale',
                        formConfig.custom
                      )(<Input placeholder="Please enter Point of Sale" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Zone ID
                          <ZoneIdTooltip />
                          <span>For Hotwire targeted searches only</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator('zoneId', formConfig.custom)(<Input placeholder="Please enter Zone ID" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Zone Name
                          <ZoneNameTooltip />
                          <span>For Hotwire targeted searches only</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator('zoneName', formConfig.custom)(<Input placeholder="Please enter Zone Name" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6>
                          Rates
                          <RatesTooltip />
                          <span>types of rates to extract</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'rateSubsetType',
                        formConfig.rateSubsetType
                      )(
                        <Radio.Group className={styles.create_new_line_radio_group}>
                          <Radio value={'A'}>A – all rates</Radio>
                          <Radio value={'L'}>L – lowest rates</Radio>
                          <Radio value={'R'}>R – lowest per room type</Radio>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
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
                  <>
                    <Col span={24}>
                      <Form.Item
                        {...layout}
                        label={
                          <h6>
                            Check-in DOW filter
                            <CheckInDOWTooltip />
                          </h6>
                        }
                      >
                        {getFieldDecorator(
                          'limitOfWeek',
                          formConfig.limitOfWeek
                        )(
                          <div className={styles.create_new_line_checkboxes}>
                            <Checkbox
                              indeterminate={state2.indeterminate2}
                              onChange={onCheckAllChange2}
                              checked={state2.checkAll2}
                            >
                              All
                            </Checkbox>
                            <CheckboxGroup
                              options={plainOptions2}
                              value={state2.checkedList2}
                              onChange={onChangessss2}
                            />
                          </div>
                        )}
                      </Form.Item>
                    </Col>
                    <Divider className="dividerCustom" />
                    <Col span={24}>
                      <Form.Item
                        {...layout}
                        label={
                          <h6 className="tooltiplayout">
                            Check-out DOW filter
                            <CheckOutDOWTooltip />
                          </h6>
                        }
                      >
                        {getFieldDecorator(
                          'limitOfMonth',
                          formConfig.limitOfMonth
                        )(
                          <div className={styles.create_new_line_checkboxes}>
                            <Checkbox
                              indeterminate={state.indeterminate}
                              onChange={onCheckAllChange}
                              checked={state.checkAll}
                            >
                              All
                            </Checkbox>
                            <CheckboxGroup options={plainOptions} value={state.checkedList} onChange={onChangessss} />
                          </div>
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

const WrappedCreateNewLineCarForm = Form.create<AddSearchNameFormProps>({ name: 'name' })(CreateNewLineHotel);
export default WrappedCreateNewLineCarForm;
