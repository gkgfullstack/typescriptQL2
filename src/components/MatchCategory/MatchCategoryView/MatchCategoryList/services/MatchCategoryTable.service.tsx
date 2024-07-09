import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../MatchCategoryList.module.less';
import { faEdit, faPlusCircle } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import MatchAttributeInfo from 'src/types/MatchAttributeInfo';
import { Dropdown, Menu } from 'antd';

interface ColumnConfig extends ColumnProps<MatchAttributeInfo> {
  customColRenderer?: (dataIndex: MatchAttributeInfo) => React.ReactNode;
}

const faEditIcon = faEdit as IconProp;
const faPlusCircleIcon = faPlusCircle as IconProp;

export const sortOrder = (
  sortedInfo: Sorting<MatchAttributeInfo> | null,
  key: keyof MatchAttributeInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const actionRender = (record: any, onAction: any) => {
  const onMenuClick = (e: any) => {
    onAction(record, e.key);
  };

  const onIconClick = (type: string) => {
    return () => {
      onAction(record, type);
    };
  };

  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="delete">Delete Match Attribute</Menu.Item>
    </Menu>
  );

  return (
    <>
      <FontAwesomeIcon
        icon={faPlusCircleIcon}
        className={styles.action_icon}
        title={'Create Match Attribute Map'}
        onClick={onIconClick('map')}
      />
      <FontAwesomeIcon
        icon={faEditIcon}
        className={styles.action_icon}
        title={'Edit Match Attribute'}
        onClick={onIconClick('edit')}
      />
      <Dropdown overlay={menu}>
        <FontAwesomeIcon icon={['fal', 'ellipsis-h']} className={styles.action_more_icon} size={'3x'} />
      </Dropdown>
    </>
  );
};

export const nameRender = (record: any, onAction: any) => {
  const onLinkClick = (type: string) => {
    return () => {
      onAction(record, type);
    };
  };

  return (
    <span className={styles.name_link} onClick={onLinkClick('details')}>
      {record.name}
    </span>
  );
};

export const getColumns = (sorting: any, onAction: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Match Attribute ID',
      key: 'ID',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.ID}</span>,
      sortOrder: sortOrder(sorting, 'ID'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Match Attribute Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => nameRender(record, onAction),
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: record => actionRender(record, onAction),
      width: 120,
    },
  ];

  return columns;
};
