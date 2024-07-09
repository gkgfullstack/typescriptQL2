import React, { useState } from 'react';
import { Drawer, Button, message } from 'antd';
import CreateNewSearchForm from './CreateNewSearchForm';
import { SearchNameRequest } from 'src/api/createNewSearchConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCreateNewFetch } from './CreateNewSearchForm/hooks';
import AirFareLineItemType from 'src/types/AirFareLineItemType';
import { useCreateNewLineItemFetch } from './CreateNewLineItem/hooks';
import CreateNewLineView from './CreateNewLIneView';
import { useHistory } from 'react-router-dom';
import Spin from 'src/components/common/Spin';

export type SearchBarProps = {
  values?: any;
  onSubmit: (values?: any) => void;
};

const CreateNewSearch: React.FC<SearchBarProps> = () => {
  const [{ data, loading }, { addJobName }] = useCreateNewFetch();
  const fromPage = 'newJob';
  const [{}, { addLineItemValue }]: any = useCreateNewLineItemFetch();
  const [visible, setVisible] = useState(false);
  const [close, setClose] = useState(true);
  const [vertical, setVertical] = useState<string>();
  const [searchName, setSearchName] = useState<string>();
  const [isUploadFileVisible, setIsUploadFileVisible] = useState(false);
  const history = useHistory();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setClose(true);
  };

  React.useEffect(() => {
    let timer: NodeJS.Timer;
    setTimeout(() => {
    if (data !== undefined) {
      if (isUploadFileVisible && data?.value) {
        setClose(true);
        history.replace(`/datascout/search-details/${data.value}?uploadFile=true`);
      } else if (data?.success === false) {
        message.warning(data?.message);
        setClose(true);
      } else if (data?.success === true) {
        message.success(data?.message);
      }
    }

    return (): void => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, 0)
  }, [data, isUploadFileVisible]);

  const addSearchName = (values: SearchNameRequest, isUploadFile?: boolean): void => {
    if (addJobName && values) {
      setVertical(values.vertical);
      setSearchName(values.SearchName);
      addJobName(values);
      setClose(false);
      if (isUploadFile) {
        setIsUploadFileVisible(true);
      }
    }
  };

  const addLineItem = (values: AirFareLineItemType, form: any): void => {
    if (addLineItemValue && values) {
      const isCarRental = vertical === 'Carrental' || vertical === '106';
      addLineItemValue(values, fromPage, form, isCarRental);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} style={{ width: '100%', maxWidth: '140px' }}>
        <FontAwesomeIcon icon={['fal', 'plus']} className="chevronDown" size="lg" style={{ marginRight: '10px' }} /> New
        Search
      </Button>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        height={'100%'}
        className="bgcolor"
      >
        <Button onClick={onClose} style={{ float: 'right' }} type="link">
          <FontAwesomeIcon
            onClick={showDrawer}
            icon={['fal', 'times']}
            style={{ cursor: 'pointer', marginRight: '10px' }}
            size={'3x'}
          />
        </Button>
        <div style={{ clear: 'both', display: 'table', width: '100%' }}>
          {close && <CreateNewSearchForm addSearchName={addSearchName} />}
          {!isUploadFileVisible && data !== undefined && data?.success === true && !close && (
            <CreateNewLineView
              addLineItem={addLineItem}
              vertical={vertical}
              searchName={searchName}
              jobId={data.value}
            />
          )}
          {loading && <Spin spinning={loading} />}
        </div>
      </Drawer>
    </>
  );
};

export default CreateNewSearch;
