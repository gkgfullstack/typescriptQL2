import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ConfigureSiteRegionModal.module.less';
import ConfigureSiteRegionForm from './ConfigureSiteRegionForm';
import { useCreateNewConfigureRegion } from 'src/api/configureRegions';

type ConfigureSiteRegionModalProps = {
  clientId: string | undefined;
  site: any;
  schema: string | undefined;
  region: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onUpdate: any;
};

const ConfigureSiteRegionModal: React.FC<ConfigureSiteRegionModalProps> = ({
  clientId,
  site,
  schema,
  region,
  visible = false,
  setVisible,
  onUpdate,
}) => {
  const [savedRegion, setSavedRegion] = useState<any>(null);
  useCreateNewConfigureRegion(clientId, savedRegion, onUpdate);

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
        {visible && (
          <ConfigureSiteRegionForm
            clientId={clientId}
            site={site}
            region={region}
            schema={schema}
            onSave={onCreateRegion}
          />
        )}
      </Drawer>
    </>
  );
};

export default ConfigureSiteRegionModal;
