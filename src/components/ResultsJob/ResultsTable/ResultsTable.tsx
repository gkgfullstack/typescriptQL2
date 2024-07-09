import React from 'react';
import ResultsTableView from './ResultsTableView/ResultsTableView';

type ResultsTableProps = {
  jobIds?:any;
};
const ResultsTable: React.FC<ResultsTableProps> = () => {
  return (
    <>
      <ResultsTableView  />
    </>
  );
};

export default ResultsTable;

