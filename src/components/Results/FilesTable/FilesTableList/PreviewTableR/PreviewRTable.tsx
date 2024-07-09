import React from 'react';
//import { SearchAuditHistoryStateProvider } from 'src/stateProviders/searchAuditHistoryStateProvider';
import PreviewRTableView from './PreviewRTableView';
import { Modal, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import styles from './PreviewRTable.module.less';
//import UserContex from 'src/services/UserContex';

type PreviewProps = {
  resultid:any;
  envurl?:any;
};

const PreviewTable: React.FC<PreviewProps> = ({resultid, envurl}) => {
  const [visible, setVisible] = React.useState<any>(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e: any) => {
    console.log(e);
    setVisible({
      visible: false,
    });
  };

  const handleCancel = (e: any) => {
    console.log(e);
    setVisible(false);
  };
  //let url = UserContex.getBaseUrl()+"/rest/lines" + downloadurl;
  
  return (<><Button type="link" onClick={showModal} 
                style={{ 
                padding: '0px', 
                minWidth: 'auto', 
                lineHeight: '10px', 
                marginTop: '-5px', 
                height: 'auto' }}
                >
                  <FontAwesomeIcon icon={['fal', 'eye']} color={'gray'} style={{fontSize:'16px'}} />
                </Button>
                <Modal
                  title={[
                    <div className="modalHeadershow">                     
                      <div style={{ float: 'right' }}><a 
                      href={`${envurl}`+'/cc/result/ResultSingleDownload?resultid=' + 
                     `${resultid}`}                      
                      className="item" rel="noopener noreferrer" 
                      style={{ marginLeft: '10px', marginTop: '-1px', fontSize: '12px', marginBottom: '10px', display: 'inline-block' }}>
                        <FontAwesomeIcon icon={['fal', 'download']} color={'gray'} style={{marginRight: '10px'}}/> Download</a>
                      </div>
                      </div>,
                  ]}
                  style={{ top: 20 }}
                  visible={visible}
                  footer={false}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  className="modalshowfull"
                >
                  <PreviewRTableView resultid={resultid}/>
                </Modal></>
  );
};

export default PreviewTable;

