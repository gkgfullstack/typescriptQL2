import React, { useEffect, useState } from 'react';
import styles from './RegularProductPriceChart.module.less';
import { CURRENCY } from 'src/enums';
import FormattedNumber from 'src/components/common/FormattedNumber';
import { getVarianceColor } from 'src/utils';

export type PriceVariancelowest = {
  id?: string | number;
  lowestMinValue: number;
  lowestMaxValue: number;
  lowestMedian: number;
  lowestPrice: number;
  lowestVariance: any;
  varianceMetric: string;
  currency: keyof typeof CURRENCY;
  
};

const RegularProductPriceChart: React.FC<PriceVariancelowest> = ({
  lowestMaxValue,
  lowestMinValue,
  lowestPrice,
  lowestMedian,
  currency,
  lowestVariance,
  varianceMetric
}: PriceVariancelowest) => {
  const accentColor = getVarianceColor(lowestVariance);
  const [pointCssValue, setPointCssValue] = useState(0);
  const [medianCssValue, setMedianCssValue] = useState(0);
  const positionLeft =
  lowestVariance === lowestMaxValue
      ? `calc(${pointCssValue}% - 5px)`
      : lowestPrice === lowestMinValue
      ? `calc(${pointCssValue}% - 2px)`
      : `${pointCssValue}%`;
  useEffect(() => {
    const currValuePercent = (lowestPrice / lowestMaxValue) * 100;
    const medianValuePercent = (lowestMedian / lowestMaxValue) * 100;
    setPointCssValue(currValuePercent);
    setMedianCssValue(medianValuePercent);
  }, [lowestPrice, lowestMaxValue, lowestMedian]);
  const pricevarian =  `${Number.parseFloat(lowestVariance).toFixed()}`
  return (
    <div className={styles.price_chart_container}>
      <div className={styles.price_chart_header}>
        Median&nbsp;
        <FormattedNumber
          type="currency"
          className={styles.price_chart_median_value}
          value={lowestMedian}
          currency={currency}
        />
      </div>
      <div className={styles.price_chart_content}>
        <div className={styles.price_chart_label}>
          <FormattedNumber type="currency" value={lowestMinValue} currency={currency} />
        </div>
        <div className={styles.price_chart}>
          <div className={styles.price_chart_median} style={{ left: `${medianCssValue}%` }}>
            <div className={styles.price_chart_median_line} />
          </div>
          <div className={styles.price_chart_slider}>
            <div className={styles.price_chart_pointer} style={{ left: positionLeft, backgroundColor: accentColor }} />
          </div>
        </div>
        <div className={styles.price_chart_label}>
          <FormattedNumber type="currency" value={lowestMaxValue} currency={currency} />
        </div>
      </div>
      <div className={styles.price_chart_footer}>
        Variance:&nbsp;
        <span className={styles.price_chart_variance} style={{ color: accentColor }}>
          {Number(lowestVariance) > 0 && '+' }
          {/* {variance} */}
          {pricevarian}
          {varianceMetric}
        </span>
      </div>
    </div>
  );
};

export default RegularProductPriceChart;
