type ProductFinderQueryParams = {
  pricev?: string[];
  active?:any;
  sites?: string[];
  brands?: string[];
  sourceOwnerId?: string;
  category?: string[];
  search?: string;
  resultid?: any;
  sortingorder?: string | null;
  sortingcolumn?: string | null;
  customFilterList?: string[];
  back?:boolean;
  region?: string,
  priceType?:string;
  matchTypeFilter?:string;
};
export default ProductFinderQueryParams;
