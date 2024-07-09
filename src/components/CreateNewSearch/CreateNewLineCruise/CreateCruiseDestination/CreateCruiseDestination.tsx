import React, { ChangeEvent, useState } from 'react';
import { Button, Divider, Input } from 'antd';
import styles from 'src/components/CreateNewSearch/CreateNewLineItem/CreateNewLineItem.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CreateCruiseDestinationProps = {
  destinations: string[];
  setDestinations: (destinations: string[]) => void;
};

const CreateCruiseDestination: React.FC<CreateCruiseDestinationProps> = ({
  destinations,
  setDestinations,
}: CreateCruiseDestinationProps) => {
  const [currentDestination, setCurrentDestination] = useState<string>('');

  const addDestination = (): void => {
    setDestinations([...destinations, currentDestination]);
    setCurrentDestination('');
  };

  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && destinations.length === 0) {
      addDestination();
    }
  };

  const removeDestination = (destinationIndex: number) => {
    return (): void => {
      const filteredDestinations = [...destinations];
      filteredDestinations.splice(destinationIndex, 1);
      setDestinations(filteredDestinations);
    };
  };

  return (
    <>
      <div className={'ant-row ant-form-item'}>
        <div className="ant-col ant-col-9 ant-form-item-label">
          <label>
            <h6 className="tooltiplayout">Destination</h6>
          </label>
        </div>
        <div className={styles.create_new_line_location}>
          <Input
            type="text"
            value={currentDestination}
            onKeyDown={onHandleKeyDown}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setCurrentDestination(event.target.value)}
            placeholder="Please enter Destination"
          />
          <Button disabled={currentDestination.length === 0 || destinations.length > 0} type="primary" onClick={addDestination}>
            Add
          </Button>
        </div>
      </div>
      <div className={styles.create_new_line_locations}>
        {destinations.length > 0 &&
          destinations.map(
            (destination: string, i): React.ReactNode => {
              return (
                <p key={`destination-line${i}-${destination}`}>
                  <span className={styles.create_new_line_location_text}>
                    <Button type={'link'} onClick={removeDestination(i)}>
                      <FontAwesomeIcon icon={['fal', 'trash-alt']} style={{ color: '#6f6f6f' }} />
                    </Button>
                    {destination}
                  </span>
                </p>
              );
            }
          )}
      </div>

      <Divider className="dividerCustom" />
    </>
  );
};

export default CreateCruiseDestination;
