import PriceStats from 'src/types/PriceStats';
import ProductInfo from './ProductInfo';
//import PriceVarianceLower from './PriceVarianceLower';
//import RegularPriceStats from './RegularPriceStats';

type ProductFinderInfo = ProductInfo & {
  key: string;
  priceStats?: PriceStats;
  lowerPriceStats?: PriceStats;
  matches?: number | string ;
  insights?: string[];
  alerts?: string[];
  ID?:string | undefined;
  active?:any;
  customFilterList?:string[];
  region?: string | undefined,
  priceType?: string,
  matchtype?: string | undefined,
  lowestprice?:string;
  regularprice?:string;
  pricestats?:string;
};

export default ProductFinderInfo;
