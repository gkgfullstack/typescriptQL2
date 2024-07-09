import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styles from './AddIndustry.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AddIndustryProps = {
  onUpdateIndustry: (name: string) => void;
  disabled?: boolean;
};

export const AddIndustry: React.FC<AddIndustryProps> = ({ onUpdateIndustry, disabled = false }: AddIndustryProps) => {
  const [addIndustry, setAddIndustry] = useState(false);
  const [industryName, setIndustryName] = useState('');

  const addItem = () => {
    if (disabled) {
      return false;
    }
    setAddIndustry(true);
  };

  const onNameChange = (event: any) => {
    setIndustryName(event.target.value);
  };

  const onAddIndustry = () => {
    setAddIndustry(false);
    onUpdateIndustry(industryName);
  };

  return (
    <div className={styles.add_industry_wrapper}>
      {addIndustry && !disabled && (
        <>
          <Input className={styles.add_industry_input} value={industryName} onChange={onNameChange} />
          <Button
            type="primary"
            onClick={onAddIndustry}
            className={styles.add_industry_button}
            title={'Create and Select Industry'}
          >
            Create Industry
          </Button>
        </>
      )}
      {(!addIndustry || disabled) && (
        <span
          className={styles.add_industry_link}
          style={{
            color: disabled ? 'gray' : '#6BA53A',
            cursor: disabled ? 'defaultpointer' : 'pointer',
          }}
          onClick={addItem}
        >
          <FontAwesomeIcon icon={['fal', 'plus']} className={styles.add_industry_icon} size="lg" />
          Add New Industry
        </span>
      )}
    </div>
  );
};

export default AddIndustry;
