import { useEffect, useState } from 'react';
import axios from './axiosInstances/privateAxiosInstance';

export const useCreateMatchAttribute = (matchAttribute: any | null, onUpdate: any) => {
  const API_URL = '/oc/matchattribute/add';

  useEffect(() => {
    if (matchAttribute) {
      axios &&
        axios
          .post(API_URL, {
            version: '1.6.0',
            request: {
              matchAttribute: matchAttribute,
            },
          })
          .then(() => {
            onUpdate();
          })
          .catch(e => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchAttribute]);

  return [];
};

export const useGetMatchAttributeList = (params: any) => {
  const API_URL = '/oc/matchattribute/retrieveall';
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [matchAttributeList, setMatchAttributeList] = useState<any>([]);

  useEffect(() => {
    if (params) {
      setLoading(true);
      axios &&
        axios
          .get(API_URL, {
            params: {
              ...params,
            },
          })
          .then((response: any) => {
            if (response) {
              setMatchAttributeList(response.matchAttributeResponse.matchAttribute);
              setTotalRecords(response.matchAttributeResponse.totalCount);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setMatchAttributeList([]);
      setTotalRecords(0);
    }
  }, [params]);

  return [loading, totalRecords, matchAttributeList];
};

const transformMatchAttributeDetail = (response: any) => {
  return response.matchAttributeDetail.map((details: any) => {
    details.matchAttributeName = response.matchAttributeDetailsCommonInfo.matchAttributeName;
    return details;
  });
};

export const useGetMatchAttributeDetails = (matchAttributeId: string | undefined, params: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [matchAttributeDetailsList, setMatchAttributeDetailsList] = useState<any>([]);

  useEffect(() => {
    if (matchAttributeId && params && params.sortingcolumn) {
      setLoading(true);
      axios &&
        axios
          .get(`/oc/matchattribute/retrieve/${matchAttributeId}/details`, {
            params: params,
          })
          .then((response: any) => {
            if (response) {
              setMatchAttributeDetailsList(transformMatchAttributeDetail(response.matchAttributeDetailsResponse));
              setTotalRecords(response.matchAttributeDetailsResponse.totalCount);
            }
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          });
    }
  }, [matchAttributeId, params, setMatchAttributeDetailsList]);

  return [loading, totalRecords, matchAttributeDetailsList];
};

export const useDeleteMatchAttribute = (
  deletedMatchAttribute: string,
  setDeletedMatchAttribute: any,
  onUpdate?: any
) => {
  useEffect(() => {
    if (deletedMatchAttribute) {
      axios &&
        axios
          .delete(`/oc/matchattribute/deletebatch`, {
            params: {
              ids: deletedMatchAttribute,
            },
          })
          .then(() => {
            onUpdate(1);
            setDeletedMatchAttribute('');
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMatchAttribute]);

  return [];
};
