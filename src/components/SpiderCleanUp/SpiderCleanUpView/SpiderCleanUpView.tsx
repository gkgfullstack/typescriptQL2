import React, { useState } from 'react';
import SpiderFilterPanel from './SpiderFilterPanel';
import SpiderCategoryList from './SpiderCategoryList';
import BackLink from 'src/components/common/BackLink';
import routes from 'src/routes';

type SpiderCleanUpViewProps = {};

const SpiderCleanUpView: React.FC<SpiderCleanUpViewProps> = () => {
  const [site, setSite] = useState<string>('');
  const [schema, setSchema] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const getFilters = (name: string, value: string) => {
    if (name === 'site') {
      setSite(value);
    }
    if (name === 'schema') {
      setSchema(value);
      setSite('');
      setCategory('');
    }
    if (name === 'category') {
      setCategory(value);
    }
  };

  return (
    <>
      <SpiderFilterPanel setParams={getFilters} schema={schema} />
      <BackLink text={'Back to Retail Diagnostic'} url={routes.retailDiagnostic} />
      <h1>Spider Cleanup</h1>
      <SpiderCategoryList schema={schema} site={site} category={category} />
    </>
  );
};

export default SpiderCleanUpView;
