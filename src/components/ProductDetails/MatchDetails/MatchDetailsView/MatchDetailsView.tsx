import React from 'react';
import MatchDetailsTable, { MatchDetailsTableProps } from './MatchDetailsTable/MatchDetailsTable';

export type MatchDetailsViewProps = MatchDetailsTableProps;

const MatchDetailsView: React.FC<MatchDetailsViewProps> = (props: MatchDetailsViewProps) => {
  const { totalItems } = props;
  const title = `Matches (${totalItems || 0})`;
  return (
    <>
      <h2>{title}</h2>
      <MatchDetailsTable {...props}  />
    </>
  );
};

export default MatchDetailsView;
