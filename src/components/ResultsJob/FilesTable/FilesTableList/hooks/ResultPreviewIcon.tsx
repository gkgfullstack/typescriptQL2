import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Select, Button } from 'antd';
//import styles from '../FilesTableList.module.less';
import UserContex from 'src/services/UserContex';

const { Option } = Select;

type FilesResultsTableProps = {
  resultid:string;
  filename:string;
};
const ResultPreviewIcon: React.FC<FilesResultsTableProps> = () => {
  const [visible, setVisible] = useState<any>(false);

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
  function handleChange(value: string) {
    console.log(`selected ${value}`);
  }
  return (
    <>
      <Modal  title={[
        <div className="modalHeadershow">
          <Select defaultValue="lucy" style={{
            width: 200,
            borderRadius: '5px'
          }} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
          <div style={{ float: 'right' }}>
            <a href={UserContex.getBaseUrl()+'/cc/results/AE4987C6E93A87867706B0351E1663AA.gobo01-'} className="item" rel="noopener noreferrer" 
            style={{ marginLeft: '10px', marginTop: '-1px', fontSize: '12px' }}>
            <FontAwesomeIcon icon={['fal', 'download']} color={'gray'} style={{ marginRight: '10px' }} /> Download</a>
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
      <Button type='link' onClick={showModal}><FontAwesomeIcon icon={['fal', 'eye']} style={{ marginRight: '10px' }} /></Button>
    </Modal>
    </>
  );
};

export default ResultPreviewIcon;

