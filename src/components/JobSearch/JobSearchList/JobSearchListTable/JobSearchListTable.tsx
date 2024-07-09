import React, { useState } from 'react';
import { Table } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import JobSearchInfo from 'src/types/JobSearchInfo';
import { useJobSearchListTableColumns } from 'src/components/JobSearch/JobSearchList/hooks';
import Spin from 'src/components/common/Spin';
import 'src/components/JobSearch/JobSearchList/JobSearchList.module.less';
import JobAction from 'src/components/JobSearch/JobAction/JobAction';
import { useJobActionFetch } from 'src/components/JobSearch/JobAction/hooks';
import StatusPageModal from './StatusPageModal';

export type JobSearchListTableProps = {
  items: JobSearchInfo[];
  sorting: Sorting<JobSearchInfo>;
  onSortingChange: (sorting: Sorting<JobSearchInfo>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  total: number;
  loading?: boolean;
  page?: number;
  appId?: any;
  selectedRowKeys?: any;
  search?: any;
  isPageType?: any;
  isPageLoad?: any;
};

const JobSearchListTable: React.FC<JobSearchListTableProps> = ({
  items,
  sorting,
  pageSize,
  total,
  loading,
  page,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  isPageType,
  isPageLoad,
}: JobSearchListTableProps): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [jobRunId, setJobRunId] = useState<string | null>(null);
  const onAction = (job: JobSearchInfo, type: string) => {
    setJobRunId(job.runId);
    if (type === 'view') {
      setStatusModalVisible(true);
    }
  };
  const locale = { items_per_page: '' };
  const [columns] = useJobSearchListTableColumns(sorting, onAction);
  const [selectedRowKeyVal, setSelectedRowKeyVal] = useState<JobSearchInfo[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [disabled, setDisabled] = useState(true);
  React.useEffect(() => {
    setSelectedRowKeys([]);
    setDisabled(true);
  }, [isPageType, isPageLoad]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof JobSearchInfo, string[]>>,
    sorter: SorterResult<JobSearchInfo>
  ): void => {
    const order =
      sorting.field === sorter.columnKey && sorter.order === undefined
        ? sorting.order === 'ascend'
          ? 'descend'
          : 'ascend'
        : sorter.order;

    onSortingChange({ field: sorter.columnKey, order: order });
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    setDisabled(true);
  };

  const handlerPageChange = (page: number): void => {
    onPageChange(page);
    setSelectedRowKeys([])
  };
  const totalRender = (): React.ReactNode => <span>Total Results: {total}</span>;

  const pagination: PaginationConfig = {
    pageSize: pageSize,
    current: page,
    showTotal: totalRender,
    total: total,
    hideOnSinglePage: false,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
    locale: locale,
    onShowSizeChange: handlePageSizeChanges,
    onChange: handlerPageChange,
  };

  const selectRow = (record: JobSearchInfo) => {
    const selectedRowKeyss = [...selectedRowKeys];
    if (selectedRowKeyss.indexOf(record) >= 0) {
      selectedRowKeyss.splice(selectedRowKeyss.indexOf(record), 1);
    } else {
      selectedRowKeyss.push(record);
    }
    setSelectedRowKeys(selectedRowKeyss);
  };

  const onSelectedRowKeysChange = (selectedRowKeys: any, selectedRows: JobSearchInfo[]) => {
    setSelectedRowKeys(selectedRowKeys);
    if (selectedRows.length <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setSelectedRowKeyVal(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  const emptyText: React.ReactNode = <p className="no_results">No results found</p>;

  return (
    <div className="table_list_container">
      <JobAction
        selectedRowKeyVal={selectedRowKeyVal}
        useJobActionFetch={useJobActionFetch}
        isPageType={isPageType}
        disabled={disabled}
      />
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => 'table_table_row'}
          className="jobList"
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={items}
          onChange={handlerSortingColumn}
          tableLayout={'auto'}
          locale={{ emptyText: emptyText }}
          rowSelection={rowSelection}
          scroll={{ y: '70vh' }}
          onRow={record => ({
            onClick: () => {
              selectRow(record);
            },
          })}
        />
      </Spin>
      <StatusPageModal runId={jobRunId} visible={statusModalVisible} setVisible={setStatusModalVisible} />
    </div>
  );
};

export default JobSearchListTable;
