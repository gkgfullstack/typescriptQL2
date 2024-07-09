import { CURRENCY } from 'src/enums';

type PriceStats = {
  productID: string | number;
  price: number;
  active:number;
  noOfMatches: number;
  minValue: number;
  maxValue: number;
  median: number;
  variance: string;
  priceCollectedTimestamp: string;
  currency: keyof typeof CURRENCY;
  lowestMedian: number;
  lowestMaxValue: number;
  lowestMinValue: number;
  lowestPrice: number;
  lowestPriceInfo: string;
  lowestVariance: string;
  priceInfo: string;
  };

export default PriceStats;
