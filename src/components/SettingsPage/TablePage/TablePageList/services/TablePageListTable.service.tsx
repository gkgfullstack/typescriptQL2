import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import TablePageTableInfo from 'src/types/TablePageTableInfo';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../TablePageList.module.less';
import { faEdit, faDna } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Menu, Dropdown } from 'antd';
import UserContex from 'src/services/UserContex';


interface ColumnConfig extends ColumnProps<TablePageTableInfo> {
  customColRenderer?: (dataIndex: TablePageTableInfo) => React.ReactNode;
}

const faEditIcon = faEdit as IconProp;
const faDnaIcon = faDna as IconProp;

export const sortOrder = (
  sortedInfo: Sorting<TablePageTableInfo> | null,
  key: keyof TablePageTableInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};


export const actionRender = (record: any, actionRender: any) => {
  const onMenuClick = (e: any) => {
    actionRender(record, e.key);
  };

  const onIconClick = (type: string) => {
    return () => {
      actionRender(record, type);
    };
  };
  let decodedDownloadUrl = decodeURIComponent(record.downloadUrl);
  let urldownload= UserContex.getBaseUrl()+decodedDownloadUrl; 
  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="download"><a href={urldownload} rel="noopener noreferrer">Download</a></Menu.Item>
      <Menu.Item key="audit" onClick={onIconClick('audit')}><span className={styles.name_link}>Audit</span></Menu.Item>
      <Menu.Item key="upload" onClick={onIconClick('upload')}><span className={styles.name_link}>Upload</span></Menu.Item>
      <Menu.Item key="clear" onClick={onIconClick('clear')}><span className={styles.name_link}>Clear</span></Menu.Item>
    </Menu>
  );
  return (
    <>
      <FontAwesomeIcon
        icon={faEditIcon}
        className={styles.action_icon}
        title={'Edit Metadata'}
        onClick={onIconClick('editMetadata')}
      />
      <FontAwesomeIcon
        icon={faDnaIcon}
        className={styles.action_icon}
        title={'Delete'}
        onClick={onIconClick('delete')}
      />
      <Dropdown overlay={menu}>
        <FontAwesomeIcon icon={['fal', 'ellipsis-h']} className={styles.action_more_icon} size={'3x'} />
      </Dropdown>
    </>
  );
};

export const TableNameRender = (record: any, onAction: any) => {
  const onLinkClick = (type: string) => {
    return () => {
      onAction(record, type);
    };
  };

  return (
    <span className={styles.name_link} onClick={onLinkClick('detailss')}>
      {record.name}
    </span>
  );
};
let  bAdminMode:boolean=false;
let input = localStorage.getItem("bAdminMode");
bAdminMode = (input === 'true');
export const getColumns = (sorting: any, onAction: any) => {
  const columns: ColumnConfig[] = [
    {
      title: 'Name',
      key: 'table_name',
      defaultSortOrder: 'ascend',
      sortDirections: ['descend', 'ascend', 'descend'],
      render: record => TableNameRender(record, onAction),
      sortOrder: sortOrder(sorting, 'table_name'),
      sorter: true,
      width: 150,
    },
    bAdminMode === true ? { 
      title: 'Owner',
      key: 'owner',
      defaultSortOrder: 'ascend',
      sortDirections: ['descend', 'ascend', 'descend'],
      render: record => <span>{record.owner}</span>,
      sortOrder: sortOrder(sorting, 'owner'),
      sorter: true,
      width: 100,
    } : {}, 
    {
      title: 'Visibility',
      key: 'org_id',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.visibility}</span>,
      sortOrder: sortOrder(sorting, 'org_id'),
      sorter: true,
      width: 50,
    },
    {
      title: 'Description',
      key: 'description',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.description}</span>,
      sortOrder: sortOrder(sorting, 'description'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Type',
      key: 'app_name',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.type}</span>,
      sortOrder: sortOrder(sorting, 'app_name'),
      sorter: true,
      width: 50,
    },
    {
      title: 'Created',
      key: 'created_at',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.created}</span>,
      sortOrder: sortOrder(sorting, 'created_at'),
      sorter: true,
     width: 120,
    },
    {
      title: 'Updated',
      key: 'updated_at',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.updated}</span>,
      sortOrder: sortOrder(sorting, 'updated_at'),
      sorter: true,
      width: 120,
    },
    {
      title: 'Lines',
      key: 'linecount',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: record => <span>{record.lines}</span>,
      sortOrder: sortOrder(sorting, 'linecount'),
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      defaultSortOrder: 'ascend',
      render: record => actionRender(record, onAction),
      width: 150,
    },
  ];

  return columns;
};
