import React from 'react';
import { Table, Layout, Row, Col, Button } from 'antd';
import { SorterResult, PaginationConfig } from 'antd/lib/table';
import { Sorting } from 'src/types/Sorting';
import TableResultlistType from 'src/types/TableResultlistType';
import { useResultsTableListTableColumns } from '../hooks';
import Spin from 'src/components/common/Spin';
import styles from './ResultsTableListTable.module.less';
import ResultsView from 'src/components/Results/ResultsView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResultsRowDelete from 'src/components/Results/ResultsRowDelete';
import { Link } from 'react-router-dom';
//import {useResultsRowDeleteFetch} from 'src/components/Results/ResultsRowDelete/hooks'
export type ResultsTableListTableProps = {
  items: TableResultlistType[];
  sorting: Sorting<TableResultlistType>;
  onSortingChange: (sorting: Sorting<TableResultlistType>) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  pageSize?: number;
  total: number;
  loading?: boolean;
  page?: number;
  selectedRowKeys?: any;
  isPageType?: any;
  resultid?: string;
  jobid?: any;
  errorMsg?: string;
};

const ResultsTableListTable: React.FC<ResultsTableListTableProps> = ({
  items,
  sorting,
  pageSize,
  total,
  loading,
  page,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  resultid,
  jobid,
  errorMsg,
}: ResultsTableListTableProps): React.ReactElement => {
  const [runId, setRunId] = React.useState<string>();
  const [jobName, setJobName] = React.useState<string>();
  React.useEffect(() => {
    for (let i = 0; i < items.length; i++) {
      setTimeout(() => {
        setRunId(items[0].runId);
        setJobName(items[0].jobName);
      }, 0);     
    }
  }, [items]);

  const [, setState] = React.useState<any>({ loading: false, selectedRowKeyVal: [] });
  const [columns] = useResultsTableListTableColumns(sorting);
  const [selectedRowKeyVal, setSelectedRowKeyVal] = React.useState<TableResultlistType[]>([]);
  const onRow = (tableResultlistType: TableResultlistType) => {
    if (tableResultlistType.runId !== undefined) {
      setRunId(tableResultlistType.runId.toString());
    }
    if (tableResultlistType.runId !== undefined) {
      setJobName(tableResultlistType.jobName);
    }
  };

  const tableRowClasses = [styles.table_table_row, styles.selected_row];

  const handlerSortingColumn = (
    _: PaginationConfig,
    __: Partial<Record<keyof TableResultlistType, string[]>>,
    sorter: SorterResult<TableResultlistType>
  ): void => {
    const order =
      sorting.field === sorter.columnKey && sorter.order === undefined
        ? sorting.order === 'descend'
          ? 'ascend'
          : 'descend'
        : sorter.order;
    onSortingChange({ field: sorter.columnKey, order: order });
  };

  const handlerPageChange = (page: number): void => {
    onPageChange(page);
  };
  const locale = { items_per_page: '' };
  const totalRender = (): React.ReactNode => <span>Total Results: {total}</span>;
  const handlePageSizeChanges = (_: number, size: number): void => {
    onPageSizeChange(size);
  };

  const pagination: PaginationConfig = {
    pageSize: pageSize,
    current: page,
    showTotal: totalRender,
    total: total,
    hideOnSinglePage: false,
    showSizeChanger: false,
    locale: locale,
    onShowSizeChange: handlePageSizeChanges,
    onChange: handlerPageChange,
    size: 'small',
  };

  const [deteleButton, setDeleteButton] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<string>('');
  const rowSelection = {
    selectedRowKeyVal,
    onChange: (_: any, selectedRows: TableResultlistType[]) => {
      if (selectedRows.length > 0) {
        setSelectedRow('');
      }
      setSelectedRowKeyVal(selectedRows);
      if (selectedRows.length > 0) {
        const lastId = selectedRows[selectedRows.length - 1];
        selectRow(lastId);
        setDeleteButton(true);
      } else {
        setDeleteButton(false);
      }
    },
    getCheckboxPropss: (record: { jobName: string; runId: string }) => ({
      runId: record.runId,
    }),
  };

  const emptyText: React.ReactNode = <p className="no_results">No results found</p>;

  const selectRow = (record: TableResultlistType) => {
    onRow(record);
    if (record.runId === selectedRow) {
      setSelectedRow('');
    } else {
      setSelectedRow(record.runId);
    }
  };

  const start = () => {
    setState({ loading: true });
    setTimeout(() => {
      setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 0);
  };

  if (items.length <= 1 && errorMsg != null) {
    const errors = errorMsg.split('<br/>');
    return (
      <div className="table_list_container" style={{ textAlign: 'center' }}>
        {errors[0]} <br /> {errors[1]}
      </div>
    );
  } else {
    return (
      <div className="table_list_container">
        <Spin spinning={loading}>
          {/* <h2>Results</h2> */}
          <Layout>
            <Row className="rowcheckedTh">
              <Col span={12} className="tableResultPage">
                <h2 style={{ width: '100%', float: 'left' }}>Results</h2>
                <Button onClick={start} loading={loading} className="redo-alt-Btn">
                  <FontAwesomeIcon icon={['far', 'redo-alt']} style={{ marginRight: '10px' }} />
                </Button>
                <Link to={'#'} className="ellipsis-v-Btn">
                  <FontAwesomeIcon icon={['fal', 'ellipsis-v']} style={{ marginRight: '10px' }} />
                </Link>
                {deteleButton && (
                  <ResultsRowDelete runId={runId !== undefined ? runId : ''} selectedRowKeyVal={selectedRowKeyVal} />
                )}
                <div className="resultPageTable">
                  <Table
                    rowClassName={(record): string => {
                      if (record.runId === selectedRow || (items[0].runId === record.runId && !selectedRow)) {
                        return tableRowClasses.join(' ');
                      } else {
                        return tableRowClasses[0];
                      }
                    }}
                    rowKey={(_, index: number): string => index.toString()}
                    columns={columns}
                    pagination={pagination}
                    dataSource={items}
                    onChange={handlerSortingColumn}
                    tableLayout={'auto'}
                    onRow={record => ({
                      onClick: () => selectRow(record),
                    })}
                    locale={{ emptyText: emptyText }}
                    rowSelection={rowSelection}
                    scroll={{ y: 650 }}
                  />
                </div>
              </Col>
              <Col span={12} className="tableResultDetailsPage">
                {items !== undefined && items !== null && items.length > 0 ? (
                  <ResultsView
                    selectedRowKeyVal={selectedRowKeyVal}
                    jobid={jobid}
                    runId={runId !== undefined ? runId : items[0].runId}
                    jobName={jobName !== undefined ? jobName : items[0].jobName}
                    resultid={resultid !== undefined ? resultid : '-1'}
                  />
                ) : null}
              </Col>
            </Row>
          </Layout>
        </Spin>
      </div>
    );
  }
};

export default ResultsTableListTable;
