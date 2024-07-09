import React, { useEffect, useState } from 'react';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import PriceStats from 'src/types/PriceStats';
import FormattedNumber from 'src/components/common/FormattedNumber/FormattedNumber';
import ProductNameView from '../ProductListTable/ProductNameView';
import styles from '../ProductList.module.less';
import ProductPriceChart, { PriceVariance } from '../../ProductPriceChart';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'antd';
import ProductMatchesView from '../ProductListTable/ProductMatchesView';


export const TEMP_VARIANCE_CHART_MINUS: PriceVariance = {
  id: 'char_01',
  currency: "USD",
  lowestMedian: 99,
  lowestMaxValue: 99,
  lowestMinValue: 99,
  lowestPrice: 51.14,
  lowestVariance: "0",
  maxValue: 100,
  median: 100,
  minValue: 100,
  price: 52.14,
  variance: "1.02",
  varianceMetric: "%",
};


interface ColumnConfig extends ColumnProps<ProductFinderInfo> {
  customColRenderer?: (record: ProductFinderInfo) => React.ReactNode;
}

const sortOrder = (
  sortedInfo: Sorting<ProductFinderInfo> | null,
  key: keyof ProductFinderInfo | 'variance' | 'regularVariance'
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};
const insightRender = (record: ProductFinderInfo): React.ReactNode => {


  if (!record || (!record.insights && !record.alerts)) return null;
  const contentInsights = (
    <div className={styles.column_popup_body}>
      <div>
        <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} size={'sm'} className="insight_icon" />
        <span>Insights: </span>
      </div>
      <ul>
        {record.insights &&
          record.insights.map((insight, index) => {
            return <li key={index}>{insight}</li>;
          })}
      </ul>
    </div>
  );
  const contentAlerts = (
    <div className={styles.column_popup_body}>
      <div>
        <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} size={'sm'} className={styles.alert_icon} />
        <span>Alerts:</span>
      </div>
      <ul>
        {record.alerts &&
          record.alerts.map((alert, index) => {
            return <li key={index}>{alert}</li>;
          })}
      </ul>
    </div>
  );
  return (
    <div>
      {record.insights && (
        <div>
          <Popover placement="left" content={contentInsights} trigger={'hover'}>
            <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} className="insight_icon" />
          </Popover>
        </div>
      )}
      {record.alerts && (
        <div>
          <Popover placement="left" content={contentAlerts} trigger={'hover'}>
            <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} className="alert_icon" />
          </Popover>
        </div>
      )}
    </div>
  );
};

const productRender = (record: ProductFinderInfo): React.ReactNode => <ProductNameView {...record} />;
const priceRender = (record: ProductFinderInfo): React.ReactNode => (
  <>{record.price === undefined ? "n/a" : String(record.price) === "" ? "n/a" : <FormattedNumber type="currency" currency={record.currency} value={record.price} />}


    {/* <Popover placement="right" content={'Collection Date: ' + record.priceStats?.priceCollectedTimestamp} trigger={'hover'}>
      <span style={{ marginLeft: "10px", display: "inline-block" }} ><FontAwesomeIcon icon={['fal', 'info-circle']} /></span>
    </Popover> */}
    </>
);

const lowestPriceRender = (record: ProductFinderInfo): React.ReactNode => (
  <><FormattedNumber type="currency" currency={record.currency} value={record.priceStats?.lowestPrice !== undefined ? record.priceStats?.lowestPrice : 'N/A'} />
    <Popover placement="right" content={<div style={{
      maxWidth: "160px", whiteSpace: "pre-line",
      lineHeight: "17px"
    }}>{record.priceStats?.lowestPriceInfo.split(' :').join(': ').split(',').join("\n")}</div>} trigger={'hover'}>
      <span style={{ marginLeft: "10px", display: "inline-block" }} ><FontAwesomeIcon icon={['fal', 'info-circle']} /></span>
    </Popover></>
);

const varianceRender = (record: PriceStats): React.ReactNode => {
  const isExistVariancePrice =
    record &&
    record.productID &&
    record.minValue &&
    record.maxValue &&
    record.median &&
    record.price &&
    record.variance &&
    record.currency &&
    record.lowestMinValue &&
    record.lowestMaxValue &&
    record.lowestMedian &&
    record.lowestPrice &&
    record.lowestVariance;
  if (record && isExistVariancePrice) {
    const variancePrice = {
      id: record.productID,
      minValue: record.minValue,
      maxValue: record.maxValue,
      median: record.median,
      price: record.price,
      variance: record.variance,
      varianceMetric: '%',
      currency: record.currency,
      lowestMinValue: record.lowestMinValue,
      lowestMaxValue: record.lowestMaxValue,
      lowestMedian: record.lowestMedian,
      lowestPrice: record.lowestPrice,
      lowestVariance: record.lowestVariance,
    };
    return <ProductPriceChart {...variancePrice} />;
  } else {
    return <ProductPriceChart {...{
      minValue: record.minValue,
      maxValue: record.maxValue,
      median: record.median,
      price: record.price,
      variance: record.variance,
      varianceMetric: '%',
      currency: record.currency,
      lowestMinValue: record.lowestMinValue,
      lowestMaxValue: record.lowestMaxValue,
      lowestMedian: record.lowestMedian,
      lowestPrice: record.lowestPrice,
      lowestVariance: record.lowestVariance
    }} />;
  }
};

const matchesRender = (matches: ProductFinderInfo, record: ProductFinderInfo): React.ReactNode => <ProductMatchesView {...record} {...matches} />;


export const getColumns = (sorting: Sorting<ProductFinderInfo>): ColumnConfig[] => {
  const columns: ColumnConfig[] = [
    {
      title: 'Product Name',
      key: 'name',
      render: productRender,
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      //width: 500,
    },
    {
      title: 'Regular Price',
      key: 'regularprice',
      width: 50,
      align: 'center',
      render: priceRender,
      className: styles.price_column,
      sorter: true,
      sortOrder: sortOrder(sorting, 'regularprice'),
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: 'Lowest Price',
      key: 'lowestprice',
      width: 50,
      align: 'center',
      render: lowestPriceRender,
      className: styles.price_column,
      sorter: true,
      sortOrder: sortOrder(sorting, 'lowestprice'),
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: 'Matches',
      dataIndex: 'matches',
      key: 'matches',
      width: 50,
      align: 'center',
      render: matchesRender,
      className: styles.matches_column,
      sorter: true,
      sortOrder: sortOrder(sorting, 'matches'),
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: 'Price Variance',
      dataIndex: 'priceStats',
      key: 'variance',
      width: 250,
      align: 'center',
      sorter: true,
      sortOrder: sortOrder(sorting, 'variance'),
      render: varianceRender,
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: 'Insights',
      key: 'alerts',
      width: 30,
      align: 'center',
      sorter: false,
      sortOrder: sortOrder(sorting, 'alerts'),
      render: insightRender,
    },
  ];
  return columns;
};

const useProductListTableColumns = (sorting: Sorting<ProductFinderInfo>): [ColumnConfig[]] => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const history = useHistory();
  localStorage.setItem("URL", history.location.search)
  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting));
    }
  }, [sorting]);

  return [columns];
};

export default useProductListTableColumns;
