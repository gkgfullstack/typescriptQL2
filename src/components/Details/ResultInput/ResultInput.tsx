import React, { SyntheticEvent } from 'react';
import { Popover } from 'antd';
import { Alert, Icon, Spin } from 'antd';
import { useResultInputFetch } from './Hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import styles from './ResultInput.module.less';
import ResultProgress from '../ResultProgress';
import { Link } from 'react-router-dom';
import TableResultlistType from 'src/types/TableResultlistType';
import { useHistory } from 'react-router-dom';
import routes from 'src/routes';
  
type LowQualityProps = {
  runId: string;
  jobName?: string;
  selectedRowKeyVal?: TableResultlistType;
};

const antIcon = <Icon type="loading" spin />;

const exclamationPopoverContent = (
  <div className="topInfoBox">
    <Link to={`/optiprice/product-details/`} referrerPolicy={'origin'} className="downloadicons">
      <FontAwesomeIcon icon={['fal', 'download']} style={{ marginRight: '10px' }} /> <span  >Download</span>
    </Link>

    <Link to={`/optiprice/product-details/`} referrerPolicy={'origin'} className="eyeicons">
      <FontAwesomeIcon icon={['fal', 'eye']} style={{ marginRight: '10px' }} /> <span  >View</span>
    </Link>

    <Link to={`/optiprice/product-details/`} referrerPolicy={'origin'} className="syncicons">
      <FontAwesomeIcon icon={['fal', 'sync']} style={{  marginRight: '10px' }} /> <span  >Rerun Failed Inputs</span>
    </Link>

  </div>
);

const ResultInput: React.FC<LowQualityProps> = ({ runId }: LowQualityProps) => {
  const [{ data: ActiveQ, loading: loadingActive, error: activeError }] = useResultInputFetch(runId);
  const history = useHistory();
  return (<div className="boxResultPage" >
    <div >
      <Popover content={exclamationPopoverContent} trigger={'click'} placement="bottomRight">
      </Popover>
      <div className="boxResultPage2">
        {activeError && (
          <Alert
            message="Error"
            description="An error, Please try again later!"
            type="error"
            showIcon
          />
        )}
        {loadingActive && !activeError ? (
          <div className="matches_loader_container">
            <Spin indicator={antIcon} size={'large'} spinning={loadingActive} />
          </div>
        ) : null}
        {ActiveQ !== null && (
          <div className="boxResultPage3">
            <div className="maxWidth">
              <Link 
               to={routes.results}
               onClick={(event: SyntheticEvent) => {
                 if (window.history.state && window.history.state.key) {
                   event.preventDefault();
                   history.goBack();
                 }
               }} 
              style={{display: 'inline-block', marginBottom:'10px'}} 
              title={ActiveQ.jobName} 
              referrerPolicy={'origin'}>
              &lt; {ActiveQ.jobName}  </Link><h1 title={runId}>{runId}</h1>
            <dl className="description_list">              
                <dt>Started : <span>{ActiveQ.startdate}</span></dt>
                <dt>Finished :<span>{ActiveQ.finisheddate}</span> </dt>
                <dt>Total Inputs :<span>{ActiveQ.inputs}</span> </dt>
                <dt>Total Outputs :<span>{ActiveQ.outputs}</span> </dt>
                <dt>Quality Index :</dt><dd><span className="progressbar"><ResultProgress runId={runId} /></span></dd>  
            </dl>
            </div>
            </div>
        )}
        {ActiveQ !== null}
      </div>
    </div>
  </div>
  )
};

export default ResultInput;
