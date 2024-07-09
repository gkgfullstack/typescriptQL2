import React from 'react';
import SelectVerticalType from 'src/types/SelectVerticalType';
import useApplicationFetch from './hooks/useSelectVerticalFetch';
import { SelectValue } from 'antd/lib/select';

import styles from './SelectVertical.module.less';
import clsx from 'clsx';
import { Radio } from 'antd';

type ApplicationSelectionProps = {
  value?: string;
  onChange?: (value: SelectValue) => void;
};

const SelectVertical: React.FC<ApplicationSelectionProps> = () => {
  const [{ data, error }] = useApplicationFetch();

  return (
    <>
      <Radio.Group defaultValue="aeWatch" buttonStyle="solid" className={clsx(styles.owner, { [styles.error]: error })}>
        {data &&
          data.map(
            (appId: SelectVerticalType): React.ReactNode => {
              return (
                <Radio.Button value={appId.ID} key={`_appId_${appId.ID}`}>
                  {appId.name}
                </Radio.Button>
              );
            }
          )}
      </Radio.Group>
    </>
  );
};

export default SelectVertical;
