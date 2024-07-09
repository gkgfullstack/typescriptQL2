import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Drawer } from 'antd';
import styles from './CreateCompetitiveSets.module.less';
import CreateCompetitiveSetsForm from 'src/components/SettingsPage/CompetitiveSets/CompetitiveSetsView/CreateCompetitiveSets/CreateCompetitiveSetsForm/CreateCompetitiveSetsForm';
import { CompetitiveSetInfo } from 'src/types/CompetitiveSetInfo';

type CreateCompetitiveSetsProps = {
  record?: CompetitiveSetInfo;
  isEditable?: boolean;
  visibleModal?: boolean;
  setVisibleModal?: (visibleModal: boolean) => void;
};

const CreateCompetitiveSets: React.FC<CreateCompetitiveSetsProps> = ({
  record,
  isEditable,
  visibleModal,
  setVisibleModal,
}: CreateCompetitiveSetsProps) => {
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    if (visibleModal && setVisibleModal) {
      setVisible(true);
      setVisibleModal(false);
    }
  }, [visibleModal]);

  const onClose = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <React.Fragment>
      {!isEditable && (
        <Button type="primary" className={styles.compset_button} onClick={showModal}>
          <FontAwesomeIcon icon={['fal', 'plus']} size="lg" className={styles.compset_button_icon} />
          Create New Competitive Set
        </Button>
      )}
      <Drawer
        placement="bottom"
        closable={true}
        onClose={onClose}
        visible={visible}
        height={'100%'}
        className={styles.create_new_compset_drawer}
      >
        <CreateCompetitiveSetsForm isEditable record={record} />
      </Drawer>
    </React.Fragment>
  );
};

export default CreateCompetitiveSets;
