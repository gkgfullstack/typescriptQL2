import React, { useState } from 'react';
import FilterPanel from '../FilterPanel';
import ConfigureClientList from '../ConfigureClientList/ConfigureClientList';
import ConfigurationClientInfo from '../../ConfigurationClientInfo/ConfigurationClientInfo';
import { IndustryContext } from 'src/services/IndustryContext';

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

type ConfigureClientViewProps = {};

const ConfigureClientView: React.FC<ConfigureClientViewProps> = () => {
  const [name, setName] = useState<string>('');
  const [mwsSchema, setMWSSchema] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState<number>(PAGE_NUMBER);
  const [isIndustryUpdated, setIndustryUpdated] = useState(true);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const clientId = urlParams.get('clientId')?.toString();

  const getFilters = (name: string, value: string) => {
    if (name === 'name') {
      setName(value);
    }
    if (name === 'mwsSchema') {
      setMWSSchema(value);
    }
    if (name === 'industry') {
      setIndustry(value);
    }
  };

  return (
    <IndustryContext.Provider
      value={{
        isUpdated: isIndustryUpdated,
        updateIndustry: setIndustryUpdated,
      }}
    >
      <FilterPanel setParams={getFilters} isIndustryUpdated={isIndustryUpdated} updateIndustry={setIndustryUpdated} />
      {clientId && <ConfigurationClientInfo />}
      {!clientId && (
        <ConfigureClientList
          name={name}
          mwsSchema={mwsSchema}
          industry={industry}
          pageSize={pageSize}
          page={page}
          setPageSize={setPageSize}
          setPage={setPage}
        />
      )}
    </IndustryContext.Provider>
  );
};

export default ConfigureClientView;
