import React from 'react';
import { Row, Col, Layout, Tabs } from 'antd';
//import styles from './Details.module.less';
import FilesTable from './FilesTable';
import ResultInput from './ResultInput';
import ResultsRowDelete from 'src/components/Details/ResultsRowDelete';
import TableResultlistType from 'src/types/TableResultlistType';
import useRunId from 'src/hooks/useRunId';
import ErrorGraph from './ErrorGraph';
import SummaryCircleChartGraph from './SummaryCircleChart';

type ResultsViewProps = {
  runId?: string;
  jobName?: any;
  selectedRowKeyVal?: TableResultlistType;
};

const Details: React.FC<ResultsViewProps> = (resultsViewProps: ResultsViewProps) => {
  let runId = useRunId();
  const { TabPane } = Tabs;
  if (resultsViewProps.runId !== undefined) {
  }
  const [deteleButton] = React.useState(true);
  const [selectedRowKeyVal] = React.useState<TableResultlistType[]>([]);

  function handleChange(value: string) {
    console.log(`selected ${value}`);
  }
  console.log(handleChange);

  return (
    <Layout>
      <Row >
        <Col span={2} className="gutter-row" style={{
          marginBottom: '10px',
          float: 'right',
          position: 'absolute',
          right: '0px',
          zIndex: 9
        }}>
          {deteleButton && (
            <ResultsRowDelete
              runId={runId !== undefined ? runId : ''}
              selectedRowKeyVal={selectedRowKeyVal}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24} className="gutter-row">
          <ResultInput runId={runId !== undefined ? runId : '20786877'} jobName={resultsViewProps.jobName} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className="box" style={{ marginRight:'15px', height:'370px' }}>
            <SummaryCircleChartGraph runId={runId} />
          </div>
        </Col>
        <Col span={12}>
          <div className="box" style={{height:'370px' }} >
            <ErrorGraph />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Tabs tabPosition="top" className="tabs" type="card" style={{marginTop:"30px"}}>
            <TabPane tab="Files" key="1">
              <div className="box">
                <FilesTable runId={runId} />
              </div>
            </TabPane>
          </Tabs>
        </Col>
      </Row>

    </Layout>
  );
};

export default Details;
