import React from 'react';
import { Popover } from 'antd';
import { Alert, Icon, Spin } from 'antd';
import { useResultInputFetch } from './Hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import styles from './ResultInput.module.less';
import ResultProgress from '../ResultProgress';
import { Link } from 'react-router-dom';
import TableResultlistType from 'src/types/TableResultlistType';

type LowQualityProps = {
  runId:string;
  jobName?:string;
  selectedRowKeyVal?:TableResultlistType;
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
      <FontAwesomeIcon icon={['fal', 'sync']} style={{ marginRight: '10px' }} /> <span  >Rerun Failed Inputs</span>
    </Link>

  </div>
);
const ResultInput: React.FC<LowQualityProps> = ({runId, jobName}:LowQualityProps) => {
  console.log("jobName del"+jobName);
  const [{ data: ActiveQ, loading: loadingActive, error: activeError }] = useResultInputFetch(runId);
 
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
        {/* <Link to={`/datascout/results-details/${jobName}`} title={jobName} referrerPolicy={'origin'}>
         {jobName} &gt; </Link>  */}
         <Link className="nav-link" to={`/datascout/results-details/${runId}`} 
    style={{fontWeight: 600}} title={runId} referrerPolicy={'origin'}>{runId}</Link>
              {/* <a className="nav-link" href="/search">
                {jobName} &gt; </a> <a className="nav-link" href={`${runId}`} 
                style={{fontWeight: 600}}>{runId}</a> */}
            </div>
            <dl className='resultPagedescription_list'>              
                <dt style={{width:'100%', display: 'inline-flex'}}>Quality Index : <span style={{width:'50%', marginLeft: '20px'}}><ResultProgress runId={runId}  /></span></dt> 
                <dt>Started : <span style={{marginLeft: '20px'}}>{ActiveQ.startdate}</span></dt> 
                <dt>Finished : <span style={{marginLeft: '20px'}}>{ActiveQ.finisheddate}</span></dt> 
                <dt>Total Inputs: <span className="inputsNo" style={{marginLeft: '20px', fontSize:'24px'}}>{ActiveQ.inputs}</span></dt>
                <dt>Total Outputs: <span className="outputNo" >{ActiveQ.outputs}</span></dt>
              </dl>
            
          </div>
        )}
        {ActiveQ !== null}
      </div>
    </div>
  </div>
  )
};

export default ResultInput;
