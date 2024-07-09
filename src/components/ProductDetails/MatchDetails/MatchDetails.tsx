import React, { useState } from 'react';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import { useProductMatchesFetch } from 'src/components/ProductDetails/hooks';
import { Sorting } from 'src/types/Sorting';
import MatchDetailsView from './MatchDetailsView';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';

import styles from './MatchDetails.module.less';
import NoMatchesView from 'src/components/ProductDetails/NoMatchesView/NoMatchesView';
import CustomFilterMatches from 'src/components/ProductDetails/CustomFilterMatches';
import { useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';
export const defaultMatchDetailsSorting: Sorting<ProductMatchInfo> = {
  field: 'matchType',
  order: 'ascend',
};

export const SHIFT_MATCH_DETAILS_COUNT = 5;
export const initialPage = 1;
type MatchDetailsProps = {
  isReadOnlyBenchmark: boolean;
  isReadOnlyMatch: boolean;
};

const MatchDetails: React.FC<MatchDetailsProps> = ({ isReadOnlyMatch, isReadOnlyBenchmark }: MatchDetailsProps) => {
  const { ownerId, variance, offset, size } = useProductDetailsStateContext();
  const initialOwnerId = ownerId !== undefined ? ownerId : '';
  const initialVariance = variance !== undefined ? variance : '';
  const initialOffset = offset !== undefined ? offset : 1;
  const initialSize = size !== undefined ? size : 0;

  const [sorting, setSorting] = useState(defaultMatchDetailsSorting);
  const [
    { data: matches, loading: matchesLoading, error: matchesError, total: totalMatches },
    { fetchMore: fetchMoreMatches },
  ] = useProductMatchesFetch(sorting, initialSize, initialOwnerId, initialVariance, initialOffset);
  const loadingMatches: boolean = matchesLoading && matches === null;
  return (
    <div className="widget" style={{ clear: 'both' }}>
      <CustomFilterMatches />
      {matchesError && (
        <Alert
          message="Error"
          description="An error has occurred when trying to get product match details! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {loadingMatches ? (
        <div className={styles.matches_loader_container}>
          <Spin spinning={loadingMatches} />
        </div>
      ) : null}
      {matches !== null && matches.length > 0 ? (
        <MatchDetailsView
          loading={matchesLoading}
          sorting={sorting}
          items={matches}
          totalItems={totalMatches}
          itemsPerPage={SHIFT_MATCH_DETAILS_COUNT}
          getMoreItems={fetchMoreMatches}
          onSortingChange={setSorting}
          permissions={{ isReadOnlyMatch, isReadOnlyBenchmark }}
        />
      ) : null}
      {!matchesLoading && matches !== null && matches.length === 0 ? <NoMatchesView /> : null}
    </div>
  );
};

export default MatchDetails;
