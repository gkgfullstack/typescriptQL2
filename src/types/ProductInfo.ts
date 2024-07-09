import { CURRENCY } from 'src/enums';
import ProductMetaData from './ProductMetaData';
import PriceStats from './PriceStats';

type ProductInfo = {
  ID: string;  
  name: string;
  imageURL: string;
  ownerID: string;
  ownerName: string;
  ownerImage: string;
  productURL: string;
  status: number | 'n/a' | 'N/A';
  price: number | string | 'n/a' | 'N/A' ;
  lowestPrice: number | string | 'n/a' | 'N/A' ;
  currency: keyof typeof CURRENCY;
  description: string;
  metaData: ProductMetaData[];
  uniqueIdentifierName1: string;
  uniqueIdentifierValue1: string;
  uniqueIdentifierName2: string;
  uniqueIdentifierValue2: string;
  category: string;
  categoryNameGet:string;
  lowerPriceStats?: PriceStats;
  priceInfo: string;
};

export default ProductInfo;
