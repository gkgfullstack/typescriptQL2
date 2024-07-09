import React, { useState } from 'react';
import styles from './MetadataView.module.less';
import MetadataTable from './MetadataTable';
import EditMetadataModal from './EditMetadataModal';
import SiteInfo from 'src/components/common/SiteInfo';
import MetadataInfo from 'src/types/MetadataInfo';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

type MetadataViewProps = {
  site: SiteManagementInfo;
};

const MetadataView: React.FC<MetadataViewProps> = ({ site }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const schema = urlParams.get('schema') ? urlParams.get('schema')?.toString() : undefined;
  const [requestParams, setRequestParams] = useState<any>({});
  const [editMetadataVisible, setEditMetadataVisible] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const onUpdateList = () => {
    const newParams = { ...requestParams };
    setRequestParams(newParams);
    setMetadata(null);
  };

  const onEditMetadata = (metadata: MetadataInfo | {}) => {
    setEditMetadataVisible(true);
    setMetadata(metadata);
  };

  return (
    <>
      <h1 className={styles.metadata_title}>Edit Metadata</h1>
      <div className={styles.site_info_wrapper}>
        <SiteInfo site={site} schema={schema} />
      </div>
      <MetadataTable
        siteId={site.ID}
        schema={schema}
        onEditMetadata={onEditMetadata}
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        onUpdate={onUpdateList}
      />
      <EditMetadataModal
        site={site}
        schema={schema}
        metadata={metadata}
        visible={editMetadataVisible}
        setVisible={setEditMetadataVisible}
        onUpdate={onUpdateList}
      />
    </>
  );
};

export default MetadataView;
