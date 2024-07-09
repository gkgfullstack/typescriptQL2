import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../MatchAttributeList.module.less';
import { faEdit, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import MatchCategoryInfo from 'src/types/MatchCategoryInfo';
import routes from 'src/routes';

interface ColumnConfig extends ColumnProps<MatchCategoryInfo> {
  customColRenderer?: (dataIndex: MatchCategoryInfo) => React.ReactNode;
}

const faTrashAltIcon = faTrashAlt as IconProp;
const faEditIcon = faEdit as IconProp;

export const sortOrder = (
  sortedInfo: Sorting<MatchCategoryInfo> | null,
  key: keyof MatchCategoryInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const actionRender = (record: any, onAction: any) => {
  const onIconClick = (type: string) => {
    return () => {
      onAction(record, type);
    };
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faEditIcon}
        className={styles.action_icon}
        title={'Edit Match Category'}
        onClick={onIconClick('edit')}
      />
      <FontAwesomeIcon
        icon={faTrashAltIcon}
        className={styles.action_icon}
        title={'Delete Match Category'}
        onClick={onIconClick('delete')}
      />
    </>
  );
};

export const nameRender = (record: any) => {
  return (
    <Link to={`${routes.matchCategory}?ID=${record.ID}&name=${record.name}&vertical=${record.vertical}`}>
      {record.name}
    </Link>
  );
};

export const getColumns = (sorting: any, onAction: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Match Category ID',
      key: 'ID',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.ID}</span>,
      sortOrder: sortOrder(sorting, 'ID'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Match Category Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => nameRender(record),
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Vertical',
      key: 'vertical',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.vertical}</span>,
      sortOrder: sortOrder(sorting, 'vertical'),
      sorter: true,
      width: 120,
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
