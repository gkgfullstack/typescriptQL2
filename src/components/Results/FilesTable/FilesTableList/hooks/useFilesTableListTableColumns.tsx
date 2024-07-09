import React, { useEffect, useState } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import FileTableResultType from 'src/types/FileTableResultType';
import styles from '../FilesTableList.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreviewTableR from '../PreviewTableR';
//import { Button, Modal } from 'antd';

export interface ColumnConfig extends ColumnProps<FileTableResultType> {
  customColRenderer?: (record: FileTableResultType, index: number) => React.ReactNode;
}

const nameRender = (record: { filename: string, envurl:string; downloadurl: string; jobid: string; resultid: string; }) => (
  <div className={styles.namesection}>
    <a href={record.envurl +'/cc/result/ResultSingleDownload?resultid=' + record.resultid} type="link" style={{  fontWeight: 400 }} >
      {record.filename}
    </a>
  </div>
);

const createdRender = (text: { envurl:string; downloadurl: string; jobid: string; resultid: string; filename: string; checkview:string;  }): React.ReactNode => (
  <div className={styles.finishsection} style={{float: 'right'}}>
    {text.checkview === "no" ? ('') : <PreviewTableR resultid={text.resultid} envurl={text.envurl}  />}
    <a href={text.envurl+'/cc/result/ResultSingleDownload?resultid=' + text.resultid} 
    className={styles.item} rel="noopener noreferrer" target={'_self'} 
    style={{  fontSize: '15px', marginLeft: '10px', lineHeight: '12px' }}>
      <FontAwesomeIcon icon={['fal', 'download']} style={{  marginRight: '10px' }} />
    </a>     
  </div>
);


export const getColumns = (): ColumnConfig[] => {
  let columns: ColumnConfig[] = [
    {
      key: 'jobName',
      render: nameRender,
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend'],
      className: styles.status_column,
      width: 180,
    },
    {
      title: '',
      key: 'qualityPercentage',
      width: 180,
      render: createdRender,
      //customColRenderer: createdRender,
    },
  ];
  columns = columns.map(
    (column: ColumnConfig): ColumnConfig => {
      if (column.customColRenderer) {
        const renderer = column.customColRenderer;
        column.render = (_: string | number, record: FileTableResultType, index: number): React.ReactNode => {
          return renderer(record, index);
        };
      }
      return column;
    }
  );
  return columns;

};

const useFilesTableListTableColumns = (sorting: Sorting<FileTableResultType>): [ColumnConfig[]] => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  useEffect(() => {
    if (sorting) {
      setColumns(getColumns());
    }
  }, [sorting]);
  return [columns];

};

export default useFilesTableListTableColumns;
