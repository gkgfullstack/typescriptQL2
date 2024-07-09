import React from 'react';
import styles from './DiagnosticFilterPanel.module.less';
import DiagnosticVerticalFilter from './DiagnosticVerticalFilter';
import DiagnosticSearch from './DiagnosticSearch';
import DiagnosticSiteFilter from './DiagnosticSiteFilter';
import DiagnosticSearchType from './DiagnosticSearchType';

type DiagnosticFilterPanelProps = {
  setParams: (name: string, value: string) => void;
  loading?: boolean;
  schema?: string;
};

const DiagnosticFilterPanel: React.FC<DiagnosticFilterPanelProps> = ({ setParams, loading, schema }) => {
  const handleSearchChange = (value: string): void => {
    setParams('search', value);
  };

  return (
    <div className={styles.filter_panel_wrapper}>
      <div className={styles.filter_panel_dropdown}>
        <DiagnosticVerticalFilter setParams={setParams} loading={loading} />
      </div>
      <div className={styles.filter_panel_dropdown}>
        <DiagnosticSiteFilter setParams={setParams} schema={schema} loading={loading} />
      </div>
      <div className={styles.filter_panel_dropdown}>
        <DiagnosticSearchType setParams={setParams} loading={loading} />
      </div>
      <div className={styles.filter_search}>
        <DiagnosticSearch onChangeSearch={handleSearchChange} value={''} />
      </div>
    </div>
  );
};

export default DiagnosticFilterPanel;
