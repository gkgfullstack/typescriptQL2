import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../TablePageList.module.less';
import { faEdit, faDna } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import UserContex from 'src/services/UserContex';

const faEditIcon = faEdit as IconProp;
const faDnaIcon = faDna as IconProp;

type MetadataModalProps = {};

const ActionRenderww: React.FC<MetadataModalProps> = () => { 
  const ActionRender = (record: any, actionRender: any) => {
    const onIconClick = (type: string) => {
      return () => {
        actionRender(record, type);
      };
    };
    let decodedDownloadUrl = decodeURIComponent(record.downloadUrl);
    const urldownload= UserContex.getBaseUrl()+decodedDownloadUrl 

  return (
    <>
    <div style={{clear:'both', display:'table'}}></div>
      <FontAwesomeIcon
        icon={faEditIcon}
        className={styles.action_icon}
        title={'Edit Metadata'}
        onClick={onIconClick('metadata')}
      />
      <FontAwesomeIcon
        icon={faDnaIcon}
        className={styles.action_icon}
        title={'Delete'}
        onClick={onIconClick('delete')}
      />
      <a href={urldownload} target="_blank" rel="download">Download</a>     
      <FontAwesomeIcon
        icon={faDnaIcon}
        className={styles.action_icon}
        title={'Audit'}
        onClick={onIconClick('audit')}
      />
      <FontAwesomeIcon
        icon={faDnaIcon}
        className={styles.action_icon}
        title={'Upload'}
        onClick={onIconClick('upload')}
      />
      <FontAwesomeIcon
        icon={faDnaIcon}
        className={styles.action_icon}
        title={'Clear'}
        onClick={onIconClick('clear')}
      />
      
    </>
  );
};
return (<> <ActionRender /></>
)
};

export default ActionRenderww;


