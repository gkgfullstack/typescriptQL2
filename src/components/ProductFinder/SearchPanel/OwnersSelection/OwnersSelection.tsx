import React from 'react';
import Select from 'src/components/common/Select';
import Owner from 'src/types/Owner';
import useOwnersFetch from './hooks/useOwnersFetch';
import { SelectValue } from 'antd/lib/select';

import styles from './OwnersSelection.module.less';
import clsx from 'clsx';

const { Option } = Select;

type OwnersSelectionProps = {
  value?: string;
  onChange?: (value: SelectValue) => void;
};

const OwnersSelection: React.FC<OwnersSelectionProps> = ({ value, onChange }: OwnersSelectionProps) => {
  const [{ data, loading, error }] = useOwnersFetch();
  let _value =
    !loading && !error
      ? value &&
        data &&
        data.some((owner: Owner) => {
          localStorage.setItem('ownerId', owner.id)
          return owner.id === value;
        })
        ? value
        : undefined
      : undefined; 
  
      
  return (
    <Select
      loading={loading}
      value={_value}
      disabled={!!error}
      onChange={onChange}
      className={clsx(styles.owner, { [styles.error]: error })}
      dropdownClassName={styles.owner_dropdown}
      placeholder={'Select Owner'}
    >
      {data &&
        data.map(
          (owner: Owner): React.ReactNode => {
            return (
              <Option value={owner.id} key={`_owner_${owner.id}`}>
                {owner.name}
              </Option>
            );
          }
        )}
    </Select>
  );
};

export default OwnersSelection;
