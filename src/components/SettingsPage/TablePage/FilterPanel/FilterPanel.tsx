import React  from 'react';
import TableFilter from './TableFilter';
import TableSearch from './TableSearch';
import styles from './FilterPanel.module.less';
import CreateNewTable from './CreateNewTable';

type FilterPanelProps = {
  setParamsValues: any;
  enablePTC:boolean;
  onUpdateCreateNew:any;
  appId: string;
};

const FilterPanel: React.FC<FilterPanelProps> = ({  setParamsValues, onUpdateCreateNew, enablePTC, appId }) => {
  const handleSearchChange = (value: string): void => {
    setParamsValues('name', value);
  };

  return (
    <div className={styles.filter_panel_wrapper}>
       {enablePTC == true ? <div className={styles.create_new_client}>
         <CreateNewTable onUpdateCreateNew={onUpdateCreateNew} appIds={setParamsValues} />
      </div> : ""}
      <div className={styles.client_search}>
        <TableSearch onChangeSearch={handleSearchChange} value={''} />
      </div>
      <div className={styles.filter_panel_schema}>
        <TableFilter
          appId={appId}
          setParams={setParamsValues}
        />
      </div>
      
    </div>
  );
};

export default FilterPanel;
