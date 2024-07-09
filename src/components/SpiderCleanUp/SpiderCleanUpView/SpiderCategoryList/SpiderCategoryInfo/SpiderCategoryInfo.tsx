import React from 'react';
import styles from './SpiderCategoryInfo.module.less';

export type SpiderCategoryInfoProps = {
  totalCategoriesCount: number;
  newCategoriesCount: number;
  deletedCategoriesCount: number;
};

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_NUMBER = 0;

const SpiderCategoryInfo: React.FC<SpiderCategoryInfoProps> = ({
  totalCategoriesCount,
  newCategoriesCount,
  deletedCategoriesCount,
}: SpiderCategoryInfoProps): React.ReactElement => {
  const getPercent = (value: number) => {
    if (totalCategoriesCount === 0) {
      return '';
    }
    const percent = Number(((value * 100) / totalCategoriesCount).toFixed(2));

    if (!percent || isNaN(percent)) {
      return '';
    }
    return `(${percent}%)`;
  };

  return (
    <dl className={styles.spider_cleanup_statistic}>
      <dt>Total Categories:</dt>
      <dd>{totalCategoriesCount} (100%)</dd>
      <dt>Total categories marked for deletion:</dt>
      <dd>
        {deletedCategoriesCount} {getPercent(deletedCategoriesCount)}
      </dd>
      <dt>Total new categories:</dt>
      <dd>
        {newCategoriesCount} {getPercent(newCategoriesCount)}
      </dd>
    </dl>
  );
};

export default SpiderCategoryInfo;
