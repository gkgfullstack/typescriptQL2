import { useReducer } from 'react';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { updateSupportHelpPost, SupportHelpPostResponse } from 'src/api/supportHelpAPIPost';
import SupportHelpTypePost from 'src/types/SupportHelpTypePost';
import { SEARCH_DETAILS_ACTION_TYPES, SearchDetailsState } from 'src/stateProviders/searchDetailsStateProvider';
import { useSearchDetailsDispatchContext } from 'src/stateProviders/useSearchDetailsStateContext';
import { message } from 'antd';
const initialState: FetchState<SupportHelpTypePost> = {
  loading: false,
  error: false,
  data: null,
};

export type SupportUploadRequest = {
  file: File;
  uploadId: string;
  date: string;
  username: string;
  appname: string;
  producttype: string;
  jobname: string;
  appid: string;
  site: string;
  subject: string;
  description: string;
  input: string;
  problem: string;
  replyto: string;
};

export type DispatchProjectTaskPojo = {
  projectTaskPojo: (values: SupportUploadRequest, fromPage: string, form: any) => void;
};

const useSupportHelpPostFetch = (): [FetchState<SupportHelpPostResponse>, DispatchProjectTaskPojo] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const dispatchDetailsContext = useSearchDetailsDispatchContext();
  return [
    state as FetchState<SupportHelpPostResponse>,
    {
      projectTaskPojo: async values => {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: SupportHelpPostResponse = await updateSupportHelpPost(values);
          if (response !== undefined) {
            if (response) {
              message.success('Your support request was successfully submitted.', 2);
              dispatchDetailsContext({
                type: SEARCH_DETAILS_ACTION_TYPES.setPostSupportHelp,
                payload: { postSupportHelp: true } as SearchDetailsState,
              });
            }
          }
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      },
    },
  ];
};
export default useSupportHelpPostFetch;
