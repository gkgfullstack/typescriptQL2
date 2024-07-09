import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SiteRegions.module.less';
import SiteRegionView from './SiteRegionView';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

type SiteRegionsProps = {
  schema: string | undefined;
  site: SiteManagementInfo;
  visible: boolean;
  setVisible: any;
};

const SiteRegions: React.FC<SiteRegionsProps> = ({ schema, visible, setVisible, site }) => {
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        height={'100%'}
        className={styles.regions_drawer}
      >
        <Button onClick={onClose} className={styles.region_close_button} type="link">
          <FontAwesomeIcon icon={['fal', 'times']} className={styles.region_close_icon} size={'3x'} />
        </Button>
        {visible && <SiteRegionView site={site} schema={schema} />}
      </Drawer>
    </>
  );
};

export default SiteRegions;
