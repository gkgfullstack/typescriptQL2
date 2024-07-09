import React, { ChangeEvent, useState } from 'react';
import styles from '../CreateHotelLocation.module.less';
import { Button, Input } from 'antd';
import {
  CountryTooltip,
  LocationTooltip,
  StateProvinceTooltip,
  StreetAddressTooltip,
  ZipTooltip,
} from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

type CreateHotelMarketLocationProps = {
  onAdd: (values: any) => void;
  isAddDisabled: boolean;
};

const CreateHotelMarketLocation: React.FC<CreateHotelMarketLocationProps> = ({ onAdd, isAddDisabled }) => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [province, setProvince] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  const onAddLocation = () => {
    onAdd([
      {
        address,
        location,
        state: province,
        zip,
        country,
      },
    ]);
    setAddress('');
    setLocation('');
    setProvince('');
    setZip('');
    setCountry('');
  };

  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddLocation();
    }
  };

  return (
    <div className={styles.create_hotel_location}>
      <div className={styles.create_hotel_location_item}>
        <label>
          <h6>
            Street Address:
            <StreetAddressTooltip />
          </h6>
        </label>
        <Input
          type="text"
          value={address}
          onKeyDown={onHandleKeyDown}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
          placeholder="Please enter Street Address"
        />
      </div>
      <div className={styles.create_hotel_location_item}>
        <label>
          <h6>
            Location:
            <LocationTooltip />
          </h6>
        </label>
        <Input
          type="text"
          value={location}
          onKeyDown={onHandleKeyDown}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setLocation(event.target.value)}
          placeholder="Please enter Location"
        />
      </div>
      <div className={styles.create_hotel_location_item}>
        <label>
          <h6>
            State/Province:
            <StateProvinceTooltip />
          </h6>
        </label>
        <Input
          type="text"
          value={province}
          onKeyDown={onHandleKeyDown}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setProvince(event.target.value)}
          placeholder="Please enter State/Province"
        />
      </div>
      <div className={styles.create_hotel_location_item}>
        <label>
          <h6>
            Zip:
            <ZipTooltip />
          </h6>
        </label>
        <Input
          type="text"
          value={zip}
          onKeyDown={onHandleKeyDown}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setZip(event.target.value)}
          placeholder="Please enter Zip"
        />
      </div>
      <div className={styles.create_hotel_location_item}>
        <label>
          <h6>
            Country:
            <CountryTooltip />
          </h6>
        </label>
        <Input
          type="text"
          value={country}
          onKeyDown={onHandleKeyDown}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setCountry(event.target.value)}
          placeholder="Please enter Country"
        />
      </div>
      <Button type="primary" onClick={onAddLocation} disabled={isAddDisabled}>
        Add
      </Button>
    </div>
  );
};

export default CreateHotelMarketLocation;
