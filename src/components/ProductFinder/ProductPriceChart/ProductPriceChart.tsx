import React, { useEffect, useState } from 'react';
import styles from './ProductPriceChart.module.less';
import { CURRENCY } from 'src/enums';
import FormattedNumber from 'src/components/common/FormattedNumber';
import { getVarianceColor } from 'src/utils';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

export type PriceVariance = {
  id?: string | number;
  currency: keyof typeof CURRENCY;
  maxValue: number;
  median: number;
  minValue: number;
  price: number;
  variance: string;
  varianceMetric: string;
  lowestMedian: number;
  lowestMaxValue: number;
  lowestMinValue: number;
  lowestPrice: number;
  lowestVariance:string;
};

const ProductPriceChart: React.FC<PriceVariance> = ({
  currency, 
  maxValue,
  median,
  minValue,
  price,
  variance,
  varianceMetric,
  lowestMedian,
  lowestMaxValue,
  lowestMinValue,
  lowestPrice,
  lowestVariance,
}: PriceVariance) => {
  const  { priceType } = useQueryUrlParams(); 
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  const accentColor = getVarianceColor(initialPriceTypeIds !== '2' ? variance : lowestVariance);
  const [pointCssValue, setPointCssValue] = useState(0);
  const [medianCssValue, setMedianCssValue] = useState(0);
  const [lowestPointCssValue, setlowestPointCssValue] = useState(0);
  const [lowestMedianCssValue, setlowestMedianCssValue] = useState(0);
  const positionLeft =
  price === maxValue
      ? `calc(${pointCssValue}% - 5px)`
      : price === minValue
      ? `calc(${pointCssValue}% - 2px)`
      : `${pointCssValue}%`;
  
  const positionLeftlowest =
  lowestPrice === lowestMaxValue
        ? `calc(${lowestPointCssValue}% - 5px)`
        : lowestPrice === lowestMinValue
        ? `calc(${lowestPointCssValue}% - 2px)`
        : `${lowestPointCssValue}%`;
  useEffect(() => {
    const currValuePercent = (price / maxValue) * 100;
    const medianValuePercent = (median / maxValue) * 100;
    const lowestCurrValuePercent = (lowestPrice / lowestMaxValue)* 100;
    const lowestMedianValuePercent = (lowestMedian / lowestMaxValue)* 100;
    setPointCssValue(currValuePercent);
    setMedianCssValue(medianValuePercent);
    setlowestPointCssValue(lowestCurrValuePercent)
    setlowestMedianCssValue(lowestMedianValuePercent)
  }, [price, maxValue, median, lowestMaxValue, lowestMedian, lowestPrice]);
  const pricevarian =  `${Number.parseFloat(initialPriceTypeIds !== '2' ? (variance) : lowestVariance).toFixed()}`
  const priceVarianData = (isNaN(Number(pricevarian))) ? 'N/A' : `${pricevarian} ${varianceMetric} `
  return (
    <div className={styles.price_chart_container}>
      <div className={styles.price_chart_header}>
        Median&nbsp;
        <FormattedNumber
          type="currency"
          className={styles.price_chart_median_value}
          value={initialPriceTypeIds !== '2' ? median : lowestMedian }
          currency={currency}
        />
      </div>
      <div className={styles.price_chart_content}>
        <div className={styles.price_chart_label}>
          <FormattedNumber type="currency" value={initialPriceTypeIds !== '2' ? minValue : lowestMinValue } currency={currency} />
        </div>
        <div className={styles.price_chart}>
          <div className={styles.price_chart_median} style={{ left: `${initialPriceTypeIds !== '2' ? medianCssValue : lowestMedianCssValue}%` }}>
            <div className={styles.price_chart_median_line} />
          </div>
          <div className={styles.price_chart_slider}>
            <div className={styles.price_chart_pointer} style={{ left: initialPriceTypeIds !== '2' ? positionLeft : positionLeftlowest, backgroundColor: accentColor }} />
          </div>
        </div>
        <div className={styles.price_chart_label}>
          <FormattedNumber type="currency" value={initialPriceTypeIds !== '2' ? maxValue : lowestMaxValue} currency={currency} />
        </div>
      </div>
      <div className={styles.price_chart_footer}>
        Variance:&nbsp;
        <span className={styles.price_chart_variance} style={{ color: accentColor }}>
          {Number(initialPriceTypeIds !== '2' ? variance : lowestVariance) > 0 && '+' }
         {/* {variance} */}
          {/* {pricevarian} */}
          {priceVarianData}
          {/* {varianceMetric} */}
        </span>
      </div>
    </div>
  );
};

export default ProductPriceChart;
