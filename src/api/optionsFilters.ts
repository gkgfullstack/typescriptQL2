import { OptionsProductFinderFilters } from 'src/types/OptionsProductFinderFilters';
//import  { useState, useEffect } from 'react';
import axios from './axiosInstances/privateAxiosInstance';


const API_URL = '/qm/product/regionfilter';

export type OptionsFiltersResponse = { regions: OptionsProductFinderFilters };

export const getOptionsFilters = (sourceOwnerId: string): Promise<OptionsFiltersResponse> =>
  axios.get(API_URL, { 
    params: { 
      sourceOwnerID: sourceOwnerId 
    } 
  }
  );

