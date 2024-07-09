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
  jobName:string;
  selectedRowKeyVal:TableResultlistType;
};

const antIcon = <Icon type="loading" spin />;

const exclamationPopoverContent = (
  <div className="topInfoBox">
    <Link to={`/optiprice/product-details/`} referrerPolicy={'origin'} className="downloadicons">
      <FontAwesomeIcon icon={['fal', 'download']} style={{  marginRight: '10px' }} /> <span  >Download</span>
    </Link>

    <Link to={`/optiprice/product-details/`} referrerPolicy={'origin'} className="eyeicons">
      <FontAwesomeIcon icon={['fal', 'eye']} style={{ marginRight: '10px' }} /> <span  >View</span>
    </Link>

    <Link to={`/optiprice/product-details/`} referrerPolicy={'origin'} className="syncicons">
      <FontAwesomeIcon icon={['fal', 'sync']} style={{ marginRight: '10px' }} /> <span  >Rerun Failed Inputs</span>
    </Link>

  </div>
);
//localStorage.removeItem('runIDDetail');
const ResultInput: React.FC<LowQualityProps> = ({runId, jobName}:LowQualityProps) => {
  //localStorage.setItem('runIDDetail', `${runId}`);
  const [{ data: ActiveQ, loading: loadingActive, error: activeError }] = useResultInputFetch(runId);
 const jobIds=ActiveQ?.jobid;
  
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
           
        <Link to={'/datascout/search-details/'+jobIds} title={'jobid'}
         referrerPolicy={'origin'}>
         {jobName} &gt; </Link> 
         <Link className="nav-link" to={`/datascout/results-details/${runId}`} 
    style={{fontWeight: 600}} title={runId} referrerPolicy={'origin'}>{runId}</Link>
  
              {/* <a className="nav-link" href="/search">
                {jobName} &gt; </a> <a className="nav-link" href={`${runId}`} 
                style={{fontWeight: 600}}>{runId}</a> */}
            </div>
            <div className="boxWidth100" style={{marginTop: '20px'}}>
            <dl className='resultPagedescription_list'>              
                <dt style={{width:'100%', display: 'inline-flex'}}>Quality Index : <span style={{width:'50%', marginLeft: '20px'}}><ResultProgress runId={runId}  /></span></dt> 
                <dt>Started : <span style={{marginLeft: '20px'}}>{ActiveQ.startdate}</span></dt> 
                <dt>Finished : <span style={{marginLeft: '20px'}}>{ActiveQ.finisheddate}</span></dt> 
                <dt>Total Inputs: <span className="inputsNo" style={{marginLeft: '20px', fontSize:'24px'}}>{ActiveQ.inputs}</span></dt>
                <dt>Total Outputs: <span className="outputNo" >{ActiveQ.outputs}</span></dt>
              </dl>
            {/* <div ><b>{ActiveQ.applicationName}</b></div> */}
              {/* <div className="boxWidth100">
                <div className="boxWidth40">Quality Index :</div>
                <div className="boxWidth60"><ResultProgress runId={runId}  /> </div>
              </div> */}
              
              {/* <div className="boxWidth100" style={{ paddingTop: '15px', borderTop: '1px solid #C4C4C4',  marginTop: '10px' }}>
                <div className="boxWidth30"> Started :</div>
                <div className="boxWidth70" >{ActiveQ.startdate}</div>
            
              
              
                <div className="boxWidth30"> Finished :</div>  
                <div className="boxWidth70"> {ActiveQ.finisheddate}</div>
              </div> */}
              {/* <div className="boxWidth100" style={{ paddingTop: '15px', borderTop: '1px solid #C4C4C4', marginTop: '15px' }}>
                  <div className="boxWidth50" > Total Inputs:</div>
                  <div className="boxWidth50" style={{ color: '#002D74', fontSize: '24px', lineHeight: '30px' }}>{ActiveQ.inputs}</div>
                  <div className="boxWidth50" > Total Outputs:</div>
                  <div className="boxWidth50" style={{ color: '#002D74', fontSize: '24px', lineHeight: '30px' }}>{ActiveQ.outputs}</div>   
                </div> */}
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
