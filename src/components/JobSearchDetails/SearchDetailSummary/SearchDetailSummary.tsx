import React, { useState, SyntheticEvent } from 'react';
import { Row, Col, Button, Modal, Checkbox, Dropdown, Menu} from 'antd';
import { useSearchDtlSummaryFetch } from './Hooks';
import styles from '../JobProperties/JobProperties.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useJobActionFetch } from 'src/components/JobSearch/JobAction/hooks';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';
import { JobActionInputs } from 'src/api/jobSearchAction';
import JobProperties from '../JobProperties';
import useJobPropertiesPostFetch from './Hooks/useJobPropertiesPostFetch';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import routes from 'src/routes';
import APPLICATIONS_NAME from 'src/enums/applicationsName';
import SaveAs from '../SaveAs';
import SaveAsAcc from '../SaveAsAcc';
import { useSaveAsAccAPIPost } from 'src/api/SaveAsAccAPIPost';
import { useSaveAsAPIPost } from 'src/api/SaveAsAPIPost';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';

export type JobActionProps = {
  useJobActionFetch?: () => void;
  jobId?: any;
  updateJobProperties?: () => void;
  form?: any;
};

const SearchDetailSummary: React.FC<JobActionProps> = ({jobId}) => {
  const { searchId } = useSearchDetailsStateContext();
  const [{loading:loadingData, data: searchDtlSummaryVal }] = useSearchDtlSummaryFetch();
  const [{  loading1, data1, error1  }, { updateJobPropertiesItems}]:any = useJobPropertiesPostFetch();
  const [visibleSaveAs, setVisibleSaveAs] = useState(false);
  const[visibleSaveAsAcc, setVisibleSaveAsAcc] = useState(false);
  const [newTableData, setNewTableData] = useState(null);
    const [newTableDataAcc, setNewTableDataAcc] = useState(null);
  useSaveAsAPIPost(newTableData, setVisibleSaveAs);
  useSaveAsAccAPIPost(newTableDataAcc,setVisibleSaveAsAcc);
  const [visibleJobPro, setVisibleJobPro] = useState(false);
  console.log(loading1, data1, error1 )
  const [visible, setVisible] = useState(false);
  const [priority, setPriority] = useState(false);
  const handleClickPriority = () => setPriority(!priority);
  const [, { jobaction }] = useJobActionFetch("jobDetail");

  const showDrawer = () => {
    setVisibleJobPro(true);
  };
  const showDrawerSaveAs = () => {
    setVisibleSaveAs(true);
  };
  const showDrawerSaveAsAcc = () => {
    setVisibleSaveAsAcc(true);
  };
  const { user } = useAppStateContext();
  const menu = (
    <Menu className={styles.jobProperty}>
      <Menu.Item>
        <span onClick={showDrawer} >
          <FontAwesomeIcon icon={['fal', 'cogs']} color={'gray'} /> Job Properties
          </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={showDrawerSaveAs} >
          <FontAwesomeIcon icon={['fal', 'save']} color={'gray'} /> Save As
          </span>
      </Menu.Item>
      <Menu.Item>
      <span onClick={showDrawerSaveAsAcc}  >

      {user?.userName !==  searchDtlSummaryVal?.ownerName  ? <><FontAwesomeIcon icon={['fal', 'save']} color={'gray'} /> Save As Account </>: " "}</span>
      </Menu.Item>
    </Menu>
  );
  function jobActionBtn(jobAction: string) {
    if (searchId !== undefined) {   
      const jobActionInputs: JobActionInputs = {
        jobIds: searchId,
        jobAction: jobAction,
        runIds: '0',
        softAbort: '',
        highPriority: String(priority),
        reAssignName: ''
      };
      if (jobAction === 'start') {
        setVisible(false);
        jobaction(jobActionInputs);
      } 
    }
  }
  const addUpdateName = (values: any): void => {
    if (updateJobPropertiesItems && values ) {   
      updateJobPropertiesItems(values);
    }
  };
  const saveAsUpdateName = (valuesSaveAs: any): void => {
    if (valuesSaveAs ) {   
      setNewTableData(valuesSaveAs);     
    }
  };
  const saveAsAccUpdateName = (valuesSaveAsAcc: any): void => {
    if (valuesSaveAsAcc ) {   
      setNewTableDataAcc(valuesSaveAsAcc);     
    }
  };
  const history = useHistory();
let applicationNames:any = searchDtlSummaryVal && searchDtlSummaryVal.applicationName; 
  return (
    <div>
      <Row>
        <Col span={15}><Link
          className="back_link"
          to={routes.jobSearch}
          onClick={(event: SyntheticEvent) => {
            if (window.history.state && window.history.state.key) {
              event.preventDefault();
              history.goBack();
            }
          }}
        >
            {' '}
            <FontAwesomeIcon icon={['far', 'chevron-left']} size={'xs'} className="back_icon" />
          Back to Job Search
        </Link>{' '}
          <h1 style={{ wordBreak: 'break-all' }}> {searchDtlSummaryVal?.jobName}</h1></Col>
        <Col span={9}> 
        {searchDtlSummaryVal?.status === 'ACTIVE' ? (
        <Button type="default" className="activeBTN">
        <FontAwesomeIcon icon={['fal', 'sync']} className="syncicons" size="lg" style={{marginRight:'10px', fontSize: '12px'}}/>
          Active
       </Button>
          ) : (
            <Button className='startBTN' id="active" type="primary" onClick={(): void => {
              setVisible(true);
            }} > Start Job
              </Button>
            )}
             <Dropdown overlay={menu} placement="bottomCenter" className={styles.moreButton}>
      <Button>More <FontAwesomeIcon icon={['fas', 'sort-down']} color={'gray'} /></Button>
    </Dropdown>
    <Modal
      title="Search Properties"
      centered
      style={{ top: 20 }}
      visible={visibleJobPro}
      onCancel={() => setVisibleJobPro(false)}
      width={'90%'}
      footer={false}
    >
      {visibleJobPro && 
        <div className={styles.filters_wrapper}>          
          <JobProperties 
           onUpdate={addUpdateName} 
           jobId={jobId}
           setVisibleJobPro={() => setVisibleJobPro(false)}        
           />
            </div>}
    </Modal>
    <Modal
      title="Save As"
      centered
      style={{ top: 20 }}
      visible={visibleSaveAs}
      onCancel={() => setVisibleSaveAs(false)}
      width={'40%'}
      footer={false}
    >
      {visibleSaveAs && 
        <div className={styles.filters_wrapper}>          
          <SaveAs 
           onUpdate={saveAsUpdateName} 
           jobId={jobId}
           setVisibleSaveAs={() => setVisibleSaveAs(false)}
           jobName={searchDtlSummaryVal?.jobName}
           loadingData={loadingData}
           />
            </div>}
    </Modal>
    <Modal
      title="Save As Own"
      centered
      style={{ top: 20 }}
      visible={visibleSaveAsAcc}
      onCancel={() => setVisibleSaveAsAcc(false)}
      width={'40%'}
      footer={false}
    >
      {visibleSaveAsAcc && 
        <div className={styles.filters_wrapper}>          
          <SaveAsAcc 
           onUpdate={saveAsAccUpdateName} 
           jobId={jobId}
           setVisibleSaveAsAcc={() => setVisibleSaveAsAcc(false)}
           jobName={searchDtlSummaryVal?.jobName}
           //ownerName={searchDtlSummaryVal?.ownerName}
           loadingData={loadingData}
           />
            </div>}
    </Modal>
          <Modal
            title="Start Search"
            visible={visible}
            onCancel={(): void => {
              setVisible(false);
            }}
            okText="Start"
            onOk={() => {
              jobActionBtn('start');
            }}
          >
            <p>Start the following search(es)?</p>
            <p>{searchDtlSummaryVal?.jobName}</p>
            <div>
              <Checkbox name="priority" onClick={handleClickPriority}>
                High Priority{' '}
              </Checkbox>
            </div>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <dl className="description_list">
            <dt>Created : </dt> <dd>{searchDtlSummaryVal && searchDtlSummaryVal.createdAt}</dd>
            <dt>Owner : </dt> <dd>{searchDtlSummaryVal && searchDtlSummaryVal.ownerName}</dd>
            <dt>Type : </dt> <dd>{APPLICATIONS_NAME[applicationNames] || applicationNames} </dd>
          </dl>
        </Col>
      </Row>
    </div>
  );
};

export default SearchDetailSummary;
