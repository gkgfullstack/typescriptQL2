import React from 'react';
import styles from './SiteClientsView.module.less';
import SiteClientsTable from './SiteClientsTable';
import SiteInfo from 'src/components/common/SiteInfo';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

type SiteClientsViewProps = {
  site: SiteManagementInfo;
};

const SiteClientsView: React.FC<SiteClientsViewProps> = ({ site }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const schema = urlParams.get('schema') ? urlParams.get('schema')?.toString() : undefined;

  return (
    <>
      <h1 className={styles.site_clients_title}>View Clients</h1>
      <div className={styles.site_info_wrapper}>
        <SiteInfo site={site} schema={schema} />
      </div>
      <SiteClientsTable siteId={site.ID} schema={schema} />
    </>
  );
};

export default SiteClientsView;
