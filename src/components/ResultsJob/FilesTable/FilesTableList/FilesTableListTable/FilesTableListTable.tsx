import React from 'react';
import { Table, Button } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import FileTableResultType from 'src/types/FileTableResultType';
import { useFilesTableListTableColumns } from '../hooks';
import Spin from 'src/components/common/Spin';
//import styles from './FilesTableListTable.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  runId:string;
};

const FilesTableListTable: React.FC<FilesResultsTableListTableProps> = ({
  items,
  sorting,
  loading,
  onSortingChange,
  runId,
}: FilesResultsTableListTableProps): React.ReactElement => {
  const [columns] = useFilesTableListTableColumns(sorting);
  const [, setSelectedRowKeyVal] = React.useState([]);
  let [resulids, setResultIds] = React.useState<String>();
  const [hasSelected, setHasSelected] = React.useState<boolean>(true);
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
        let resIds="";
        for(let i=0;i<selectedRows.length; i++){
         resIds=selectedRows[i].resultid+";;"+resIds; 
        setResultIds(resIds)
        setHasSelected(false)
        }

      }
    },
    
  };
  const emptyText: React.ReactNode = <p className="no_results">No results found</p>;
 const alldownloadzip = UserContex.getBaseUrl()+'/cc/result/ResultSelectedDownload?runid='+runId+'&resultids='+resulids;
  return (
    <div className="table_list_container" style={{ position: 'relative' }}>
      <div className="rowcheckedTh">
      <Spin spinning={loading}>
          <a href={alldownloadzip} className="item" rel="noopener noreferrer" target={'_self'} style={{
            fontSize: '12px',
            marginLeft: '30px',
            lineHeight: '12px',
            position: 'absolute',
            fontWeight: 500,
            top: '3px',
            zIndex: 9 }}>
              <Button disabled={hasSelected} type="link">
            <FontAwesomeIcon icon={['fal', 'download']}
              style={{ marginRight: '10px' }} />Download</Button></a>
          <Table
            rowClassName={(): string => 'table_table_row'}
            rowKey={(_, index: number): string => index.toString()}
            columns={columns}
            pagination={false}
            dataSource={items}
            onChange={handlerSortingColumn}
            tableLayout={'auto'}
            locale={{ emptyText: emptyText }}
            rowSelection={rowSelection}
            scroll={{ y: 175 }}
          />
        </Spin>
      </div>
    </div>
  );
};

export default FilesTableListTable;
