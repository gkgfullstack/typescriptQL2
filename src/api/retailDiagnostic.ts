import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

type MaxRunsFilter = {
  search: string;
  verticalNames?: any;
  owners?: any;
};

type SpiderCleanupListRequest = {
  pagestart?: string;
  pagesize?: string;
  sortingColumn?: string;
  sortingOrder?: string;
};

export const useGetMaxRunsList = (
  maxRunsFilter: MaxRunsFilter | null,
  params: SpiderCleanupListRequest | null,
  setLoading: any
) => {
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [maxRunList, setMaxRunList] = useState<any>([]);
  const [statistic, setStatistic] = useState<any>({
    cleansedRunCount: 0,
    remainingRunCount: 0,
    totalCount: 0,
  });

  useEffect(() => {
    if (maxRunsFilter && params) {
      setLoading(true);
      axios &&
        axios
          .post(
            `/oc/collectiongroup/maxruns`,
            {
              version: 'v1',
              request: {
                maxRunsFilter: maxRunsFilter,
              },
            },
            {
              params: {
                ...params,
              },
            }
          )
          .then((response: any) => {
            if (response) {
              setMaxRunList(response.maxRunsResponse.maxRuns);
              setTotalRecords(response.maxRunsResponse.totalCount);
              setStatistic({
                cleansedRunCount: response.maxRunsResponse.statistics.cleansed,
                remainingRunCount: response.maxRunsResponse.statistics.remaining,
                totalCount: response.maxRunsResponse.statistics.cleansedAndRemaining,
              });
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setMaxRunList([]);
      setTotalRecords(0);
      setStatistic({
        cleansedRunCount: 0,
        remainingRunCount: 0,
        totalCount: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxRunsFilter, params]);

  return [totalRecords, maxRunList, statistic];
};

export const useDeleteMaxRun = (
  schema: string | undefined,
  deleteGroupId: string | undefined,
  setDeleteGroupId: any,
  onUpdate?: any
) => {
  useEffect(() => {
    if (schema && deleteGroupId) {
      axios &&
        axios
          .delete(`/oc/collectiongroup/${deleteGroupId}/delete`, {
            params: {
              verticalName: schema,
            },
          })
          .then(() => {
            setDeleteGroupId('');
            onUpdate();
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema, deleteGroupId]);

  return [];
};

const getSchemas = (updatedGroup: any) => {
  const schemas: any = [];

  updatedGroup.forEach((item: any) => {
    if (schemas.indexOf(item.schemaName) === -1) {
      schemas.push(item.schemaName);
    }
  });

  return schemas;
};

const getCollectionGroups = (updatedGroup: any, schema: string) => {
  return updatedGroup
    .filter((item: any) => item.schemaName === schema)
    .map((item: any) => {
      // eslint-disable-next-line
      return { ...item, ['schemaName']: undefined };
    });
};

export const useUpdateMaxRun = (updatedGroup: any, setUpdatedGroup: any, onUpdate?: any, setCompletedGroup?: any) => {
  useEffect(() => {
    if (updatedGroup.length > 0) {
      const schemaList = getSchemas(updatedGroup);

      schemaList.forEach((schema: string, index: number) => {
        axios &&
          axios
            .post(
              '/oc/collectiongroup/add',
              {
                request: {
                  collectionGroupsWrapper: {
                    collectionGroups: getCollectionGroups(updatedGroup, schema),
                  },
                },
              },
              {
                params: {
                  verticalName: schema,
                },
              }
            )
            .then(() => {
              if (index === (schemaList.length - 1)) {
                setUpdatedGroup({});
                if (setCompletedGroup) {
                  setCompletedGroup({});
                }
                if (onUpdate) {
                  onUpdate();
                }
              }
            });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedGroup]);

  return [];
};
