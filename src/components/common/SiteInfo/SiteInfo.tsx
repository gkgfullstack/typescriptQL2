import React from 'react';
import styles from './SiteInfo.module.less';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import { ConfigureClientSitesTableInfo } from '../../../types/ConfigureClientSitesTableInfo';

type SiteInfoProps = {
  site: SiteManagementInfo | ConfigureClientSitesTableInfo;
  schema: string | undefined;
};

const SiteInfo: React.FC<SiteInfoProps> = ({ site, schema }) => {
  const getSiteStatus = (status: number | undefined) => {
    if (status === 1) {
      return (
        <>
          <span className={styles.site_active_status}>{''}</span>Active
        </>
      );
    } else {
      return (
        <>
          <span className={styles.site_inactive_status}>{''}</span>Inactive
        </>
      );
    }
  };
  return (
    <>
      <h2 className={styles.site_info_name}>{site.name}</h2>
      <dl className={styles.site_info_status_list}>
        <dt>ID:</dt>
        <dd>{site.ID}</dd>
        <dt>Vertical:</dt>
        <dd>{schema}</dd>
        <dt>Data Source:</dt>
        <dd>{site.dataSource}</dd>
        <dt>Status:</dt>
        <dd>{getSiteStatus(site.active)}</dd>
      </dl>
    </>
  );
};

export default SiteInfo;
