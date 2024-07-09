import React from 'react';
import styles from './ConfigurationClientDetails.module.less';
import ConfigurationClientDetailsForm from './ConfigurationClientDetailsForm';
import ConfigurationDeliveryInfoForm from './ConfigurationDeliveryInfoForm';
import { IndustryContext } from 'src/services/IndustryContext';

type ConfigurationClientDetailsProps = {
  clientId: string | undefined;
};

const ConfigurationClientDetails: React.FC<ConfigurationClientDetailsProps> = ({ clientId }) => {
  return (
    <div className={styles.configuration_client_panel}>
      <h2>Client Details</h2>
      <IndustryContext.Consumer>
        {({ updateIndustry }) => <ConfigurationClientDetailsForm clientId={clientId} updateIndustry={updateIndustry} />}
      </IndustryContext.Consumer>
      <h2>Delivery information</h2>
      <ConfigurationDeliveryInfoForm clientId={clientId} />
    </div>
  );
};

export default ConfigurationClientDetails;
