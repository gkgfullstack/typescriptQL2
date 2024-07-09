import React, { useState } from 'react';
import styles from './EditTableView.module.less';
import EditTableForm from './EditTableForm';
import TablePageEditType from 'src/types/TablePageEditType';
import { useEditTablePostFetch } from 'src/api/editTableAPIPost';

type EditTableViewProps = {
  requestParams:TablePageEditType;
  setVisible:any;
  onUpdateEditTable:any;
};

const EditTableView: React.FC<EditTableViewProps> = ({ requestParams, setVisible, onUpdateEditTable }) => {
  const [editTableData, setEditTableData] = useState(null);
  useEditTablePostFetch(editTableData, onUpdateEditTable, setVisible);

  const editTableDataHandler = (values: any) => {   
    setEditTableData(values);
};
  return (
    <>
      <h1 className={styles.metadata_title}>Table Edit</h1>
      <div className={styles.site_info_wrapper}>
        <EditTableForm editTableData={editTableDataHandler}  requestParams={requestParams} setVisible={setVisible} />     
      </div>
    </>
  );
};

export default EditTableView;
