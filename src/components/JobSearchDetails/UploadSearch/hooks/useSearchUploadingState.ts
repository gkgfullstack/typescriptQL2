import { useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import {  uploadSearchData, UploadResponse } from 'src/api/searchDetails';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import { message } from 'antd';

import { ResponseHeader } from 'src/types/ResponseHeader';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';

const initialState: FetchState<ProductMatchInfo> = {
  loading: false,
  error: false,
  data: null,
};

export type UploadRequest = {
  file: File;
  fileFormat: string;
  uploadId: string;
};

export type DispatchAddMatch = {
  addMatch: (values: UploadRequest) => void;
};

const useSearchUploadingState = (): [FetchState<ResponseHeader>, DispatchAddMatch] => {
  let {searchId} = useSearchDetailsStateContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  return [
    state as FetchState<ResponseHeader>,
    {
      addMatch: async (values: UploadRequest) => {
        if (searchId && values) {
          dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
          try {
            values.uploadId=searchId;
            const response: UploadResponse = await uploadSearchData(
              values
            );
            
            if (response.searchDetailList !== null && response.searchDetailList!==undefined) {
              if(response.message!==null){
                alert(response.message);
              }
             else{
              message.success("file uploaded successfully");
             }
              dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.searchDetailList,adddtl:true } });  

            } else {
              dispatch({
                type: FETCH_ACTION_TYPES.setError,
                payload: { error: response.message },
              });
            }
          } catch (e) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      },
    },
  ];
};

export default useSearchUploadingState;
