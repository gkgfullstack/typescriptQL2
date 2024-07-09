import React, { useState } from 'react';
import MatchAttributeFilters from './MatchAttributeFilters';
import MatchAttributeList from './MatchAttributeList';

type MatchAttributeViewProps = {};

const MatchAttributeView: React.FC<MatchAttributeViewProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [schema, setSchema] = useState<string>('');
  const [requestParams, setRequestParams] = useState<any>(null);

  const getFilters = (name: string, value: string) => {
    if (name === 'search') {
      setSearch(value);
    }
    if (name === 'schema') {
      setSchema(value);
    }
  };

  return (
    <>
      <MatchAttributeFilters setParams={getFilters} requestParams={requestParams} setRequestParams={setRequestParams} />
      <MatchAttributeList
        search={search}
        schema={schema}
        requestParams={requestParams}
        setRequestParams={setRequestParams}
      />
    </>
  );
};

export default MatchAttributeView;
