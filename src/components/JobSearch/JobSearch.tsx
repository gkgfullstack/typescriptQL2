import React from 'react';
import { SearchJobSearchStateProvider } from 'src/stateProviders/searchJobSearchStateProvider';
import JobSearchView from './JobSearchView';

type JobSearchProps = {};
const JobSearch: React.FC<JobSearchProps> = () => {
  return (
    <SearchJobSearchStateProvider>
      <JobSearchView /> 
    </SearchJobSearchStateProvider>
  );
};

export default JobSearch;
