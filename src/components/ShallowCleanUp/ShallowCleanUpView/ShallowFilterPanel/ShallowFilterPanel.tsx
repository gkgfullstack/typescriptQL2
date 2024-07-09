import React from 'react';
import styles from './ShallowFilterPanel.module.less';
import ShallowVerticalFilter from './ShallowVerticalFilter';
import ShallowDateFilter from './ShallowDateFilter';
import SiteFilter from 'src/components/common/SiteFilter';

type ShallowFilterPanelProps = {
  setParams: (name: string, value: string) => void;
  schema: string | undefined;
};

const ShallowFilterPanel: React.FC<ShallowFilterPanelProps> = ({ schema, setParams }) => {
  return (
    <div className={styles.filter_panel_wrapper}>
      <div className={styles.filter_panel_dropdown}>
        <ShallowVerticalFilter setParams={setParams} />
      </div>
      <div className={styles.date_filter_panel_dropdown}>
        <ShallowDateFilter setParams={setParams} />
      </div>
      <div className={styles.site_filter_panel_dropdown}>
        <SiteFilter setParams={setParams} schema={schema} />
      </div>
    </div>
  );
};

export default ShallowFilterPanel;
