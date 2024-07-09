import axios from './axiosInstances/privateAxiosInstance';
import ProductCategory from 'src/types/ProductCategory';

const API_URL = '/qm/category/list';

export type CategoriesResponse = {
  categories: ProductCategory[];
};

export const getCategories = (sourceOwnerId: string, categoryId?: string): Promise<CategoriesResponse> => {
  return axios.get(API_URL, {
    params: {
      ...(categoryId && { categoryId }),
      sourceOwnerID: sourceOwnerId,
    },
  });
};
