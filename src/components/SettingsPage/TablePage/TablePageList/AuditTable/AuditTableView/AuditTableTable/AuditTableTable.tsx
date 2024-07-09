import React from 'react';
import styles from './AuditTableTable.module.less';
import { useAuditTable } from 'src/api/tablePageEdit';
import Spin from "src/components/common/Spin";

export type AuditTableTableProps = {
  requestParams?: any;
  setVisible: any;
};


const AuditTableTable: React.FC<AuditTableTableProps> = ({
  requestParams,
}: AuditTableTableProps) => {
  const [loadingData, auditDataList] = useAuditTable(requestParams);  
  return (<div className="product_list_container">
    <Spin spinning={loadingData}>
      <>
        <div style={{ clear: 'both', margin: '0px auto', padding: '0px' }}></div>
        <h3>Audit</h3>
        <table className={styles.tableListData} key={11100}>
          <thead key={11101}>

            <tr key={11102}>
              <td key={11103}>TimeZone ({auditDataList.timeZone})</td>
              <td key={11104}>User</td>
              <td key={11105}>Summary</td>
            </tr>
          </thead>
          <tbody key={11106}>
            {auditDataList.auditData && auditDataList.auditData.map((types: any, i:number) => (
              <tr key={11107+i}>
                <td key={11108+i}>{types.time}</td>
                <td key={11109+i}>{types.user}</td>
                <td key={111010+i}>{types.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </Spin>
  </div>
  );
};

export default AuditTableTable;