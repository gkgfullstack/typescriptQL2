import axios from './axiosInstances/privateAxiosInstance';
import FingerprintInfo from 'src/types/FingerprintInfo';
import { useEffect, useState } from 'react';

const API_URL = '/oc/sitefingerprint/retrieveall';

export const useGetFingerPrint = (schema: string | undefined, siteId: string | undefined) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (schema && siteId) {
      axios &&
        axios
          .get(API_URL, {
            params: {
              siteId: siteId,
              verticalName: schema,
            },
          })
          .then((response: any) => {
            if (response && response.siteFingerprintResponse) {
              setOptions(response.siteFingerprintResponse.siteFingerprint);
            } else {
              setOptions([]);
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
  }, [schema, siteId, setOptions]);

  return [options];
};

export const useGetFingerPrintList = (params: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [fingerprintList, setFingerprintList] = useState<any>([]);

  useEffect(() => {
    if (params && params.siteId && params.schema) {
      setLoading(true);
      axios &&
        axios
          .get('/oc/sitefingerprint/retrieveall', {
            params: {
              siteId: params.siteId,
              verticalName: params.schema,
              pagestart: params.pagestart ? params.pagestart : 0,
              pagesize: params.pagesize ? params.pagesize : '',
            },
          })
          .then((response: any) => {
            if (response) {
              setTotalRecords(response.siteFingerprintResponse.totalCount);
              setFingerprintList(response.siteFingerprintResponse.siteFingerprint);
            }
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
            setLoading(false);
          });
    }
  }, [params]);

  return [loading, totalRecords, fingerprintList];
};

export const useGetFingerprint = (
  isEdited: boolean,
  siteId: string | undefined,
  schema: string | undefined,
  setEdited: any
) => {
  const [fingerprint, setFingerprint] = useState<any>(undefined);

  useEffect(() => {
    if (isEdited && siteId && schema) {
      setEdited(true);
      axios &&
        axios
          .get(`/oc/sitefingerprint/retrieve/${siteId}`, {
            params: {
              verticalName: schema,
            },
          })
          .then((response: any) => {
            if (response) {
              setFingerprint(response.siteFingerprintResponse.siteFingerprint[0]);
            }
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdited, schema, siteId]);

  return [fingerprint];
};

export const useEditFingerprint = (
  schema: string | undefined,
  editedFingerprint: FingerprintInfo,
  onUpdate: () => void
) => {
  useEffect(() => {
    if (schema && editedFingerprint) {
      axios &&
        axios
          .post(
            '/oc/sitefingerprint/add',
            {
              request: {
                siteFingerprint: editedFingerprint,
              },
            },
            {
              params: {
                verticalName: schema,
              },
            }
          )
          .then((response: any) => {
            if (response) {
              onUpdate();
            }
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema, editedFingerprint]);

  return [];
};

export const useDeleteFingerprint = (
  schema: string | undefined,
  fingerprintList: any[],
  setDeletedList: any,
  onUpdate?: any
) => {
  useEffect(() => {
    if (schema && fingerprintList.length > 0) {
      axios &&
        axios
          .delete(`/oc/sitefingerprint/delete`, {
            params: {
              verticalName: schema,
            },
            data: {
              version: 'v1',
              request: {
                ids: fingerprintList,
              },
            },
          })
          .then(() => {
            onUpdate();
            setDeletedList([]);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprintList]);

  return [];
};
