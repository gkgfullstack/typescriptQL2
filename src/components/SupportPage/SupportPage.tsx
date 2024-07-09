import React from 'react';
import SupportForm from './SupportForm';
import styles from './SupportPage.module.less';
import { useSupportHelpPostFetch } from './hooks';

type SupportFormProps = {
  value?: any;
  onClose?: () => void;
};

const SupportPage: React.FC<SupportFormProps> = ({ value, onClose }: SupportFormProps) => {
  const [{}, { projectTaskPojo }]: any = useSupportHelpPostFetch();

  const addUpdateName = (values: any): void => {
    if (values) {
      projectTaskPojo(values);
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className={styles.product_summary}>
      <div className={styles.actions_container}>
        <SupportForm onUpdate={addUpdateName} value={value} />
      </div>
    </div>
  );
};

export default SupportPage;
