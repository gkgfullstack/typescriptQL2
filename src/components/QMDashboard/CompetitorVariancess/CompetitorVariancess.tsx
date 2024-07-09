import React from 'react';
import { useCompetitorVariancessFetch } from './hooks';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import VarianceView from '../VarianceView';
import { VarianceFilter } from 'src/types/VarianceFilter';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

export const COMPETITOR_ITEMS_PER_PAGE = 15;

export type CompetitorVariancessProps = {
  variancess: VarianceFilter[] | null;
  loading: boolean;
};

const CompetitorVariancess: React.FC<CompetitorVariancessProps> = ({
  variancess,
  loading,
}: CompetitorVariancessProps) => {
  const sourceOwnerId = useSourceOwnerId();
  const { matchTypeFilter, region, priceType} = useQueryUrlParams();
  let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  const [fetchState] = useCompetitorVariancessFetch(sourceOwnerId, initialMatchTypeFilterIds, initialRegionIds, initialPriceTypeIds);

  return (
    <VarianceView
      {...fetchState}
      loading={fetchState.loading || loading}
      variancess={variancess}
      itemsPerPage={COMPETITOR_ITEMS_PER_PAGE}
      queryParameter={'sites'}
    />
  );
};

export default CompetitorVariancess;
