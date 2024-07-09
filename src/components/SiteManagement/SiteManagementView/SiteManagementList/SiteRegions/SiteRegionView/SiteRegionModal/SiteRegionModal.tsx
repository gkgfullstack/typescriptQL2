import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SiteRegionModal.module.less';
import ConfigureSiteRegionForm from './SiteRegionForm';
import { useCreateNewConfigureRegion } from 'src/api/configureRegions';

type ConfigureSiteRegionModalProps = {
  site: any;
  region: any;
  schema: string | undefined;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onUpdate: any;
};

const SiteRegionModal: React.FC<ConfigureSiteRegionModalProps> = ({
  site,
  region,
  schema,
  visible = false,
  setVisible,
  onUpdate,
}) => {
  const [savedRegion, setSavedRegion] = useState<any>(null);
  useCreateNewConfigureRegion(undefined, savedRegion, onUpdate, schema);

  const onClose = () => {
    setVisible(false);
  };

  const onCreateRegion = (values: any) => {
    const newRegion: any = {
      ...values,
    };
    setSavedRegion(newRegion);
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
        className={styles.create_new_region_drawer}
      >
        <Button onClick={onClose} className={styles.close_button} type="link">
          <FontAwesomeIcon icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
        </Button>
        {visible && <ConfigureSiteRegionForm site={site} schema={schema} region={region} onSave={onCreateRegion} />}
      </Drawer>
    </>
  );
};

export default SiteRegionModal;
