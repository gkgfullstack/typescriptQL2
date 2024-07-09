import React, { useState } from 'react';
import ProductFilterPanel from './ProductFilterPanel';
import ProductCleanupList from './ProductCleanupList';
import BackLink from 'src/components/common/BackLink';
import routes from 'src/routes';

type ProductCleanUpViewProps = {};

const ProductCleanUpView: React.FC<ProductCleanUpViewProps> = () => {
  const [site, setSite] = useState<string>('');
  const [schema, setSchema] = useState<string>('');
  const [fingerPrint, setFingerPrint] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<string>('1');

  const getFilters = (name: string, value: string) => {
    if (name === 'schema') {
      setSchema(value);
      setSite('');
      setFingerPrint('');
    }
    if (name === 'site') {
      setSite(value);
      setFingerPrint('');
    }
    if (name === 'fingerPrint') {
      setFingerPrint(value);
    }
    if (name === 'manufacturer') {
      setManufacturer(value);
    }
  };
  return (
    <>
      <ProductFilterPanel setParams={getFilters} schema={schema} site={site} />
      <BackLink text={'Back to Retail Diagnostic'} url={routes.retailDiagnostic} />
      <h1>Product Cleanup</h1>
      <ProductCleanupList schema={schema} site={site} fingerPrint={fingerPrint} manufacturer={manufacturer} />
    </>
  );
};

export default ProductCleanUpView;
