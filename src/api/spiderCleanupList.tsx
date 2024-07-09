import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';
import moment from 'moment';

type SpiderCleanupListRequest = {
  verticalName: string;
  ownerId: string;
  status?: string;
  offset?: number;
  sortingColumn?: string;
  sortingOrder?: string;
};

export const useGetSpiderCleanupList = (params: SpiderCleanupListRequest | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [totalCategoriesCount, setTotalCategoriesCount] = useState<number>(0);
  const [newCategoriesCount, setNewCategoriesCount] = useState<number>(0);
  const [deletedCategoriesCount, setDeletedCategoriesCount] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<any>([]);

  useEffect(() => {
    if (params && params.verticalName && params.ownerId) {
      setLoading(true);
      axios &&
        axios
          .get(`/oc/category/cleanup`, {
            params: {
              ...params,
              verticalName: params.verticalName,
            },
          })
          .then((response: any) => {
            if (response) {
              setCategoryList(response.categoryCleanupResponse.categoryCleanup);
              setTotalRecords(response.categoryCleanupResponse.totalCount);
              setTotalCategoriesCount(response.categoryCleanupResponse.totalCategoriesCount);
              setNewCategoriesCount(response.categoryCleanupResponse.newCategoriesCount);
              setDeletedCategoriesCount(response.categoryCleanupResponse.deletedCategoriesCount);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setCategoryList([]);
      setTotalRecords(0);
      setTotalCategoriesCount(0);
      setNewCategoriesCount(0);
      setDeletedCategoriesCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [loading, totalRecords, categoryList, totalCategoriesCount, newCategoriesCount, deletedCategoriesCount];
};

export const useDeleteCategoryFromSpider = (
  schema: string | undefined,
  site: string | undefined,
  isCleanUp: boolean,
  setCleanUp: any,
  onUpdate?: any
) => {
  useEffect(() => {
    if (isCleanUp && schema && site) {
      axios &&
        axios
          .delete('/oc/category/cleanup', {
            params: {
              verticalName: schema,
              ownerId: site,
            },
          })
          .then(() => {
            onUpdate();
            setCleanUp(false);
          })
          .catch(() => {
            onUpdate();
            setCleanUp(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCleanUp, schema, site]);

  return [];
};

const getExportFile = (data: any, name: string) => {
  const a = document.createElement('a');
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' });
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
};

const getAsyncResponse = (fileName: string, location: string, step: number, setLoading: any) => {
  axios.get(`/oc/async?asyncUrl=${location}`).then(res => {
    if (res) {
      getExportFile(res, fileName);
      setLoading(false);
    } else if (step < 2) {
      step = step + 1;
      setTimeout(() => {
        getAsyncResponse(fileName, location, step, setLoading);
      }, 1000);
    } else {
      setLoading(false);
    }
  });
};

export const useExportSpiderCleanup = (
  params: SpiderCleanupListRequest | null,
  isExport: boolean,
  setExport: any,
  setFile: any
) => {
  const [exportLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isExport && params && params.verticalName && params.ownerId) {
      setLoading(true);
      setFile({});
      axios &&
        axios
          .get(`/oc/category/cleanup/export?asynch=true`, {
            params,
          })
          .then((response: any) => {
            const fileName = `spider_cleanup_results_${moment().format('YYYY-MM-DD hh:mm:ss')}.csv`;
            setExport(false);

            if (typeof response === 'string') {
              getExportFile(response, fileName);
              setLoading(false);
            }

            if (response && response.headers && response.headers.location) {
              setFile({
                url: response.headers.location,
                name: fileName,
              });
              getAsyncResponse(fileName, response.headers.location, 0, setLoading);
            }
          })
          .catch(() => {
            setLoading(false);
            setExport(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExport, params]);

  return [exportLoading];
};
