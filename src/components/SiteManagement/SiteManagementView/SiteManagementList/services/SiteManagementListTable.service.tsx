import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { ConfigureClientSitesTableInfo } from 'src/types/ConfigureClientSitesTableInfo';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../SiteManagementList.module.less';
import { faToggleOff, faEdit, faDna } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Menu, Dropdown } from 'antd';
import SiteManagementConfirmation from '../SiteManagementConfirmation';

interface ColumnConfig extends ColumnProps<ConfigureClientSitesTableInfo> {
  customColRenderer?: (dataIndex: ConfigureClientSitesTableInfo) => React.ReactNode;
}

const faToggleOffIcon = faToggleOff as IconProp;
const faEditIcon = faEdit as IconProp;
const faDnaIcon = faDna as IconProp;

export const sortOrder = (
  sortedInfo: Sorting<ConfigureClientSitesTableInfo> | null,
  key: keyof ConfigureClientSitesTableInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const statusRender = (record: { ID: string; active?: boolean }, onAction: any) => {
  return (
    <div className={styles.status_icon}>
      {record.active ? (
        <SiteManagementConfirmation record={record} onAction={onAction} />
      ) : (
        <FontAwesomeIcon
          onClick={onAction(record)}
          icon={faToggleOffIcon}
          className={styles.status_inactive_icon}
          size="lg"
        />
      )}
    </div>
  );
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
      <Menu.Item key="site">Edit Site</Menu.Item>
      <Menu.Item key="clients">View Clients</Menu.Item>
      <Menu.Item key="regions">View Regions</Menu.Item>
    </Menu>
  );

  return (
    <>
      <FontAwesomeIcon
        icon={faEditIcon}
        className={styles.action_icon}
        title={'Edit Metadata'}
        onClick={onIconClick('metadata')}
      />
      <FontAwesomeIcon
        icon={faDnaIcon}
        className={styles.action_icon}
        title={'Edit Fingerprint'}
        onClick={onIconClick('fingerprint')}
      />
      <Dropdown overlay={menu}>
        <FontAwesomeIcon icon={['fal', 'ellipsis-h']} className={styles.action_more_icon} size={'3x'} />
      </Dropdown>
    </>
  );
};

export const getColumns = (sorting: any, onChangeStatus: any, onAction: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Site ID',
      key: 'ID',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.ID}</span>,
      sortOrder: sortOrder(sorting, 'ID'),
      sorter: true,
      width: 70,
    },
    {
      title: 'Site Name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.name}</span>,
      sortOrder: sortOrder(sorting, 'name'),
      sorter: true,
      width: 200,
    },
    {
      title: 'Site Data Source',
      key: 'dataSource',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.dataSource}</span>,
      sortOrder: sortOrder(sorting, 'dataSource'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Site Product Type',
      key: 'productType',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.productType}</span>,
      sortOrder: sortOrder(sorting, 'productType'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Site Status',
      key: 'active',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => statusRender(record, onChangeStatus),
      sortOrder: sortOrder(sorting, 'active'),
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
