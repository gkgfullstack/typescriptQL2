import React from 'react';
import styles from './BackLink.module.less';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type BackLinkProps = {
  url: string;
  text: string;
};

const BackLink: React.FC<BackLinkProps> = ({ url, text }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const schema = urlParams.get('schema')?.toString();

  return (
    <>
      {schema && (
        <div className={styles.back_link_container}>
          <Link className={styles.back_link} to={url}>
            <FontAwesomeIcon icon={['far', 'chevron-left']} size={'xs'} className={styles.back_icon} />
            <span className={styles.back_link_text}>{text}</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default BackLink;
