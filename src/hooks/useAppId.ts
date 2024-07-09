import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import useQueryUrlParams from './useQueryUrlParams';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';

const useAppId = (): string => {
  const seletedSourceOwnerId = localStorage.getItem('appId');
  const { defaultSourceOwnerId } = useAppStateContext();
  const { sourceOwnerId } = useQueryUrlParams<ProductFinderQueryParams>();
  let seletedSourceOwnerIds:string | null = seletedSourceOwnerId;
    if(seletedSourceOwnerIds){
      return seletedSourceOwnerIds
    }else{
      return sourceOwnerId || defaultSourceOwnerId || ''
    }

  //return seletedSourceOwnerId || sourceOwnerId || defaultSourceOwnerId || '';
};

export default useAppId;
