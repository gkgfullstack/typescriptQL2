import React, { useState } from 'react';
//import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import { useSearchDetailsList } from '../hooks';
import { Sorting } from 'src/types/Sorting';
import SearchDetailsView from './SearchDetailsView';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';

import styles from './SearchDetails.module.less';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';

//import NoMatchesView from '../NoMatchesView/NoMatchesView';

export const defaultSearchDetailsSorting: Sorting<SearchDtlListInfo> = {
  field: 'type',
  order: 'ascend',
};

export const SHIFT_MATCH_DETAILS_COUNT = 5;

type SearchDetailsProps = {};

const SearchDetailList: React.FC<SearchDetailsProps> = () => {
  const [sorting, setSorting] = useState(defaultSearchDetailsSorting);
 // const {removeSearchDtl,deleted } = useSearchDetailsStateContext();
  const [
    { data: searchDetails, loading: matchesLoading, error: matchesError },
   
  ] = useSearchDetailsList(sorting);

  const loadingMatches: boolean = matchesLoading && searchDetails === null;
  return (
    <div style={{ marginBottom: '0px', height: '152px'  }}>
      {matchesError && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get add inputs! Please try again later!"
          type="error"
          showIcon 
        />
      )}
      {loadingMatches ? (
        <div className={styles.matches_loader_container}>
          <Spin spinning={loadingMatches} />
        </div>
      ) : null}
      {searchDetails!==undefined && searchDetails !== null && searchDetails.length > 0 ? (
        <SearchDetailsView
          loading={matchesLoading}
          sorting={sorting}
          items={searchDetails}
          
          itemsPerPage={SHIFT_MATCH_DETAILS_COUNT}
          
          onSortingChange={setSorting}
        />
      ) : null}

    
      
    </div>
  );
};

export default SearchDetailList;
