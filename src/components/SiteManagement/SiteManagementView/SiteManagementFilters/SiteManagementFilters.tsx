import React from 'react';
import CreateNewSite from './CreateNewSite';
import SiteSearch from './SiteSearch';
import SiteVerticalFilter from './SiteVerticalFilter';
import styles from './SiteManagementFilters.module.less';

type SiteManagementFiltersProps = {
  setParams: (name: string, value: string) => void;
  onUpdate: () => void;
};

const SiteManagementFilters: React.FC<SiteManagementFiltersProps> = ({ setParams, onUpdate }) => {
  const handleSearchChange = (value: string): void => {
    setParams('name', value);
  };

  return (
    <div className={styles.filter_panel_wrapper}>
      <div className={styles.create_new_site}>
        <CreateNewSite onUpdate={onUpdate} />
      </div>
      <div className={styles.site_search}>
        <SiteSearch onChangeSearch={handleSearchChange} value={''} />
      </div>
      <div className={styles.filter_panel_schema}>
        <SiteVerticalFilter setParams={setParams} />
      </div>
    </div>
  );
};

export default SiteManagementFilters;
