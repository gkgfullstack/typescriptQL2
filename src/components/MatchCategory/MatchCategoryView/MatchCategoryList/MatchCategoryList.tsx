import React, { useEffect, useState } from 'react';
import styles from './MatchCategoryList.module.less';
import { Sorting } from 'src/types/Sorting';
import MatchCategoryTable from './MatchCategoryTable';
import SORT_ORDER from 'src/enums/sortOrder';
import MatchAttributeInfo from 'src/types/MatchAttributeInfo';
import { useGetMatchAttributeList, useDeleteMatchAttribute } from 'src/api/matchAttribute';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';
import EditMatchAttributeModal from './EditMatchAttributeModal';
import MatchAttributeDetailsModal from './MatchAttributeDetailsModal';
import MatchAttributeMapModal from './MatchAttributeMapModal';

export type MatchCategoryListProps = {
  search?: string;
  categoryId?: string;
  requestParams: any;
  setRequestParams: any;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const MatchCategoryList: React.FC<MatchCategoryListProps> = ({
  search,
  categoryId,
  requestParams,
  setRequestParams,
}: MatchCategoryListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('name');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<MatchAttributeInfo>);
  const [loading, totalRecords, matchAttributeList] = useGetMatchAttributeList(requestParams);
  const [selectedMatchAttribute, setSelectedMatchAttribute] = useState<any>(null);
  const [editMatchVisible, setEditMatchVisible] = useState(false);
  const [matchDetailsVisible, setMatchDetailsVisible] = useState(false);

  const getOffset = (page: number, size: number): number => {
    if (
      requestParams &&
      ((requestParams.search && requestParams.search !== search) ||
        (!requestParams.search && search) ||
        (requestParams.pagesize && requestParams.pagesize !== pageSize))
    ) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };
  const onUpdateList = (length: number) => {
    setSelectedMatchAttribute(null);
    if (page === 0 || !(totalRecords - length < page * pageSize - pageSize + 1)) {
      setRequestParams({
        ...requestParams,
      });
    } else {
      const newPage = page > 1 ? page - 1 : PAGE_NUMBER;
      setPage(newPage);
    }
  };
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [deletedMatchAttribute, setDeletedMatchAttribute] = useState<string>('');
  const [matchAttributeMapVisible, setMatchAttributeMapVisible] = useState<boolean>(false);
  useDeleteMatchAttribute(deletedMatchAttribute, setDeletedMatchAttribute, onUpdateList);

  useEffect(() => {
    let newParams: any = { pagesize: pageSize, pagestart: getOffset(page, pageSize) };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field,
      };
    }
    if (search) {
      newParams = { ...newParams, search };
    }
    if (categoryId) {
      newParams = { ...newParams, matchCategoryId: categoryId };
    }
    setRequestParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, categoryId, page, pageSize, sorting]);

  const onSortingChange = (sorting: Sorting<MatchAttributeInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  const onAction = (record: any, type: string) => {
    if (type === 'map') {
      setSelectedMatchAttribute(record);
      setMatchAttributeMapVisible(true);
    }
    if (type === 'edit') {
      record.matchCategoryId = categoryId;
      setEditMatchVisible(true);
      setSelectedMatchAttribute(record);
    }
    if (type === 'delete') {
      setSelectedMatchAttribute(record);
      setConfirmationVisible(true);
    }
    if (type === 'details') {
      setMatchDetailsVisible(true);
      setSelectedMatchAttribute(record);
    }
  };

  const onDelete = () => {
    setDeletedMatchAttribute(selectedMatchAttribute.ID);
  };

  return (
    <div className={styles.list_table_wrapper}>
      <MatchCategoryTable
        items={matchAttributeList}
        sorting={sorting}
        loading={loading}
        pageSize={pageSize}
        page={page}
        total={totalRecords || 0}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        onSortingChange={onSortingChange}
        onAction={onAction}
      />
      <ConfirmationCentered
        title={'Delete the match attribute'}
        name={selectedMatchAttribute ? selectedMatchAttribute.name : ''}
        visible={confirmationVisible}
        onAction={onDelete}
        setVisible={setConfirmationVisible}
      />
      <EditMatchAttributeModal
        visible={editMatchVisible}
        setVisible={setEditMatchVisible}
        matchAttribute={selectedMatchAttribute}
        onUpdate={onUpdateList}
      />
      <MatchAttributeDetailsModal
        visible={matchDetailsVisible}
        setVisible={setMatchDetailsVisible}
        matchAttribute={selectedMatchAttribute}
      />
      <MatchAttributeMapModal
        matchAttribute={selectedMatchAttribute}
        visible={matchAttributeMapVisible}
        setVisible={setMatchAttributeMapVisible}
      />
    </div>
  );
};

export default MatchCategoryList;
