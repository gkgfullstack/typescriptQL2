import { useEffect, useState } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import moment from 'moment';

export const useGetSKUStatistics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [SKUStatistics, setSKUStatistics] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    axios &&
      axios
        .get(`/qm/product/skus/totals`)
        .then((response: any) => {
          setLoading(false);
          if (response && response.skusTotals) {
            setSKUStatistics(response.skusTotals);
          }
        })
        .catch(() => {
          setLoading(false);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [loading, SKUStatistics];
};

export const useGetSKUList = (params: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [SKUList, setSKUList] = useState<any>([]);

  useEffect(() => {
    if (params) {
      setLoading(true);
      axios &&
        axios
          .get(`/qm/product/skus`, {
            params,
          })
          .then((response: any) => {
            setLoading(false);
            if (response && response.skuList) {
              setTotalRecords(Number(response.totalRecords));
              setSKUList(response.skuList);
            }
          })
          .catch(() => {
            setLoading(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [loading, totalRecords, SKUList];
};

const getExportFile = (data: any, name: string) => {
  const a = document.createElement('a');
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' });
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
};

export const useExportSKU = (params: any, isExport: boolean, setExport: any) => {
  const [exportLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isExport && params) {
      setLoading(true);
      axios &&
        axios
          .get(`/qm/product/skus/export?asynch=true`, {
            params: {
              name: params.name,
              status: params.status,
            },
          })
          .then((response: any) => {
            const fileName = `sku_${moment().format('YYYY-MM-DD')}.csv`;
            setLoading(false);
            setExport(false);
            if (typeof response === 'string') {
              getExportFile(response, fileName);
            }
            if (response && response.headers && response.headers.location) {
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

  return [exportLoading];
};
