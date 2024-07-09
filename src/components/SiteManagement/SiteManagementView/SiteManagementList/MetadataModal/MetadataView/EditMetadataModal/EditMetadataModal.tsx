import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EditMetadataModal.module.less';
import EditMetadataForm from './EditMetadataForm';
import { useEditSiteMetadata } from 'src/api/siteMetadata';
import MetadataInfo from 'src/types/MetadataInfo';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

type EditMetadataModalProps = {
  site: SiteManagementInfo;
  schema: string | undefined;
  metadata: MetadataInfo;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onUpdate: any;
};

const EditMetadataModal: React.FC<EditMetadataModalProps> = ({
  site,
  metadata,
  schema,
  visible = false,
  setVisible,
  onUpdate,
}) => {
  const [editedMetadata, setEditedMetadata] = useState<any>(null);
  useEditSiteMetadata(editedMetadata, onUpdate, schema);

  const onClose = () => {
    setVisible(false);
  };

  const onEditMetadata = (values: any) => {
    const newMetadata: MetadataInfo = {
      ...values,
      owner: {
        ID: Number(site.ID),
      },
    };
    setEditedMetadata(newMetadata);
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
        className={styles.create_new_metadata_drawer}
      >
        <Button onClick={onClose} className={styles.close_button} type="link">
          <FontAwesomeIcon icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
        </Button>
        {visible && <EditMetadataForm site={site} schema={schema} metadata={metadata} onSave={onEditMetadata} />}
      </Drawer>
    </>
  );
};

export default EditMetadataModal;
