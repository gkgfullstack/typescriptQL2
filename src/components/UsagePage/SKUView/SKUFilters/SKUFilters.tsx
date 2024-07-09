import React from 'react';
import SKUSearch from './SKUSearch';
import StatusFilter from './StatusFilter';
import styles from './SKUFilters.module.less';

type SKUFiltersProps = {
  setParams: (name: string, value: string) => void;
};

const SKUFilters: React.FC<SKUFiltersProps> = ({ setParams }) => {
  const onSearchBySKU = (value: string): void => {
    setParams('search', value);
  };

  return (
    <div className={styles.filter_panel_wrapper}>
      <div className={styles.filter_panel_status}>
        <StatusFilter setParams={setParams} />
      </div>
      <div className={styles.sku_search}>
        <SKUSearch onChangeSearch={onSearchBySKU} value={''} />
      </div>
    </div>
  );
};

export default SKUFilters;
