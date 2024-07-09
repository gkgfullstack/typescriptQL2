import React from 'react';
import FilesTableView from './FilesTableView';

type FilesResultsTableProps = {
  runId:string
};
  const FilesTable: React.FC<FilesResultsTableProps> = ({runId}) => {
  return (
    <>
      <FilesTableView runId={runId}/>
    </>
  );
};

export default FilesTable;

