import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from "react";
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
const MESSAGE_DURATION = 200;

const API_URL = '/qs/table/tablelist';

type TablePageListRequest = {
  appId: string;
  pagesize?: number;
  offset?: number;
  sortingcolumn?: string;
  sortingorder?: string;
};

export const useGetTablePageList = (params?: TablePageListRequest | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [tablesListss, setTablesListss] = useState<any>([]);
let  bAdminMode:boolean=false;
  let input = localStorage.getItem("bAdminMode");
  bAdminMode = (input === 'true');
  useEffect(() => {
    if (params) {
      setLoading(true);
      axios && axios.get(API_URL, {
        params: {...params, adminEnabled: bAdminMode},
      })
        .then((response: any) => {
          if (response) {
            setTablesListss(response.tablesList);
            setTotalRecords(response.totalRecords);
          }
          setLoading(false);
        })

        .catch(() => {
          setLoading(false);
        })
    } else {
      setTablesListss([]);
      setTotalRecords(0);
    }
  }, [params]);

  return [loading, totalRecords, tablesListss];
};
export const useDownloadTableRow = (downloadTableRowData: any, setDownloadTableRow: any, setDownloadTableRowwwwURL: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (downloadTableRowData) {
      setLoading(true);
      axios &&
        axios
          .get(`/qs/table/edittable?tableId=${downloadTableRowData}`, {

          })
          .then((response: any) => {
            setDownloadTableRow(downloadTableRowData)
            setDownloadTableRowwwwURL(response.table?.downloadUrl)
            if (response) {
              setDownloadTableRow(downloadTableRowData)
              setDownloadTableRowwwwURL(response.table?.downloadUrl)
            }

            setLoading(false);
          })

          .catch(() => {
            setLoading(false);
          });
    }
  }, [downloadTableRowData]);

  return [loading];
};

export const useClearUpdateTableRow = (clearTableEdit: any, setClearTableEdit: any, onUpdateClear: any) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (clearTableEdit) {
      setLoading(true);
      axios &&
        axios
          .get(`/qs/table/cleartable?tableId=${clearTableEdit}`, {

          })
          .then((response: any) => {
             setClearTableEdit(clearTableEdit)
             if (response.success === true) {
              setTimeout(() => {
                const redirectUrl = '/settings/tablePage';
                history.replace(redirectUrl);
                history.go(0);
              }, MESSAGE_DURATION);
            }
            if (response.success === true) {

              notification.success({
                message: response.message,
                description: response.message,
                duration: 2.50,
              })

            } else {
              notification.error({
                message: response.message,
                description: response.message || 'Something went wrong. Please try again later...',
                duration: 2.50,
              },
              )
            }
            setLoading(false);
          })

          .then(() => {
            if (onUpdateClear) {
              onUpdateClear();
            }

          })
          .catch(() => {
            setLoading(false);
          });
    }
  }, [clearTableEdit]);

  return [loading];
};




