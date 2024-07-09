import React, { useState } from 'react';
import styles from './TableColumnsFilter.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Menu } from 'antd';
import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type TableColumnsFilterProps = {
  onChange: (value: string) => void;
  defaultColumns: any;
  columnOptions: any;
};

const faCheckIcon = faCheck as IconProp;

const TableColumnsFilter: React.FC<TableColumnsFilterProps> = ({
  onChange,
  defaultColumns,
  columnOptions,
}: TableColumnsFilterProps): React.ReactElement => {
  const [selectedColumns, setSelectedColumns] = useState<any[]>([...defaultColumns]);
  const [visible, setVisible] = useState<boolean>(false);

  const onMenuClick = (e: any) => {
    let newColumns: any = selectedColumns;
    if (selectedColumns.indexOf(e.key) === -1) {
      newColumns.push(e.key);
    } else {
      newColumns = newColumns.filter((column: string) => column !== e.key);
    }
    setSelectedColumns(newColumns);
    newColumns = newColumns.length > 0 ? newColumns.toString() : '';
    onChange(newColumns);
  };

  const menu = (
    <Menu onClick={onMenuClick}>
      {columnOptions.map((item: any) => {
        const isActive = selectedColumns.indexOf(item.id) > -1;
        const menuClass = isActive ? styles.table_column_item_active : styles.table_column_item;
        const color = item.disabled
          ? 'rgba(0, 0, 0, 0.25)'
          : isActive && defaultColumns.indexOf(item.id) === -1
          ? '#6BA53A'
          : '#323C47';

        return (
          <Menu.Item key={item.id} disabled={item.disabled} className={menuClass} style={{ color: color }}>
            {item.name}
            {isActive && <FontAwesomeIcon icon={faCheckIcon} className={styles.table_column_icon_check} />}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const onVisibleChange = (flag: any) => {
    setVisible(flag);
  };

  return (
    <span className={styles.table_columns_filter}>
      <Dropdown overlay={menu} trigger={['click']} visible={visible} onVisibleChange={onVisibleChange}>
        <FontAwesomeIcon icon={['fal', 'ellipsis-v']} className={styles.action_more_icon} size={'3x'} />
      </Dropdown>
    </span>
  );
};

export default TableColumnsFilter;
