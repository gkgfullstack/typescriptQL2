import React from 'react';
import styles from './AuditTableView.module.less';
import AuditTableTable from './AuditTableTable';
import AuditTableType from 'src/types/AuditTableType';

type AuditTableViewProps = {
  requestParams:AuditTableType;
  setVisible?:any;
};

const AuditTableView: React.FC<AuditTableViewProps> = ({ requestParams, setVisible }) => {

  return (
    <>
      <h1 className={styles.metadata_title}>Audit</h1>
      <div className={styles.site_info_wrapper}>
        <AuditTableTable  requestParams={requestParams} setVisible={setVisible}/>     
      </div>
    </>
  );
};

export default AuditTableView;
