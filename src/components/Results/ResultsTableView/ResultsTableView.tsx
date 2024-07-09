import React, { useEffect, useState } from 'react';
import ResultsTableList from '../ResultsTableList';
import RCSearchsType from 'src/types/RCSearchsType';
import { Sorting } from 'src/types/Sorting';
import { Row, Col, Layout } from 'antd';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import TableResultlistType from 'src/types/TableResultlistType';
import AppIdQueryParams from 'src/types/AppIdQueryParams';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import FilterPanel from '../FilterPanel';
import { useResultsTableFetch } from '../Hooks';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';
import moment from 'moment';

export const DEFAULT_PAGE_SIZE = 30;
export const PAGE_NUMBER = 1;

type ProductFinderViewProps = {
  selectedRowKeyVal?: TableResultlistType[];
  fixedDays: any;
};

const ResultsTableView: React.FC<ProductFinderViewProps> = ({ fixedDays }) => {
  const setQuery = useQueryUrlParamsDispatch<AppIdQueryParams>();
  const currentTime = moment().format("mm/dd/yy".toUpperCase());
  const appIds = localStorage.getItem('appId');
  window.localStorage.setItem("isPageType", "All");
  
  const {  createdStart , createdEnd, lastrunStart, lastrunEnd, finishedStart, finishedEnd, updatedStart, updatedEnd, sortingcolumn = 'null', sortingorder = 'ascend', search = '' }:any = useQueryUrlParams();
  
  const [currColumn, setSortingColumn] = useState(sortingcolumn || 'null');
  const [currOrder, setSortingOrder] = useState(sortingorder || 'ascend');
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);

  useEffect(() => {
    setTimeout(() => {
      setPage(PAGE_NUMBER);
      setPageSize(DEFAULT_PAGE_SIZE)
    }, 0);
  }, [
    createdStart,
    search,
    sortingcolumn,
    sortingorder,
    pageSize,
    appIds,
    createdEnd,
    lastrunStart,
    lastrunEnd,
    finishedStart,
    finishedEnd,
    updatedStart,
    updatedEnd,
  ]);
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let isPageType = urlParams.get('isPageType')?.toString();
  const {
    data: rcSearchsListData,
    loading: productsLoading,
    error: productsError,
    total: totalProducts,
    //errorMsg:errorMsg,
  } = useResultsTableFetch(
    currColumn,
    page,
    pageSize,
    appIds,
    search,
    isPageType,
    createdStart,
    createdEnd,
    lastrunStart,
    lastrunEnd,
    finishedStart,
    finishedEnd,
    updatedStart,
    updatedEnd,
  );

  useEffect(() => {
    if (sortingcolumn && sortingorder && (sortingcolumn !== currColumn || sortingorder !== currOrder)) {
      setTimeout(() => {
        setSortingColumn(sortingcolumn);
        setSortingOrder(sortingorder);
        setQuery({
          sortingorder: sortingorder,
          sortingcolumn: sortingcolumn,
        });
      }, 0);
    }
    if (!sortingcolumn && !sortingorder) {
      setTimeout(() => {
        setSortingColumn('null');
        setSortingOrder('ascend');
      }, 0);
    }
  }, [setQuery, currColumn, currOrder, sortingcolumn, sortingorder]);

  const [createdStartLoading, setCreatedStartLoading] = useState(true);
  let loadingFalse = currentTime === fixedDays;
  useEffect(() => {
    if(createdStart === undefined === false){
      if(loadingFalse === false){
        if(productsLoading === false){
          if(rcSearchsListData === null  === false){
            setTimeout(() => {
              setCreatedStartLoading(false);
            }, 0)
          }
        }
      }
    }

  }, [createdStart, loadingFalse, productsLoading, rcSearchsListData ])

  const createdStarts = createdStart === undefined ? fixedDays : createdStart;
  const createdEnds = createdEnd;
  const lastrunStarts = lastrunStart;
  const lastrunEnds = lastrunEnd;
  const finishedStarts = finishedStart;
  const finishedEnds = finishedEnd;
  const updatedStarts = updatedStart;
  const updatedEnds = updatedEnd;

  const onSortingChange = (sorting: Sorting<RCSearchsType>): void => {
    setQuery({
      sortingorder: sorting.order,
      sortingcolumn: sorting.field,
    });
  };
  const sorting = {
    field: sortingcolumn,
    order: sortingorder,
  } as Sorting<RCSearchsType>;
  

  return (
    <>
      <Layout>
        <Row >
          <Col span={24} className="gutter-row">
            <FilterPanel appId={appIds}
              createdStartss={createdStarts}
              createdEnd={createdEnds}
              lastrunStart={lastrunStarts}
              lastrunEnd={lastrunEnds}
              finishedStart={finishedStarts}
              finishedEnd={finishedEnds}
              updatedStart={updatedStarts}
              updatedEnd={updatedEnds}
            />
          </Col>
        </Row>
        <Row >
          <Col span={24} className="gutter-row">
            <div className="box">
              {productsError && (
                <Alert
                  message="Error"
                  description="An error
          has occurred when trying to get Result! Please try again later!"
                  type="error"
                  showIcon
                />
              )}
              {createdStartLoading ? (
                <div className="table_list_loader">
                  <Spin  />
                </div>
              ) : (rcSearchsListData !== null && (
                  <ResultsTableList
                    sorting={sorting}
                    onSortingChange={onSortingChange}
                    rcSearchsListData={rcSearchsListData}
                    productsLoading={createdStartLoading}
                    pageSize={pageSize}
                    page={page}
                    totalProducts={totalProducts}
                    setPageSize={setPageSize}
                    setPage={setPage} 
                    appId={appIds}
                  />
                )
              )}
            </div>
          </Col>
        </Row>
      </Layout>
      </>
  );
};

export default ResultsTableView;
