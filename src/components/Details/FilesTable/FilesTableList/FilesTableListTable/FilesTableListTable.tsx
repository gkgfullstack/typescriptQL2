import React from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import FileTableResultType from 'src/types/FileTableResultType';
import { useFilesTableListTableColumns } from '../hooks';
import Spin from 'src/components/common/Spin';
//import styles from './FilesTableListTable.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useRunId from 'src/hooks/useRunId';
import UserContex from 'src/services/UserContex';

export type FilesResultsTableListTableProps = {
  items: FileTableResultType[];
  sorting: Sorting<FileTableResultType>;
  onSortingChange: (sorting: Sorting<FileTableResultType>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
  runId?: string;
};

const FilesTableListTable: React.FC<FilesResultsTableListTableProps> = ({
  items,
  sorting,
  loading,
  onSortingChange,
}: FilesResultsTableListTableProps): React.ReactElement => {
  const [columns] = useFilesTableListTableColumns(sorting);
  const [, setSelectedRowKeyVal] = React.useState([]);
  let [resulids, setResultIds] = React.useState<String>();
  const runId = useRunId()
  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof FileTableResultType, string[]>>,
    sorter: SorterResult<FileTableResultType>
  ): void => {
    const order =
      sorting.field === sorter.columnKey && sorter.order === undefined
        ? sorting.order === 'ascend'
          ? 'descend'
          : 'ascend'
        : sorter.order;

    onSortingChange({ field: sorter.columnKey, order: order });
  };
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      if (selectedRows.length > 0) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ');
        setSelectedRowKeyVal(selectedRows);
        setResultIds("");
        let resIds = "";
        for (let i = 0; i < selectedRows.length; i++) {
          resIds = selectedRows[i].resultid + ";;" + resIds;
          setResultIds(resIds)
        }
      }
    },

  };
  const emptyText: React.ReactNode = <p className="no_results">No results found</p>;
  const alldownloadzip = UserContex.getBaseUrl() + '/cc/result/ResultSelectedDownload/ResultSelectedDownload?runid=' + runId + '&resultids=' + resulids;
  return (
    <div className="table_list_container" style={{ position: 'relative' }}>
      <div className="rowcheckedTh">
        <Spin spinning={loading}>
          <a href={alldownloadzip} rel="noopener noreferrer" style={{
            fontSize: '12px',
            marginLeft: '38px',
            lineHeight: '12px',
            position: 'absolute',
            fontWeight: 500,
            top: '16px',
            zIndex: 9
          }}>
            <FontAwesomeIcon icon={['fal', 'download']}
              style={{  marginRight: '10px' }} />Download</a>

          <Table
            rowClassName={(): string => "table_table_row"}
            rowKey={(_, index: number): string => index.toString()}
            columns={columns}
            pagination={false}
            dataSource={items}
            onChange={handlerSortingColumn}
            tableLayout={'auto'}
            locale={{ emptyText: emptyText }}
            rowSelection={rowSelection}
          />
        </Spin>
      </div>
    </div>
  );
};

export default FilesTableListTable;
