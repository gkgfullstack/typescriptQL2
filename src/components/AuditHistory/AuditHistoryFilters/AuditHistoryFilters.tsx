import React from 'react';
import AuditHistoryFilter from './AuditHistoryFilter';
import styles from './AuditHistoryFilters.module.less';
import { useGetCompetitorOwners, useGetReporters } from 'src/api/auditHistory';

type AuditHistoryFiltersProps = {
  onUpdate: (id: string, value: any) => void;
};

const requestTypeOptions: any = [
  {
    key: 'add',
    id: 'Add',
    name: 'Add',
  },
  {
    key: 'delete',
    id: 'Delete',
    name: 'Delete',
  },
];

const statusOptions: any = [
  {
    key: 'accepted',
    id: 'Accepted',
    name: 'Accepted',
  },
  {
    key: 'pending',
    id: 'Pending',
    name: 'Pending',
  },
  {
    key: 'rejected',
    id: 'Rejected',
    name: 'Rejected',
  },
  {
    key: 'noAction',
    id: 'No Action',
    name: 'No Action',
  },
];

const AuditHistoryFilters: React.FC<AuditHistoryFiltersProps> = ({ onUpdate }) => {
  const [ownerOptions] = useGetCompetitorOwners();
  const [reportersOptions] = useGetReporters();

  const onUpdateFilter = (id: string, value: string) => {
    onUpdate(id, value);
  };

  return (
    <div className={styles.audit_history_filters}>
      <AuditHistoryFilter
        id={'requestType'}
        label={'Request Type'}
        options={requestTypeOptions}
        onUpdate={onUpdateFilter}
      />
      <AuditHistoryFilter
        id={'status'}
        label={'Status'}
        selection={'Pending'}
        options={statusOptions}
        onUpdate={onUpdateFilter}
      />
      <AuditHistoryFilter id={'reporter'} label={'Reporter'} options={reportersOptions} onUpdate={onUpdateFilter} />
      <AuditHistoryFilter
        id={'competitorSite'}
        label={'Competitor Site'}
        options={ownerOptions}
        onUpdate={onUpdateFilter}
      />
    </div>
  );
};

export default AuditHistoryFilters;
