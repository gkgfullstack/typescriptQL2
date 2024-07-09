import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EditMatchCategoryModal.module.less';
import EditMatchCategoryForm from './EditMatchCategoryForm';
import { useCreateMatchCategory } from 'src/api/matchCategory';

type EditMatchCategoryModalProps = {
  visible: boolean;
  setVisible: any;
  matchCategory: any;
  onUpdate: any;
  onEdit: any;
};

const EditMatchCategoryModal: React.FC<EditMatchCategoryModalProps> = ({
  visible,
  setVisible,
  matchCategory,
  onUpdate,
  onEdit,
}) => {
  const [editedMatchCategory, setEditedMatchCategory] = useState(null);
  useCreateMatchCategory(editedMatchCategory, onUpdate);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    onEdit(null);
  };
  const onEditMatchCategory = (values: any) => {
    setEditedMatchCategory(values);
    onClose();
  };

  return (
    <Drawer
      placement="bottom"
      closable={false}
      onClose={onClose}
      visible={visible}
      height={'100%'}
      className={styles.create_new_match_category_drawer}
    >
      <Button onClick={onClose} className={styles.close_button} type="link">
        <FontAwesomeIcon onClick={showDrawer} icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
      </Button>
      {visible && <EditMatchCategoryForm onSave={onEditMatchCategory} matchCategory={matchCategory} />}
    </Drawer>
  );
};

export default EditMatchCategoryModal;
