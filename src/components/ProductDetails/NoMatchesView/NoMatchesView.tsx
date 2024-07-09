import React from 'react';
import AddMatch from '../AddMatch/AddMatch';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './NoMatchesView.module.less';

type NoMatchesViewProps = {};

const NoMatchesView: React.FC<NoMatchesViewProps> = () => {
  return (
    <div className={styles.no_matches_container}>
      <p>There are no matches for this product yet.</p>
      <div className={styles.add_match_request}>
        <AddMatch>
          <Button type={'ghost'} className={styles.link}>
            <span className={styles.label}>Request a match now</span>
            <FontAwesomeIcon icon={['fal', 'plus-circle']} className={styles.icon} />
          </Button>
        </AddMatch>
      </div>
    </div>
  );
};

export default NoMatchesView;
