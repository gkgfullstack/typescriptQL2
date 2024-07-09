import React from 'react';
import SearchDetailsTable, { SearchDetailsTableProps } from './SearchDetailsTable/SearchDetailsTable';

export type SearchDetailsViewProps = SearchDetailsTableProps;

const SeearchDetailsView: React.FC<SearchDetailsViewProps> = (props: SearchDetailsViewProps) => {

  return (
    <>
      <SearchDetailsTable {...props} />
    </>
  );
};

export default SeearchDetailsView;
