import { InfoAlerts } from 'src/types/InfoAlerts';
//!TODO uncommite code when API endpoint will be done
import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qm/product/insight';

export type InfoAlertsResponse = {
  productInsight : InfoAlerts;
};
export type InfoAlertsResponse1 = {
  ProductInsight : InfoAlerts;
};
export const getInfoAlerts = (
  sourceOwnerId: string, 
  productId: string,
  ownerId:string,
  matchType:string,
  variance:string, 
  offset:number,
  size:number,
  region:string, 
  priceType:string,
  ): Promise<InfoAlertsResponse> => {
  //!TODO uncommite code when API endpoint will be done
   return axios.get(API_URL, {
     params: {
      sourceOwnerID: sourceOwnerId,
       productID: productId,
       ownerId:ownerId,
       matchType:matchType,
       variance:variance,
       offset:offset,
       size:size,
       region:region,
       priceType:priceType
     },
   });
};
