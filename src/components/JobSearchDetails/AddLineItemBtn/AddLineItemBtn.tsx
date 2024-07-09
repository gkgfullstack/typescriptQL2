import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AirFareLineItemType from 'src/types/AirFareLineItemType';
import { useCreateNewLineItemFetch } from 'src/components/CreateNewSearch/CreateNewLineItem/hooks';
import CreateNewLineView from 'src/components/CreateNewSearch/CreateNewLIneView';
import { SEARCH_DETAILS_ACTION_TYPES, SearchDetailsState } from 'src/stateProviders/searchDetailsStateProvider';
import { useSearchDetailsDispatchContext } from 'src/stateProviders/useSearchDetailsStateContext';
export type SearchBarProps = {
  vertical?: string;
  searchName?: string;
  jobId?: any;
  form: any;
};

const CreateNewSearch: React.FC<SearchBarProps> = ({ vertical, searchName, jobId }: SearchBarProps) => {
  const [{ data }, { addLineItemValue }] = useCreateNewLineItemFetch();
  const searchDetailsDispatch = useSearchDetailsDispatchContext();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  React.useEffect(() => {
    let timer: NodeJS.Timer;
    if (data !== undefined && data?.success === true) {
      setVisible(false);

      searchDetailsDispatch({
        type: SEARCH_DETAILS_ACTION_TYPES.removeSearchDtl,
        payload: ({ removeSearchDtl: data.value, deleted: true, adddtl: true } as unknown) as SearchDetailsState,
      });
    }

    if (data !== undefined && data?.success === false) {
      setVisible(false);
    }
    return (): void => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data, searchDetailsDispatch]);

  const addLineItem = (values: AirFareLineItemType, form: any): void => {
    if (addLineItemValue && values) {
      const isCarRental = vertical === 'Carrental' || vertical === '106';
      addLineItemValue(values, '', form, isCarRental);
    }
  };
  return (
    <>
      <Button
        type="link"
        onClick={showDrawer}
        className="link"
        style={{ margin: '0px', padding: '0px', lineHeight: '20px', height: '20px' }}
      >
        <FontAwesomeIcon icon={['fal', 'plus-circle']} color={'gray'} /> Add Inputs
      </Button>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        height={'100%'}
        className="bgcolor"
      >
        <Button type="link" onClick={onClose} style={{ float: 'right' }}>
          <FontAwesomeIcon
            onClick={showDrawer}
            icon={['fal', 'times']}
            style={{ cursor: 'pointer', marginRight: '10px' }}
            size={'3x'}
          />
        </Button>
        {visible && (
          <CreateNewLineView addLineItem={addLineItem} vertical={vertical} searchName={searchName} jobId={jobId} />
        )}
      </Drawer>
    </>
  );
};

export default CreateNewSearch;
