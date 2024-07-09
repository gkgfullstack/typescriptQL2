import React, { useState } from 'react';
import SKUProgress from './SKUProgress';
import SKUFilters from './SKUFilters';
import SKUList from './SKUList';

type SKUViewProps = {};

const SKUView: React.FC<SKUViewProps> = () => {
  const [name, setName] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [requestParams, setRequestParams] = useState<any>(null);

  const getFilters = (name: string, value: string) => {
    if (name === 'search') {
      setSku(value);
      setName(value);
    }
    if (name === 'status') {
      setStatus(value);
    }
  };

  return (
    <>
      <SKUProgress />
      <SKUFilters setParams={getFilters} />
      <SKUList
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        search={name}
        sku={sku}
        status={status}
      />
    </>
  );
};

export default SKUView;
