import React, { useEffect, useState } from 'react';
import AuditHistoryList from '../AuditHistoryList';
import AuditHistoryInfo from 'src/types/AuditHistoryInfo';
import { Sorting } from 'src/types/Sorting';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';
import AuditHistoryFilters from '../AuditHistoryFilters';

type ProductFinderViewProps = {};
const AuditHistoryView: React.FC<ProductFinderViewProps> = () => {
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  const { sortingorder, sortingcolumn } = useQueryUrlParams();
  const [currColumn, setSortingColumn] = useState(sortingcolumn || 'RequestType');
  const [currOrder, setSortingOrder] = useState(sortingorder || 'ascend');
  const [status, setStatus] = useState('');
  const [requestType, setRequestType] = useState('');
  const [reporter, setReporter] = useState('');
  const [competitorSite, setCompetitorSite] = useState('');

  useEffect(() => {
    if (setQuery && sortingcolumn && sortingorder && (sortingcolumn !== currColumn || sortingorder !== currOrder)) {
      setSortingColumn(sortingcolumn);
      setSortingOrder(sortingorder);
      setQuery({
        sortingorder: sortingorder,
        sortingcolumn: sortingcolumn,
      });
    }
    if (!sortingcolumn && !sortingorder) {
      setSortingColumn('RequestType');
      setSortingOrder('ascend');
    }
  }, [setQuery, currColumn, currOrder, sortingcolumn, sortingorder]);

  const onSortingChange = (sorting: Sorting<AuditHistoryInfo>): void => {
    setQuery({
      sortingorder: sorting.order,
      sortingcolumn: sorting.field,
    });
  };
  const sorting = {
    field: currColumn,
    order: currOrder,
  } as Sorting<AuditHistoryInfo>;

  const onUpdateFilters = (id: string, value: string) => {
    if (id === 'status') {
      setStatus(value);
    }
    if (id === 'requestType') {
      setRequestType(value);
    }
    if (id === 'reporter') {
      setReporter(value);
    }
    if (id === 'competitorSite') {
      setCompetitorSite(value);
    }
  };

  return (
    <>
      <AuditHistoryFilters onUpdate={onUpdateFilters} />
      <AuditHistoryList
        sorting={sorting}
        onSortingChange={onSortingChange}
        filters={{
          status,
          requestType,
          reporter,
          competitorSite,
        }}
      />
    </>
  );
};

export default AuditHistoryView;
