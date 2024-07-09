import { Sorting } from 'src/types/Sorting';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import RetailDiagnosticInfo from 'src/types/RetailDiagnosticInfo';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { faQuidditch } from '@fortawesome/pro-light-svg-icons';
import { faSyncAlt } from '@fortawesome/pro-duotone-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routes from 'src/routes';
import { Dropdown, Menu } from 'antd';
import styles from '../RetailDiagnosticList.module.less';
import TableColumnsFilter from 'src/components/common/TableColumnsFilter';

const faSyncAltPropIcon = faSyncAlt as IconProp;
const faQuidditchIcon = faQuidditch as IconProp;

interface ColumnConfig extends ColumnProps<RetailDiagnosticInfo> {
  customColRenderer?: (dataIndex: RetailDiagnosticInfo) => React.ReactNode;
}

export const sortOrder = (
  sortedInfo: Sorting<RetailDiagnosticInfo> | null,
  key: keyof RetailDiagnosticInfo
): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};

export const renderDate = (date: string) => {
  return date ? moment(date).format('MM-DD-YYYY hh:mm') : '';
};

export const renderTime = (date: any) => {
  const secondsInOneHour = 3600;
  const hoursInOneDay = 24;
  const millisecondsInOneSecond = 1000;

  if (date === 0) {
    return '0';
  }

  if (!date) {
    return '';
  }

  if (date < secondsInOneHour * hoursInOneDay) {
    return moment.utc(moment.duration(date * millisecondsInOneSecond).asMilliseconds()).format('HH:mm:ss');
  }

  const minutes = date % secondsInOneHour;
  const hours = (date - minutes) / secondsInOneHour;

  return `${hours}:${moment.utc(moment.duration(minutes * millisecondsInOneSecond).asMilliseconds()).format('mm:ss')}`;
};

export const renderValue = (value: string) => {
  return <span>{value}</span>;
};

export const renderLink = (value: string) => {
  const href = `https://live.ql2.com/sys/diag/viewrun.jsp?id=${value}`;
  return (
    <a href={href} target={'_blank'} rel={'noopener noreferrer'}>
      {value}
    </a>
  );
};

export const renderAction = (record: any, onAction: any) => {
  const disabledActionClass = record.status === 'RUNNING' ? 'diagnostic_actions_disabled' : '';
  const siteId = record.siteId ? `&siteId=${record.siteId}` : '';

  const cleansedLink =
    record.searchType === 'SPIDER'
      ? `${routes.spiderCleanUp}?schema=${record.schemaName}${siteId}`
      : record.searchType === 'SHALLOW'
      ? `${routes.shallowCleanUp}?schema=${record.schemaName}`
      : `${routes.productCleanUp}?schema=${record.schemaName}${siteId}`;

  const onMenuClick = (e: any) => {
    onAction(record, e.key);
  };

  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="rename">Rename Run</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
      <Menu.Item key="createBug">
        <a href={'/help/technicalSupport'} target={'_blank'} rel={'noopener noreferrer'}>
          Create Bug
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <span className={disabledActionClass}>
      <Link to={cleansedLink} target={'_blank'}>
        <FontAwesomeIcon title={'Cleanse Data'} icon={faQuidditchIcon} className={styles.action_icon} size={'lg'} />
      </Link>
      <Dropdown overlay={menu}>
        <FontAwesomeIcon icon={['fal', 'ellipsis-h']} className={styles.action_more_icon} size={'3x'} />
      </Dropdown>
    </span>
  );
};

export const defaultColumns = [
  'siteName',
  'schemaName',
  'ID',
  'name',
  'searchType',
  'status',
  'dataStatus',
  'completeTimestamp',
  'actions',
];

export const columnNames: any = {
  siteName: 'Site Name',
  schemaName: 'Vertical',
  ID: 'Collection Group ID',
  name: 'Collection Group Name',
  searchType: 'Search Type',
  status: 'Search Status',
  dataStatus: 'Streaming Status',
  insertTimestamp: 'Insert Timestamp',
  completeTimestamp: 'Complete Timestamp',
  totalRunTime: 'Total Run Time',
};

export const columnOptions: any = [
  {
    name: 'Site Name',
    id: 'siteName',
    disabled: true,
  },
  {
    name: 'Vertical',
    id: 'schemaName',
  },
  {
    name: 'Collection Group ID',
    id: 'ID',
    disabled: true,
  },
  {
    name: 'Collection Group Name',
    id: 'name',
    disabled: true,
  },
  {
    name: 'Search Type',
    id: 'searchType',
  },
  {
    name: 'Search Status',
    id: 'status',
    disabled: true,
  },
  {
    name: 'Streaming Status',
    id: 'dataStatus',
  },
  {
    name: 'Insert Timestamp',
    id: 'insertTimestamp',
  },
  {
    name: 'Complete Timestamp',
    id: 'completeTimestamp',
  },
  {
    name: 'Total Run Time',
    id: 'totalRunTime',
  },
  {
    name: 'Actions',
    id: 'actions',
    disabled: true,
  },
];

export const getColumns = (sorting: any, selectedColumns: any, onAction: any, onColumnChange: any, onRefresh: any) => {
  const actionsTitle = (
    <>
      Actions{' '}
      <TableColumnsFilter onChange={onColumnChange} defaultColumns={defaultColumns} columnOptions={columnOptions} />
      <FontAwesomeIcon
        title={'Refresh Diagnostics Page'}
        icon={faSyncAltPropIcon}
        className={styles.refresh_icon}
        size={'lg'}
        onClick={onRefresh}
      />
    </>
  );

  const columns: ColumnConfig[] = selectedColumns
    .filter((item: string) => item !== 'actions')
    .map((item: string) => {
      const sortingKey: any = item;
      return {
        title: columnNames[item],
        key: item,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (record: any) => {
          if (item === 'ID') {
            return renderLink(record[item]);
          }
          if (item === 'completeTimestamp' || item === 'insertTimestamp') {
            return renderDate(record[item]);
          }
          if (item === 'totalRunTime') {
            return renderTime(record[item]);
          }
          return renderValue(record[item]);
        },
        sortOrder: sortOrder(sorting, sortingKey),
        className: item !== 'siteName' && item !== 'name' ? 'center' : '',
        sorter: true,
        width: 120,
      };
    });

  columns.push({
    title: actionsTitle,
    key: 'actions',
    render: (record: any) => renderAction(record, onAction),
    width: 120,
  });

  return columns;
};
