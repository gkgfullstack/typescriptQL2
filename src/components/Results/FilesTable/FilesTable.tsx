import React from 'react';
import FilesTableView from './FilesTableView';
//import ResultPreviewTable from 'src/components/Results/ResultPreviewTable';
type FilesResultsTableProps = {
  runId:string;
  resultid:string;
};
const FilesTable: React.FC<FilesResultsTableProps> = ({runId}) => {
  return (
    <>
      <FilesTableView runId={runId}/>
    </>
  );
};

export default FilesTable;

