import React, { useEffect, useState } from 'react';
import styles from './MatchAttributeList.module.less';
import { Sorting } from 'src/types/Sorting';
import MatchAttributeTable from './MatchAttributeTable';
import SORT_ORDER from 'src/enums/sortOrder';
import MatchCategoryInfo from 'src/types/MatchCategoryInfo';
import { useGetMatchCategoryList, useDeleteMatchCategory } from 'src/api/matchCategory';
import EditMatchCategoryModal from './EditMatchCategoryModal';
import ConfirmationCentered from 'src/components/common/ConfirmationCentered';

export type MatchAttributeListProps = {
  search?: string;
  schema?: string;
  requestParams: any;
  setRequestParams: any;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const MatchAttributeList: React.FC<MatchAttributeListProps> = ({
  search,
  schema,
  requestParams,
  setRequestParams,
}: MatchAttributeListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('name');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<MatchCategoryInfo>);
  const [loading, totalRecords, matchCategoryList] = useGetMatchCategoryList(requestParams);
  const [editMatchCategory, setEditMatchCategory] = useState(null);
  const [editMatchVisible, setEditMatchVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [selectedMatchCategory, setSelectedMatchCategory] = useState<any>(null);
  const [deletedMatchCategory, setDeletedMatchCategory] = useState<any>('');

  const getOffset = (page: number, size: number): number => {
    if (
      requestParams &&
      ((requestParams.search && requestParams.search !== search) ||
        (!requestParams.search && search) ||
        (requestParams.verticalName && requestParams.verticalName !== schema) ||
        (!requestParams.verticalName && schema) ||
        (requestParams.pagesize && requestParams.pagesize !== pageSize))
    ) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };
  const onUpdateList = (length: number) => {
    setEditMatchCategory(null);
    if (page === 0 || !(totalRecords - length < page * pageSize - pageSize + 1)) {
      setRequestParams({
        ...requestParams,
      });
    } else {
      const newPage = page > 1 ? page - 1 : PAGE_NUMBER;
      setPage(newPage);
    }
  };
  useDeleteMatchCategory(deletedMatchCategory, setDeletedMatchCategory, onUpdateList);

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
    if (schema) {
      newParams = { ...newParams, verticalName: schema };
    }
    setRequestParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, schema, page, pageSize, sorting]);

  const onSortingChange = (sorting: Sorting<MatchCategoryInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  const onAction = (record: any, type: string) => {
    if (type === 'edit') {
      setEditMatchCategory(record);
      setEditMatchVisible(true);
    }
    if (type === 'delete') {
      setSelectedMatchCategory(record);
      setConfirmationVisible(true);
    }
  };

  const onDelete = () => {
    setDeletedMatchCategory(selectedMatchCategory.ID);
  };

  return (
    <div className={styles.match_category_list_table_wrapper}>
      <MatchAttributeTable
        items={matchCategoryList}
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
      <EditMatchCategoryModal
        visible={editMatchVisible}
        setVisible={setEditMatchVisible}
        matchCategory={editMatchCategory}
        onUpdate={onUpdateList}
        onEdit={setEditMatchCategory}
      />
      <ConfirmationCentered
        title={'Delete the match category'}
        name={selectedMatchCategory ? selectedMatchCategory.name : ''}
        visible={confirmationVisible}
        onAction={onDelete}
        setVisible={setConfirmationVisible}
      />
    </div>
  );
};

export default MatchAttributeList;
