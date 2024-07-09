import { notification } from 'antd';
import { useEffect, useState } from 'react';
import EditTablePageSetting from 'src/types/EditTablePageSetting';
import axios from './axiosInstances/privateAxiosInstance';
import { useHistory } from 'react-router-dom';
const MESSAGE_DURATION = 200;

const API_URL = '/qs/table/updatetable';

export const useEditTablePostFetch = (editTableData: EditTablePageSetting | null, editTableUpdate:any, setVisible:any) => {
  const history = useHistory();
 useEffect(() => {
    if (editTableData) {
      axios &&
        axios
          .post(API_URL, {          
              UpdateTableInputs: {
                tableId:editTableData.tableId,
                name: editTableData.name,
                desc: editTableData.desc,
                columns: editTableData.columns,
                sharedEdit: editTableData.sharedEdit,
                visibility:editTableData.visibility,
              }})
          .then((response: any) => {
          if (response.status === "success") {
            setTimeout(() => {
              const redirectUrl = '/settings/tablePage';
              history.replace(redirectUrl);
              history.go(0);
            }, MESSAGE_DURATION);
            }
            if (response.status) {
              notification.success({
                message: 'success',
                description: response.message,
                duration: 2,
              })
              setVisible(false)
            } else {
              notification.error({
                message: response.message,
                description: response.message || 'Something went wrong. Please try again later...',
                duration: 2,
              },
              )}
            
          })
          .then(() => {
            if (editTableUpdate) {
              editTableUpdate();
            } 
          })                  
          .catch(e => console.log(e));
    }
    
  }, [editTableData, editTableUpdate, setVisible]);

  return [];
};


export const useEditTableUpdatePostFetch = (editTableData: EditTablePageSetting | null,  editTableUpdatesData?: any) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    if (editTableData) {
      axios &&
        axios
          .post(API_URL, {
            UpdateTableInputs: {
              tableId:editTableData.tableId,
              name: editTableData.name,
              desc: editTableData.desc,
              columns: editTableData.columns,
              sharedEdit: editTableData.sharedEdit,
              visibility: editTableData.visibility,
            }
          })
          .then((response: any) => {
            setTimeout(() => {
              const redirectUrl = '/settings/tablePage';
              history.replace(redirectUrl);
              history.go(0);
            }, MESSAGE_DURATION);
            if (response.status) {
              notification.success({
                message: 'success',
                description: response.message,
                duration: 2,
              })
            } else {
              notification.error({
                message: response.message,
                description: response.message || 'Something went wrong. Please try again later...',
                duration: 2,

              })}
              setLoading(false);
          })
          .then(() => {
            if (editTableUpdatesData) {
              editTableUpdatesData();
            }

          })
          .catch(() => {
            setLoading(false);
          });
    }
  }, []);

  return [loading];
};



