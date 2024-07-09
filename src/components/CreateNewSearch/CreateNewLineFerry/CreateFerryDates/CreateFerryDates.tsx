import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Radio, Tabs } from 'antd';
import UserContex from 'src/services/UserContex';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import moment from 'moment';
import { RadioChangeEvent } from 'antd/lib/radio';
import { CheckInTooltip } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

const { TabPane } = Tabs;
const { TextArea } = Input;

type CreateFerryDatesProps = {
  firstDate?: string;
  lastDate?: string;
  onUpdate: (date: { [key: string]: string | undefined }) => void;
};

const CreateFerryDates: React.FC<CreateFerryDatesProps> = ({ firstDate, lastDate, onUpdate }) => {
  const [selectedCustomSpanTab, setSelectedCustomSpanTab] = useState<number | undefined>(1);
  const [valuess, setValuess] = useState(1);
  const [startDays, setStartDays] = React.useState(firstDate);
  const [endDays, setEndDays] = React.useState(lastDate);
  const [startDate, setStartDate] = React.useState(firstDate ? moment(firstDate) : undefined);
  const [endDate, setEndDate] = React.useState(lastDate ? moment(lastDate) : undefined);
  const [dateRange, setDateRange] = React.useState('');
  const [customSpanStartDays, setCustomSpanStartDays] = React.useState(firstDate);
  const [customSpanEndDays, setCustomSpanEndDays] = React.useState(lastDate);
  const [customSpanStartDate, setCustomSpanStartDate] = React.useState(firstDate ? moment(firstDate) : undefined);
  const [customSpanEndDate, setCustomSpanEndDate] = React.useState(lastDate ? moment(lastDate) : undefined);
  const [customSpanDateRange, setCustomSpanDateRange] = React.useState('');
  const [dateRangeLength, setDateRangeLength] = React.useState('');
  const dateFormatContext = UserContex.getDateFormat();
  const dateFormat = dateFormatContext;

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
    onUpdate({});
  };

  const getStartEndDates = (dates: string) => {
    const dateRange: { [key: string]: any } = {};
    if (dates) {
      dates
        .replace(/\n/g, ',')
        .split(',')
        .forEach((range: string) => {
          const startDate: string = range.split(' ')[0];
          const endDate: string = range.split(' ')[1];

          dateRange.dateRangeStart = dateRange.dateRangeStart ? `${dateRange.dateRangeStart},${startDate}` : startDate;
          dateRange.dateRangeEnd = dateRange.dateRangeEnd ? `${dateRange.dateRangeEnd},${endDate}` : endDate;
        });
    }
    return dateRange;
  };

  const onChangeTab = (): void => {
    onResetFormValues();
  };

  const onChangeCustomSpanTab = (event: RadioChangeEvent) => {
    setSelectedCustomSpanTab(event.target.value);
    onResetFormValues();
  };

  const onChangeDateformat = (event: RadioChangeEvent) => {
    setValuess(event.target.value);
    onResetFormValues();
  };

  const onAddDateRange = () => {
    let updateDateRange = '';
    if (startDays && endDays) {
      updateDateRange = dateRange ? dateRange + `\n${startDays} ${endDays}` : `${startDays} ${endDays}`;
      setStartDays('');
      setEndDays('');
    }
    if (startDate && endDate) {
      updateDateRange = dateRange
        ? dateRange + `\n${startDate.format(dateFormat)} ${endDate.format(dateFormat)}`
        : `${startDate.format(dateFormat)} ${endDate.format(dateFormat)}`;
      setStartDate(undefined);
      setEndDate(undefined);
    }

    setDateRange(updateDateRange);
    onUpdate(getStartEndDates(updateDateRange));
  };

  const onAddCustomSpanDateRange = () => {
    let updateDateRange = '';
    if (customSpanStartDays && customSpanEndDays) {
      updateDateRange = customSpanDateRange
        ? customSpanDateRange + `\n${customSpanStartDays} ${customSpanEndDays}`
        : `${customSpanStartDays} ${customSpanEndDays}`;
      setCustomSpanStartDays('');
      setCustomSpanEndDays('');
    }
    if (customSpanStartDate && customSpanEndDate) {
      updateDateRange = customSpanDateRange
        ? customSpanDateRange + `\n${customSpanStartDate.format(dateFormat)} ${customSpanEndDate.format(dateFormat)}`
        : `${customSpanStartDate.format(dateFormat)} ${customSpanEndDate.format(dateFormat)}`;

      setCustomSpanStartDate(undefined);
      setCustomSpanEndDate(undefined);
    }

    setCustomSpanDateRange(updateDateRange);
    onUpdate({
      ...getStartEndDates(updateDateRange),
      dateRangeLength: dateRangeLength,
    });
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

  const onHandleDatesKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onAddDateRange();
      onAddCustomSpanDateRange();
    }
  };

  return (
    <>
      <label className="ant-col ant-col-9 ant-form-item-label" style={{ fontWeight: 700, fontSize: '12px' }}>
        Travel Dates <span style={{ marginRight: '10px' }}> :</span>{' '}
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
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStartDays(event.target.value)}
                      placeholder="Departure Date"
                      onKeyDown={onHandleDatesKeyDown}
                    />
                    <Input
                      type="number"
                      value={endDays}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEndDays(event.target.value)}
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
                      onChange={(date: any) => setStartDate(date)}
                      placeholder="Departure Date"
                      showToday={false}
                      defaultValue={moment()}
                      value={startDate}
                      format={dateFormat}
                    />
                    <DatePicker
                      onChange={(date: any) => setEndDate(date)}
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
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDateRange(event.target.value);
                  onUpdate(getStartEndDates(event.target.value));
                }}
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
                <Radio.Group onChange={onChangeCustomSpanTab} value={selectedCustomSpanTab} style={{ float: 'left' }}>
                  <Radio value={1}>Days in the Future</Radio>
                  <Radio value={2}>Actual Dates</Radio>
                </Radio.Group>
                {selectedCustomSpanTab === 1 ? (
                  <div className={styles.create_new_line_date}>
                    <Input
                      type="number"
                      value={customSpanStartDays}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setCustomSpanStartDays(event.target.value)
                      }
                      placeholder="First Departure Date"
                      onKeyDown={onHandleDatesKeyDown}
                    />
                    <Input
                      type="number"
                      value={customSpanEndDays}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setCustomSpanEndDays(event.target.value)
                      }
                      placeholder="Last Departure Date"
                      onKeyDown={onHandleDatesKeyDown}
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
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setCustomSpanDateRange(event.target.value);
                  onUpdate({
                    ...getStartEndDates(event.target.value),
                    dateRangeLength: dateRangeLength,
                  });
                }}
              />
              <Col span={24}>
                <Form.Item label={<h6>Length of stay</h6>}>
                  <Input
                    value={dateRangeLength}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setDateRangeLength(event.target.value);
                      onUpdate({
                        ...getStartEndDates(customSpanDateRange),
                        dateRangeLength: event.target.value,
                      });
                    }}
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
    </>
  );
};

export default CreateFerryDates;
