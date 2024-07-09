import React from 'react';
//import Widget from 'src/components/common/Widget';
//import { Tabs } from 'antd';
import { useCategoryPriceDistributionFetch } from './hooks';
import PriceDistributionView from '../PriceDistributionView/PriceDistributionView';
import { PriceVarianceFilter } from 'src/types/PriceVarianceFilter';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

export const CATEGORY_ITEMS_PER_PAGE = 15;

export type CategoryPriceAnalysisProps = {
  priceVariance: PriceVarianceFilter[] | null;
  loading: boolean;
};

const CategoryPriceAnalysis: React.FC<CategoryPriceAnalysisProps> = ({
  priceVariance,
  loading,
}: CategoryPriceAnalysisProps) => {
  const sourceOwnerId = useSourceOwnerId();
  const { matchTypeFilter, region, priceType} = useQueryUrlParams();
  let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  const [fetchState] = useCategoryPriceDistributionFetch(sourceOwnerId, initialMatchTypeFilterIds, initialRegionIds, initialPriceTypeIds);
  localStorage.setItem('sourceOwnerId', `${sourceOwnerId}`);
  return (   
      <PriceDistributionView
            {...fetchState}
            loading={fetchState.loading || loading}
            priceVariance={priceVariance}
            itemsPerPage={CATEGORY_ITEMS_PER_PAGE}
            queryParameter={'category'}
          />  
  );
};

export default CategoryPriceAnalysis;
