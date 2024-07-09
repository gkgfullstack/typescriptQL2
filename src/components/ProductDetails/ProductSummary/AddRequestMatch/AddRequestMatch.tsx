import React from 'react';
import clsx from 'clsx';

import styles from './AddRequestMatch.module.less';
import AddMatch from '../../AddMatch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';

type AddRequestMatchProps = {
  className?: string;
};

const AddRequestMatch: React.FC<AddRequestMatchProps> = ({ className }: AddRequestMatchProps) => {
  return (
    <span className={clsx(styles.container, className)}>
      <AddMatch>
        <Button type={'ghost'} className={styles.link}>
          <FontAwesomeIcon icon={['fal', 'plus-circle']} className={styles.icon} />
          <span className={styles.label}>Request Match</span>
        </Button>
      </AddMatch>
    </span>
  );
};

export default AddRequestMatch;
