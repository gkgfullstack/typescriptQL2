import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import auth from 'src/services/auth';

type ProductCleanupListRequest = {
  verticalName?: string;
  siteId?: string;
  siteFingerprintId?: string;
  manufacturersAreEqual?: string;
  pagesize?: number;
  pagestart?: number;
  sortingcolumn?: string;
  sortingorder?: string;
};

const transformParams = (params: ProductCleanupListRequest | null) => {
  const { ...newParams }: any = params;
  return {
    ...newParams,
  };
};

const transformData = (data: any) => {
  const array: any = [];

  data.forEach((item: any) => {
    array.push(
      {
        isDuplicate: true,
        duplicatedProduct: item.duplicatedProduct,
        originalProduct: item.originalProduct,
        ...item.duplicatedProduct,
      },
      { duplicatedProduct: item.duplicatedProduct, originalProduct: item.originalProduct, ...item.originalProduct }
    );
  });

  return array;
};

const showNotification = (response: any) => {
  const message: string =
    response && response.responseHeader
      ? response.responseHeader.statusMessage
      : 'Something went wrong. Please try again later...';
  notification.error({
    message: 'An error occurred.',
    description: message,
    duration: 0,
  });
};

export const useGetProductCleanupList = (params: ProductCleanupListRequest | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [productList, setProductList] = useState<any>([]);

  useEffect(() => {
    if (params && params.verticalName && params.siteId && params.siteFingerprintId) {
      setLoading(true);
      axios &&
        axios
          .get('/oc/product/retrieveduplicates', {
            params: transformParams(params),
          })
          .then((response: any) => {
            if (response && response.retrieveDuplicateProductsResponse) {
              setProductList(transformData(response.retrieveDuplicateProductsResponse.duplicates.duplicate));
              setTotalRecords(response.retrieveDuplicateProductsResponse.totalCount);
            } else {
              setProductList([]);
              setTotalRecords(0);
              showNotification(response);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setProductList([]);
      setTotalRecords(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [loading, totalRecords, productList];
};

export const useMergeProducts = (
  params: ProductCleanupListRequest | null,
  productList: any[],
  setMergeProductList: any,
  onUpdate?: any,
  setRequestLoading?: any
) => {
  useEffect(() => {
    if (productList.length > 0 && params && params.verticalName) {
      setRequestLoading(true);
      axios &&
        axios
          .put(
            '/oc/product/mergeduplicates',
            {
              version: 'v1',
              request: {
                duplicatedProductInfo: {
                  duplicates: productList,
                },
              },
            },
            {
              params: {
                verticalName: params.verticalName,
              },
            }
          )
          .then(() => {
            setRequestLoading(false);
            setMergeProductList([]);
            onUpdate(productList.length);
          })
          .catch(() => {
            setRequestLoading(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, productList]);

  return [];
};

export const useMergeAll = (
  isMergeAll: boolean,
  setMergedAll: any,
  params: ProductCleanupListRequest | null,
  setRequestParams: any,
  setRequestLoading?: any
) => {
  useEffect(() => {
    const userId = auth.getUserId();
    if (isMergeAll && params && params.verticalName) {
      setRequestLoading(true);
      setMergedAll(false);
      axios &&
        axios
          .put(
            `/oc/product/mergeduplicates/all?asynch=true`,
            {},
            {
              headers: {
                userId: userId,
              },
              params: {
                siteFingerprintId: params.siteFingerprintId,
                siteId: params.siteId,
                verticalName: params.verticalName,
                manufacturersAreEqual: params.manufacturersAreEqual,
              },
            }
          )
          .then((response: any) => {
            if (response && response.headers && response.headers.location) {
              axios
                .get(`/oc/async?asyncUrl=${response.headers.location}`, {
                  headers: {
                    userId: userId,
                  },
                })
                .then(() => {
                  setRequestLoading(false);
                  setRequestParams({
                    ...params,
                    pagestart: 0,
                  });
                });
            } else {
              setRequestLoading(false);
              setRequestParams({
                ...params,
                pagestart: 0,
              });
            }
          })
          .catch(() => {
            setRequestLoading(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMergeAll, params]);

  return [];
};

export const useDifferentiateProducts = (
  params: ProductCleanupListRequest | null,
  productList: any[],
  setDifferentiateProductList: any,
  onUpdate?: any,
  setRequestLoading?: any
) => {
  useEffect(() => {
    if (productList.length > 0 && params && params.verticalName) {
      setRequestLoading(true);
      axios &&
        axios
          .post(
            '/oc/product/ignoreduplicates',
            {
              version: 'v1',
              request: {
                duplicatedProductInfo: {
                  duplicates: productList,
                },
              },
            },
            {
              params: {
                verticalName: params.verticalName,
              },
            }
          )
          .then(() => {
            setRequestLoading(false);
            setDifferentiateProductList([]);
            onUpdate(productList.length);
          })
          .catch(() => {
            setRequestLoading(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, productList]);

  return [];
};

export const useDifferentiateAll = (
  isDifferentiateAll: boolean,
  setDifferentiatedAll: any,
  params: ProductCleanupListRequest | null,
  setRequestParams: any,
  setRequestLoading?: any
) => {
  useEffect(() => {
    if (isDifferentiateAll && params && params.verticalName) {
      setRequestLoading(true);
      setDifferentiatedAll(false);
      axios &&
        axios
          .post(
            `/oc/product/ignoreduplicates/all`,
            {},
            {
              params: {
                siteFingerprintId: params.siteFingerprintId,
                siteId: params.siteId,
                verticalName: params.verticalName,
                manufacturersAreEqual: params.manufacturersAreEqual,
              },
            }
          )
          .then(() => {
            setRequestLoading(false);
            setRequestParams({
              ...params,
              pagestart: 0,
            });
          })
          .catch(() => {
            setRequestLoading(false);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDifferentiateAll, params]);

  return [];
};
