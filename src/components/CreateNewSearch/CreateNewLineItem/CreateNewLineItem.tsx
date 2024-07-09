import React, { SyntheticEvent, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Col, Row, Input, Button, Tabs, Checkbox, Radio, Collapse, Divider, DatePicker, Select } from 'antd';
import styles from './CreateNewLineItem.module.less';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import AirFareLineItemType from 'src/types/AirFareLineItemType';
import SiteCodeType from 'src/types/SiteCodeType';
import { useSiteCodeFetch } from '../SiteCode/hooks';
import UserContex from 'src/services/UserContex';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  PointOfSaleTooltip,
  Contentsss1Pop,
  Contentsss2Pop,
  Contentsss3Pop,
  Contentsss4Pop,
  Contentsss6Pop,
  Contentsss7Pop,
  Contentsss8Pop,
  Contentsss9Pop,
  Contentsss10Pop,
  Contentsss11Pop,
  Contentsss12Pop,
  Contentsss13Pop,
  Contentsss14Pop,
  Contentsss15Pop,
} from './CreateNewLineItemTooltip';
import { SelectValue } from 'antd/lib/select';
import {
  CustomTooltip,
  CheckInTooltip,
} from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import GeoFieldWrapper from 'src/components/CreateNewSearch/GeoFieldWrapper';
import { useUserPermissionSearchType } from 'src/api/searchType';

const { TextArea } = Input;
const { Panel } = Collapse;
const { Option } = Select;

const searchTypes: any = [
  {
    name: 'QL2 Rental ID',
    id: 'QL2RentalID',
  },
  {
    name: 'Airport',
    id: 'Airport',
  },
  {
    name: 'Off-Airport',
    id: 'Off-Airport',
  },
];

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

const { TabPane } = Tabs;

const hasErrors = (fieldsError: Record<string, string[] | undefined>): boolean => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

type FormFields = {
  [field: string]: any;
};

