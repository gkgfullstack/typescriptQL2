import ProductInfo from 'src/types/ProductInfo';
import { useReducer } from 'react';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { getJobSearchAction, JobActionResponse, JobActionInputs } from 'src/api/jobSearchAction';
import { useHistory } from 'react-router-dom';
import {
  useSearchDetailsDispatchContext,
  useSearchDetailsStateContext,
} from 'src/stateProviders/useSearchDetailsStateContext';
import { SearchDetailsState, SEARCH_DETAILS_ACTION_TYPES } from 'src/stateProviders/searchDetailsStateProvider';
import { message } from 'antd';

const initialState: FetchState<ProductInfo> = {
  loading: false,
  error: false,
  data: null,
};

export type JobActionDispatch = {
  jobaction: (jobActionInputs: JobActionInputs) => void;
};

const useJobActionFetch = (frompage: string): [FetchState<JobActionResponse>, JobActionDispatch] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const dispatchDetailsContext = useSearchDetailsDispatchContext();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const isPageType = urlParams.get('isPageType')?.toString();
  const history = useHistory();
  let { adddtl } = useSearchDetailsStateContext();
  adddtl = adddtl === true ? false : true;
  return [
    state as FetchState<JobActionResponse>,
    {
      jobaction: async jobActionInputs => {
        console.log('jobActionInputs==', jobActionInputs.runIds);
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: JobActionResponse = await getJobSearchAction(jobActionInputs);
          if (response) {
            message.success(response.message, 2);
            const rand = Math.random();
            let redirectUrl = '';
            if (frompage === 'jobDetail') {
              dispatchDetailsContext({
                type: SEARCH_DETAILS_ACTION_TYPES.removeSearchDtl,
                payload: { adddtl: adddtl } as SearchDetailsState,
              });
            } else {
              if (isPageType !== undefined) {
                redirectUrl = '/datascout/jobSearch?isPageType=' + isPageType + '&isPageLoad=' + rand;
              } else {
                redirectUrl = '/datascout/jobSearch?isPageLoad=' + rand;
              }
              history.replace(redirectUrl);
            }
          }
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      },
    },
  ];
};

export default useJobActionFetch;
