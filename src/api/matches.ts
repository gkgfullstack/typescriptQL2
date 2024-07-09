import axios from './axiosInstances/privateAxiosInstance';
import ProductMatch from 'src/types/ProductMatch';
import { Sorting } from 'src/types/Sorting';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import { ResponseHeader } from '../types/ResponseHeader';

const API_URL = '/qm/product/matches';
const REMOVE_MATCH_API_URL = '/qm/product/matches/remove';
const ADD_MATCH_API_URL = '/qm/product/matches/add';
const BENCHMARKUPDATE_MATCH_API_URL = '/qm/product/matches/updatebenchmarkmatch';

type ProductMatchesRequest = {
  productId: string;
  sourceOwnerId:string;
  offset: number;
  size: number;
  sortingOrder?: SORT_ORDER;
  sortingColumn?: Sorting<ProductMatchInfo>['field'];
  region: string; 
  matchType: string; 
  priceType: string;
};

export type ProductMatchesResponse = {
  productMatches: ProductMatch[];
  totalRecords: number;
};

export type RemoveMatchResponse = {
  responseHeader: ResponseHeader;
};

export type AddMatchResponse = {
  responseHeader: ResponseHeader;
};

export type BenchmarkMatchResponse = {
  responseHeader: ResponseHeader;
};

export const getProductMatches = (
  productId: string,
  sourceOwnerId:string,
  offset: number,
  size: number,
  sorting: Sorting<ProductMatchInfo> | null,
  ownerId: string,
  matchType: string,
  variance: string,
  region: string,
  priceType: string,
): Promise<ProductMatchesResponse> => {
  let params = {
    productId: productId,
    sourceOwnerId:sourceOwnerId,
    offset: offset,
    size: size,
  } as ProductMatchesRequest;
  if (sorting) {
    params = {
      ...params,
      sortingOrder: SORT_ORDER[sorting.order],
      sortingColumn: sorting.field,
      ownerId: ownerId,
      matchType: matchType,
      variance: variance,
      region:region,
      priceType:priceType,
    } as ProductMatchesRequest;
  }
  return axios.get(API_URL, {
    params: params,
  });
};

export const removeProductMatch = (
  sourceProductId: string,
  targetProductId: string[],
  canonicalProductId: string,
): Promise<RemoveMatchResponse> => {
  const userName = localStorage.getItem('pendoUserId') ? localStorage.getItem('pendoUserId') : '';
  return axios.post(REMOVE_MATCH_API_URL, {
    sourceProductId: sourceProductId,
    targetProductIds: targetProductId,
    canonicalId: canonicalProductId,
    userName,
  });
};

export const addProductMatch = (
  productId: string,
  ownerId: string,
  productUrl: string,
  productUniqueId: string,
  matchType: string
): Promise<AddMatchResponse> => {
  const userName = localStorage.getItem('pendoUserId') ? localStorage.getItem('pendoUserId') : '';
  return axios.post(ADD_MATCH_API_URL, {
    productId: productId,
    ownerId: ownerId,
    productURL: productUrl,
    productUniqueId: productUniqueId,
    matchType: matchType,
    userName,
  });
};

export const benchmarkProductMatch = (
  sourceProductId: string,
  productId: string[],
  canonicalProductId: string,
  benchmarkMatch: string
): Promise<RemoveMatchResponse> => {
  return axios.post(BENCHMARKUPDATE_MATCH_API_URL, {
    sourceProductId: sourceProductId,
    targetProductIds: productId,
    canonicalId: canonicalProductId,
    benchmarkMatchStatus: benchmarkMatch,
  });
};

export const unBenchmarkProductMatch = (
  sourceProductId: string,
  productId: string[],
  canonicalProductId: string,
  benchmarkMatch: string,
): Promise<RemoveMatchResponse> => {
  return axios.post(BENCHMARKUPDATE_MATCH_API_URL, {
    sourceProductId: sourceProductId,
    targetProductIds: productId,
    canonicalId: canonicalProductId,
    benchmarkMatchStatus: benchmarkMatch,
  });
};
