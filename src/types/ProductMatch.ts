import { MATCH_TYPE } from 'src/enums';

type ProductMatch = {
  productId: string;
  sourceOwnerId:string;
  matchType: keyof typeof MATCH_TYPE;
  variance: string;
  varianceMetric: string;
  canonicalId: string;
  priceCollectedTimestamp: string;
  removeRequest: boolean;
  benchmarkMatch:any;
  matchTypeFilter:string;
  region:string;
  priceType:string;
  lowerVariance:string;
  lowestPrice:any;
  lowestPriceVariance:string;
  lowestPriceInfo:string;
};

export default ProductMatch;
