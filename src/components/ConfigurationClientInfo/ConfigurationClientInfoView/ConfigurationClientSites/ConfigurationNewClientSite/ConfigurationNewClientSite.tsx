import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ConfigurationNewClientSite.module.less';
import ConfigurationNewSiteForm from './ConfigurationNewSiteForm';
import { useCreateNewConfigureSite } from 'src/api/createNewConfigureSite';
import { ConfigureClientSitesTableInfo } from 'src/types/ConfigureClientSitesTableInfo';
import { useAddSiteToClient } from 'src/api/configureSiteList';

type ConfigurationNewClientSiteProps = {
  clientId: string | undefined;
  site: any;
  onUpdate: any;
  primaryStatus?: boolean;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const ConfigurationNewClientSite: React.FC<ConfigurationNewClientSiteProps> = ({
  clientId,
  site,
  primaryStatus,
  onUpdate,
  visible = false,
  setVisible,
}) => {
  const [savedSite, setSavedSite] = useState<any>(null);
  const [savedSiteID, setSavedSiteID] = useState<any>(null);
  const sourceSite = site ? (site.type !== 'Source' ? 0 : primaryStatus ? 2 : 1) : 0;
  const ownerClientLookup = {
    sourceSite,
    outlierDetectionInclusionFlag: true,
  };
  const onAddSite = (owner: any) => {
    setSavedSiteID(owner[0].ID);
    setVisible(false);
  };
  useCreateNewConfigureSite(clientId, savedSite, onUpdate, onAddSite);
  useAddSiteToClient(savedSiteID, clientId, ownerClientLookup, onUpdate);

  const onClose = () => {
    setVisible(false);
    setSavedSite(null);
  };

  const onCreateSite = (values: any) => {
    const newSite: ConfigureClientSitesTableInfo = {
      ...values,
    };
    setSavedSite(newSite);
    if (newSite.ID) {
      setVisible(false);
    }
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
        <Button onClick={onClose} style={{ float: 'right', position: 'absolute', right: '0' }} type="link">
          <FontAwesomeIcon
            icon={['fal', 'times']}
            style={{ cursor: 'pointer', marginRight: '10px' }}
            size={'3x'}
          />
        </Button>
        {visible && <ConfigurationNewSiteForm site={site} onSave={onCreateSite} />}
      </Drawer>
    </>
  );
};

export default ConfigurationNewClientSite;