export const CreateNewSearchForm: React.FC<AddSearchNameFormProps> = ({
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
  const [checked, setChecked] = React.useState(true);
  const [loadingDST, { enableDST }] = useUserPermissionSearchType('102');
  console.log(loadingDST);
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
  const [locations, setLocations] = React.useState([]);
  const [locationPickup, setLocationPickup] = React.useState('');
  const [locationReturn, setLocationReturn] = React.useState('');

  const formConfig: FormConfig = {
    SearchName: {
      initialValue: searchName,
      rules: [{ required: true, message: 'Search name is required!' }],
      validateTrigger: 'onBlur',
    },
    jobId: {
      initialValue: jobId,
      rules: [{ required: true, message: 'Job ID is required!' }],
      validateTrigger: 'onBlur',
    },
    Vertical: {
      initialValue: 'Flights',
    },
    pas: { initialValue: '1' },
    flc: { initialValue: 'E' },
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

  const dateFormatsss = UserContex.getDateFormat();
  const dateFormat = dateFormatsss;
  const [dateValDep, setDateValDep] = useState<any>();
  const [dateValRet, setDateValRet] = useState<any>();

  function onPanelChangeD(selectedValue: any) {
    if (selectedValue === null) {
      setDateValDep('0');
    } else {
      setDateValDep(selectedValue.format(dateFormat));
    }
    setStartDate(selectedValue);
  }
  function onPanelChangeRet(selectedValue: any) {
    if (selectedValue === null) {
      setDateValRet('0');
    } else {
      setDateValRet(selectedValue.format(dateFormat));
    }
    setEndDate(selectedValue);
  }

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

  function onDepartureChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
    console.log(`checked = ${e.target.value}`);
  }

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

  const [{ data }] = useSiteCodeFetch(verticalID);

  const handleSubmit = (event: SyntheticEvent): boolean => {
    event.preventDefault();
    form.validateFields((err: any, values: AirFareLineItemType) => {
      if (state.checkedList.length > 0 && state.checkedList.length < 7) {
        values.sDOWDepart = state.checkedList.join(',');
      }
      if (state2.checkedList2.length > 0 && state2.checkedList2.length < 7) {
        values.sDOWReturn = state2.checkedList2.join(',');
      }
      values.sSearchType = enableDST;
      if (values.sites) {
        let sitesva = '';
        for (let i = 0; i < values.sites.length; i++) {
          const sitevalues = values.sites[i].split('-');
          sitesva = sitevalues[0] + ',' + sitesva;
        }
        values.sites = sitesva;
      }
      if (startDays) {
        values.specap1 = startDays;
      }
      if (endDays) {
        values.specap2 = endDays;
      }
      if (startDate) {
        values.specap1 = startDate.format(dateFormat);
      }
      if (endDate) {
        values.specap2 = endDate.format(dateFormat);
      }
      if (values.specapT1) {
        values.specap1 = values.specapT1;
      }
      if (values.specapT2) {
        values.specap2 = values.specapT2;
      }
      if (dateValDep) {
        values.specap1 = dateValDep;
      }
      if (dateValRet) {
        values.specap2 = dateValRet;
      }
      if (dateRange) {
        values.dateRange = dateRange.replace(/\n/g, ', ');
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
          setDateValDep('');
          setDateValRet('');
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
    form.setFieldsValue({ ap1: false, ap7: false, ap14: false, ap21: false, ap28: false, ap1s: false, ap7s: false });
  };

  const onChangeDateformat = (e: any) => {
    setValuess(e.target.value);
    onResetFormValues();
  };

  const onChangeTab = (_: any) => {
    onResetFormValues();
  };

  function handleChange(value: SelectValue) {
    form.setFieldsValue({ sites: value });
    return;
  }

  const onSearchTypeChange = (value: SelectValue) => {
    form.setFieldsValue({ searchTypes: value });
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

  const getDatesTitle = (id: string | undefined) => {
    if (id === '106' || id === 'Carrental') {
      return 'Rental Dates';
    }
    return ' Travel Dates ';
  };

  const addLocation = () => {
    const changedLocations: any = [...locations];
    changedLocations.push({
      pickup: locationPickup,
      return: locationReturn ? locationReturn : 'Same a pickup',
    });
    setLocationPickup('');
    setLocationReturn('');
    setLocations(changedLocations);
  };

  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addLocation();
    }
  };

  const removeLocation = (locationIndex: number) => {
    return (_: any) => {
      const changedLocations: any = [...locations];
      changedLocations.splice(locationIndex, 1);
      setLocations(changedLocations);
    };
  };

  return (
    <div className="create_new_client_form_wrapper">
      <Form hideRequiredMark onSubmit={handleSubmit}>
        <div>
          <Row>
            <Col span={16} offset={4}>
              <Form.Item>
                {getFieldDecorator('jobId', formConfig.jobId)(<Input type="hidden" placeholder="Please enter jobId" />)}
              </Form.Item>
              <Form.Item {...layout} label={<h6 className="tooltiplayout">Search Name</h6>}>
                {getFieldDecorator(
                  'SearchName',
                  formConfig.SearchName
                )(<Input type="text" placeholder="Please enter Search Name" className={styles.readOnly} disabled />)}
              </Form.Item>
              <Divider className="dividerCustom" />
              <Form.Item {...layout} label={<h6 className="tooltiplayout">Vertical</h6>}>
                {getFieldDecorator(
                  'vertical',
                  formConfig.Vertical
                )(<Input type="text" className={styles.readOnly} disabled />)}
              </Form.Item>
              <Divider className="dividerCustom" />
              {verticalID === '106' && (
                <>
                  <Form.Item {...layout} label={<h6 className="tooltiplayout">Search Type</h6>}>
                    {getFieldDecorator(
                      'searchTypes',
                      formConfig.searchTypes
                    )(
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
                      <h6 className="tooltiplayout">
                        Point of sale <PointOfSaleTooltip />
                      </h6>
                    }
                  >
                    {getFieldDecorator(
                      'pointOfSale',
                      formConfig.pointOfSale
                    )(<Input type="text" placeholder="Point of sale" className="searchName" />)}
                  </Form.Item>
                  <Divider className="dividerCustom" />
                </>
              )}
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
              {verticalID === '106' && (
                <>
                  <Col span={24}>
                    <div className={'ant-row ant-form-item'}>
                      <div className="ant-col ant-col-9 ant-form-item-label">
                        <label>
                          <h6 className="tooltiplayout">Locations</h6>
                        </label>
                      </div>
                      <div className={styles.create_new_line_location}>
                        <Input
                          type="text"
                          value={locationPickup}
                          onKeyDown={onHandleKeyDown}
                          onChange={(event: any) => setLocationPickup(event.target.value)}
                          placeholder="Pickup"
                        />
                        <Input
                          type="text"
                          value={locationReturn}
                          onKeyDown={onHandleKeyDown}
                          onChange={(event: any) => setLocationReturn(event.target.value)}
                          placeholder="Return"
                        />
                        <Button type="primary" onClick={addLocation}>
                          Add
                        </Button>
                      </div>
                      <div className={styles.create_new_line_locations}>
                        {locations.length > 0 && (
                          <div className={styles.create_new_line_locations_title}>
                            <span>Pickup</span>
                            <span>Return</span>
                          </div>
                        )}
                        {locations.map(
                          (location: any, i: number): React.ReactNode => {
                            return (
                              <p key={location.pickup}>
                                <span className={styles.create_new_line_location_text}>
                                  <Button type={'link'} onClick={removeLocation(i)}>
                                    <FontAwesomeIcon icon={['fal', 'trash-alt']} style={{ color: '#6f6f6f' }} />
                                  </Button>
                                  {location.pickup}
                                </span>
                                <span className={styles.create_new_line_location_text}>
                                  <span className={styles.create_new_line_location_text_arrow}>&gt;</span>
                                  {location.return}
                                </span>
                              </p>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </Col>
                  <Divider className="dividerCustom" />
                </>
              )}
              {verticalID !== '106' && (
                <>
                  <Form.Item
                    {...layout}
                    label={
                      <h6 className="tooltiplayout">
                        O&D List
                        <Contentsss3Pop />
                        <span>ie DTWLAX,LHRMIA </span>
                      </h6>
                    }
                  >
                    {getFieldDecorator(
                      'sMarkets',
                      formConfig.sMarkets
                    )(<Input type="text" placeholder="Comma separated O&D List" />)}
                  </Form.Item>
                  <Divider className="dividerCustom" />
                </>
              )}
            </Col>
          </Row>

          <Row>
            <Col span={16} offset={4}>
              <label className="ant-col ant-col-9 ant-form-item-label" style={{ fontWeight: 700, fontSize: '12px' }}>
                {getDatesTitle(vertical)} <span style={{ marginRight: '10px' }}> :</span>{' '}
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
                            />
                            <Button type="primary" onClick={onAddDateRange}>
                              Add
                            </Button>
                          </div>
                        ) : (
                          <div className={styles.create_new_line_date}>
                            <DatePicker
                              onChange={onPanelChangeD}
                              placeholder="Departure Date"
                              showToday={false}
                              defaultValue={moment()}
                              value={startDate}
                              format={dateFormat}
                            />
                            <DatePicker
                              onChange={onPanelChangeRet}
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
                      <Tabs defaultActiveKey="1" onChange={onChangeTab}>
                        <TabPane tab="Standard Span" key="1">
                          <Col span={12}>
                            <Form.Item
                              label={
                                <h6 className="tooltiplayout">
                                  Departure Date <Contentsss4Pop />
                                </h6>
                              }
                            >
                              {getFieldDecorator('ap1', {
                                valuePropName: 'checked',
                              })(<Checkbox onChange={onDepartureChange}>1</Checkbox>)}
                            </Form.Item>
                            <Form.Item>
                              {getFieldDecorator('ap7', {
                                valuePropName: 'checked',
                              })(<Checkbox onChange={onDepartureChange}>7</Checkbox>)}
                            </Form.Item>
                            <Form.Item>
                              {getFieldDecorator('ap14', {
                                valuePropName: 'checked',
                              })(<Checkbox onChange={onDepartureChange}>14</Checkbox>)}
                            </Form.Item>
                            <Form.Item>
                              {getFieldDecorator('ap21', {
                                valuePropName: 'checked',
                              })(<Checkbox onChange={onDepartureChange}>21</Checkbox>)}
                            </Form.Item>
                            <Form.Item>
                              {getFieldDecorator('ap28', {
                                valuePropName: 'checked',
                              })(<Checkbox onChange={onDepartureChange}>28</Checkbox>)}
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label={<h6>Length of Stay</h6>}>
                              {getFieldDecorator('ap1s', {
                                valuePropName: 'checked',
                              })(<Checkbox onChange={onDepartureChange}>1</Checkbox>)}
                            </Form.Item>
                            <Form.Item>
                              {getFieldDecorator('ap7s', {
                                valuePropName: 'checked',
                              })(<Checkbox onChange={onDepartureChange}> 7</Checkbox>)}
                            </Form.Item>
                          </Col>
                        </TabPane>
                        <TabPane tab="Custom Span" key="2" className="firstDate">
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
                                  value={customSpanStartDays}
                                  onChange={(event: any) => setCustomSpanStartDays(event.target.value)}
                                  placeholder="First Departure Date"
                                />
                                <Input
                                  type="number"
                                  value={customSpanEndDays}
                                  onChange={(event: any) => setCustomSpanEndDays(event.target.value)}
                                  placeholder="Last Departure Date"
                                />
                                <Button type="primary" onClick={onAddCustomSpanDateRange}>
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
                                onChange={(event: any) => setDateRangeLength(event.target.value)}
                                type="text"
                                style={{ width: '100%' }}
                                placeholder="Length of stay"
                              />
                              <span>Multiple values can be entered, separated by spaces or commas.</span>
                            </Form.Item>
                          </Col>
                        </TabPane>
                      </Tabs>
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
                  <h6 className="tooltiplayout">
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
                    <Form.Item {...layout} label={<h6>Limit departure to</h6>}>
                      {getFieldDecorator(
                        'sDOWDepart',
                        formConfig.sDOWDepart
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
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item {...layout} label={<h6 className="tooltiplayout">Limit return to </h6>}>
                      {getFieldDecorator(
                        'sDOWReturn',
                        formConfig.sDOWReturn
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
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6 className="tooltiplayout">
                          Specific CXR
                          <Contentsss6Pop />
                          <span>Carrier codes space delimited</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator('spcxr', formConfig.spcxr)(<Input placeholder="Please enter Specific CXR" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6 className="tooltiplayout">
                          Cabin
                          <Contentsss7Pop />
                          <span>E:Economy, B:Business, F:First</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator('flc', formConfig.flc)(<Input placeholder="Please enter Cabin" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6 className="tooltiplayout">
                          Passengers
                          <Contentsss8Pop />
                          <span>1 - 99</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator('pas', formConfig.pas)(<Input placeholder="Please enter Passengers" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6 className="tooltiplayout">
                          With connections
                          <span>Airport codes space separated</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator('wcn', formConfig.wcn)(<Input placeholder="Please enter With connections" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6 className="tooltiplayout">
                          Booking engine
                          <span>URL for an alternate booking engine</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator('bke', formConfig.bke)(<Input placeholder="Please enter Booking engine" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      className="sSearchType"
                      label={
                        <h6 className="tooltiplayout">
                          Direct flights only
                          <Contentsss9Pop />
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'sDirectOnly',
                        formConfig.sDirectOnly
                      )(<Checkbox onChange={onDepartureChange}>Include only non-stop flights</Checkbox>)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6 className="tooltiplayout">
                          Specific stops
                          <Contentsss10Pop />
                          <span>(optional) 0-9 space separated</span>
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'sSpecificStops',
                        formConfig.sSpecificStops
                      )(<Input placeholder="Please enter Specific stops" />)}
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
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6 className="tooltiplayout">
                          Depart time
                          <Contentsss11Pop />
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'sDepartTime',
                        formConfig.sDepartTime
                      )(<Input placeholder="Please enter Depart time" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6 className="tooltiplayout">
                          Return time
                          <Contentsss12Pop />
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'sReturnTime',
                        formConfig.sReturnTime
                      )(<Input placeholder="Please enter Return time" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      className="sSearchType"
                      label={
                        <h6 className="tooltiplayout">
                          Search type
                          <Contentsss13Pop />{' '}
                        </h6>
                      }
                    >{getFieldDecorator('sSearchType', (
                      formConfig.sSearchType, {
                        initialValue: enableDST,
                      }))(<Radio.Group  >
                        <Radio value="F">F: Sort by fare</Radio>
                        <Radio value="B">B: Sort by best</Radio>
                        <Radio value="L">L: Sort by lowest price</Radio>
                        <Radio value="N">N: Sort by site.</Radio>
                        <Input placeholder="Please enter Search type" />
                      </Radio.Group>)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      label={
                        <h6 className="tooltiplayout">
                          Search POS
                          <Contentsss14Pop />{' '}
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'sSearchPOS',
                        formConfig.sSearchPOS
                      )(<Input placeholder="Please enter Search POS" />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <Col span={24}>
                    <Form.Item
                      {...layout}
                      className="sSearchType"
                      label={
                        <h6 className="tooltiplayout">
                          Include codeshares
                          <Contentsss15Pop />
                        </h6>
                      }
                    >
                      {getFieldDecorator(
                        'sIncCodeshares',
                        formConfig.sIncCodeshares
                      )(<Checkbox checked={checked} onChange={() => setChecked(!checked)} />)}
                    </Form.Item>
                  </Col>
                  <Divider className="dividerCustom" />
                  <GeoFieldWrapper getFieldDecorator={getFieldDecorator} vertical={verticalID} />
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
        <Col span={16} offset={4}>
          <Button
            type="primary"
            htmlType="submit"
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

const WrappedDateFilterForm = Form.create<AddSearchNameFormProps>({ name: 'name' })(CreateNewSearchForm);
export default WrappedDateFilterForm;
