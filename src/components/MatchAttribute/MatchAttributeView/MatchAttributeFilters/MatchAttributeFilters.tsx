import React from 'react';
import CreateMatchCategory from './CreateMatchCategory';
import MatchCategorySearch from './MatchCategorySearch';
import MatchCategoryVertical from './MatchCategoryVertical';
import styles from './MatchAttributeFilters.module.less';

type MatchAttributeFiltersProps = {
  setParams: (name: string, value: string) => void;
  requestParams: any;
  setRequestParams: any;
};

const MatchAttributeFilters: React.FC<MatchAttributeFiltersProps> = ({ setParams, requestParams, setRequestParams, }) => {
  const onChangeSearch = (value: string): void => {
    setParams('search', value);
  };

  return (
    <div className={styles.filter_panel_wrapper}>
      <div className={styles.create_new_match_category}>
        <CreateMatchCategory requestParams={requestParams} setRequestParams={setRequestParams} />
      </div>
      <div className={styles.match_category_search}>
        <MatchCategorySearch onChangeSearch={onChangeSearch} value={''} />
      </div>
      <div className={styles.filter_panel_schema}>
        <MatchCategoryVertical setParams={setParams} />
      </div>
    </div>
  );
};

export default MatchAttributeFilters;
