import React, { useEffect, useState } from 'react';
import JobSearchList from '../JobSearchList';
import ApplicationFilterType from 'src/types/ProductFinderInfo';
import { Sorting } from 'src/types/Sorting';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import AppIdQueryParams from 'src/types/AppIdQueryParams';
import FilterPanel from '../FilterPanel';

type ProductFinderViewProps = {};
const JobSearchView: React.FC<ProductFinderViewProps> = () => {
  const setQuery = useQueryUrlParamsDispatch<AppIdQueryParams>();
  let { sortingorder, sortingcolumn,createdStart, createdEnd, lastrunStart, lastrunEnd, finishedStart, finishedEnd, updatedStart, updatedEnd,isPageType,ownerName } = useQueryUrlParams();
  const [currColumn, setSortingColumn] = useState(sortingcolumn || 'created');
  const [currOrder, setSortingOrder] = useState(sortingorder || 'descend'); 
  useEffect(() => {
    if(!sortingorder || !sortingcolumn){
      if(isPageType==="Schedule"){
         setSortingColumn('nextScheduleDt');
         setSortingOrder('descend');
        setQuery({
          sortingorder: 'descend',
          sortingcolumn: 'nextScheduleDt',
        });
      } else {
        setSortingColumn('created');
        setSortingOrder('descend');
        setQuery({
          sortingorder: 'descend',
          sortingcolumn: 'created',
        });
      }
    } else {

    }
    
  },[isPageType, sortingorder, sortingcolumn])

  const onSortingChange = (sorting: Sorting<ApplicationFilterType>): void => {
    setSortingColumn(sorting.field);
    setSortingOrder(sorting.order);
    setQuery({
      sortingorder: sorting.order,
      sortingcolumn: sorting.field,
    });
  };
  const appIds = localStorage.getItem('appId');
  const createdStarts =createdStart
  const createdEnds = createdEnd;
  const lastrunStarts = lastrunStart
  const lastrunEnds = lastrunEnd
  const finishedStarts = finishedStart
  const finishedEnds = finishedEnd
  const updatedStarts = updatedStart
  const updatedEnds = updatedEnd
  const ownerNames=ownerName;
  const sorting = {
    field: currColumn,
    order: currOrder,
  } as Sorting<ApplicationFilterType>;
  return (
    <>
    <FilterPanel appId={appIds} 
      createdStart={createdStarts}
      createdEnd={createdEnds}
      lastrunStart={lastrunStarts}
      lastrunEnd={lastrunEnds}
      finishedStart={finishedStarts}
      finishedEnd={finishedEnds}
      updatedStart={updatedStarts}
      updatedEnd={updatedEnds}
      isPageType={isPageType}
      ownerName={ownerNames}
      />
      <JobSearchList
        sorting={sorting}
        onSortingChange={onSortingChange}
        appId={appIds}
        createdStart={createdStarts}
        createdEnd={createdEnds}
        lastrunStart={lastrunStarts}
        lastrunEnd={lastrunEnds}
        finishedStart={finishedStarts}
        finishedEnd={finishedEnds}
        updatedStart={updatedStarts}
        updatedEnd={updatedEnds}
        ownerName={ownerNames}
      />

    </>
  );
};

export default JobSearchView;
