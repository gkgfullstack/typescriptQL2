import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import AddScheduleForm from './AddScheduleForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAddScheduleFetch } from './AddScheduleForm/hooks';
import AddScheduleType from 'src/types/AddScheduleType';

export type SearchBarProps = {
  timeZone?: any;
  values?: any;
  onSubmit: (values?: any) => void;
  fromPage?: any;
  searchId?: string;
  disabled?: boolean;
};

const AddSchedule: React.FC<SearchBarProps> = ({ timeZone, fromPage, searchId, disabled }: SearchBarProps) => {
  let [{ data }, { addScheduleJob }] = useAddScheduleFetch(fromPage, searchId);
  const [visible, setVisible] = useState(false);
  //const [close, setClose] = useState(true);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  React.useEffect(() => {
    if (data !== undefined) {
      // message.success(data?.description);
    }
  }, [data]);

  const addSchedule = (values: AddScheduleType): void => {
    if (values) {
      addScheduleJob(values);
    }
  };

  return (
    <>
      {fromPage !== undefined && fromPage === 'jobdetail' ? (
        <Button
          disabled={disabled}
          type="link"
          onClick={showDrawer}
          style={
            disabled
              ? { marginLeft: 8, maxWidth: '140px', marginTop: '-10px', fontSize: '13px' }
              : { maxWidth: '140px', marginTop: '-10px', fontSize: '13px' }
          }
        >
          <FontAwesomeIcon icon={['fal', 'plus-circle']} color={'gray'} style={{ marginRight: '10px' }} /> Add
        </Button>
      ) : (
        <Button
          disabled={disabled}
          type="link"
          onClick={showDrawer}
          style={
            disabled
              ? { marginLeft: 8, maxWidth: '140px', marginTop: '-10px', fontSize: '13px' }
              : { maxWidth: '140px', marginTop: '-10px', fontSize: '13px' }
          }
        >
          <FontAwesomeIcon icon={['fal', 'clock']} /> Schedule
        </Button>
      )}
      <Modal centered visible={visible} footer={false} onCancel={onClose} width={700}>
        {<AddScheduleForm addSchedule={addSchedule} onClose={onClose} timeZone={timeZone} />}
      </Modal>
    </>
  );
};

export default AddSchedule;
