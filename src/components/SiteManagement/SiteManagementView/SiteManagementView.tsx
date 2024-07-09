import React, { useState } from 'react';
import SiteManagementFilters from './SiteManagementFilters';
import SiteManagementList from './SiteManagementList';
import SiteManagementParams from 'src/types/SiteManagementParams';

type SiteManagementViewProps = {};

const SiteManagementView: React.FC<SiteManagementViewProps> = () => {
  const [siteName, setSiteName] = useState<string>('');
  const [schema, setSchema] = useState<string>('');
  const [requestParams, setRequestParams] = useState<SiteManagementParams | null>(null);

  const getFilters = (name: string, value: string) => {
    if (name === 'name') {
      setSiteName(value);
    }
    if (name === 'schema') {
      setSchema(value);
    }
  };

  const onUpdateList = () => {
    setRequestParams({
      ...requestParams,
    });
  };

  return (
    <>
      <SiteManagementFilters setParams={getFilters} onUpdate={onUpdateList} />
      <SiteManagementList
        name={siteName}
        schema={schema}
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        onUpdate={onUpdateList}
      />
    </>
  );
};

export default SiteManagementView;
