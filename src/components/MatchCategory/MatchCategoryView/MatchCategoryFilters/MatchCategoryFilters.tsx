import React from 'react';
import CreateMatchAttribute from './CreateMatchAttribute';
import MatchAttributeSearch from './MatchAttributeSearch';
import styles from './MatchCategoryFilters.module.less';

type MatchCategoryFiltersProps = {
  setParams: (name: string, value: string) => void;
  requestParams: any;
  setRequestParams: any;
};

const MatchCategoryFilters: React.FC<MatchCategoryFiltersProps> = ({ setParams, requestParams, setRequestParams }) => {
  const onChangeSearch = (value: string): void => {
    setParams('search', value);
  };

  return (
    <div className={styles.filter_panel_wrapper}>
      <div className={styles.create_new_match_attribute}>
        <CreateMatchAttribute requestParams={requestParams} setRequestParams={setRequestParams} />
      </div>
      <div className={styles.match_attribute_search}>
        <MatchAttributeSearch onChangeSearch={onChangeSearch} value={''} />
      </div>
    </div>
  );
};

export default MatchCategoryFilters;
