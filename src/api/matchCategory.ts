import { useEffect, useState } from 'react';
import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/oc/matchcategory/add';

export const useCreateMatchCategory = (matchCategory: any | null, onUpdate: any) => {
  useEffect(() => {
    if (matchCategory) {
      axios &&
        axios
          .post(API_URL, {
            version: '1.6.0',
            request: {
              matchCategory: matchCategory,
            },
          })
          .then(() => {
            onUpdate();
          })
          .catch(e => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchCategory]);

  return [];
};

export const useGetMatchCategoryList = (params: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [matchCategoryList, setMatchCategoryList] = useState<any>([]);

  useEffect(() => {
    if (params) {
      setLoading(true);
      axios &&
        axios
          .get('/oc/matchcategory/retrieveall', {
            params: params,
          })
          .then((response: any) => {
            if (response) {
              setMatchCategoryList(response.matchCategoryResponse.matchCategory);
              setTotalRecords(response.matchCategoryResponse.totalCount);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setMatchCategoryList([]);
      setTotalRecords(0);
    }
  }, [params]);

  return [loading, totalRecords, matchCategoryList];
};

export const useGetMatchCategory = () => {
  const [matchCategoryOptions, setMatchCategoryOptions] = useState([]);

  useEffect(() => {
    axios &&
      axios
        .get('/oc/matchcategory/retrieveall', {
          params: {
            sortingcolumn: 'name',
            sortingorder: 'asc',
            pagestart: 0,
          },
        })
        .then((response: any) => {
          setMatchCategoryOptions(response.matchCategoryResponse.matchCategory);
        })
        .catch(error => {
          console.log(error);
        });
  }, [setMatchCategoryOptions]);

  return [matchCategoryOptions];
};

export const useDeleteMatchCategory = (deletedMatchCategory: string, setDeletedMatchCategory: any, onUpdate?: any) => {
  useEffect(() => {
    if (deletedMatchCategory) {
      axios &&
        axios
          .delete(`/oc/matchcategory/deletebatch`, {
            params: {
              ids: deletedMatchCategory,
            },
          })
          .then(() => {
            onUpdate(1);
            setDeletedMatchCategory('');
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMatchCategory]);

  return [];
};