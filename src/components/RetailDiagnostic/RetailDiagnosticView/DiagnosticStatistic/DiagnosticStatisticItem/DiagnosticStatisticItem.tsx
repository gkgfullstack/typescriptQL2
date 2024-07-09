import React, { ReactElement } from 'react';
import { Col, Popover } from 'antd';
import styles from '../DiagnosticStatistic.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type DiagnosticStatisticItemProps = {
  title: string;
  count: number;
  tooltip: string | ReactElement;
};

const DiagnosticStatisticItem: React.FC<DiagnosticStatisticItemProps> = ({ title, count, tooltip }) => {
  return (
    <Col span={8} className="gutter-row">
      <div className={styles.diagnostic_statistic_block}>
        <Popover content={tooltip} trigger={'hover'} placement="top">
          <FontAwesomeIcon icon={['fal', 'info-circle']} className={styles.diagnostic_statistic_icon} />
        </Popover>
        <h2 className={styles.diagnostic_statistic_title}>{title}</h2>
        <h1 className={styles.diagnostic_statistic_count}>{count}</h1>
      </div>
    </Col>
  );
};

export default DiagnosticStatisticItem;
