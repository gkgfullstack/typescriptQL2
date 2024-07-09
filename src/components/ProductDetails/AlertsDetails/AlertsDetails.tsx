import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useProductAlerts from '../hooks/useProductAlerts';
import { Alert, Icon, Spin } from 'antd';
import styles from './AlertsDetails.module.less';
import WidgetCollapsable from 'src/components/common/WidgetCollapsable';
//import { InfoAlerts } from 'src/types/InfoAlerts';

const antIcon = <Icon type="loading" spin />;

type AlertsDetailsProps = {
  sourceOwnerId:string; 
  matchTypeFilter:string; 
  region:string; 
  priceType:string;
};
type AlertWidgetProps = {
  data: string[];
  type: 'alerts' | 'insights' ;
};

const AlertWidget: React.FC<AlertWidgetProps> = ({ data, type}: AlertWidgetProps) => {
  return (
    <div className={styles.alert_wrapper}>
      <div className={styles.alert_header}>
        <FontAwesomeIcon
          icon={['fas', 'exclamation-triangle']}
          size={'sm'}
          className={type === 'alerts' ? 'alert_icon' : 'insight_icon'}
        />
        <span>{type.toLocaleUpperCase()}</span>
      </div>
      {data.map((option, index) => (
        <div className={styles.alert_element} key={index}>
          - {option}
        </div>
      ))}
    </div>
  );
};

const AlertsDetails: React.FC<AlertsDetailsProps> = ({sourceOwnerId}) => {
  const [{ data: infoAlerts, loading: loadingAlerts, error: alertsError }] = useProductAlerts(sourceOwnerId);
  return (
	<>
    {sourceOwnerId && (
    <WidgetCollapsable title={'Insights/Alerts'} collapsed={true} defaultCollapsed={true}>
      {loadingAlerts && !alertsError && (
        <div className={styles.alerts_loading_wrapper}>
          <Spin indicator={antIcon} size={'large'} spinning={loadingAlerts} />
        </div>
      )}
      {alertsError && (
        <Alert
          message="Error"
          description="An error
        has occurred when trying to get alerts information! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {infoAlerts &&
      ((infoAlerts.productInsight.insights && infoAlerts.productInsight.insights.length > 0) ||
        (infoAlerts.productInsight.alerts && infoAlerts.productInsight.alerts.length > 0)) ? (
        <>
          {infoAlerts.productInsight.insights && infoAlerts.productInsight.insights.length > 0 && (
            <AlertWidget data={infoAlerts.productInsight.insights} type="insights" />
          )}
          {infoAlerts.productInsight.alerts && infoAlerts.productInsight.alerts.length > 0 && <AlertWidget data={infoAlerts.productInsight.alerts} type="alerts" />}
        </>
      ) : (
        <div className={styles.alerts_empty_data}>
          <p>There are no insights or alerts for this product at this time.</p>
        </div>
      )}
    </WidgetCollapsable>
	 )}
    </>
  );
};
export default AlertsDetails;
