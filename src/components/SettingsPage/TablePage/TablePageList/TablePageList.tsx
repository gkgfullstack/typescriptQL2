import React, { useEffect, useState } from 'react';
import styles from './TablePageList.module.less';
import { Sorting } from 'src/types/Sorting';
import TablePageListTable from './TablePageListTable/TablePageListTable';
import TablePageTableInfo from 'src/types/TablePageTableInfo';
import { useGetTablePageList, useClearUpdateTableRow } from 'src/api/tablePageList';
import SORT_ORDER from 'src/enums/sortOrder';
import TablePageEdit from './TablePageEdit';
import TablePageEditTableType from 'src/types/TablePageEditTableType';
import ConfirmationDownloadCentered from 'src/components/common/ConfirmationDownloadCentered';
import { useDeleteTable } from 'src/api/tablePageEdit';
import AuditTable from './AuditTable';
import { useCreateNewTableConfigrationPage } from 'src/api/createNewTablePage';
import TablePageDetails from './TablePageDetails';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { useEditTableUpdatePostFetch } from 'src/api/editTableAPIPost';
import UploadTable from './UploadTable';


export type TablePageListProps = {
  id?: string;
  appId:any;
  searchName: string;
  adminEnabled?: boolean;
  pageSize: number;
  page: number;
  setPageSize?: any;
  setPage?: any;
  table?: TablePageEditTableType;
  enablePTD: boolean;
  onUpdateCreateNew: any;
  onUpdateDeleted:any;
  onUpdateClear:any;
  onUpdateEditTable:any;
  onUpdateUploadTable:any;
};

const TablePageList: React.FC<TablePageListProps> = ({
  id,
  appId,
  searchName,
  adminEnabled,
  pageSize,
  page,
  setPageSize,
  setPage,
  enablePTD,
  onUpdateCreateNew,
  onUpdateDeleted,
  onUpdateClear,
  onUpdateEditTable,
  onUpdateUploadTable
}: TablePageListProps): React.ReactElement => { 
  const [currentColumn] = useState('table_name');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<TablePageTableInfo>);
  const [metadataVisible, setMetadataVisible] = useState<boolean>(false);
  const [detailssVisible, setDetailssVisible] = useState<boolean>(false);
  const [site, setSite] = useState<any>(null);
  const [requestParams, setRequestParams] = useState<any>();
 const [editTableAction, setEditTableAction] = useState<any>();
