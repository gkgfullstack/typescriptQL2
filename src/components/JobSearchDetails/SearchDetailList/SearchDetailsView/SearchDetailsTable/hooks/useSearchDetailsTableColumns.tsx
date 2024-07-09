import { ColumnProps, SortOrder } from 'antd/lib/table';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';
import React, { useEffect, useState } from 'react';
import { Sorting } from 'src/types/Sorting';

import styles from '../SearchDetailsTable.module.less';
import RemoveSearchDtlButton from 'src/components/JobSearchDetails/RemoveSearchDtlButton';
//import DownloadSearchDtlButton from 'src/components/JobSearchDetails/DownloadSearchDtlButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export interface ColumnConfig extends ColumnProps<SearchDtlListInfo> {
  customColRenderer?: (record: SearchDtlListInfo, index: number) => React.ReactNode;
}

const sortOrder = (sortedInfo: Sorting<SearchDtlListInfo> | null, key: keyof SearchDtlListInfo): SortOrder | boolean => {
  return sortedInfo && sortedInfo.field === key ? sortedInfo.order : false;
};
const actionRender = (record: SearchDtlListInfo): React.ReactNode => (
  <>    
    <RemoveSearchDtlButton className={styles.action_item} searchDtlItem={record} tooltipPlacement={'left'} />
  </>
);
const actionDownload = (record: SearchDtlListInfo): React.ReactNode => (
  <>  
    <a href={record.downloadUrl} className={styles.item} rel="noopener noreferrer" >
          <FontAwesomeIcon icon={['fal', 'download']}  color={'gray'}/>
        </a>
    </>  
);


const getColumns = (sorting: Sorting<SearchDtlListInfo>): ColumnConfig[] => {
  let columns: ColumnConfig[] = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sortOrder: sortOrder(sorting, 'type'),
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
      width: 120,
      className: styles.owner_column,
      defaultSortOrder: 'ascend',
      //customColRenderer: typeRender,
    },
    {
      title: 'Inputs',
      dataIndex: 'inputs',
      sortOrder: sortOrder(sorting, 'inputs'),
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
      key: 'inputs',
      align: 'left',
      width: 120,
      defaultSortOrder: 'ascend',
      //customColRenderer: inputsRender,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sortOrder: sortOrder(sorting, 'description'),
      sorter: true,
      align: 'left',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      //customColRenderer:descriptionRender
    },
    {
      align: 'center',
      title: '',
      key: 'actions',
      customColRenderer: actionDownload,
      className: styles.actions_column,
      width: 30,
    },

    {
      align: 'center',
      title: '',
      key: 'actions2',
      customColRenderer: actionRender,
      className: styles.actions_column,
      width: 30,
    },

  ];
  columns = columns.map(
    (column: ColumnConfig): ColumnConfig => {
      if (column.customColRenderer) {
        const renderer = column.customColRenderer;
        column.render = (_: string | number, record: SearchDtlListInfo, index: number): React.ReactNode => {
          return renderer(record, index);
        };
      }

      return column;
    }
  );

  return columns;
};


const useSearchDetailsTableColumns = (sorting: Sorting<SearchDtlListInfo>): [ColumnConfig[]] => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);

  useEffect(() => {
    if (sorting) {
      setColumns(getColumns(sorting));
    }
  }, [sorting]);

  return [columns];
};

export default useSearchDetailsTableColumns;
