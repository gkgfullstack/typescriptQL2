import React, { ReactElement, useEffect, useState } from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetTimeZonesSettings } from 'src/api/usageFunction';

const { Option } = Select;

type UsageTimeZoneFilter = {
  onUpdate: (name: string, value: string) => void;
};

const UsageTimeZoneFilter: React.FC<UsageTimeZoneFilter> = ({ onUpdate }) => {
  const { userTimeZone, availableTimeZones } = useGetTimeZonesSettings();
  const [timeZone, setTimeZone] = useState<SelectValue>();

  useEffect(() => {
    if (userTimeZone) {
      setTimeZone(userTimeZone);
      onUpdate('timeZone', userTimeZone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTimeZone]);

  const onTimeZoneChange = (value: SelectValue) => {
    const newTimeZone: string = value ? value.toString() : '';
    onUpdate('timeZone', newTimeZone);
    setTimeZone(value);
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Select
      placeholder="Select Timezone"
      onChange={onTimeZoneChange}
      allowClear
      showSearch
      filterOption={onSearchFilter}
      showArrow={true}
      value={timeZone}
    >
      {availableTimeZones.map(
        (timeZone: string, i: number): React.ReactNode => (
          <Option value={timeZone} key={`timeZone-${timeZone}-${i}`}>
            {timeZone}
          </Option>
        )
      )}
    </Select>
  );
};

export default UsageTimeZoneFilter;
