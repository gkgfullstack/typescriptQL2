import React, {useEffect, useState} from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const { Option } = Select;

const categoryOptions: any = [
  {
    name: '1 month or more',
    id: '1',
  },
  {
    name: '3 months or more',
    id: '3',
  },
  {
    name: '6 months or more',
    id: '6',
  },
  {
    name: '1 year or more',
    id: '12',
  },
];

type ShallowDateFilterProps = {
  setParams: (name: string, value: any) => void;
};

const getEndDate = (value: string) => {
  return moment()
    .subtract(value, 'months')
    .format('YYYY-MM-DD');
};

const ShallowDateFilter: React.FC<ShallowDateFilterProps> = ({ setParams }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const schemaName = urlParams.get('schema')?.toString();
  const [initialState, setInitialState] = useState<any>(false);
  const [date, setDate] = useState<any>();
  const [dateRange, setDateRange] = useState<any>();

  const onDateChange = (value: SelectValue) => {
    const newValue: string = value ? value.toString() : '';
    const newDate: any = newValue
      ? {
          startDate: 'infinite',
          endDate: getEndDate(newValue),
        }
      : undefined;
    setParams('date', newDate);

    if (newDate) {
      setDate(newValue);
    } else {
      setDate(undefined);
    }
    setDateRange(null);
  };

  useEffect(() => {
    if (schemaName && !initialState) {
      setInitialState(true);
      onDateChange('1');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemaName]);

  const onDateRangeChange = (value: any, range: any) => {
    const newDate = range[0]
      ? {
          startDate: range[0],
          endDate: range[1],
        }
      : null;
    setParams('date', newDate);
    if (value) {
      setDateRange(value);
    }
    setDate(undefined);
  };

  return (
    <>
      <Select placeholder="Select Date Range" onChange={onDateChange} allowClear value={date}>
        {categoryOptions.map(
          (option: any, i: number): React.ReactNode => {
            return (
              <Option value={option.id} key={`date-${option.name}-${i}`}>
                {option.name}
              </Option>
            );
          }
        )}
      </Select>
      <span style={{ padding: '0 17px', lineHeight: '40px' }}>OR</span>
      <RangePicker allowClear format={'YYYY-MM-DD'} onChange={onDateRangeChange} value={dateRange} />
    </>
  );
};

export default ShallowDateFilter;
