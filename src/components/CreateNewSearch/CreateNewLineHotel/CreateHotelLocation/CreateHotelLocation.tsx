import React, { useState } from 'react';
import { Button, Radio, Tabs } from 'antd';
import styles from './CreateHotelLocation.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateHotelMarketLocation from './CreateHotelMarketLocation';
import CreateHotelAirportCode from './CreateHotelAirportCode';
import CreateHotelPropertyLocation from './CreateHotelPropertyLocation';
import CreateHotelPropertyID from './CreateHotelPropertyID';
import CreateHotelPropertyCompSet from './CreateHotelPropertyCompSet';
import {
  CompSetTooltip,
  PropertyIDsTooltip,
} from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

const { TabPane } = Tabs;

type CreateHotelLocationProps = {
  onUpdate: (values: any) => void;
};

const CreateHotelLocation: React.FC<CreateHotelLocationProps> = ({ onUpdate }: CreateHotelLocationProps) => {
  const [marketRadiobutton, setMarketRadiobutton] = useState(1);
  const [propertyRadiobutton, setPropertyRadiobutton] = useState(1);
  const [locations, setLocations] = useState([]);

  const onChangeMarket = (event: any) => {
    setMarketRadiobutton(event.target.value);
    setLocations([]);
  };

  const onChangeProperty = (event: any) => {
    setPropertyRadiobutton(event.target.value);
    setLocations([]);
  };

  const removeLocation = (locationIndex: number) => {
    return (_: any) => {
      const changedLocations: any = [...locations];
      changedLocations.splice(locationIndex, 1);
      setLocations(changedLocations);
    };
  };

  const addLocation = (values: any) => {
    const changedLocations: any = [...locations];
    const newLocation = Object.values(values[0])
      .filter((value: any) => !!value)
      .join(', ');
    if (newLocation) {
      changedLocations.push(newLocation);
      setLocations(changedLocations);
    }
    onUpdate(values);
  };

  const onChangeTab = (_: any) => {
    setLocations([]);
    onUpdate([]);
  };

  const isAddDisabled = () => {
    return locations.length > 0;
  };

  const addSearchResult = (searchResult: any) => {
    onUpdate([{ propertyIds: searchResult }]);
  };

  return (
    <div className="ant-col ant-col-15 ant-form-item-control-wrapper">
      <Tabs defaultActiveKey="1" onChange={onChangeTab} type="card" tabPosition="top" className="travelTab">
        <TabPane tab="Market" key="1">
          <Radio.Group onChange={onChangeMarket} value={marketRadiobutton} style={{ marginTop: '10px' }}>
            <Radio value={1}>Search By Location</Radio>
            <Radio value={2}>Search by Airport Code</Radio>
          </Radio.Group>
          {marketRadiobutton === 1 && <CreateHotelMarketLocation onAdd={addLocation} isAddDisabled={isAddDisabled()} />}
          {marketRadiobutton === 2 && <CreateHotelAirportCode onAdd={addLocation} isAddDisabled={isAddDisabled()} />}
        </TabPane>
        <TabPane tab="Property" key="2">
          <Radio.Group onChange={onChangeProperty} value={propertyRadiobutton} style={{ marginTop: '10px' }}>
            <Radio value={1}>Search By Location</Radio>
            <Radio value={2}>
              Search by Property ID
              <PropertyIDsTooltip />
            </Radio>
            <Radio value={3}>
              Search by Comp Set
              <CompSetTooltip />
            </Radio>
          </Radio.Group>
          {propertyRadiobutton === 1 && (
            <CreateHotelPropertyLocation onAdd={addLocation} isAddDisabled={isAddDisabled()} />
          )}
          {propertyRadiobutton === 2 && <CreateHotelPropertyID onAdd={addSearchResult} />}
          {propertyRadiobutton === 3 && <CreateHotelPropertyCompSet onUpdate={onUpdate} />}
        </TabPane>
      </Tabs>
      {locations.length > 0 &&
        locations.map(
          (location: any, i: number): React.ReactNode => {
            if (location.length === 0) {
              return false;
            }
            return (
              <p key={`${location}-${i}`} className={styles.create_new_line_location_text}>
                <span>
                  <Button type={'link'} onClick={removeLocation(i)}>
                    <FontAwesomeIcon icon={['fal', 'trash-alt']} style={{ color: '#6f6f6f' }} />
                  </Button>
                  {location}
                </span>
              </p>
            );
          }
        )}
    </div>
  );
};

export default CreateHotelLocation;
