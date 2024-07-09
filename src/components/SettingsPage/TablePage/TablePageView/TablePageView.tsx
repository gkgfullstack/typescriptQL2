import React, { useState } from 'react';
import FilterPanel from '../FilterPanel';
import TablePageList from '../TablePageList/TablePageList';
import { useUserPermissionTableCreate } from 'src/api/userPermissionTableCreate';
import { useUserPermissionTableDelete } from 'src/api/userPermissionTableDelete';
import TableNewCreateParams from 'src/types/TableNewCreateParams';
import Spin from 'src/components/common/Spin';
//import EditTablePageSetting from 'src/types/EditTablePageSetting';
//import EditTablePageSetting from 'src/types/EditTablePageSetting';

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

type TablePageViewProps = {};

const TablePageView: React.FC<TablePageViewProps> = () => {
  
  const [searchNames, setSearchNames] = useState<string>('');
 
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const storedAppId = window.localStorage.getItem('appId')
  const appIdsss:any = urlParams.get('appId') ? urlParams.get('appId') : storedAppId ? storedAppId:"-1";
  const [appIdss, setParamsAppId] = useState<string>(appIdsss);

  const [loadingPTD, {enablePTD}] = useUserPermissionTableDelete('138');
  const [loadingPTC, {enablePTC}] = useUserPermissionTableCreate('138');
  console.log(loadingPTD)
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState<number>(PAGE_NUMBER);
  const [requestParams, setRequestParams] = useState<TableNewCreateParams | null>(null);
  const [requestParamsDeleted, setRequestParamsDeleted] = useState<TableNewCreateParams | null>(null);
  const [requestParamsClear, setRequestParamsClear] = useState<TableNewCreateParams | null>(null);
  const [requestParamsEditTable, setRequestParamsEditTable] = useState<TableNewCreateParams | null>(null);

  const getFilters = (name:string, value: string) => {
    if (name === 'name') {
      setSearchNames(value);
    }
    if (name === 'appId') {
      setParamsAppId(value);
      window.localStorage.setItem('appId', value);
    }
  };

  const onUpdateList = () => {
    setRequestParams({
      ...requestParams,
    });
  };

  const onUpdateDeleted = () => {
    setRequestParamsDeleted({
      ...requestParamsDeleted,
    });
  };

  const onUpdateClear = () => {
    setRequestParamsClear({
      ...requestParamsClear,
    });
  };

  const onUpdateEditTable = () => {
    setRequestParamsEditTable({
      ...requestParamsEditTable,
    });
  };
  const onUpdateUploadTable = () => {
    setRequestParamsEditTable({
      ...requestParamsEditTable,
    });
  };
  
  
  return (<>
  <Spin spinning={loadingPTC}>
        <FilterPanel  enablePTC={enablePTC} appId={appIdss} setParamsValues={getFilters} onUpdateCreateNew={onUpdateList}/>      
        <TablePageList 
        searchName={searchNames}
        pageSize={pageSize}
        page={page}
        setPageSize={setPageSize}
        setPage={setPage}
        enablePTD={enablePTD}
        onUpdateCreateNew={onUpdateList}
        appId={appIdss}
        onUpdateDeleted={onUpdateDeleted}
        onUpdateClear={onUpdateClear} 
        onUpdateEditTable={onUpdateEditTable}
        onUpdateUploadTable={onUpdateUploadTable}       /> 
        </Spin>     
    </>
  );
};

export default TablePageView;
