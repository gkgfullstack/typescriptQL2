import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

export const useCreateMatchAttributeMap = (matchAttributeMaps: any[] | null, onUpdate?: any) => {
  const API_URL = '/oc/matchattribute/matchattributemap/add';

  useEffect(() => {
    if (matchAttributeMaps && matchAttributeMaps.length > 0) {
      matchAttributeMaps.forEach((matchAttributeMap: any, index: number) => {
        axios &&
          axios
            .post(API_URL, {
              version: 'v1',
              request: {
                matchAttributeMap: matchAttributeMap,
              },
            })
            .then(() => {
              if (onUpdate && index === matchAttributeMaps.length - 1) {
                onUpdate();
              }
            })
            .catch(e => console.log(e));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchAttributeMaps]);

  return [];
};

export const useGetMatchAttributeOwners = (matchAttributeId: string | undefined) => {
  const API_URL = '/oc/matchattribute/matchcategory/owners';
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (matchAttributeId) {
      axios &&
        axios
          .get(API_URL, {
            params: {
              matchAttributeId: matchAttributeId,
            },
          })
          .then((response: any) => {
            if (response && response.matchCategoryOwnersResponse) {
              setOptions(response.matchCategoryOwnersResponse.owners);
            } else {
              setOptions([]);
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
  }, [matchAttributeId, setOptions]);

  return [options];
};

const transformData = (data: any) => {
  return data.map((item: string) => {
    return {
      name: item,
    };
  });
};

export const useGetMatchAttributeLocations = () => {
  const API_URL = '/oc/matchattribute/retrieve/locations';
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios &&
      axios
        .get(API_URL)
        .then((response: any) => {
          if (response && response.matchAttributeLocationResponse) {
            setOptions(transformData(response.matchAttributeLocationResponse.locations));
          } else {
            setOptions([]);
          }
        })
        .catch(error => {
          console.log(error);
        });
  }, []);

  return [options];
};

export const useGetRawAttributeNames = (location: string, rawAttributeNamesRequest: any) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (location && rawAttributeNamesRequest) {
      axios &&
        axios
          .post(`/oc/matchattribute/${location}/rawattributenames`, {
            version: 'v1',
            request: rawAttributeNamesRequest,
          })
          .then((response: any) => {
            if (response) {
              setOptions(transformData(response.rawAttributeNamesResponse.rawAttributeNames));
            } else {
              setOptions([]);
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
  }, [location, rawAttributeNamesRequest]);

  return [options];
};

export const useDeleteMatchAttributeMap = (
  deletedMatchAttributeMapIds: string,
  setDeletedMatchAttributeMapIds: any,
  onUpdate?: any
) => {
  useEffect(() => {
    if (deletedMatchAttributeMapIds) {
      axios &&
        axios
          .delete(`/oc/matchattribute/matchattributemap/deletebatch`, {
            params: {
              ids: deletedMatchAttributeMapIds,
            },
          })
          .then(() => {
            const deletedMapsCount = deletedMatchAttributeMapIds.split(',').length;
            onUpdate(deletedMapsCount);
            setDeletedMatchAttributeMapIds('');
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMatchAttributeMapIds]);

  return [];
};
