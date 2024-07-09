import React, { useState } from 'react';
import DiagnosticFilterPanel from './DiagnosticFilterPanel';
import RetailDiagnosticList from './RetailDiagnosticList';
import Spin from 'src/components/common/Spin';

type RetailDiagnosticViewProps = {};

const RetailDiagnosticView: React.FC<RetailDiagnosticViewProps> = () => {
  const [verticalName, setverticalName] = useState<string>('all');
  const [schema, setSchema] = useState<string>('all');
  const [searchType, setSearchType] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sites, setSites] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getFilters = (name: string, value: string) => {
    if (name === 'schema') {
      const schemaName = value === 'all' ? '' : value;
      setSchema(schemaName);
      setverticalName(value);
    }
    if (name === 'search') {
      setSearch(value);
    }
    if (name === 'sites') {
      setSites(value);
    }
    if (name === 'searchType') {
      setSearchType(value);
    }
  };

  return (
    <Spin spinning={loading}>
      <DiagnosticFilterPanel schema={schema} setParams={getFilters} loading={loading} />
      <RetailDiagnosticList
        schema={verticalName}
        search={search}
        sites={sites}
        searchType={searchType}
        setLoading={setLoading}
      />
    </Spin>
  );
};

export default RetailDiagnosticView;
