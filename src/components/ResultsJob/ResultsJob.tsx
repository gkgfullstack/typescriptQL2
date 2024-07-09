import React, { useEffect, useState } from 'react';
import { Row, Col, Layout } from 'antd';
//import styles from './ResultsView/Results.module.less';
import ResultsTable from './ResultsTable'
import FilterPanel from '../Results/FilterPanel';
import TableResultlistType from 'src/types/TableResultlistType';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import AppIdQueryParams from 'src/types/AppIdQueryParams';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';

type ResultsProps = {
  selectedRowKeyVal?: TableResultlistType[];
  jobIds:any;
};

const ResultsJob: React.FC<ResultsProps> = () => {
  const { searchId } = useSearchDetailsStateContext();
  const setQuery = useQueryUrlParamsDispatch<AppIdQueryParams>();
  const { sortingorder, sortingcolumn,
    // createdStart, createdEnd, lastrunStart, lastrunEnd,
    // finishedStart, finishedEnd, updatedStart, updatedEnd 
  }:any = useQueryUrlParams();
  const [currColumn, setSortingColumn] = useState(sortingcolumn || 'null');
  const [currOrder, setSortingOrder] = useState(sortingorder || 'ascend');
  useEffect(() => {
    if (sortingcolumn && sortingorder && (sortingcolumn !== currColumn || sortingorder !== currOrder)) {
      setSortingColumn(sortingcolumn);
      setSortingOrder(sortingorder);
      setQuery({
        sortingorder: sortingorder,
        sortingcolumn: sortingcolumn,
      });
    }
    if (!sortingcolumn && !sortingorder) {
      setSortingColumn('null');
      setSortingOrder('ascend');
    }
  }, [setQuery, currColumn, currOrder, sortingcolumn, sortingorder]);


  const appIds = localStorage.getItem('appId');
  // const createdStarts = createdStart
  // const createdEnds = createdEnd;
  // const lastrunStarts = lastrunStart
  // const lastrunEnds = lastrunEnd
  // const finishedStarts = finishedStart
  // const finishedEnds = finishedEnd
  // const updatedStarts = updatedStart
  // const updatedEnds = updatedEnd
  return (
    <>
      <Layout>
        <Row style={{ marginBottom: '24px' }}>
          <Col span={24} className="gutter-row">
            <FilterPanel appId={appIds}
            />
          </Col>
        </Row>
        <Row >
          <Col span={24} className="gutter-row">
            <div className="box">
              <ResultsTable jobIds={searchId} />
            </div>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default ResultsJob;