//  const [uploadRequestParams, setUploadRequestParams] = useState<any>();
//   const [deletedRequestParams, setDeletedRequestParams] = useState<any>();
//   const [clearRequestParams, setClearRequestParams] = useState<any>();
  
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [, setSelectedMatchCategory] = useState<any>(null);
  const [deletedMatchCategory, setDeletedMatchCategory] = useState<any>('');

  const [, setSelectedTableRow] = useState<any>(null);
  const [clearTableEdit, setClearTableEdit] = useState<any>('');
  
  
  const [uploadTableVisible, setUploadTableVisible] = useState<boolean>(false);

  const [auditTableVisible, setAuditTableVisible] = useState<boolean>(false);
  const [confirmationVisibleDelete, setConfirmationVisibleDelete] = useState<boolean>(false);
 
  const [loading, totalRecords, TableList] = useGetTablePageList(requestParams);
  const totalRecordsNumber = totalRecords;
  const totalRecordsNumberString = parseInt(totalRecordsNumber);
  const [editRecord, setEditRecord] = useState(null);
  const getOffset = (page: number, size: number): number => {
    const firstPage = 0;
    if (
      requestParams &&
      ((requestParams.id && requestParams.id !== id) ||
        (!requestParams.id && id) ||
        (requestParams.appId && requestParams.appId !== appId) ||
        (!requestParams.appId && appId) ||
        (requestParams.size && requestParams.size !== pageSize))
    ) {
      setPage(firstPage);
      return firstPage;
    }
    return page > 1 ? (page - 1) * size : firstPage;
  };
 
  useCreateNewTableConfigrationPage(requestParams, onUpdateCreateNew);
  useEditTableUpdatePostFetch(editTableAction, onUpdateEditTable);
  useDeleteTable(deletedMatchCategory, setDeletedMatchCategory, onUpdateDeleted);
  useClearUpdateTableRow(clearTableEdit, setClearTableEdit, onUpdateClear);
  //useUploadTableUpdatePostFetch(uploadRequestParams, onUpdateUploadTable);

  useEffect(() => {
    let newParams: any = {appId: appId, adminEnabled: adminEnabled, size: pageSize, offset: getOffset(page, pageSize), searchName: searchName };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field,
      };
    }
    if (id) {
      newParams = { ...newParams, id };
    }
    if (appId) {
      newParams = { ...newParams, appId };
    }
    setRequestParams(newParams);
    // setDeletedRequestParams(newParams);
    // setClearRequestParams(newParams);
    setEditTableAction(newParams)
    //setUploadRequestParams(newParams)
  }, [id, appId, searchName, adminEnabled, page, pageSize, sorting ]);

  const onChangeStatus = (record: any) => {
    return (e: any) => {
      const newRecord = {
        ...record,
        active: !record.active,
      };
      e.stopPropagation();
      setEditRecord(newRecord);     
    };    
  };
  const onAction = (site: any, type: string) => {
    const editedSite = { ...site };
    setSite(editedSite);

    if (type === 'editMetadata') {      
        setMetadataVisible(true);
        setDetailssVisible(false);      
    }

    if (type === 'detailss') {
      if(confirmationVisibleDelete === false){
        setDetailssVisible(true);
      }else{
        setDetailssVisible(false);
      }
      
    }
    if (type === 'audit') {
      setAuditTableVisible(true);
    }
    if (type === 'delete') {
      setSelectedMatchCategory(site);
      setConfirmationVisibleDelete(true);
      setDetailssVisible(false);
    }
    if (type === 'upload') {
      if(uploadTableVisible === false){
        setUploadTableVisible(true);
        setDetailssVisible(false);
      }else{
        setUploadTableVisible(false);
        setDetailssVisible(false);
      }
      
    }
    if (type === 'clear') {
      setSelectedTableRow(site);
      setConfirmationVisible(true);
      setDetailssVisible(false);
    }
  };

  const onSortingChange = (sorting: Sorting<TablePageTableInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };
  const onDelete = () => {
    setDeletedMatchCategory(site.id);
    setDetailssVisible(false);
  };

  const onUpload = () => {
    setUploadTableVisible(site.id);
    setUploadTableVisible(false);
  };

  const onClear = () => {
    setClearTableEdit(site.id);
    setDetailssVisible(false);
  };
  const { user } = useAppStateContext();
  
  return (
    <div className={styles.client_list_table_wrapper}>
      <TablePageListTable
        items={TableList}
        sorting={sorting}
        loading={loading}
        pageSize={pageSize}
        page={page}
        total={totalRecordsNumberString || 0}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        onSortingChange={onSortingChange}
        onChangeStatus={onChangeStatus}
        onAction={onAction}
        editRecord={editRecord}
      />
      {user?.userName == site?.owner  ? <TablePageEdit
        site={site}
        visible={metadataVisible}
        setVisible={setMetadataVisible}
        onUpdateEditTable={onUpdateEditTable}
         /> : ""}
       <TablePageDetails
        site={site}
        visible={detailssVisible}
        setVisible={setDetailssVisible}
        editedVisible={setMetadataVisible}
        deleteVisible={setConfirmationVisibleDelete}
        auditVisible={setAuditTableVisible}
        uploadVisible={setUploadTableVisible}
        clearVisible={setConfirmationVisible} 
        onUpdateDeleted={onUpdateDeleted} 
        onUpdateClear={onUpdateClear}  
        onUpdateEditTable={onUpdateEditTable}  
      />

{enablePTD == true ? <ConfirmationDownloadCentered
        title={'Delete Table Row '}
        name={site ? site.name : ''}
        confirmationVisible={confirmationVisibleDelete}
        onAction={onDelete}
        setVisible={setConfirmationVisibleDelete}
        message={"Are you sure you want to delete this table, including all of its data?"}
      />: ""}
     {enablePTD == true ? <AuditTable
        site={site}
        visible={auditTableVisible}
        setVisible={setAuditTableVisible}
      />: ""}
      {enablePTD == true ?<UploadTable
        site={site}
        visible={uploadTableVisible}
        setVisible={setUploadTableVisible}
        onSubmit={onUpload}
        uploadId={site?.id}
        formatVal={'c'}
        onUpdateUploadTable={onUpdateUploadTable}
      />: ""}

      {enablePTD == true ?<ConfirmationDownloadCentered
        message={"Are you sure you want to clear all data from this table?"}
        title={'Clear Table Row '}
        name={site ? site.name : ''}
        confirmationVisible={confirmationVisible}
        onAction={onClear}
        setVisible={setConfirmationVisible}
        
      />: ""}
    </div>
  );
};

export default TablePageList;