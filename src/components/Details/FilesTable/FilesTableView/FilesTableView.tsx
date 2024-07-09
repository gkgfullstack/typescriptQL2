import React, { useEffect, useState } from 'react';
import FilesTableList from '../FilesTableList';
import FileTableResultType from 'src/types/FileTableResultType';
import { Sorting } from 'src/types/Sorting';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';

type ProductFinderViewProps = {
  runId:string
};
const FilesTableView: React.FC<ProductFinderViewProps> = ({runId}) => {
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  const { sortingorder, sortingcolumn } = useQueryUrlParams();
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

  const onSortingChange = (sorting: Sorting<FileTableResultType>): void => {
    setQuery({
      sortingorder: sorting.order,
      sortingcolumn: sorting.field,
    });
  };
  const sorting = {
    field: currColumn,
    order: currOrder,
  } as Sorting<FileTableResultType>;
  return (
    <>
      <FilesTableList sorting={sorting} onSortingChange={onSortingChange} runId={runId} />
    </>
  );
};

export default FilesTableView;
