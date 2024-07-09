import React, { useState } from 'react';
import ShallowFilterPanel from './ShallowFilterPanel';
import ShallowProductList from './ShallowProductList';
import BackLink from 'src/components/common/BackLink';
import routes from 'src/routes';

type ShallowCleanUpViewProps = {};

const ShallowCleanUpView: React.FC<ShallowCleanUpViewProps> = () => {
  const [site, setSite] = useState<string>('');
  const [schema, setSchema] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const getFilters = (name: string, value: string) => {
    if (name === 'site') {
      setSite(value);
    }
    if (name === 'schema') {
      setSchema(value);
      setSite('');
    }
    if (name === 'date') {
      setDate(value);
    }
  };

  return (
    <>
      <ShallowFilterPanel setParams={getFilters} schema={schema} />
      <BackLink text={'Back to Retail Diagnostic'} url={routes.retailDiagnostic} />
      <h1>Shallow Cleanup</h1>
      <ShallowProductList schema={schema} site={site} date={date} />
    </>
  );
};

export default ShallowCleanUpView;
