import React from 'react';
import styles from './ProductFilterPanel.module.less';
import ProductVerticalFilter from './ProductVerticalFilter';
import ProductFingerPrintFilter from './ProductFingerPrintFilter';
import ProductManufacturerFilter from './ProductManufacturerFilter';
import SiteFilter from 'src/components/common/SiteFilter';

type ProductFilterPanelProps = {
  setParams: (name: string, value: string) => void;
  schema: string | undefined;
  site: string | undefined;
};

const ProductFilterPanel: React.FC<ProductFilterPanelProps> = ({ schema, site, setParams }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const siteId = urlParams.get('siteId');
  const selectedSites = siteId ? [siteId] : [];

  return (
    <div className={styles.filter_panel_wrapper}>
      <div className={styles.filter_panel_dropdown}>
        <ProductVerticalFilter setParams={setParams} />
      </div>
      <div className={styles.filter_panel_dropdown}>
        <SiteFilter setParams={setParams} schema={schema} selectedSites={selectedSites} />
      </div>
      <div className={styles.filter_panel_dropdown}>
        <ProductFingerPrintFilter setParams={setParams} schema={schema} site={site} />
      </div>
      <div className={styles.filter_panel_dropdown}>
        <ProductManufacturerFilter setParams={setParams} />
      </div>
    </div>
  );
};

export default ProductFilterPanel;
