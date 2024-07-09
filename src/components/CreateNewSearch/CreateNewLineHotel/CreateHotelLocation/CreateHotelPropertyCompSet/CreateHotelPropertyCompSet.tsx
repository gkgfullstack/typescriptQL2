import React from 'react';
import { Select } from 'antd';
import styles from '../CreateHotelLocation.module.less';
import { SelectValue } from 'antd/lib/select';
import { useGetHotelPropertyCompSet } from 'src/api/hotelPropertyCompSet';
const { Option } = Select;

type CreateHotelPropertyCompSetProps = {
  onUpdate: (value: any) => void;
};

type HotelCompSet = {
  id: number;
  name: string;
};

const CreateHotelPropertyCompSet: React.FC<CreateHotelPropertyCompSetProps> = ({ onUpdate }) => {
  const [data] = useGetHotelPropertyCompSet();

  const onCompSetChange = (value: SelectValue) => {
    const compSet = value && Array.isArray(value) ? [...value].join(', ') : value;
    onUpdate([{ compSet: compSet }]);
  };

  return (
    <div className={styles.create_hotel_location}>
      <div className={styles.create_hotel_location_item}>
        <label>
          <h6>Comp Set:</h6>
        </label>
        <Select
          showArrow
          showSearch
          allowClear
          mode="multiple"
          onChange={onCompSetChange}
          placeholder="Please select Comp Set"
        >
          {data &&
            data.length > 0 &&
            data.map(
              (hotelProperty: HotelCompSet): React.ReactNode => {
                return (
                  <Option key={hotelProperty.id} value={hotelProperty.id}>
                    {hotelProperty.name}
                  </Option>
                );
              }
            )}
        </Select>
      </div>
    </div>
  );
};

export default CreateHotelPropertyCompSet;
