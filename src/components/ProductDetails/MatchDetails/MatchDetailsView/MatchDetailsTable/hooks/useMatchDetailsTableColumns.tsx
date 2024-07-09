import { ColumnProps, SortOrder } from 'antd/lib/table';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import React, { useEffect, useState } from 'react';
import { Sorting } from 'src/types/Sorting';
import MATCH_TYPE from 'src/enums/matchType';
import FormattedNumber from 'src/components/common/FormattedNumber/FormattedNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveMatchButton from 'src/components/ProductDetails/RemoveMatchButton';
import Image from 'src/components/common/Image';

import styles from '../MatchDetailsTable.module.less';
import { getVarianceColor } from 'src/utils';
import { Popover } from 'antd';
import BenchmarkMatchButton from 'src/components/ProductDetails/BenchmarkMatchButton';
import UnBenchmarkMatchButton from 'src/components/ProductDetails/UnBenchmarkMatchButton';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

type ReadOnlyPermissions = { [key: string]: boolean };

export interface ColumnConfig extends ColumnProps<ProductMatchInfo> {
  customColRenderer?: (record: ProductMatchInfo, i: number, permissions: ReadOnlyPermissions) => React.ReactNode;
}

const sortOrder = (sortedInfo: Sorting<ProductMatchInfo> | null, key: keyof ProductMatchInfo): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};
const ownerRender = (record: ProductMatchInfo): React.ReactNode => (
  <span className={styles.image_container}>
    <span className={styles.banchmark}>Benchmark</span>
    <Image url={record.ownerImage} alt={record.ownerName || ''} />
  </span>
);
const imageRender = (record: ProductMatchInfo): React.ReactNode => (
  <span className={styles.image_container}>
    <Image url={record.imageURL} alt={record.name || ''} />
  </span>
);
const matchTypeRender = (record: ProductMatchInfo): React.ReactNode =>
  record.matchType ? (MATCH_TYPE[record.matchType] ? MATCH_TYPE[record.matchType].toUpperCase() : 'n/a') : 'n/a';
const priceRender = (record: ProductMatchInfo): React.ReactNode => (
  <>
    <FormattedNumber type="currency" currency={record.currency} value={record.price} />
    {/* <Popover placement="right" content={'Collection Date : '+ record.priceCollectedTimestamp} trigger={'hover'}>
      <span style = {{marginLeft:"10px", display:"inline-block"}} >
        <FontAwesomeIcon icon={['fal', 'info-circle']} /></span>
    </Popover> */}
  </>
);
const lowerpriceRender = (record: ProductMatchInfo): React.ReactNode => (
  <>
    <FormattedNumber type="currency" currency={record.currency} value={record.lowestPrice} />
    <Popover
      placement="right"
      content={
        <div style={{ maxWidth: '160px', whiteSpace: 'pre-line', lineHeight: '17px' }}>
          {record.lowestPriceInfo === undefined || null
            ? 'N/A'
            : record.lowestPriceInfo
                .split('$')
                .join(record.currency === 'GBP' ? '?' : record.currency === 'USD' ? '$' : record.currency + `${' '}`)
                .split(' :')
                .join(': ')
                .split(',')
                .join('\n')}
        </div>
      }
      trigger={'hover'}
    >
      <span style={{ marginLeft: '10px', display: 'inline-block' }}>
        <FontAwesomeIcon icon={['fal', 'info-circle']} />
      </span>
    </Popover>
  </>
);
const varianceRender = (record: ProductMatchInfo): React.ReactNode => {
  if (!record.variance || !record.varianceMetric) {
    return 'n/a';
  }
  const variance = `${record.variance}`;
  const color = getVarianceColor(record.variance);
  return <span style={{ color: color }}>{`${Number.parseFloat(variance).toFixed()} ${record.varianceMetric}`}</span>;
};
const lowervarianceRender = (record: ProductMatchInfo): React.ReactNode => {
  if (!record.lowestPriceVariance || !record.varianceMetric) {
    return 'n/a';
  }
  const lowerVariance = `${record.lowestPriceVariance}`;
  const color = getVarianceColor(record.lowestPriceVariance);
  return (
    <span style={{ color: color }}>{`${Number.parseFloat(lowerVariance).toFixed()} ${record.varianceMetric}`}</span>
  );
};

