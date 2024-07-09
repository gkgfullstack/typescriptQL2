import React, { useEffect, useState } from 'react';
import styles from './UsageDateFilter.module.less';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const { Option } = Select;

const dateOptions: any = [
  {
    name: 'This Month',
    id: '0',
  },
  {
    name: 'Last Month',
    id: '1',
  },
  {
    name: 'Last 3 Months',
    id: '3',
  },
  {
    name: 'Last 6 Months',
    id: '6',
  },
  {
    name: 'Year to date',
    id: '12',
  },
  {
    name: 'Custom Date Range',
    id: 'customDateRange',
  },
];

type UsageDateFilterProps = {
  onUpdate: (name: string, value: any) => void;
  isReset?: boolean;
  setReset?: any;
};

const getStartDate = (value: string) => {
  const date = value === '0' ? moment() : moment().subtract(value, 'months');
  return date.startOf('month').format('YYYY-MM-DD');
};

const getEndDate = (value: string) => {
  const date =
    value === '0' || value === '12'
      ? moment()
      : moment()
          .subtract('1', 'months')
          .endOf('month');
  return date.format('YYYY-MM-DD');
};

const UsageDateFilter: React.FC<UsageDateFilterProps> = ({ onUpdate, isReset, setReset }) => {
  const [date, setDate] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<any>();
  const [initialState, setInitialState] = useState<boolean>(false);

  const onDateChange = (value: SelectValue) => {
    const newValue: string = value ? value.toString() : '';
    const newDate: any = newValue
      ? {
          startDate: getStartDate(newValue),
          endDate: getEndDate(newValue),
        }
      : undefined;
    onUpdate('date', newDate);

    if (newDate) {
      setDate(newValue);
    } else {
      setDate(undefined);
    }
    setDateRange(null);
  };

  useEffect(() => {
    if (isReset) {
      setReset(false);
    }
    if (!initialState) {
      setInitialState(true);
      onDateChange('0');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReset]);

  const onDateRangeChange = (value: any, range: any) => {
    const newDate = range[0]
      ? {
          startDate: range[0],
          endDate: range[1],
        }
      : null;
    onUpdate('date', newDate);
    if (value) {
      setDateRange(value);
    }
    setDate('customDateRange');
  };

  return (
    <div>
      <p style={{ fontSize: '12px', marginBottom: '3px' }}>Date Range</p>
      <div className={styles.usage_datepicker}>
        <Select
          placeholder="Select Date Range"
          defaultValue={'This Month'}
          onChange={onDateChange}
          allowClear
          value={date}
        >
          {dateOptions.map(
            (option: any, i: number): React.ReactNode => {
              return (
                <Option value={option.id} key={`date-${option.name}-${i}`}>
                  {option.name}
                </Option>
              );
            }
          )}
        </Select>
        {date === 'customDateRange' && (
          <>
            <span className={styles.usage_datepicker_separator}>OR</span>
            <RangePicker allowClear format={'YYYY-MM-DD'} onChange={onDateRangeChange} value={dateRange} />
          </>
        )}
      </div>
    </div>
  );
};

export default UsageDateFilter;
