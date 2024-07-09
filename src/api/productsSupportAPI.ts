//import ProductsTypeSupport from '../types/ProductsTypeSupport';
import axios from './axiosInstances/privateAxiosInstance';

const API_URL = '/qs/account/user/getproducttype';

export type ProductsTypeResponse = {
  name: any;
  value: string;  
};

export const getProductsType = (): Promise<ProductsTypeResponse> => {
  return axios.get(API_URL);
};
