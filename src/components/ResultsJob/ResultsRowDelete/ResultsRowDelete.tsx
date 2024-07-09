import React from 'react';
import { Button, Popconfirm } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useResultsRowDeleteFetch} from './hooks';
import styles from './ResultsRowDelete.module.less';
import TableResultlistType from 'src/types/TableResultlistType';

export type ResultsRowDeleteProps = {
  selectedRowKeyVal: TableResultlistType[];
  runId:string;
  deleteaction?:any;
}
const ResultsRowDelete: React.FC<ResultsRowDeleteProps> = ({ selectedRowKeyVal, runId }) => {
  const [{ data }, {deleteaction}] = useResultsRowDeleteFetch();
  
  React.useEffect(() => {
    var formArchive = document.getElementById('archive');
    if (formArchive !== null)
          formArchive.style.display = 'block';
        if (data !== null) {
          console.log("message1===", data);
          alert(data)
        }
        
     }, [data]);
     
      if (selectedRowKeyVal !== undefined) {
        for (let i = 0; i < selectedRowKeyVal.length; i++) {
          runId = selectedRowKeyVal[i].runId + "," + runId;
        }
      }
  function deleteActionBtn(deleteAction: string) {
    if (selectedRowKeyVal !== undefined) {
        let runId: string = "";
      
      for (let i = 0; i < selectedRowKeyVal.length; i++) {
          runId = selectedRowKeyVal[i].runId + "," + runId;
        }
      if(selectedRowKeyVal.length < 1) {
          alert("please select at least one ")
          return;
        }
      const deleterows = {
        deleteAction: deleteAction,
          runId: runId,
        }       
      let r;
      if (deleteAction === 'archive') {
        console.log("archive===", runId);
          r = true;
        }
       if (r === true) {
        deleteaction(deleterows)
        console.log("archive===", deleterows);
        }
    }
    }
    function cancel() {
    }
  const ButtonGroup = Button.Group;
  return (<span style={{ position: 'absolute',
  width: '20px',
  height: '30px',
  top: '24px',
  marginLeft: '20px',
  fontSize: '22px',
  backgroundColor: 'transparent',
  zIndex:9,
  }}>
    <ButtonGroup className={styles.btngroups}>
     <Popconfirm
            placement="rightTop"
            title="Are you sure you want to delete the selected result from the list ?"
            onConfirm={() => { deleteActionBtn('archive'); }}
            onCancel={() => { cancel() }}
            okText="Yes"
            cancelText="No"
            icon={null}
          >
            <Button id="archive" type="link" style={{minWidth:'auto', padding:'0px'}}>
              <FontAwesomeIcon icon={['fal', 'trash-alt']} style={{color:'#6f6f6f'}}/>  
          </Button>
          </Popconfirm>
    </ButtonGroup>
    </span>
  );
};
export default ResultsRowDelete;
