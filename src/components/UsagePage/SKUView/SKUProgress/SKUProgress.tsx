import React from 'react';
import styles from './SKUProgress.module.less';
import { Progress } from 'antd';
import Spin from 'src/components/common/Spin';
import { useGetSKUStatistics } from 'src/api/SKU';

type SKUProgressProps = {};

const SKUProgress: React.FC<SKUProgressProps> = () => {
  const [loading, SKUStatistics] = useGetSKUStatistics();
  const totalContractedSKU = (SKUStatistics.contractActiveSkusCount / SKUStatistics.allottedAnnualSkusCount) * 100;
  const currentActiveSKU = (SKUStatistics.currentActiveSkusCount / SKUStatistics.contractActiveSkusCount) * 100;

  const getPercent = (percent: number) => {
    if (percent) {
      return Number(percent.toFixed(2));
    }
    return undefined;
  };

  const getNumber = (name: string, value?: number) => {
    if (SKUStatistics[name]) {
      return SKUStatistics[name].toLocaleString('en');
    }
    if (value) {
      return value.toLocaleString('en');
    }
    return undefined;
  };

  const unusedSkusCount = getNumber('', SKUStatistics.contractActiveSkusCount - SKUStatistics.currentActiveSkusCount);

  return (
    <div className={styles.sku_progress_wrapper}>
      <Spin spinning={loading}>
        <p className={styles.sku_progress_label}>Total Contract Active SKU Usage</p>
        <Progress
          percent={getPercent(totalContractedSKU)}
          format={(percent: number | undefined) => (
            <>
              <b>{percent ? percent : '0'}%</b>
            </>
          )}
          strokeColor={'#002D74'}
          strokeWidth={4}
          width={200}
        />
        <p className={styles.usage_progress_text}>
          {getNumber('contractActiveSkusCount')} SKUs remaining of {getNumber('allottedAnnualSkusCount')} total
          Contracted SKUs
        </p>
        <p className={styles.sku_active_label}>Current Active SKU Count</p>
        <Progress
          percent={getPercent(currentActiveSKU)}
          format={(percent: number | undefined) => (
            <>
              <b>{percent ? percent : ''}%</b>
            </>
          )}
          strokeColor={'#002D74'}
          strokeWidth={4}
          width={200}
        />
        <p className={styles.usage_progress_text}>
          {unusedSkusCount} unused capacity of {getNumber('contractActiveSkusCount')} total Active SKUs
        </p>
      </Spin>
    </div>
  );
};

export default SKUProgress;
