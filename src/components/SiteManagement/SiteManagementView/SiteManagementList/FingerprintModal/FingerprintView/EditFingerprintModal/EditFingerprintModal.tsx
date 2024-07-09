import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EditFingerprintModal.module.less';
import EditFingerprintForm from './EditFingerprintForm';
import { useEditFingerprint } from 'src/api/fingerPrintFilter';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import FingerprintInfo from 'src/types/FingerprintInfo';

type EditFingerprintModalProps = {
  schema: string | undefined;
  site: SiteManagementInfo;
  fingerprint: FingerprintInfo;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onUpdate: () => void;
};

const EditFingerprintModal: React.FC<EditFingerprintModalProps> = ({
  schema,
  site,
  fingerprint,
  visible = false,
  setVisible,
  onUpdate,
}) => {
  const [editedFingerprint, setEditedFingerprint] = useState<any>(null);
  useEditFingerprint(schema, editedFingerprint, onUpdate);

  const onClose = () => {
    setVisible(false);
  };

  const onEditFingerprint = (values: FingerprintInfo) => {
    const newFingerprint: FingerprintInfo = {
      ...values,
      ownerId: Number(site.ID),
      metadataIds: values.metadataIds.map((item: string) => Number(item)),
    };
    setVisible(false);
    setEditedFingerprint(newFingerprint);
  };

  return (
    <>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        height={'100%'}
        className={styles.create_new_fingerprint_drawer}
      >
        <Button onClick={onClose} className={styles.close_button} type="link">
          <FontAwesomeIcon icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
        </Button>
        {visible && (
          <EditFingerprintForm site={site} schema={schema} fingerprint={fingerprint} onSave={onEditFingerprint} />
        )}
      </Drawer>
    </>
  );
};

export default EditFingerprintModal;
