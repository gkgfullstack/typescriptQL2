import React from 'react';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import { useProductMatchesFetch } from 'src/components/ProductDetails/hooks';
import { Sorting } from 'src/types/Sorting';
import CompareMatchesView from './CompareMatchesView/CompareMatchesView';
import { useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';
import Spin from 'src/components/common/Spin';

import styles from './CompareMatches.module.less';
import { Alert } from 'antd';

export const defaultMatchesSorting: Sorting<ProductMatchInfo> = {
  field: 'matchType',
  order: 'ascend',
};

export const SHIFT_MATCH_COUNT = 5;
export const initialPage = 1;

type CompareMatchesProps = {
  isReadOnlyMatch: boolean;
};

const CompareMatches: React.FC<CompareMatchesProps> = ({ isReadOnlyMatch }: CompareMatchesProps) => {
  const { product, ownerId, variance, size, offset } = useProductDetailsStateContext();
  const initialOwnerId: any = ownerId !== undefined ? ownerId : '';
  const initialVariance: string = variance !== undefined ? variance : '';
  const initialOffset: number = offset !== undefined ? offset : 1;
  const initialSize: number = size !== undefined ? size : 0;

  const [
    { data: compareMatches, loading: compareMatchesLoading, error: compareMatchesError, total: totalMatches },
    { fetchMore: fetchMoreMatches },
  ] = useProductMatchesFetch(defaultMatchesSorting, initialSize, initialOwnerId, initialVariance, initialOffset);

  const loadingMatches: boolean = compareMatchesLoading && compareMatches === null;
  return (
    <>
      {compareMatchesError && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get product matches! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {loadingMatches && compareMatches === null ? (
        <div className={styles.matches_loader_container}>
          <Spin spinning={loadingMatches} />
        </div>
      ) : null}
      {compareMatches !== null && compareMatches.length > 0 ? (
        <CompareMatchesView
          loading={compareMatchesLoading}
          product={product}
          productMatches={compareMatches}
          totalMatches={totalMatches}
          getMoreMatches={fetchMoreMatches}
          isReadOnlyMatch={isReadOnlyMatch}
        />
      ) : null}
    </>
  );
};

export default CompareMatches;
