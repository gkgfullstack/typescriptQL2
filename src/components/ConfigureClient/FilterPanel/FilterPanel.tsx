import React from 'react';
import CreateNewClient from './CreateNewClient';
import ClientFilter from './ClientFilter';
import ClientSearch from './ClientSearch';
import { SelectValue } from 'antd/lib/select';
import styles from './FilterPanel.module.less';
import { useUpdateIndustries } from 'src/api/industriesFilter';
import { useGetMWSSchemas } from 'src/api/MWSSchemasFilter';

type FilterPanelProps = {
  setParams: any;
  isIndustryUpdated: boolean;
  updateIndustry: any;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ setParams, isIndustryUpdated, updateIndustry }) => {
  const [industriesOptions] = useUpdateIndustries(isIndustryUpdated, updateIndustry);
  const [schemasOptions] = useGetMWSSchemas();

  const handleSearchChange = (value: string): void => {
    setParams('name', value);
  };

  const handleSchemaChange = (value: SelectValue): void => {
    setParams('mwsSchema', value);
  };

  const handleIndustryChange = (value: SelectValue): void => {
    setParams('industry', value);
  };

  return (
    <div className={styles.filter_panel_wrapper}>
      <div className={styles.create_new_client}>
        <CreateNewClient schemas={schemasOptions} industries={industriesOptions} />
      </div>
      <div className={styles.client_search}>
        <ClientSearch onChangeSearch={handleSearchChange} value={''} />
      </div>
      <div className={styles.filter_panel_schema}>
        <ClientFilter
          value={''}
          onChange={handleSchemaChange}
          placeholder={'Select Vertical'}
          options={schemasOptions}
        />
      </div>
      <div className={styles.filter_panel_industry}>
        <ClientFilter
          value={''}
          onChange={handleIndustryChange}
          placeholder={'Select Industry'}
          options={industriesOptions}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