const unchecked = () => {
  // selectedRowKeys: []
};
const actionRender = (record: ProductMatchInfo, i: number, permissions: ReadOnlyPermissions): React.ReactNode => (
  <>
    {record.productURL && (
      <a
        href={record.productURL}
        className={styles.action_item}
        rel="noopener noreferrer"
        target={'_blank'}
        style={{ marginLeft: '-10px' }}
      >
        <FontAwesomeIcon icon={['fal', 'globe']} />
      </a>
    )}
    {!permissions.isReadOnlyMatch && (
      <RemoveMatchButton
        selectedRowsss={unchecked}
        className={styles.action_item}
        matchItems={[record]}
        tooltipPlacement={'left'}
        key={`index_${record.ID + i++}`}
      />
    )}

    {!permissions.isReadOnlyBenchmark &&
      (record.benchmarkMatch !== '1' ? (
        <BenchmarkMatchButton
          className={styles.action_item}
          matchItems={[record]}
          tooltipPlacement={'left'}
          key={`index1_${record.name}`}
          selectedRowsss={unchecked}
        />
      ) : (
        <UnBenchmarkMatchButton
          className={styles.action_item}
          matchItems={[record]}
          tooltipPlacement={'left'}
          key={`index2_${record.productId}`}
          selectedRowsss={unchecked}
        />
      ))}
  </>
);

const getColumns = (
  sorting: Sorting<ProductMatchInfo>,
  priceTypeIdsUpdateS: string,
  permissions: ReadOnlyPermissions
): ColumnConfig[] => {
  let columns: ColumnConfig[] = [
    {
      title: 'Site',
      dataIndex: 'ownerName',
      key: 'ownerName',
      width: 120,
      className: styles.owner_column,
      customColRenderer: ownerRender,
      sorter: true,
      sortOrder: sortOrder(sorting, 'ownerName'),
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: '',
      dataIndex: 'imageURL',
      key: 'imageURL',
      width: 120,
      className: styles.product_image_column,
      customColRenderer: imageRender,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sortOrder(sorting, 'name'),
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: 'Match Type',
      dataIndex: 'matchType',
      key: 'matchType',
      width: 120,
      customColRenderer: matchTypeRender,
      className: styles.match_type_column,
      sorter: true,
      sortOrder: sortOrder(sorting, 'matchType'),
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      align: 'center',
      title: 'Regular Price',
      dataIndex: 'price',
      key: 'price',
      width: 125,
      customColRenderer: priceRender,
      className: styles.price_column,
      sorter: true,
      sortOrder: sortOrder(sorting, 'price'),
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      align: 'center',
      title: 'Lowest Price',
      dataIndex: 'lowestPrice',
      key: 'lowestPrice',
      width: 125,
      customColRenderer: lowerpriceRender,
      className: styles.price_column,
      sorter: true,
      sortOrder: sortOrder(sorting, 'lowestPrice'),
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      align: 'center',
      title: 'Variance',
      dataIndex: 'variance',
      key: 'variance',
      width: 80,
      customColRenderer: priceTypeIdsUpdateS === '1' ? varianceRender : lowervarianceRender,
      className: styles.variance_column,
      sorter: true,
      sortOrder: sortOrder(sorting, 'variance'),
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      align: 'right',
      title: '',
      key: 'actions',
      customColRenderer: actionRender,
      className: styles.actions_column,
      width: 80,
    },
  ];
  columns = columns.map(
    (column: ColumnConfig): ColumnConfig => {
      if (column.customColRenderer) {
        const renderer = column.customColRenderer;
        column.render = (_: string | number, record: ProductMatchInfo, i: number): React.ReactNode => {
          return renderer(record, i, permissions);
        };
      }
      return column;
    }
  );

  return columns;
};

const useMatchDetailsTableColumns = (
  sorting: Sorting<ProductMatchInfo>,
  priceTypeIdsUpdateS: string,
  permissions: ReadOnlyPermissions
): [ColumnConfig[]] => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const { priceType } = useQueryUrlParams();
  const priceTypeIdsUpdate: string = priceType !== undefined ? priceType : '-1';
  const [, setPriceTypeIdsUpdate] = useState(priceTypeIdsUpdate);
  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting, priceTypeIdsUpdateS, permissions));
      setPriceTypeIdsUpdate(priceTypeIdsUpdate);
    }
  }, [sorting, priceTypeIdsUpdateS, priceTypeIdsUpdate]);

  return [columns];
};

export default useMatchDetailsTableColumns;
