import React from 'react';
//import Widget from 'src/components/common/Widget';
//import { Tabs } from 'antd';
import { useCompetitorPriceDistributionFetch } from './hooks';
import PriceDistributionView from '../PriceDistributionView';
import { PriceVarianceFilter } from 'src/types/PriceVarianceFilter';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

export const COMPETITOR_ITEMS_PER_PAGE = 15;

export type CompetitorPriceAnalysisProps = {
  priceVariance: PriceVarianceFilter[] | null;
  loading: boolean;
};

const CompetitorPriceAnalysis: React.FC<CompetitorPriceAnalysisProps> = ({
  priceVariance,
  loading,
}: CompetitorPriceAnalysisProps) => {
  const sourceOwnerId = useSourceOwnerId();
  const { matchTypeFilter, region, priceType} = useQueryUrlParams();
  let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  const [fetchState] = useCompetitorPriceDistributionFetch(
    sourceOwnerId,
    initialMatchTypeFilterIds, initialRegionIds, initialPriceTypeIds
    );

  return (       
       <PriceDistributionView
            {...fetchState}
            loading={fetchState.loading || loading}
            priceVariance={priceVariance}
            itemsPerPage={COMPETITOR_ITEMS_PER_PAGE}
            queryParameter={'sites'}
          />
  );
};

export default CompetitorPriceAnalysis;
