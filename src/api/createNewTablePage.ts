import { useEffect } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import TablePageSetting from 'src/types/TablePageSetting';
 import { notification } from 'antd';

const API_URL = '/qs/table/createnewtable';

export const useCreateNewTablePage = (
  newTableData: TablePageSetting | null, 
  onUpdateCreateNew: any,   
  appId?: string | undefined) => {
  let sColumnsString:any = newTableData && newTableData.sVisibility;
  let sColumnsStringify = String(sColumnsString);
  const params = appId ? { appId: appId } : {};
  useEffect(() => {
    if (params && newTableData) {  
      axios &&
        axios
          .post(API_URL, {
              //version: '1.6.0',
              NewTableInputs: {
              name:newTableData.name,
              sAppId:newTableData.sAppId,
              sTableName:newTableData.sTableName,
              sDescription:newTableData.sDescription,
              sVisibility:sColumnsStringify,
              sColumns: newTableData.sColumns,
            }
          },
          {
            headers: {
              params: params,
            },
          })
          .then((response: any) => {
            if (response.success) {
              notification.success({
                message: 'success',
                description: response.message,
                duration: 2.50,                
              },
              //{success: success,     stackTrace: stackTrace,     value: value}
              )}else{
                notification.error({
                  message: response.message,
                  description: response.message || 'Something went wrong. Please try again later...',
                  duration: 2.50,
                  
                },
                )} 
          })
          .then(() => {
            if (onUpdateCreateNew) {
              onUpdateCreateNew();
            }
            
          })
          .catch(e => console.log(e));
    }
  }, [newTableData]);

  return [];
};



export const useCreateNewTableConfigrationPage = (newTableData: TablePageSetting | null, createNewTableUpdate?: any, appId?: string | undefined) => {
  const params = appId ? { appId: appId } : {};
  let sColumnsString:any = newTableData && newTableData.sVisibility;
  let sColumnsStringify = String(sColumnsString)
  useEffect(() => {
    if (appId && newTableData) {
      axios &&
        axios
          .post(
            API_URL,{
              //version: '1.6.0',
              NewTableInputs: {
                name:newTableData.name,
                sAppId:newTableData.sAppId,
                sTableName:newTableData.sTableName,
                sDescription:newTableData.sDescription,
                sVisibility:sColumnsStringify,
                sColumns: newTableData.sColumns,    
              }},
            {
              params: params,
            })
            .then((response: any) => {
              if (response.success) {
                notification.success({
                  message: 'success',
                  description: response.message,
                  duration: 2.50,                  
                },
                //{success: success,     stackTrace: stackTrace,     value: value}
                )}else{
                  notification.error({
                    message: response.message,
                    description: response.message || 'Something went wrong. Please try again later...',
                    duration: 2.50,                    
                  },
                  )} 
            })
          .then(() => {
            if (createNewTableUpdate) {
              createNewTableUpdate();
            }
          })
          .catch(e => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTableData]);
  return [];
};

