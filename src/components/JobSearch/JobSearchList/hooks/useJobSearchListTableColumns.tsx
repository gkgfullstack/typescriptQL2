import React, { useEffect, useState } from 'react';
import { ColumnProps, SortOrder } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import JobSearchInfo from 'src/types/JobSearchInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'src/components/JobSearch/JobSearchList/JobSearchList.module.less';
import { Progress } from 'antd';
import { Link } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/pro-light-svg-icons';
import APPLICATION_NAME from 'src/enums/applicationsName';

interface ColumnConfig extends ColumnProps<JobSearchInfo> {
  customColRenderer?: (dataIndex: JobSearchInfo) => React.ReactNode;
}

const faEyeIcon = faEye as IconProp;

const sortOrder = (sortedInfo: Sorting<JobSearchInfo> | null, key: keyof JobSearchInfo): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};
const statusRender = (text: { status: string; historyStatus: string; schedule: string }) => (
  <>
    {text.status === 'Active' ? (
      <FontAwesomeIcon icon={['fal', 'sync']} className="syncicons" size="lg" />
    ) : text.status === 'Schedule' ? (
      <FontAwesomeIcon icon={['fal', 'clock']} className="clockicons" size="lg" />
    ) : (
      ''
    )}
  </>
);
const nameRender = (text: {
  name: string;
  starred: string;
  lineItemCount: string;
  applicationName: string;
  id: string;
}) => (
  <>
    <h5>
      <Link to={`/datascout/search-details/${text.id}`} title={text.applicationName} referrerPolicy={'origin'}>
        {text.name}
        {text.starred ? <FontAwesomeIcon icon={['fas', 'star']} className="staricons" size="sm" /> : ''}
      </Link>
    </h5>

    <span>{text.lineItemCount} Inputs</span>
    <br />
    <span>{APPLICATION_NAME[text.applicationName] || text.applicationName}</span>
  </>
);
const nextScheduleRender = (text: { nextScheduleDt: string }) => (
  <>
    <span>{text.nextScheduleDt}</span>
  </>
);

const createdRender = (text: { dateCreated: string; owner: string }) => (
  <>
    <span>{text.dateCreated}</span>
    <br />
    <span>{text.owner}</span>
  </>
);
const historyRender = (text: {
  historyStatus: string;
  schedule: string;
  historyPercentage: string;
  errorItemCount: string;
}) => (
  <>
    <span style={{ lineHeight: '22px' }}>
      {text.historyStatus === 'N/A' && text.schedule === 'NO' ? (
        'N/A'
      ) : (
        <div>
          {text.historyStatus}
          <br />
          <span style={{ marginRight: '10px' }}>
            <FontAwesomeIcon icon={['fal', 'hourglass-half']} className="hourglassicon" size="sm" />
            {text.historyPercentage + '%'}
          </span>
          <span>
            <FontAwesomeIcon icon={['far', 'exclamation-triangle']} className="erroricon" size="sm" />
            {text.errorItemCount}
          </span>
        </div>
      )}
    </span>
  </>
);

const actionRender = (record: any, onAction: (job: JobSearchInfo, type: string) => void) => {
  const onIconClick = (type: string) => {
    return () => {
      onAction(record, type);
    };
  };
  return (
    <FontAwesomeIcon
      icon={faEyeIcon}
      className={styles.action_icon}
      title={'View Run Status'}
      onClick={onIconClick('view')}
    />
  );
};
export const getColumns = (
  sorting: Sorting<JobSearchInfo>,
  onAction: (job: JobSearchInfo, type: string) => void
): ColumnConfig[] => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const isPageType = urlParams.get('isPageType')?.toString();
  let columns: ColumnConfig[];
  if (isPageType !== undefined && isPageType === 'Schedule') {
    columns = [
      {
        title: 'Status',
        key: 'Status',
        width: 70,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: statusRender,
        sortOrder: sortOrder(sorting, 'Status'),
        sorter: true,
      },
      {
        title: 'Name',
        key: 'name',
        width: 250,
        render: nameRender,
        className: 'price_column',
        sorter: true,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sortOrder: sortOrder(sorting, 'name'),
      },
      {
        title: 'Next scheduled run',
        key: 'nextScheduleDt',
        width: 180,
        className: 'matches_column',
        render: nextScheduleRender,
        sorter: true,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sortOrder: sortOrder(sorting, 'nextScheduleDt'),
      },
      {
        title: 'Created',
        key: 'created',
        width: 180,
        render: createdRender,
        className: 'matches_column',
        sorter: true,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sortOrder: sortOrder(sorting, 'created'),
      },

      {
        title: 'History',
        key: 'history',
        width: 150,
        render: historyRender,
      },
      {
        title: 'Last Run Quality',
        key: 'lastRun',
        width: 150,
        render: record => (
          <span>
            <Progress percent={record.lastRunPercentage} />
          </span>
        ),
        sorter: true,
        defaultSortOrder: 'descend',
        sortDirections: ['descend', 'ascend', 'descend'],
        sortOrder: sortOrder(sorting, 'lastRun'),
      },
    ];
  } else {
    columns = [
      {
        title: 'Status',
        key: 'Status',
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: statusRender,
        className: 'price_column',
        sortOrder: sortOrder(sorting, 'Status'),
        sorter: true,
        width: 70,
      },
      {
        title: 'Name',
        key: 'name',
        width: isPageType === 'Active' ? 230 : 300,
        render: nameRender,
        className: 'price_column',
        sorter: true,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sortOrder: sortOrder(sorting, 'name'),
      },
      {
        title: 'Created',
        key: 'created',
        width: isPageType === 'Active' ? 120 : 130,
        render: createdRender,
        className: 'matches_column',
        sorter: true,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        sortOrder: sortOrder(sorting, 'created'),
      },
      {
        title: 'History',
        key: 'history',
        width: isPageType === 'Active' ? 180 : 130,       
        render: historyRender,
      },
      {
        title: 'Last Run Quality',
        key: 'lastRun',
        width: isPageType === 'Active' ? 150 : 120,
        render: record => (
          <span>
            <Progress percent={record.lastRunPercentage} />
          </span>
        ),
        sorter: true,
        defaultSortOrder: 'descend',
        sortDirections: ['descend', 'ascend', 'descend'],
        sortOrder: sortOrder(sorting, 'lastRun'),
      },
    ];
  }

  if (isPageType !== undefined && isPageType === 'Active') {
    const actionColumn: ColumnConfig = {
      title: 'Actions',
      key: 'actions',
      className: styles.action_column,
      render: record => actionRender(record, onAction),
      width: 120,
    };
    columns = [...columns, actionColumn];
  }

  return columns;
};

const useJobSearchListTableColumns = (
  sorting: Sorting<JobSearchInfo>,
  onAction: (job: JobSearchInfo, type: string) => void
): [ColumnConfig[]] => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);

  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting, onAction));
    }
  }, [sorting]);
  return [columns];
};

export default useJobSearchListTableColumns;
