import axios from './axiosInstances/privateAxiosInstance';
import { Sorting } from 'src/types/Sorting';
import AuditHistoryInfo from 'src/types/AuditHistoryInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import { useEffect, useState } from 'react';

const API_URL = '/qm/product/retrieve/audithistory';
const COMPETITOR_OWNERS_API_URL = '/qm/product/retrieve/audithistory/owners';
const REPORTERS_API_URL = '/qm/product/retrieve/audithistory/reporters';

type AuditHistoryRequest = {
  offset: number;
  size: number;
  sortingorder?: SORT_ORDER;
  sortingcolumn?: Sorting<AuditHistoryInfo>['field'];
};

export type AuditHistoryResponse = {
  auditHistoryList: AuditHistoryInfo[];
  totalRecords: number;
  sortingorder: string;
  sortingcolumn: string;
  size: number;
  offset: number;
};

const transformFilter = (filter: any) => {
  return filter ? filter.split(',') : [];
};

const transformData = (filters: any) => {
  return {
    requestTypes: transformFilter(filters.requestType),
    statuses: transformFilter(filters.status),
    competitorSites: transformFilter(filters.competitorSite),
    reporters: transformFilter(filters.reporter),
  };
};

export const getAuditHistoryListSearch = (
  offset: number,
  size: number,
  sorting: Sorting<AuditHistoryInfo> | null,
  filters: any
  //auditHistoryList: string
): Promise<AuditHistoryResponse> => {
  let params = {
    offset,
    size,
  } as AuditHistoryRequest;
  if (sorting) {
    params = {
      ...params,
      sortingorder: SORT_ORDER[sorting.order],
      sortingcolumn: sorting.field,
    } as AuditHistoryRequest;
  }
  const data = transformData(filters);
  return axios.post(API_URL, data, {
    params: params,
  });
};

export const useGetCompetitorOwners = () => {
  const [ownerOptions, setOwnersOptions] = useState([]);

  useEffect(() => {
    axios &&
      axios
        .get(COMPETITOR_OWNERS_API_URL)
        .then((response: any) => {
          setOwnersOptions(
            response.competitorList.map((item: any) => {
              return {
                id: item.ownerId,
                name: item.ownerName,
              };
            })
          );
        })
        .catch(error => {
          console.log(error);
        });
  }, [setOwnersOptions]);

  return [ownerOptions];
};

export const useGetReporters = () => {
  const [reportersOptions, setReportersOptions] = useState([]);

  useEffect(() => {
    axios &&
      axios
        .get(REPORTERS_API_URL)
        .then((response: any) => {
          setReportersOptions(
            response.reporterList.map((item: any) => {
              return {
                id: item.reporter,
                name: item.reporter,
              };
            })
          );
        })
        .catch(error => {
          console.log(error);
        });
  }, [setReportersOptions]);

  return [reportersOptions];
};
