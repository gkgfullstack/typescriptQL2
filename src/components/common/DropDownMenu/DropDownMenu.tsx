import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'antd';
import { TooltipPlacement, TooltipTrigger } from 'antd/lib/tooltip';
import styles from './DropDownMenu.module.less';

type DropDownMenuProps = {
  listData: Array<{
    icon?: React.ReactNode;
    label: React.ReactNode;
    onClick: () => void;
  }>;
  trigger?: TooltipTrigger;
  placement?: TooltipPlacement;
  children?: React.ReactNode;
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({ listData, trigger, placement, children }: DropDownMenuProps) => (
  <Popover
    content={
      <div className={styles.pop_over}>
        {listData.map(({ label, icon, onClick }, ind) => (
          <div key={ind} onClick={onClick} className={styles.list_item}>
            {icon ? (
              <>
                <div className={styles.icon}>{icon}</div>
                <div className={styles.label}>{label}</div>
              </>
            ) : (
              label
            )}
          </div>
        ))}
      </div>
    }
    trigger={trigger || 'click'}
    placement={placement || 'bottomRight'}
  >
    {children || <FontAwesomeIcon className={styles.three_dots_icon} size="2x" icon={['fal', 'ellipsis-h']} />}
  </Popover>
);

export default DropDownMenu;
