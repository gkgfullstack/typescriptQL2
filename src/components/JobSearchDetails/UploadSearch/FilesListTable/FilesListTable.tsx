import React from 'react';
//import { SearchAuditHistoryStateProvider } from 'src/stateProviders/searchAuditHistoryStateProvider';
import FilesListTableView from './FilesListTableView/FilesListTableView';

type RCSearchsProps = {};
const FilesListTable: React.FC<RCSearchsProps> = () => {
  return (
    <>
      <FilesListTableView />
    </>
  );
};

export default FilesListTable;

