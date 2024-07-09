import React, { useState } from 'react';
import styles from './UploadTableView.module.less';
import UploadTableFrom from './UploadTableFrom';
import { useUploadTableState } from 'src/api/uploadTableAPI';

type AuditTableViewProps = {
  setVisible:boolean;
  onSubmit:(values: any, form: any, setVisible:boolean) => void;
  uploadId:any;
  formatVal:any;
  onUpdateUploadTable:any;
};

const UploadTableView: React.FC<AuditTableViewProps> = ({ setVisible, uploadId, formatVal, onUpdateUploadTable }) => {
const [uploadRequestParams, setUploadRequestParams] = useState<any>();
useUploadTableState(uploadRequestParams, setVisible, onUpdateUploadTable)
  const handleSubmit = (values: any) => {
      setUploadRequestParams(values);
  };
  return (
    <>
      <h1 className={styles.metadata_title}>Upload File</h1>
      <div className={styles.site_info_wrapper}>
        <UploadTableFrom 
          formatVal={formatVal}
          onSubmit={handleSubmit}
          visible={setVisible}
          uploadId={uploadId}   />     
      </div>
    </>
  );
};

export default UploadTableView;
