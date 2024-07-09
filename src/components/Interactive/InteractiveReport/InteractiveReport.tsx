import React from 'react';
import { Link } from 'react-router-dom';
import { InteractiveReportsType } from 'src/api/interactiveReports';
//import styles from './InteractiveReport.module.less';

export type InteractiveRepProps = {
  reportList: any;
};
const InteractiveReport: React.FC<InteractiveRepProps> = ({reportList}: InteractiveRepProps) => {
  return (
    <div>
    <h2> My Insights</h2>
    
    <ul>
      {reportList && reportList.length===0 &&(
      <p className="no_results">No reports enabled </p>
      )}
       {reportList &&
        reportList.map(
          (report: InteractiveReportsType): React.ReactNode => {   
            let reportNm=report.reportName.replace('&','||') ;          
            return (              
              <li>
               <Link to={`/definedReport?name=${reportNm}&rpt=${report.id}`} title={report.reportName} referrerPolicy={'origin'}>
                {report.reportName}
               </Link>
              </li>
            );
          }
        )}
   </ul>
    </div>
  );
};

export default InteractiveReport;
