type AppIdQueryParams = {
  pricev?: string[];
  sites?: string[];
  brands?: string[];
  appId?: any;
  search?: string;
  sortingorder?: string | null;
  sortingcolumn?: string | null;
  createdStart?:any;
  createdEnd?:any;
  lastrunStart?:any;
  lastrunEnd?:any
  finishedStart?:any;
  finishedEnd?:any;
  updatedStart?:any;
  updatedEnd?:any;
  isPageType?:any;
  ownerName?:any;
};
export default AppIdQueryParams;
