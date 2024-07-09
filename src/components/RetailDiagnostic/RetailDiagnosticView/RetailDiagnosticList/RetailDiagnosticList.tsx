import React, { useEffect, useState } from 'react';
import styles from './RetailDiagnosticList.module.less';
import { Sorting } from 'src/types/Sorting';
import RetailDiagnosticTable from './RetailDiagnosticTable';
import { getOwners, isSitesChanged } from './services/RetailDiagnosticList.service';
import RetailDiagnosticInfo from 'src/types/RetailDiagnosticInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import { useUpdateMaxRun, useGetMaxRunsList } from 'src/api/retailDiagnostic';
import EditDiagnosticModal from './EditDiagnosticModal';
import DiagnosticStatistic from '../DiagnosticStatistic';
import DeleteConfirmation from './DeleteConfirmation';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import { Button } from 'antd';

export type RetailDiagnosticListProps = {
  schema: string;
  search?: string;
  sites: string;
  searchType?: string;
  setLoading: (loading: boolean) => void;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const RetailDiagnosticList: React.FC<RetailDiagnosticListProps> = ({
  schema,
  search,
  sites,
  searchType,
  setLoading,
}: RetailDiagnosticListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('completeTimestamp');
  const [currentOrder] = useState('descend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<
    RetailDiagnosticInfo
  >);
  const [requestParams, setRequestParams] = useState<any>(null);
  const [maxRunsFilter, setMaxRunsFilter] = useState<any>(null);
  const [totalRecords, maxRunList, statistic] = useGetMaxRunsList(maxRunsFilter, requestParams, setLoading);
  const [selectedRowKeyVal, setSelectedRowKeyVal] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const getOffset = (page: number, size: number): number => {
    if (page === 0) {
      return PAGE_NUMBER;
    }

    if (
      requestParams &&
      maxRunsFilter &&
      ((maxRunsFilter.verticalNames && maxRunsFilter.verticalNames.join(',') !== schema) ||
        (!maxRunsFilter.verticalNames && !sites) ||
        isSitesChanged(maxRunsFilter.owners, sites) ||
        (maxRunsFilter.search && maxRunsFilter.search !== search) ||
        (!maxRunsFilter.search && search) ||
        (requestParams.searchType && requestParams.searchType !== searchType) ||
        (!requestParams.searchType && searchType) ||
        (requestParams.pagesize && requestParams.pagesize !== pageSize))
    ) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return (page - 1) * size;
  };

  const onUpdateList = () => {
    const length = pageSize - 1;
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    if (page === 0 || !(totalRecords - length < page * pageSize - pageSize + 1)) {
      setRequestParams({
        ...requestParams,
      });
    } else {
      const newPage = page > 1 ? page - 1 : PAGE_NUMBER;
      setPage(newPage);
    }
  };

  const updateRequestParams = () => {
    let newParams: any = { pagesize: pageSize, pagestart: getOffset(page, pageSize) };
    let newMaxRunFilter: any = { verticalNames: schema.split(',') };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field,
        searchType: searchType ? searchType : '',
      };
    }
    if (sites) {
      newMaxRunFilter = {
        owners: getOwners(sites),
      };
    }
    if (search) {
      newMaxRunFilter = { ...newMaxRunFilter, search };
    }
    setMaxRunsFilter(newMaxRunFilter);
    setRequestParams(newParams);
  };

  useEffect(() => {
    updateRequestParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema, search, searchType, sites, page, pageSize, sorting]);

  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [deletedGroup, setDeletedGroup] = useState<any>({});
  const [completeModalVisible, setCompleteModalVisible] = useState<boolean>(false);
  const [completedGroup, setCompletedGroup] = useState<any>({});
  const [updatedGroup, setUpdatedGroup] = useState<any>('');
  useUpdateMaxRun(updatedGroup, setUpdatedGroup, onUpdateList, setCompletedGroup);
  const [renamedGroup, setRenamedGroup] = useState<any>();
  const [editRunVisible, setEditRunVisible] = useState<boolean>(false);

  const onSortingChange = (sorting: Sorting<RetailDiagnosticInfo>): void => {
    setSorting(sorting);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const onAction = (record: RetailDiagnosticInfo, type: string) => {
    if (type === 'delete') {
      setDeletedGroup(record);
      setConfirmationVisible(true);
    }
    if (type === 'rename') {
      setRenamedGroup(record);
      setEditRunVisible(true);
    }
  };

  const onCompleteConfirmation = () => {
    const selectedMaxRuns = selectedRowKeyVal.filter((record: any) => record.status !== 'RUNNING');
    setCompleteModalVisible(true);
    setCompletedGroup(selectedMaxRuns);
  };

  const onComplete = () => {
    const newMaxRuns = completedGroup.map((item: any) => {
      return {
        name: item.name,
        ID: item.ID,
        searchType: item.searchType,
        status: item.status,
        cleansed: 1,
        collectionType: item.collectionType,
        externalSubscriberID: item.externalSubscriberID,
        archiveCorrelationID: item.archiveCorrelationID,
        schemaName: item.schemaName,
      };
    });
    setUpdatedGroup(newMaxRuns);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const onRefresh = () => {
    updateRequestParams();
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const onSelectedRowKeysChange = (selectedRowKeys: any, selectedRows: any[]) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRowKeyVal(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  const getCleansedTitle = () => {
    let name: string =
      completedGroup.length > 0
        ? completedGroup
            .slice(0, 10)
            .map((item: RetailDiagnosticInfo) => item.name)
            .join(', ')
        : '';
    if (!name) {
      return 'Mark the run as cleansed';
    }
    if (completedGroup.length > 10) {
      const moreRunsCount = completedGroup.length - 10;
      const runWord = moreRunsCount === 1 ? 'run' : 'runs';
      name = `${name} and ${moreRunsCount} more ${runWord}`;
    }
    return (
      <span>
        Mark the run <span style={{ color: '#002D74' }}>{name}</span> as cleansed?
      </span>
    );
  };

  const onDisabled = () => {
    return selectedRowKeys.filter(record => record.status !== 'RUNNING').length === 0;
  };

  return (
    <>
      <DiagnosticStatistic statistic={statistic} />
      <div className={styles.diagnostic_info_actions}>
        <Button
          type="link"
          onClick={onCompleteConfirmation}
          className={styles.diagnostic_info_action_button}
          disabled={onDisabled()}
        >
          Mark as cleansed
        </Button>
      </div>
      <div className={styles.diagnostic_table_wrapper}>
        <RetailDiagnosticTable
          items={maxRunList}
          sorting={sorting}
          pageSize={pageSize}
          page={page}
          total={totalRecords}
          onPageSizeChange={onPageSizeChange}
          onPageChange={onPageChange}
          onSortingChange={onSortingChange}
          onAction={onAction}
          onRefresh={onRefresh}
          rowSelection={rowSelection}
        />
        <DeleteConfirmation
          deletedGroup={deletedGroup}
          visible={confirmationVisible}
          setVisible={setConfirmationVisible}
          setDeletedGroup={setDeletedGroup}
          onUpdate={onUpdateList}
        />
        <EditDiagnosticModal
          maxRun={renamedGroup}
          visible={editRunVisible}
          setVisible={setEditRunVisible}
          onUpdate={onUpdateList}
        />
      </div>
      <ConfirmationCentered
        title={getCleansedTitle()}
        visible={completeModalVisible}
        onAction={onComplete}
        setVisible={setCompleteModalVisible}
        okText={'Accept'}
        cancelText={'Cancel'}
      />
    </>
  );
};

export default RetailDiagnosticList;
