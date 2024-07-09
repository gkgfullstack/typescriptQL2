import React, { useEffect, useState } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import FileTableResultType from 'src/types/FileTableResultType';
import styles from '../FilesTableList.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreviewTableR from '../PreviewTableR';
 
export interface ColumnConfig extends ColumnProps<FileTableResultType> {
  customColRenderer?: (record: FileTableResultType, index: number) => React.ReactNode;
}

const actionDownload = (record: { envurl:string; jobname: string; resultid: string; jobid: string; filename: string; downloadurl: string }): React.ReactNode => (
 <>   
  <span style={{marginRight:'15px'}}><PreviewTableR resultid={record.resultid} downloadurl={record.downloadurl} /></span> 
    <a href={record.envurl + record.downloadurl} className={styles.item} rel="noopener noreferrer" >
      <FontAwesomeIcon icon={['fal', 'download']} color={'gray'} style={{ fontSize: '18px' }} />
    </a>
  </>
);

const nameRender = (record: { filename: string; jobid: string; }) => (
  <div className={styles.namesection}>
    <a href="#" type="link" style={{ fontWeight: 400 }} >
      {record.filename}
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
      width: '92%',
    },
    {
      title: '',
      key: 'qualityPercentage',
      width: '8%',
      render: actionDownload,
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
