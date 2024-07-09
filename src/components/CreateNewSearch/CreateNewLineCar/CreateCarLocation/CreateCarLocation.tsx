import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import {
  CarLocationTooltip,
  CountryTooltip,
  LocationTooltip,
  StateProvinceTooltip,
  StreetAddressTooltip,
  ZipTooltip,
} from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
const { Option } = Select;

type Location = {
  [key: string]: string;
};

type CreateCarLocationProps = {
  searchType: string;
  locations: Array<Location>;
  setLocations: (locations: Array<Location>) => void;
};

const CreateCarLocation: React.FC<CreateCarLocationProps> = ({
  searchType,
  locations,
  setLocations,
}: CreateCarLocationProps) => {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [code, setCode] = useState('');
  const [radius, setRadius] = useState('0');
  const [radiusUnit, setRadiusUnit] = useState<SelectValue>('mi');
  const [locationPickup, setLocationPickup] = useState('');
  const [locationReturn, setLocationReturn] = useState('');

  const onResetLocationValues = () => {
    setLocation('');
    setAddress('');
    setProvince('');
    setCountry('');
    setCity('');
    setCode('');
    setRadius('0');
    setLocationReturn('');
    setLocationPickup('');
  };

  useEffect(() => {
    onResetLocationValues();
    setLocations([]);
  }, [searchType]);

  useEffect(() => {
    if (location.length > 0) {
      setAddress('');
      setProvince('');
      setCountry('');
      setCity('');
      setCode('');
    }
  }, [location]);

  useEffect(() => {
    if (locationReturn.length > 0) {
      setRadius('0');
      setRadiusUnit('mi');
    }
  }, [locationReturn]);

  const addAirportLocation = () => {
    if (locationPickup) {
      const changedLocations: Array<Location> = [...locations];
      changedLocations.push({
        pickup: locationPickup,
        return: locationReturn ? locationReturn : 'Same as pickup',
        location: locationPickup,
      });
      setLocationPickup('');
      setLocationReturn('');
      setLocations(changedLocations);
    }
  };

  const addLocation = () => {
    const addedRadius: string = locationReturn ? '' : `${radius} ${radiusUnit}`;
    const locationValues: Array<string> = location
      ? [location, addedRadius]
      : [address, city, province, code, country, addedRadius];
    const changedLocation: string = locationValues.filter((value: string) => !!value).join(', ');
    const changedLocations: Array<Location> = [];

    if (changedLocation) {
      changedLocations.push({
        pickup: changedLocation,
        return: locationReturn ? locationReturn : 'Same as pickup',
        address: location ? '' : address,
        location,
        city: location ? '' : city,
        state: location ? '' : province,
        postalCode: location ? '' : code,
        country: location ? '' : country,
        searchRadius: addedRadius,
      });
      onResetLocationValues();
      setLocations(changedLocations);
    }
  };

  const removeLocation = (locationIndex: number) => {
    return (_: any) => {
      const changedLocations: Array<Location> = [...locations];
      changedLocations.splice(locationIndex, 1);
      setLocations(changedLocations);
    };
  };

  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addLocation();
      addAirportLocation();
    }
  };

  return (
    <>
      {searchType !== 'Off-Airport' && (
        <div className={'ant-row ant-form-item'}>
          <div className="ant-col ant-col-9 ant-form-item-label">
            <label>
              <h6 className="tooltiplayout">
                Locations <CarLocationTooltip />
              </h6>
            </label>
          </div>
          <div className={styles.create_new_line_location}>
            <Input
              type="text"
              value={locationPickup}
              onKeyDown={onHandleKeyDown}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setLocationPickup(event.target.value)}
              placeholder="Enter Pickup"
            />
            <Input
              type="text"
              value={locationReturn}
              onKeyDown={onHandleKeyDown}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setLocationReturn(event.target.value)}
              placeholder="Enter Return"
            />
            <Button type="primary" onClick={addAirportLocation}>
              Add
            </Button>
          </div>
        </div>
      )}
      {searchType === 'Off-Airport' && (
        <div className={'ant-row ant-form-item'}>
          <div className="ant-col ant-col-9 ant-form-item-label">
            <label>
              <h6 className="tooltiplayout">Locations</h6>
            </label>
          </div>
          <div className={styles.location_wrapper}>
            <div className={styles.create_new_line_locations_row}>
              <p>Pickup Location</p>
              <div className={styles.create_car_location_item}>
                <label>
                  <h6>
                    Location:
                    <LocationTooltip />
                  </h6>
                </label>
                <Input
                  type="text"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setLocation(event.target.value)}
                  onKeyDown={onHandleKeyDown}
                />
              </div>
              <div className={styles.create_car_location_item}>
                <label>
                  <h6>
                    Address:
                    <StreetAddressTooltip />
                  </h6>
                </label>
                <Input
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
                  onKeyDown={onHandleKeyDown}
                  disabled={location.length > 0}
                />
              </div>
              <div className={styles.create_car_location_item}>
                <label>
                  <h6>
                    City:
                    <LocationTooltip />
                  </h6>
                </label>
                <Input
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setCity(event.target.value)}
                  onKeyDown={onHandleKeyDown}
                  disabled={location.length > 0}
                />
              </div>
              <div className={styles.create_car_location_item}>
                <label>
                  <h6>
                    State:
                    <StateProvinceTooltip />
                  </h6>
                </label>
                <Input
                  type="text"
                  placeholder="Enter State"
                  value={province}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setProvince(event.target.value)}
                  onKeyDown={onHandleKeyDown}
                  disabled={location.length > 0}
                />
              </div>
              <div className={styles.create_car_location_item}>
                <label>
                  <h6>
                    Postal Code:
                    <ZipTooltip />
                  </h6>
                </label>
                <Input
                  type="text"
                  placeholder="Enter Postal Code"
                  value={code}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setCode(event.target.value)}
                  onKeyDown={onHandleKeyDown}
                  disabled={location.length > 0}
                />
              </div>
              <div className={styles.create_car_location_item}>
                <label>
                  <h6>
                    Country:
                    <CountryTooltip />
                  </h6>
                </label>
                <Input
                  type="text"
                  placeholder="Enter Country"
                  value={country}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setCountry(event.target.value)}
                  onKeyDown={onHandleKeyDown}
                  disabled={location.length > 0}
                />
              </div>
              <div className={`${styles.create_car_location_item} ${styles.create_car_location_search}`}>
                <label>Search Radius:</label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter Search Radius"
                  value={radius}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setRadius(event.target.value)}
                  onKeyDown={onHandleKeyDown}
                  disabled={locationReturn.length > 0}
                />
                <Select value={radiusUnit} onChange={(event: SelectValue) => setRadiusUnit(event)}>
                  <Option value="mi">mi</Option>
                  <Option value="km">km</Option>
                </Select>
              </div>
            </div>
            <div className={styles.create_new_line_locations_row}>
              <p>Return Location</p>
              <Input
                type="text"
                value={locationReturn}
                onKeyDown={onHandleKeyDown}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setLocationReturn(event.target.value)}
                placeholder="Enter Return"
              />
              <Button type="primary" onClick={addLocation} disabled={locations.length > 0}>
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.create_new_line_locations}>
        {locations.length > 0 && (
          <div className={styles.create_new_line_locations_title}>
            <span>Pickup</span>
            <span>Return</span>
          </div>
        )}
        {locations.map(
          (location: Location, i: number): React.ReactNode => {
            return (
              <p key={`${location.pickup}-${i}`}>
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
    </>
  );
};

export default CreateCarLocation;
