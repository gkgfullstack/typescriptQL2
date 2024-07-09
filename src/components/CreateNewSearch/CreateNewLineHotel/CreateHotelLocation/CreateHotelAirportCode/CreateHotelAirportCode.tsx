import React, { ChangeEvent, useState } from 'react';
import styles from '../CreateHotelLocation.module.less';
import { Button, Input } from 'antd';

type CreateHotelAirportCodeProps = {
  onAdd: (values: any) => void;
  isAddDisabled: boolean;
};

const CreateHotelAirportCode: React.FC<CreateHotelAirportCodeProps> = ({
  onAdd,
  isAddDisabled,
}: CreateHotelAirportCodeProps) => {
  const [airportCode, setAirportCode] = useState<string>('');

  const onAddLocation = () => {
    onAdd([{ airportCode: `*${airportCode}` }]);
    setAirportCode('');
  };

  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddLocation();
    }
  };

  return (
    <div className={styles.create_hotel_location}>
      <div className={styles.create_hotel_location_item}>
        <label>Airport Code:</label>
        <Input
          type="text"
          value={airportCode}
          onKeyDown={onHandleKeyDown}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAirportCode(event.target.value)}
          placeholder="Please enter 3 character airport code"
          style={{ marginRight: 10 }}
        />
        <Button type="primary" onClick={onAddLocation} disabled={isAddDisabled}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default CreateHotelAirportCode;
