import React from 'react';
import styles from './DetailsTableForm.module.less';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Alert } from 'antd';
import Spin from 'src/components/common/Spin';
import { useTablePageEidtGetList } from 'src/api/tablePageEdit';

export type DetailsTableFormProps = FormComponentProps & {
  requestParams?: any;
  setVisible: any;
};

const DetailsTableForm: React.FC<DetailsTableFormProps> = ({
  requestParams,
}: DetailsTableFormProps) => {
  const [loadingData, allData] = useTablePageEidtGetList(requestParams);
  const responseLoadedTopEditTable =
    !loadingData && (allData || allData);
  return (
    <>
      <div className={styles.matches_filter_wrapper}>
        <div className={styles.settingPage}>          
            {loadingData && (
              <div className={styles.filters_spinner}>
                <Spin spinning={loadingData} />
              </div>
            )}
            {responseLoadedTopEditTable &&
              (!allData ? (
                <div className={styles.filters_error}>
                  <Alert
                    message="An error
                 has occurred when trying to get site Notifications fields! Please try again later!"
                    type="error"
                    showIcon
                  />
                </div>
              ) : (<>              
              <span className={styles.dataDescribe}>
              <h3>{allData.table?.name}</h3>
              <span><span style={{color:'#3B808F'}}>Id :</span> <span style={{color:'#323C47'}}>{allData.table?.id}</span></span>
              <span><span style={{color:'#3B808F'}}>Description :</span> <span style={{color:'#C1C4C7'}}>{allData.table?.description}</span></span>
              <span>
                  <span style={{ color: '#3B808F' }}>Visibility : </span>
                  {(allData.table?.visibility === "Shared" && allData.allowSharedEdit === true)
                    ?
                    <span style={{ color: '#323C47' }}>Shared with shared editing enabled </span>
                    :
                    <span style={{ color: '#323C47' }}>{allData.table?.visibility}</span>
                  }
                </span>
              <span><span style={{color:'#3B808F'}}>Owner :</span> <span style={{color:'#323C47'}}>{allData.table?.owner}</span></span>
              <span><span style={{color:'#3B808F'}}>Created :</span> <span style={{color:'#323C47'}}>{allData.table?.created}</span></span>
              <span><span style={{color:'#3B808F'}}>Updated :</span> <span style={{color:'#323C47'}}>{allData.table?.updated}</span></span>
              <span><span style={{color:'#3B808F'}}>Delimiter :</span> <span style={{color:'#323C47'}}>{allData.table?.delimiterDescription}</span></span>
            </span>             
              </>))}          
        </div>
      </div>
      <div style={{ clear: 'both', margin: '20px auto', padding: '0px', display: 'table' }}></div>
      <Spin spinning={loadingData} >
        <h3>Table Data</h3>
        <table className={styles.tableListData} key={1100}>
          <thead>
            <tr key={21}>
              <td key={1101}>Line No.</td>
              {allData.table?.columns.map((types: number, i:number) => (
                <td key={1102+i}>{types}</td>
              ))}
            </tr>
          </thead>
          <tbody key={1103}>
            {allData.table?.rowSummary !== true ?
              allData.table?.rowSummary.map((types: any, indexTow: number) => (
                <tr key={indexTow}>
                  <td key={1104+indexTow}>{indexTow + 1}</td>
                  {types.map((typessss: any, index:number) => (
                    <td key={1105+index}>{typessss}</td>
                  ))}
                </tr>
              ))
              : "No Data Found"}
          </tbody>
        </table>
      </Spin>
    </>
  );
};
const WrappedJobPropertiesForm = Form.create<DetailsTableFormProps>({ name: 'detailsTableForm' })(DetailsTableForm);
export default WrappedJobPropertiesForm;