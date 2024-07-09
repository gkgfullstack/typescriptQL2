import React, { useState, KeyboardEvent } from 'react';
import { Button, Col, Form, Input, Radio, Select, Tabs } from 'antd';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { RadioChangeEvent } from 'antd/lib/radio';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';

const { TabPane } = Tabs;
const { TextArea } = Input;

type CreateCruiseDates = {
  firstDate?: string;
  lastDate?: string;
  getFieldDecorator<T extends Record<string | number | symbol, string>>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
  setFieldsValue: (values: {}) => void;
  getFieldsValue: (fieldNames?: Array<string>) => { [field: string]: any };
};

const { Option } = Select;

const CreateVacationDates: React.FC<CreateCruiseDates> = ({
  getFieldDecorator,
  setFieldsValue,
  getFieldsValue,
}: CreateCruiseDates) => {
  const [checkboxSelection, setCheckboxSelection] = useState(1);
  const [startMonth, setStartMonth] = React.useState<string | undefined>(undefined);
  const [startYear, setStartYear] = React.useState<string | undefined>(undefined);
  const [endMonth, setEndMonth] = React.useState<string | undefined>(undefined);
  const [endYear, setEndYear] = React.useState<string | undefined>(undefined);
  const [monthFromNow, setMonthFromNow] = React.useState<string>('');

  const monthsOfYear = Array(12)
    .fill(null)
    .map((_, i) => {
      if (i < 9) {
        return `0${i + 1}`;
      }
      return i + 1;
    });
  const currentYear: number = new Date().getFullYear();
  const years = Array(4)
    .fill(currentYear)
    .map((year, i) => year + i);

  const onResetFormValues = () => {
    setFieldsValue({ dateRange: '' });
    setStartMonth(undefined);
    setStartYear(undefined);
    setEndMonth(undefined);
    setEndYear(undefined);
  };

  const onChangeDateformat = (event: RadioChangeEvent) => {
    setCheckboxSelection(event.target.value);
    onResetFormValues();
  };

  const onAddDateRange = () => {
    const dateValue = getFieldsValue(['dateRange'])['dateRange'];
    if (startMonth && startYear && endMonth && endYear) {
      setFieldsValue({
        dateRange: dateValue
          ? dateValue + `\n${startMonth}.${startYear} ${endMonth}.${endYear}`
          : `${startMonth}-${startYear} ${endMonth}-${endYear}`,
      });
      setStartMonth(undefined);
      setStartYear(undefined);
      setEndMonth(undefined);
      setEndYear(undefined);
    }
    if (monthFromNow) {
      setFieldsValue({ dateRange: dateValue ? dateValue + `\n${monthFromNow}` : `${monthFromNow}` });
      setMonthFromNow('');
    }
  };

  const onHandleDatesKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (getFieldsValue(['dateRange'])['dateRange']) return;
    if (event.key === 'Enter') {
      onAddDateRange();
    }
  };

  const onRelativeMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthFromNow(event.target.value.toString());
  };

  return (
    <>
      <label className="ant-col ant-col-9 ant-form-item-label" style={{ fontWeight: 700, fontSize: '12px' }}>
        Travel Dates <span style={{ marginRight: '10px' }}> :</span>{' '}
      </label>
      <div className="ant-col ant-col-15 ant-form-item-control-wrapper">
        <Tabs defaultActiveKey="1" type="card" tabPosition="top" className="travelTab">
          <TabPane tab="Departure Month" key="1" className="travelTab2">
            <Col span={24} className="departureDate">
              <Form.Item>
                <Radio.Group onChange={onChangeDateformat} value={checkboxSelection} style={{ float: 'left' }}>
                  <Radio value={1}>Shopping Span</Radio>
                  <Radio value={2}>Relative Month</Radio>
                </Radio.Group>
                {checkboxSelection === 1 ? (
                  <div className={styles.create_new_line_date}>
                    <Select
                      style={{ paddingRight: 4 }}
                      placeholder="Start Month"
                      onChange={(value: string) => setStartMonth(value)}
                      allowClear
                      value={startMonth}
                    >
                      {monthsOfYear &&
                        monthsOfYear.map(month => {
                          return (
                            <Option value={month} key={month}>
                              {month}
                            </Option>
                          );
                        })}
                    </Select>
                    <Select
                      style={{ paddingRight: 4 }}
                      placeholder="Start Year"
                      onChange={(value: string) => setStartYear(value)}
                      allowClear
                      value={startYear}
                    >
                      {years &&
                        years.map(year => {
                          return (
                            <Option value={year} key={year}>
                              {year}
                            </Option>
                          );
                        })}
                    </Select>
                    <Select
                      style={{ paddingRight: 4 }}
                      placeholder="End Month"
                      onChange={(value: string) => setEndMonth(value)}
                      allowClear
                      value={endMonth}
                    >
                      {monthsOfYear &&
                        monthsOfYear.map(month => {
                          return (
                            <Option value={month} key={month}>
                              {month}
                            </Option>
                          );
                        })}
                    </Select>
                    <Select
                      style={{ paddingRight: 4 }}
                      placeholder="End Year"
                      onChange={(value: string) => setEndYear(value)}
                      allowClear
                      value={endYear}
                    >
                      {years &&
                        years.map(year => {
                          return (
                            <Option value={year} key={year}>
                              {year}
                            </Option>
                          );
                        })}
                    </Select>
                    <Button
                      type="primary"
                      onClick={onAddDateRange}
                      disabled={getFieldsValue(['dateRange'])['dateRange']}
                    >
                      Add
                    </Button>
                  </div>
                ) : (
                  <div className={styles.create_new_line_date}>
                    <Input
                      type="number"
                      min={0}
                      max={48}
                      onChange={onRelativeMonthChange}
                      placeholder="Enter Month from now (0-48)"
                      onKeyDown={onHandleDatesKeyDown}
                    />
                    <Button
                      type="primary"
                      onClick={onAddDateRange}
                      disabled={getFieldsValue(['dateRange'])['dateRange']}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </Form.Item>
              {getFieldDecorator(
                'dateRange',
                {}
              )(
                <TextArea
                  rows={3}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFieldsValue({ dateRange: event.target.value })
                  }
                />
              )}
            </Col>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default CreateVacationDates;
