import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SiteManagementEditSite.module.less';
import SiteManagementEditSiteForm from './SiteManagementEditSiteForm';
import { useCreateNewSite } from 'src/api/createNewConfigureSite';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

type SiteManagementEditSiteProps = {
  site: SiteManagementInfo;
  schema: string | undefined;
  onUpdate: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const SiteManagementEditSite: React.FC<SiteManagementEditSiteProps> = ({
  site,
  schema,
  onUpdate,
  visible = false,
  setVisible,
}) => {
  const [savedSite, setSavedSite] = useState<any>(null);
  useCreateNewSite(savedSite, onUpdate, schema);

  const onClose = () => {
    setVisible(false);
    setSavedSite(null);
  };

  const onCreateSite = (values: any) => {
    const newSite: SiteManagementInfo = {
      ...values,
    };
    setSavedSite(newSite);
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
        className={styles.create_new_site_drawer}
      >
        <Button onClick={onClose} className={styles.close_button} type="link">
          <FontAwesomeIcon icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
        </Button>
        {visible && <SiteManagementEditSiteForm site={site} onSave={onCreateSite} />}
      </Drawer>
    </>
  );
};

export default SiteManagementEditSite;
