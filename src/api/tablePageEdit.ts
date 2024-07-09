import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
const MESSAGE_DURATION = 200;
export const useTablePageEidtGetList = (params: any) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [metadataList, setMetadatList] = useState<any>([]);
  var getId = params && params.id
  useEffect(() => {
    if (getId) {
      setLoading(true);
      axios &&
        axios
          .get(`/qs/table/edittable?tableId=${getId}`, {
            
          })
          .then((response: any) => {
           if (response.status === true) {
            setTimeout(() => {
              const redirectUrl = '/settings/tablePage';
              history.replace(redirectUrl);
              history.go(0);
            }, MESSAGE_DURATION);
            }
            if (response) {
              setMetadatList(response);
            }
            setLoading(false);
          })         
          .catch(() => {
            setLoading(false);
          });
    }
  }, [params]);

  return [loading, metadataList];
};

export const useDeleteTable = (deletedMatchCategory: string, setDeletedMatchCategory: any, onUpdateDeleted:any) => {
  const history = useHistory();
  useEffect(() => {
    if (deletedMatchCategory) {
      axios &&
        axios
          .get(`/qs/table/deletetable`, {
            params: {
              tableId: deletedMatchCategory,
            },
          })
          .then((response:any) => {
          if (response.success === true) {
            setTimeout(() => {
              const redirectUrl = '/settings/tablePage';
              history.replace(redirectUrl);
              history.go(0);
            }, MESSAGE_DURATION);
            }
            //onUpdate(1);
            setDeletedMatchCategory('');
          
            if (response.success === true ) {
                
              notification.success({
                message: response.message,
                description: response.message,
                duration: 2.50,                  
              },)
             
            }else{
                notification.error({
                  message: response.message,
                  description: response.message,
                  duration: 2.50,                    
                },
                )}
               
          })
          .then(() => {
            if (onUpdateDeleted) {
              onUpdateDeleted();
            }
            
          })
          .catch(e => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMatchCategory]);

  return [];
};

export const useAuditTable = (auditTablesss: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [auditTable, setAuditTable] = useState<any>([]);
  useEffect(() => {
    if (auditTablesss?.id) {
      setLoading(true);
      axios &&
        axios
          .get(`/qs/table/audittable?tableId=${auditTablesss?.id}`, {
            
          })
          .then((response: any) => {
            if (response) {
              setAuditTable(response)
            }           
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    }
  }, [auditTablesss?.id]);

  return [loading, auditTable];
};

