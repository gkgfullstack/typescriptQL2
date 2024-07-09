import React from 'react';
import styles from './SpiderFilterPanel.module.less';
import SpiderVerticalFilter from './SpiderVerticalFilter';
import SpiderCategoryFilter from './SpiderCategoryFilter';
import SiteFilter from 'src/components/common/SiteFilter';

type SpiderFilterPanelProps = {
  setParams: (name: string, value: string) => void;
  schema: string | undefined;
};

const SpiderFilterPanel: React.FC<SpiderFilterPanelProps> = ({ schema, setParams }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const siteId = urlParams.get('siteId');
  const selectedSites = siteId ? [siteId] : [];

  return (
    <div className={styles.filter_panel_wrapper}>
      <div className={styles.filter_panel_dropdown}>
        <SpiderVerticalFilter setParams={setParams} />
      </div>
      <div className={styles.filter_panel_dropdown}>
        <SiteFilter setParams={setParams} schema={schema} selectedSites={selectedSites} />
      </div>
      <div className={styles.filter_panel_dropdown}>
        <SpiderCategoryFilter setParams={setParams} />
      </div>
    </div>
  );
};

export default SpiderFilterPanel;
