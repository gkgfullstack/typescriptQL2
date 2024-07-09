import React, { useEffect, useState } from 'react';
import { Row, Col, Layout, 
 // Tabs 
} from 'antd';
//import styles from './Results.module.less';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import AppIdQueryParams from 'src/types/AppIdQueryParams';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
//import ReportResult from '../ReportResult';
import ResultInput from '../ResultInput';
import FilesTable from '../FilesTable';
import ResultCircleChartGraph from '../ResultCircleChart';

//const { TabPane } = Tabs;

export type ResultsViewProps = {
  runId?: string;
  jobName?:any;
};
const ResultsView: React.FC<ResultsViewProps> = ({runId}, resultsViewProps:ResultsViewProps) => {
//   let runId:string='';
//   if(resultsViewProps.runId !== undefined){
//    runId = resultsViewProps.runId;
// }  
  const setQuery = useQueryUrlParamsDispatch<AppIdQueryParams>();
  const { sortingorder, sortingcolumn } = useQueryUrlParams();
  const [currColumn, setSortingColumn] = useState(sortingcolumn || 'null');
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
      setSortingColumn('null');
      setSortingOrder('ascend');
    }
  }, [setQuery, currColumn, currOrder, sortingcolumn, sortingorder]);
 return (
    <Layout>
      <Row >
        <Col span={24}>
            <Col span={24}>
              <ResultInput runId={runId !== undefined ? runId : '-1'} jobName={resultsViewProps.jobName} />
            </Col>
            <Col span={24}>
              <ResultCircleChartGraph runId={runId !== undefined ? runId : '-1'}   />
            </Col> 
            <Col span={24}>
            <FilesTable runId={runId  !== undefined ? runId : '-1'} />
       
            </Col>
        </Col>
      </Row>
    </Layout>
  );
};
export default ResultsView;
