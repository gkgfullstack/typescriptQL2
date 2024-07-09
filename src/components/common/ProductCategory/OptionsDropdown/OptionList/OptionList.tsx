import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Option } from '../reducers/optionsDropdownReducer';
import Spin from 'src/components/common/Spin';
import clsx from 'clsx';

import styles from './OptionList.module.less';

export type OptionListProps = {
  options: Option[] | null;
  onChange: (option: Option) => void;
  onExpand: (option: Option) => void;
};

const OptionList: React.FC<OptionListProps> = ({ options, onChange, onExpand }: OptionListProps) => {
  return (
    <ul className={styles.options} tabIndex={-1}>
      {options &&
        options.map(
          (option: Option, index: number): React.ReactNode => {
            const loading = option.loading !== undefined && option.loading;
            return (
              <li
                className={clsx(styles.option, {
                  [styles.expanded]: option.expanded,
                  [styles.selected]: option.selected,
                  [styles.checked]: option.checked,
                })}
                key={`option_${index}`}
              >
                <span
                  className={styles.option_label}
                  onClick={() => {
                    onChange(option);
                  }}
                  tabIndex={-1}
                >
                  {option.checked && (
                    <FontAwesomeIcon icon={['far', 'check']} size={'sm'} className={styles.checked_icon} />
                  )}
                  {option.label}
                </span>
                {option.hasChildren && !loading && (
                  <span
                    className={styles.option_expand_icon}
                    onClick={() => {
                      onExpand(option);
                    }}
                    tabIndex={-1}
                  >
                    <FontAwesomeIcon icon={['far', 'chevron-right']} size={'sm'} />
                  </span>
                )}
                {option.hasChildren && loading && (
                  <Spin spinning={true} className={styles.option_loading_icon} size={'small'} />
                )}
              </li>
            );
          }
        )}
    </ul>
  );
};

export default OptionList;
