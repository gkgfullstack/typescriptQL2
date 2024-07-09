import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'src/components/SettingsPage/CompetitiveSets/CompetitiveSetsView/CompetitiveSetsList/CompetitiveSetsList.module.less';
import { faEdit, faDna } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CompetitiveSetInfo } from 'src/types/CompetitiveSetInfo';

interface ColumnConfig extends ColumnProps<CompetitiveSetInfo> {
  customColRenderer?: (dataIndex: CompetitiveSetInfo) => React.ReactNode;
}

const faEditIcon = faEdit as IconProp;
const faDnaIcon = faDna as IconProp;

export const sortOrder = (
  sortedInfo: Sorting<CompetitiveSetInfo> | null,
  key: keyof CompetitiveSetInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const actionRender = (record: any, onAction: any) => {
  const onIconClick = (type: string) => {
    return () => {
      onAction(record, type);
    };    
  };

  return (<>
    <FontAwesomeIcon
      icon={faEditIcon}
      className={styles.action_icon}
      title={'Edit Competitive Set'}
      onClick={onIconClick('edit')}
    />
    <FontAwesomeIcon
        icon={faDnaIcon}
        className={styles.action_icon}
        title={'Delete'}
        onClick={onIconClick('delete')}
      /></>
  );
};

export const getColumns = (
  sorting: Sorting<CompetitiveSetInfo> | null,
  onAction: ((record: any, type: string) => void) | undefined
) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Competitive Set Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.name}</span>,
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Count of property IDs',
      key: 'countPropIDs',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.countPropIDs}</span>,
      sortOrder: sortOrder(sorting, 'countPropIDs'),
      sorter: true,
      width: 120,
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: record => actionRender(record, onAction),
      width: 120,
      align: 'center',
    },
  ];

  return columns;
};
