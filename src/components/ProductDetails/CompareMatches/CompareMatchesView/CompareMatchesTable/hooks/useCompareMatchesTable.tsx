import { useEffect, useState } from 'react';
import ProductMetaData from 'src/types/ProductMetaData';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import MATCH_TYPE from 'src/enums/matchType';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import { CompareMatchesViewProps } from 'src/components/ProductDetails/CompareMatches/CompareMatchesView/CompareMatchesView';
import RemoveMatchButton from 'src/components/ProductDetails/RemoveMatchButton';
import Image from 'src/components/common/Image';

import styles from 'src/components/ProductDetails/CompareMatches/CompareMatchesView/CompareMatchesTable/CompareMatchesTable.module.less';

export type Match = ProductMatchInfo & {
  fixed?: boolean;
};

export type MatchRow = {
  className?: string;
  customRender: (data: Match, isReadOnlyMatch?: boolean | undefined) => React.ReactNode;
  titleRender?: (data: Match) => React.ReactNode;
};

const actionsRenderer = (data: Match, isReadOnlyMatch: boolean | undefined): React.ReactNode => {
  function unchecked() {}
  return (
    <>
      {data.productURL && (
        <a href={data.productURL} className={styles.item} rel="noopener noreferrer" target={'_blank'}>
          <FontAwesomeIcon icon={['fal', 'globe']} />
        </a>
      )}
      {!data.fixed && !isReadOnlyMatch && (
        <RemoveMatchButton
          className={clsx(styles.item, styles.remove_icon)}
          matchItems={[data]}
          tooltipPlacement={'top'}
          selectedRowsss={unchecked}
        />
      )}
    </>
  );
};

const imageRenderer = (data: Match): React.ReactNode => {
  return (
    <span style={{ width: 'auto' }} className={styles.product_image_container}>
      <Image url={data.imageURL} alt={data.name} />
    </span>
  );
};

const nameRenderer = (data: Match): React.ReactNode => {
  return (
    <>
      <h4>{data.matchType ? (MATCH_TYPE[data.matchType] ? MATCH_TYPE[data.matchType] : 'n/a') : 'Your Product'}</h4>
      <h3 style={{ wordBreak: 'break-word' }}>
        {data.fixed ? (
          data.name
        ) : (
          <a href={data.productURL} className={styles.product_title} target={'_blank'} rel="noopener noreferrer">
            {data.name}
          </a>
        )}
      </h3>
    </>
  );
};

export const defaultRenderer = (value: Match[keyof Match]): React.ReactNode => <p>{value}</p>;

export const titleRenderer = (value: Match[keyof Match]): React.ReactNode => <h4>{value}</h4>;

export const actionsRowConfig: MatchRow = {
  className: styles.actions,
  customRender: actionsRenderer,
};
export const productImageRowConfig: MatchRow = {
  className: styles.product_image,
  customRender: imageRenderer,
};
export const productNameRowConfig: MatchRow = {
  customRender: nameRenderer,
  titleRender: (): React.ReactNode => titleRenderer('Product Name'),
};
export const descriptionRowConfig: MatchRow = {
  customRender: (data: Match): React.ReactNode => defaultRenderer(data.description ? data.description : 'n/a'),
  titleRender: (): React.ReactNode => titleRenderer('Product Description'),
};

export type CompareMatchesTableProps = CompareMatchesViewProps & {
  currentIndex: number;
  itemsPerPage: number;
};

export type CompareMatchesTableState = {
  matches: Match[];
  scrolling: boolean;
  rowsConfig: MatchRow[];
};

const useCompareMatchesTable = ({
  product,
  productMatches,
  currentIndex,
  itemsPerPage,
}: CompareMatchesTableProps): [CompareMatchesTableState] => {
  const [matches, setMatches] = useState<Array<Match>>([]);
  const [scrolling, setScrolling] = useState(false);
  const rowsConfig: MatchRow[] = [actionsRowConfig, productImageRowConfig, productNameRowConfig];

  if (product && product.metaData) {
    product.metaData.forEach((productMetaData: ProductMetaData, index: number) => {
      const rowConfig: MatchRow = {
        customRender: (data: Match): React.ReactNode => {
          if (data && data.metaData[index]) {
            const { value } = data.metaData[index];
            return defaultRenderer(value ? value : 'n/a');
          }
        },
        titleRender: (data: Match): React.ReactNode => {
          if (data && data.metaData[index]) {
            const { name } = data.metaData[index];
            return titleRenderer(name ? name : productMetaData.name);
          }
        },
      };
      rowsConfig.push(rowConfig);
    });
  }

  rowsConfig.push(descriptionRowConfig);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (product && productMatches && (currentIndex <= productMatches.length || itemsPerPage > productMatches.length)) {
      setScrolling(true);
      timer = setTimeout(() => {
        const matchData = [
          { ...product, fixed: true } as Match,
          ...productMatches.slice(currentIndex, currentIndex + itemsPerPage),
        ];

        setMatches(matchData);
        setScrolling(false);
      }, 600);
    }
    return (): void => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [currentIndex, productMatches, product, itemsPerPage]);

  return [
    {
      matches,
      scrolling,
      rowsConfig,
    },
  ];
};

export default useCompareMatchesTable;
