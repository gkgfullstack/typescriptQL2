import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import useQueryUrlParams from './useQueryUrlParams';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';
import Owner from '../types/Owner';

const useSourceOwnerId = (): string => {
  const selectedSourceOwnerId = localStorage.getItem('sourceOwnerId');
  const { defaultSourceOwnerId, owners } = useAppStateContext();
  const { sourceOwnerId } = useQueryUrlParams<ProductFinderQueryParams>();

  if (!owners || owners.length === 0) {
    return '';
  }

  if (
    owners &&
    owners.length > 0 &&
    selectedSourceOwnerId &&
    !owners.some((owner: Owner) => owner.id === selectedSourceOwnerId)
  ) {
    return defaultSourceOwnerId || '';
  }

  if (selectedSourceOwnerId && selectedSourceOwnerId !== '-1') {
    return selectedSourceOwnerId;
  } else {
    return sourceOwnerId || defaultSourceOwnerId || '-1';
  }
};

export default useSourceOwnerId;
