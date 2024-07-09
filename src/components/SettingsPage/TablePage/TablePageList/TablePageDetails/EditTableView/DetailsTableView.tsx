import React from 'react';
import styles from './DetailsTableView.module.less';
import EditTableForm from './DetailsTableForm';
import { Row, Col, Divider, Button } from 'antd';
import { faEdit, faDna, faDownload, faTrashAlt, faUpload, faAnalytics } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import TablePageEditTableType from 'src/types/TablePageEditTableType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContex from 'src/services/UserContex';
import { useUserPermissionTableCreate } from 'src/api/userPermissionTableCreate';
import { useUserPermissionTableDelete } from 'src/api/userPermissionTableDelete';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';

const faEditIcon = faEdit as IconProp;
const faDnaIcon = faDna as IconProp;

type DetailsTableViewProps = {
  requestParams: TablePageEditTableType;
  setVisible: any;
  onUpdateDeleted: any;
  onUpdateClear: any;
  editedVisible: any;
  deleteVisible: any;
  auditVisible: any;
  uploadVisible: any;
  clearVisible: any;
  onUpdateEditTable:any
};

const DetailsTableView: React.FC<DetailsTableViewProps> = ({
  requestParams,
  setVisible,
  deleteVisible,
  auditVisible,
  uploadVisible,
  clearVisible,
  editedVisible,
}) => {

  const [loadingPTD, {enablePTD}] = useUserPermissionTableDelete('138');
  const [loadingPTC, {enablePTC}] = useUserPermissionTableCreate('138');
  console.log(loadingPTD);
  console.log(loadingPTC);
  let downloadURL: any = requestParams.downloadUrl
  let decodedDownloadUrl = decodeURIComponent(downloadURL);
  const urldownload = UserContex.getBaseUrl() + decodedDownloadUrl;
  const { user } = useAppStateContext();
  return (
    <>    
      <h1 className={styles.metadata_title}>Table Detail</h1>
      <Row>
        <Col span={4}>
        {user?.userName === requestParams?.owner ? <>
        <Button onClick={editedVisible} className={styles.actionButton}>
            <FontAwesomeIcon
              icon={faEditIcon}
              className={styles.action_icon}
              title={'Edit Metadata'}
            /> Edit Table
          </Button> 
          <Divider className={styles.marginDivider} /></> : ""}
          {enablePTC == true ? <><a href={urldownload} target="_blank" rel="download" className={styles.actionButton}>
            <FontAwesomeIcon
              icon={faDownload}
              className={styles.action_icon}
              title={'download'}
            /> Download
          </a> 
          <Divider className={styles.marginDivider} /></>: ""}
          {enablePTD == true ? <> <Button onClick={deleteVisible} className={styles.actionButton}>
            <FontAwesomeIcon
              icon={faDnaIcon}
              className={styles.action_icon}
              title={'Delete'}
            /> Delete
          </Button>
          <Divider className={styles.marginDivider} /></>: ""}
          {enablePTC == true ? <><Button onClick={auditVisible} className={styles.actionButton}>
            <FontAwesomeIcon
              icon={faAnalytics}
              className={styles.action_icon}
              title={'Audit'}
            /> Audit
          </Button>
          <Divider className={styles.marginDivider} /></> : ""}
          {enablePTC == true ? <> <Button onClick={uploadVisible} className={styles.actionButton}>
            <FontAwesomeIcon
              icon={faUpload}
              className={styles.action_icon}
              title={'Upload'}
            /> Upload
          </Button>
          <Divider className={styles.marginDivider} /></> : ""}
          {enablePTC == true ? <><Button onClick={clearVisible} className={styles.actionButton}>
            <FontAwesomeIcon
              icon={faTrashAlt}
              className={styles.action_icon}
              title={'Clear'}
            /> Clear
          </Button>
          <Divider className={styles.marginDivider} /></> : ""}
        </Col>
        <Col span={20}>
          <div className={styles.site_info_wrapper}>
            <EditTableForm requestParams={requestParams} setVisible={setVisible}  />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DetailsTableView;

