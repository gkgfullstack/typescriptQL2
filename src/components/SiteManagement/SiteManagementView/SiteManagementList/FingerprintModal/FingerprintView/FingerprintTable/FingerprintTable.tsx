import React, { useEffect, useState } from 'react';
import Spin from 'src/components/common/Spin';
import styles from './FingerprintTable.module.less';
import { Button, Table } from 'antd';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import { getColumns } from './services/FingerprintTable.service';
import { PaginationConfig } from 'antd/lib/table';
import DefaultTableQueryParams from 'src/types/DefaultTableQueryParams';
import { useGetFingerPrintList } from 'src/api/fingerPrintFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteFingerprint } from 'src/api/fingerPrintFilter';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';
import FingerprintInfo from 'src/types/FingerprintInfo';

type FingerprintTableProps = {
  schema: string | undefined;
  site: SiteManagementInfo;
  onEditFingerprint: (fingerprint: FingerprintInfo | {}) => void;
  requestParams: DefaultTableQueryParams;
  setRequestParams: (params: DefaultTableQueryParams) => void;
  onUpdate: () => void;
};
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const FingerprintTable: React.FC<FingerprintTableProps> = ({
  schema,
  site,
  onEditFingerprint,
  requestParams,
  setRequestParams,
  onUpdate,
}) => {
  const locale = { items_per_page: '' };
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [columns, setColumns] = useState<any[]>([]);
  const [selectedRowKeyVal, setSelectedRowKeyVal] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [loading, totalRecords, fingerprintList] = useGetFingerPrintList(requestParams);
  const [deletedList, setDeletedList] = useState<any[]>([]);
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [deletedNames, setDeletedNames] = useState<string>('');
  useDeleteFingerprint(schema, deletedList, setDeletedList, onUpdate);
  const totalRender = (): React.ReactNode => <span>Total Results: {totalRecords}</span>;
  const emptyText: React.ReactNode = <p className={styles.no_results}>No results found</p>;
  const getOffset = (page: number, size: number): number => {
    if (requestParams && requestParams.pagesize && requestParams.pagesize !== pageSize) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }
    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };

  useEffect(() => {
    const newParams: any = {
      pagesize: pageSize,
      pagestart: getOffset(page, pageSize),
      siteId: site.ID,
      schema,
    };
    setRequestParams(newParams);
    setColumns(getColumns());
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const handlePageSizeChanges = (_: number, size: number): void => {
    setPageSize(size);
  };

  const handlerPageChange = (page: number): void => {
    setPage(page);
  };

  const pagination: PaginationConfig = {
    pageSize: pageSize,
    current: page,
    showTotal: totalRender,
    total: totalRecords,
    hideOnSinglePage: false,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
    locale: locale,
    onShowSizeChange: handlePageSizeChanges,
    onChange: handlerPageChange,
  };

  const onSelectedRowKeysChange = (selectedRowKeys: any, selectedRows: any[]) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRowKeyVal(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  const onEdit = () => {
    onEditFingerprint(selectedRowKeyVal[0]);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const onAddFingerPrint = () => {
    onEditFingerprint({});
  };

  const onDelete = () => {
    const ids = selectedRowKeyVal.map((item: any) => Number(item.ID));
    setDeletedList(ids);
    setSelectedRowKeys([]);
    setSelectedRowKeyVal([]);
  };

  const showModal = () => {
    const names = selectedRowKeyVal.map(item => item.name).join(', ');
    setDeletedNames(names);
    setConfirmationVisible(true);
  };

  return (
    <>
      <div className={styles.fingerprint_title}>
        <Button type={'default'} onClick={onAddFingerPrint} className={styles.fingerprint_title_button}>
          <FontAwesomeIcon icon={['fal', 'plus-circle']} size="lg" style={{ marginRight: '7px' }} />
          Add Fingerprint
        </Button>
      </div>
      <div className={styles.fingerprint_actions}>
        <ConfirmationCentered
          title={'Delete the fingerprints'}
          name={deletedNames}
          visible={confirmationVisible}
          onAction={onDelete}
          setVisible={setConfirmationVisible}
        />
        <Button
          type="link"
          onClick={showModal}
          className={styles.fingerprint_action_button}
          disabled={selectedRowKeys.length === 0}
        >
          Delete
        </Button>{' '}
        |
        <Button
          type="link"
          className={styles.fingerprint_action_button}
          disabled={selectedRowKeys.length !== 1}
          onClick={onEdit}
        >
          Edit
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          rowClassName={(): string => styles.fingerprint_table_row}
          className={styles.fingerprint_table}
          rowKey={(_, index: number): string => index.toString()}
          columns={columns}
          pagination={pagination}
          dataSource={fingerprintList}
          tableLayout={'auto'}
          locale={{ emptyText: emptyText }}
          rowSelection={rowSelection}
        />
      </Spin>
    </>
  );
};

export default FingerprintTable;
