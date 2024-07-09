import React, { useEffect, useState } from 'react';
import FilesListTableList from '../FilesListTableList';
import RCSearchsType from 'src/types/RCSearchsType';
import { Sorting } from 'src/types/Sorting';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';

type ProductFinderViewProps = {};
const FilesListTableView: React.FC<ProductFinderViewProps> = () => {
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  const { sortingorder, sortingcolumn }:any = useQueryUrlParams();
  const [currColumn, setSortingColumn] = useState(sortingcolumn || 'Finished');
  const [currOrder, setSortingOrder] = useState(sortingorder || 'ascend');
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
      setSortingColumn('Finished');
      setSortingOrder('ascend');
    }    
  }, [setQuery, currColumn, currOrder, sortingcolumn, sortingorder]);

  const onSortingChange = (sorting: Sorting<RCSearchsType>): void => {
    setQuery({
      sortingorder: sorting.order,
      sortingcolumn: sorting.field,
    });
  };
  const sorting = {
    field: currColumn,
    order: currOrder,
  } as Sorting<RCSearchsType>;
  return (
    <>
      <FilesListTableList sorting={sorting} onSortingChange={onSortingChange}/>
    </>
  );
};

export default FilesListTableView;
