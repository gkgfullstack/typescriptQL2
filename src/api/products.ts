import axios from './axiosInstances/privateAxiosInstance';
import { Sorting } from 'src/types/Sorting';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import ProductId from 'src/types/ProductFinder';

const API_URL_POST = '/qm/product/searches';

type ProductsSearchRequest = {
  productKey: string;
  size: number;
  offset: number;
  sortingorder?: SORT_ORDER;
  sortingcolumn?: Sorting<ProductFinderInfo>['field'];
  sourceOwnerID: string;
  active:number;
  noMatch:number;
  insight:number;
  matchTypeFilter: string,
  region: string,
  priceType: string,
};

export type ProductsSearchResponse = {
  products: ProductId[];
  totalRecords: number;
  sortingorder: string;
  sortingcolumn: string;
  offset: number;
  size: number;
  search: string;
  active:number,
};

export const getProductListSearch = (
  sorting: Sorting<ProductFinderInfo> | null,
  offset: number,
  size: number,
  search: string,
  categoryId: string | null,
  manufacturerId: string[] | null,
  varianceId: string[] | null,
  matchId: string[] | null,
  ownerId: string[] | null,
  sourceOwnerId: string,
  active:number,
  noMatch:number,
  insight:number,
  // todo: set correct type format of customFilterListIds
  customFilterSearch: any,
  matchTypeFilter: string,
  region: string,
  priceType: string,

): Promise<ProductsSearchResponse> => {
  let params = {
    offset,
    size,
    productKey: search,
    sourceOwnerID: sourceOwnerId,
    ...(categoryId && { categoryId }),
  } as ProductsSearchRequest;
  if (sorting) {
    params = {
      ...params,
      sortingOrder: SORT_ORDER[sorting.order],
      sortingColumn: sorting.field,
    } as ProductsSearchRequest;
  }
  
  const data = {
    ...(manufacturerId && { manufacturerId }),
    ...(varianceId && { varianceId }),
    ...(matchId && { matchId }),
    ...(ownerId && { ownerId }),
    ...(active && {active}),
    ...(noMatch && {noMatch}),
    ...(insight && {insight}),
    ...(customFilterSearch && {customFilterSearch}),
    ...(matchTypeFilter && {matchTypeFilter}),
    ...(region && {region}),
    ...(priceType && {priceType}),
  };
  return axios.post(API_URL_POST, data, {
    params: params,
  });
};
