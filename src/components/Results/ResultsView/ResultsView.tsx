import React  from 'react';
import { Row, Col, Layout} from 'antd';
//import styles from './Results.module.less';
import ResultInput from '../ResultInput';
import FilesTable from '../FilesTable';
import ResultCircleChartGraph from '../ResultCircleChart';

export type ResultsViewProps = {
  runId: string;
  jobName:any;
  resultid:any;
  jobid:any;
  selectedRowKeyVal:any;
};

const ResultsView: React.FC<ResultsViewProps> = ({ runId, resultid, selectedRowKeyVal, jobName }:ResultsViewProps) => {
//   let runId:string='';
//   if(resultsViewProps.runId !== undefined){
//    runId = resultsViewProps.runId;
// }
// let resultid:string='';
// if(resultsViewProps.resultid !== undefined){
//   resultid = resultsViewProps.resultid;
// }
 return (
    <Layout>
      <Row  >
        <Col span={24}>
            <Col span={24}>
              <ResultInput runId={runId} jobName={jobName} selectedRowKeyVal={selectedRowKeyVal}  />
            </Col>
            <Col span={24} >
              <ResultCircleChartGraph runId={runId}   />
            </Col> 
            <Col span={24}>
            <FilesTable runId={runId} resultid={resultid} />
            </Col>
        </Col>
      </Row>
    </Layout>
  );
};
export default ResultsView;
