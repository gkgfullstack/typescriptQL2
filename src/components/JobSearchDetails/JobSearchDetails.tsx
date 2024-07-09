import React from 'react';
import { SearchDetailsStateProvider } from 'src/stateProviders/searchDetailsStateProvider';
import SearchDetailsView from './SearchDetailsView/SearchDetailsView';
import ResultsTable from '../ResultsJob/ResultsTable';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';

type SearchDetailsProps = {};

const SearchDetails: React.FC<SearchDetailsProps> = () => {
  const { searchId } = useSearchDetailsStateContext();
  return (
    <SearchDetailsStateProvider>
      <SearchDetailsView />
      <div className="box" style={{
        margin:"40px 0px 0"
        }}>
          <ResultsTable jobIds={searchId} />
      </div>
    </SearchDetailsStateProvider>
  );
};

export default SearchDetails;
