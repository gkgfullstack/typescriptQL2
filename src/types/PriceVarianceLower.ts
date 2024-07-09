import { CURRENCY } from 'src/enums';

export type RegularPriceInfo = {
  regularPriceMetaData:[{
    Id: number;
    name:string;
    value:string;
  }]
};

type PriceVariancelowest = {
  productID: string | number;
  currency: keyof typeof CURRENCY;
  priceCollectedTimestamp: string;
  lowestMinValue: number;
  lowestMaxValue: number;
  lowestMedian: number;
  lowestVariance: string;
  priceInfo: string;
  lowestPriceInfo: string;
  lowestPrice: number;
};

export default PriceVariancelowest;