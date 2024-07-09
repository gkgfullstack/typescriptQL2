import React, { useState } from 'react';
import { useSearchUploadingState } from './hooks';
import { UploadRequest } from './hooks/useSearchUploadingState';
import { Button } from 'antd';
import UploadSearchForm from './UploadSearchForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './UploadSearch.module.less';
import { useSearchDetailsDispatchContext } from 'src/stateProviders/useSearchDetailsStateContext';
import { SEARCH_DETAILS_ACTION_TYPES, SearchDetailsState } from 'src/stateProviders/searchDetailsStateProvider';
import { useHistory } from 'react-router';

type AddMatchProps = { };

export const UploadSearch: React.FC<AddMatchProps> = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const uploadFile = urlParams.get('uploadFile');
  const [uploadFileVisible, setUploadFileVisible] = useState(Boolean(uploadFile));
  const [{ loading, data, error }, { addMatch }] = useSearchUploadingState();
  const [visible, setVisible] = useState(false);
  const searchDetailsDispatch = useSearchDetailsDispatchContext();
  const history = useHistory();

  const onClose = () => {
    setVisible(false);
    setUploadFileVisible(false);
  };

  const handleSubmit = (values: UploadRequest): void => {
    if (addMatch && values) {
      addMatch(values);
      onClose();
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  React.useEffect(() => {
    if (uploadFile) {
      history.replace({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFile]);

  React.useEffect(() => {
    let timer: NodeJS.Timer;
    if (data !== null) {
      setVisible(false);
      searchDetailsDispatch({
        type: SEARCH_DETAILS_ACTION_TYPES.removeSearchDtl,
        payload: ({ removeSearchDtl: data, deleted: true } as unknown) as SearchDetailsState,
      });
      timer = setTimeout(() => {
        //   setShowSubmittedPopover(false);
      }, 1000);
    }
    return (): void => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data, searchDetailsDispatch]);

  const formLoading = loading;
  const formError = error && error.message ? error.message : error || false;

  return (
    <>
      <Button
        type="link"
        onClick={showDrawer}
        className={styles.link}
        style={{ margin: '0px', padding: '0px', lineHeight: '20px', height: '20px' }}
      >
        <FontAwesomeIcon
          icon={['fal', 'upload']}
          className={styles.icon}
          color={'gray'}
          style={{ margin: '0px 5px 0px 0px' }}
        />
        <span className={styles.label}> Upload File</span>
      </Button>

      <UploadSearchForm
        visible={visible || uploadFileVisible}
        loading={formLoading}
        error={formError}
        onSubmit={handleSubmit}
        onClose={() => {
          onClose();
        }}
      />
    </>
  );
};

export default UploadSearch;
