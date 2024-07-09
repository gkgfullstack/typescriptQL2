import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';
import MetadataInfo from 'src/types/MetadataInfo';

export const useGetSiteMetadataList = (params: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [metadataList, setMetadatList] = useState<any>([]);

  useEffect(() => {
    if (params && params.siteId) {
      setLoading(true);
      axios &&
        axios
          .get(`/oc/metadata/retrieveowner/${params.siteId}`, {
            params: {
              pagesize: params.pagesize,
              pagestart: params.pagestart,
              sortingcolumn: params.sortingcolumn,
              sortingorder: params.sortingorder,
              verticalName: params.verticalName,
            },
          })
          .then((response: any) => {
            if (response) {
              setTotalRecords(response.metadataResponse.size);
              setMetadatList(response.metadataResponse.metadata);
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    }
  }, [params]);

  return [loading, totalRecords, metadataList];
};

export const useEditSiteMetadata = (editedMetadata: MetadataInfo, onUpdate: any, schema: string | undefined) => {
  const params = schema
    ? {
        verticalName: schema,
      }
    : {};
  useEffect(() => {
    if (editedMetadata) {
      axios &&
        axios
          .post(
            '/oc/metadata/add',
            {
              request: {
                MetadataRequest: editedMetadata,
              },
            },
            {
              params: params,
            }
          )
          .then((response: any) => {
            if (response) {
              onUpdate();
            }
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedMetadata]);

  return [];
};

export const useDeleteMetadata = (
  schema: string | undefined,
  metadataIds: string,
  setDeletedId: any,
  onUpdate?: any
) => {
  useEffect(() => {
    if (schema && metadataIds) {
      axios &&
        axios
          .delete(`/oc/metadata/deletebatch`, {
            params: {
              verticalName: schema,
              ids: metadataIds,
            },
          })
          .then(() => {
            onUpdate();
            setDeletedId('');
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadataIds]);

  return [];
};
