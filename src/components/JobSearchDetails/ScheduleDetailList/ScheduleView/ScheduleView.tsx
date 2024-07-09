import React from 'react';
import ScheduleTable, {ScheduleTableProps } from './ScheduleTable/ScheduleTable';

export type SearchDetailsViewProps = ScheduleTableProps;

const SeearchDetailsView: React.FC<SearchDetailsViewProps> = (props: SearchDetailsViewProps) => {
 
  return (
    <>      
      <ScheduleTable {...props} />
    </>
  );
};

export default SeearchDetailsView;
