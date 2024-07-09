import React, { useState } from 'react';
import styles from './ConfigurationSiteRegionView.module.less';
import ConfigurationSiteRegionTable from './ConfigurationSiteRegionTable';
import ConfigureSiteRegionModal from './ConfigureSiteRegionModal';
import { useCreateNewConfigureRegion } from 'src/api/configureRegions';
import ConfigureRegionQueryParams from 'src/types/ConfigureRegionQueryParams';
import { ConfigureClientSitesTableInfo } from 'src/types/ConfigureClientSitesTableInfo';
import SiteInfo from 'src/components/common/SiteInfo';

type ConfigurationSiteRegionViewProps = {
  site: ConfigureClientSitesTableInfo;
};

const ConfigurationSiteRegionView: React.FC<ConfigurationSiteRegionViewProps> = ({ site }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const clientId = urlParams.get('clientId')?.toString();
  const schema = urlParams.get('schema')?.toString();
  const [requestParams, setRequestParams] = useState<ConfigureRegionQueryParams>({});
  const [regionModalVisible, setRegionModalVisible] = useState(false);
  const [region, setRegion] = useState<any>(null);
  const onUpdateRegionList = () => {
    const newParams = { ...requestParams };
    setRequestParams(newParams);
    setRegion(null);
  };
  const [savedRegion, setSavedRegion] = useState<any>(null);
  useCreateNewConfigureRegion(clientId, savedRegion, onUpdateRegionList);

  const openRegionModal = () => {
    setRegion({});
    setRegionModalVisible(true);
  };

  const onEditRegion = (region: any) => {
    setRegionModalVisible(true);
    setRegion(region);
  };

  const onChangeStatus = (region: any) => {
    return () => {
      const newRegion = { ...region };
      newRegion.active = !region.active;
      setSavedRegion(newRegion);
    };
  };

  return (
    <>
      <h1 className={styles.region_title}>Site Regions</h1>
      <div className={styles.add_region_wrapper}>
        <SiteInfo site={site} schema={schema} />
      </div>
      <ConfigurationSiteRegionTable
        clientId={clientId}
        schema={schema}
        siteId={site.ID}
        onChangeStatus={onChangeStatus}
        onEditRegion={onEditRegion}
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        openRegionModal={openRegionModal}
      />
      <ConfigureSiteRegionModal
        clientId={clientId}
        site={site}
        schema={schema}
        region={region}
        visible={regionModalVisible}
        setVisible={setRegionModalVisible}
        onUpdate={onUpdateRegionList}
      />
    </>
  );
};

export default ConfigurationSiteRegionView;
