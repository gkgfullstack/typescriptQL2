import React, { useEffect, useState } from 'react';
import PreviewRTableList from '../PreviewRTableList';
import RTLPreviewType from 'src/types/RTLPreviewType';
import { Sorting } from 'src/types/Sorting';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';

type ProductFinderViewProps = {
  resultid:any;
};
const PreviewRTableView: React.FC<ProductFinderViewProps> = ({resultid}) => {
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  const { sortingorder, sortingcolumn } = useQueryUrlParams();
  const [currColumn, setSortingColumn] = useState(sortingcolumn || 'Location_RentalId');
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
      setSortingColumn('');
      setSortingOrder('ascend');
    }
  }, [setQuery, currColumn, currOrder, sortingcolumn, sortingorder]);

  const onSortingChange = (sorting: Sorting<RTLPreviewType>): void => {
    setQuery({
      sortingorder: sorting.order,
      sortingcolumn: sorting.field,
    });
  };
  const sorting = {
    field: currColumn,
    order: currOrder,
  } as Sorting<RTLPreviewType>;
  return (
    <>
      <PreviewRTableList sorting={sorting} onSortingChange={onSortingChange} resultid={resultid} />
    </>
  );
};

export default PreviewRTableView;
