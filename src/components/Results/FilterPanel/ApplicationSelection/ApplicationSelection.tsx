import React from 'react';
import Select from 'src/components/common/Select';
//import Owner from 'src/types/Owner';
import ApplicationFilterType from 'src/types/ApplicationFilterType';
import useApplicationFetch from './hooks/useApplicationFetch';
import { SelectValue } from 'antd/lib/select';

import styles from './ApplicationSelection.module.less';
import clsx from 'clsx';


const { Option } = Select;

type ApplicationSelectionProps = {
  value?: string;
  onChange?: (value: SelectValue) => void;
};

const ApplicationSelection: React.FC<ApplicationSelectionProps> = ({ value, onChange }: ApplicationSelectionProps) => {
  const [{ data, loading, error }] = useApplicationFetch();
  const _value =
    !loading && !error
      ? value &&
        data &&
        data.some((appId: ApplicationFilterType) => {
          return appId.ID === value;
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
      placeholder={'Type: All'}
    >
       <Option value={'-1'} key={`_appId_001`}>
               All
      </Option>

      {data &&
        data.map(
          (appId: ApplicationFilterType): React.ReactNode => {            
            return (              
              <Option value={appId.ID} key={`_appId_${appId.ID}`}>
                {appId.name}
              </Option>
            );
          }
        )}
    </Select>
  );
};

export default ApplicationSelection;
