import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';
import moment from 'moment';

type ShallowCleanupListRequest = {
  verticalName?: string;
  siteIds?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  pagesize?: number;
  pagestart?: number;
  sortingcolumn?: string;
  sortingorder?: string;
};

const transformParams = (params: ShallowCleanupListRequest | null) => {
  const { dateRange, ...newParams }: any = params;

  return {
    ...newParams,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  };
};

export const useGetShallowCleanupList = (params: ShallowCleanupListRequest | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [productList, setProductList] = useState<any>([]);

  useEffect(() => {
    if (params && params.verticalName && params.dateRange) {
      setLoading(true);
      axios &&
        axios
          .get('/oc/owner/cleanup', {
            params: transformParams(params),
          })
          .then((response: any) => {
            if (response) {
              setProductList(response.ownerCleanupResponse.ownerCleanups);
              setTotalRecords(response.ownerCleanupResponse.totalCount);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [loading, totalRecords, productList];
};

export const useDeleteProductFromShallow = (
  params: ShallowCleanupListRequest | null,
  productList: any[],
  setDeletedProductList: any,
  onUpdate?: any
) => {
  useEffect(() => {
    if (productList.length > 0 && params && params.verticalName && params.dateRange) {
      axios &&
        axios
          .delete('/oc/owner/cleanup?', {
            params: {
              verticalName: params.verticalName,
              startDate: params.dateRange.startDate,
              endDate: params.dateRange.endDate,
            },
            data: {
              version: 'v1',
              request: {
                ids: productList,
              },
            },
          })
          .then(() => {
            setDeletedProductList([]);
            onUpdate(productList.length);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, productList]);

  return [];
};

const getExportFile = (data: any, name: string) => {
  const a = document.createElement('a');
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' });
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
};

export const useExportShallowCleanup = (
  params: ShallowCleanupListRequest | null,
  isExport: boolean,
  setExport: any
) => {
  const [exportLoading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);

  useEffect(() => {
    if (isExport && params && params.verticalName && params.dateRange) {
      setLoading(true);
      setFile({});
      axios &&
        axios
          .get(`/oc/owner/cleanup/export?asynch=true`, {
            params: {
              siteIds: params.siteIds,
              verticalName: params.verticalName,
              startDate: params.dateRange.startDate,
              endDate: params.dateRange.endDate,
            },
          })
          .then((response: any) => {
            const fileName = `shallow_cleanup_results_${moment().format('YYYY-MM-DD')}.csv`;
            setLoading(false);
            setExport(false);
            if (typeof response === 'string') {
              getExportFile(response, fileName);
            }
            if (response && response.headers && response.headers.location) {
              setFile({
                url: response.headers.location,
                name: fileName,
              });
              axios.get(`/oc/async?asyncUrl=${response.headers.location}`).then(res => {
                getExportFile(res, fileName);
              });
            }
          })
          .catch(() => {
            setLoading(false);
            setExport(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExport, params]);

  return [exportLoading, file];
};
