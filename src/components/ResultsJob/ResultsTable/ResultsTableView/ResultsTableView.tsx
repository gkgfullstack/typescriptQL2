import React, { useEffect, useState } from 'react';
import ResultsTableList from '../ResultsTableList';
import RCSearchsType from 'src/types/RCSearchsType';
import { Sorting } from 'src/types/Sorting';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';
import TableResultlistType from 'src/types/TableResultlistType';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';

type ProductFinderViewProps = {
  selectedRowKeyVal?: TableResultlistType[];
};
const ResultsTableView: React.FC<ProductFinderViewProps> = () => {
  const { searchId } = useSearchDetailsStateContext();
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  const { sortingorder, sortingcolumn,createdStart, createdEnd, lastrunStart, lastrunEnd, finishedStart, finishedEnd, updatedStart, updatedEnd } = useQueryUrlParams();
  const [currColumn, setSortingColumn] = useState(sortingcolumn || 'Finished');
  const [currOrder, setSortingOrder] = useState(sortingorder || 'descend');
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
      setSortingOrder('descend');  
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
  const appIds = localStorage.getItem('appId');
 // const  jobIds= localStorage.getItem('jobidpage');
  const createdStarts =createdStart
  const createdEnds = createdEnd;
  const lastrunStarts = lastrunStart  
  const lastrunEnds = lastrunEnd
  const finishedStarts = finishedStart
  const finishedEnds = finishedEnd
  const updatedStarts = updatedStart
  const updatedEnds = updatedEnd
  
  return (
    <>   
 <ResultsTableList
        sorting={sorting}
        onSortingChange={onSortingChange}
        appId={appIds}
        jobId={searchId}
        createdStart={createdStarts}
        createdEnd={createdEnds}
        lastrunStart={lastrunStarts}
        lastrunEnd={lastrunEnds}
        finishedStart={finishedStarts}
        finishedEnd={finishedEnds}
        updatedStart={updatedStarts}
        updatedEnd={updatedEnds}
      />
    </>
  );
};

export default ResultsTableView;
