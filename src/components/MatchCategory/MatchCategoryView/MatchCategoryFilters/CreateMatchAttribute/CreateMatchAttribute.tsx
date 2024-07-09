import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CreateMatchAttribute.module.less';
import CreateMatchCategoryForm from './CreateMatchAttributeForm';
import { useCreateMatchAttribute } from 'src/api/matchAttribute';

type CreateMatchAttributeProps = {
  requestParams: any;
  setRequestParams: any;
};

const CreateMatchAttribute: React.FC<CreateMatchAttributeProps> = ({ requestParams, setRequestParams }) => {
  const [visible, setVisible] = useState(false);
  const [savedMatchCategory, setSavedMatchCategory] = useState(null);
  const onUpdate = () => {
    setRequestParams({ ...requestParams });
  };

  useCreateMatchAttribute(savedMatchCategory, onUpdate);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSavedMatchCategory(null);
  };

  const onCreateMatchCategory = (values: any) => {
    setVisible(false);
    setSavedMatchCategory(values);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} className={styles.create_new_button}>
        <FontAwesomeIcon icon={['fal', 'plus']} className={styles.chevronDown} size="lg" />
        Create New Match Attribute
      </Button>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        height={'100%'}
        className={styles.create_new_drawer}
      >
        <Button onClick={onClose} className={styles.close_button} type="link">
          <FontAwesomeIcon onClick={showDrawer} icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
        </Button>
        {visible && <CreateMatchCategoryForm onSave={onCreateMatchCategory} />}
      </Drawer>
    </>
  );
};

export default CreateMatchAttribute;
