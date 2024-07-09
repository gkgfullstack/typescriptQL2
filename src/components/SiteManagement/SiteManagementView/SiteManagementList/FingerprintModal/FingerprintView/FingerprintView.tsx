import React, { useState } from 'react';
import styles from './FingerprintView.module.less';
import FingerprintTable from './FingerprintTable';
import EditFingerprintModal from './EditFingerprintModal';
import SiteInfo from 'src/components/common/SiteInfo';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import FingerprintInfo from 'src/types/FingerprintInfo';

type FingerprintViewProps = {
  site: SiteManagementInfo;
};

const FingerprintView: React.FC<FingerprintViewProps> = ({ site }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const schema = urlParams.get('schema') ? urlParams.get('schema')?.toString() : undefined;
  const [requestParams, setRequestParams] = useState<any>({});
  const [editFingerprintVisible, setEditFingerprintVisible] = useState(false);
  const [fingerprint, setFingerprint] = useState<any>(null);
  const onUpdateList = () => {
    const newParams = { ...requestParams };
    setRequestParams(newParams);
    setFingerprint(null);
  };

  const onEditFingerprint = (fingerprint: FingerprintInfo | {}) => {
    setEditFingerprintVisible(true);
    setFingerprint(fingerprint);
  };

  return (
    <>
      <h1 className={styles.fingerprint_title}>Edit Fingerprint</h1>
      <div className={styles.site_info_wrapper}>
        <SiteInfo site={site} schema={schema} />
      </div>
      <FingerprintTable
        schema={schema}
        site={site}
        onEditFingerprint={onEditFingerprint}
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        onUpdate={onUpdateList}
      />
      <EditFingerprintModal
        schema={schema}
        site={site}
        fingerprint={fingerprint}
        visible={editFingerprintVisible}
        setVisible={setEditFingerprintVisible}
        onUpdate={onUpdateList}
      />
    </>
  );
};

export default FingerprintView;
