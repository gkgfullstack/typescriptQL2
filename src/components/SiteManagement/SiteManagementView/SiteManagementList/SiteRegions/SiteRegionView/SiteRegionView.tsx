import React, { useState } from 'react';
import styles from './SiteRegionView.module.less';
import SiteRegionTable from './SiteRegionTable';
import SiteRegionModal from './SiteRegionModal';
import { useCreateNewConfigureRegion } from 'src/api/configureRegions';
import ConfigureRegionQueryParams from 'src/types/ConfigureRegionQueryParams';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import SiteInfo from 'src/components/common/SiteInfo';

type ConfigurationSiteRegionViewProps = {
  site: SiteManagementInfo;
  schema: string | undefined;
};

const SiteRegionView: React.FC<ConfigurationSiteRegionViewProps> = ({ site, schema }) => {
  const [requestParams, setRequestParams] = useState<ConfigureRegionQueryParams>({});
  const [regionModalVisible, setRegionModalVisible] = useState(false);
  const [region, setRegion] = useState<any>(null);
  const onUpdateRegionList = () => {
    const newParams = { ...requestParams };
    setRequestParams(newParams);
    setRegion(null);
  };
  const [savedRegion, setSavedRegion] = useState<any>(null);
  useCreateNewConfigureRegion(undefined, savedRegion, onUpdateRegionList, schema);

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
      <SiteRegionTable
        siteId={site.ID}
        schema={schema}
        onChangeStatus={onChangeStatus}
        onEditRegion={onEditRegion}
        requestParams={requestParams}
        setRequestParams={setRequestParams}
        openRegionModal={openRegionModal}
      />
      <SiteRegionModal
        site={site}
        region={region}
        schema={schema}
        visible={regionModalVisible}
        setVisible={setRegionModalVisible}
        onUpdate={onUpdateRegionList}
      />
    </>
  );
};

export default SiteRegionView;
