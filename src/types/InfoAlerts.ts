export  type InfoAlerts = {
  productID: string | number;
  insights?: string[];
  alerts?: string[];
  matchTypeFilter?: string | number; 
  region?: string | number; 
  priceType?: string | number;
};