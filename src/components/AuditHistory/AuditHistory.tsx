import React from 'react';
import { SearchAuditHistoryStateProvider } from 'src/stateProviders/searchAuditHistoryStateProvider';
import AuditHistoryView from './AuditHistoryView/AuditHistoryView';

type AuditHistoryProps = {};
const AuditHistory: React.FC<AuditHistoryProps> = () => {
  return (
    <SearchAuditHistoryStateProvider>
      <AuditHistoryView />
    </SearchAuditHistoryStateProvider>
  );
};

export default AuditHistory;
