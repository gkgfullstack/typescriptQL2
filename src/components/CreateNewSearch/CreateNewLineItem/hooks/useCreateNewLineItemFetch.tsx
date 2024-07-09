import  { useReducer } from 'react';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { getAirFareJobSearchAction, AirFareLineItemResponse } from 'src/api/createNewSearchConfig';
import AirFareLineItemType from 'src/types/AirFareLineItemType';
import { useHistory } from 'react-router';
import { message} from 'antd';
//import styles from './useCreateNewLineItemFetch.module.less';
import showNotificationError from 'src/components/common/Notification';

const MESSAGE_DURATION = 2;

const initialState: FetchState<AirFareLineItemType> = {
  loading: false,
  error: false,
  data: null,
};



export type JobNameDispatch = {
  addLineItemValue: (airFareLineItem: AirFareLineItemType, fromPage: string, form: any, isCarRental?: boolean) => void;
};

const useCreateNewLineItemFetch = (): [FetchState<AirFareLineItemResponse>, JobNameDispatch] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const history = useHistory();

  return [
    state as FetchState<AirFareLineItemResponse>,
    {
      addLineItemValue: async (airFareLineItem, fromPage, form, isCarRental) => {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: AirFareLineItemResponse = await getAirFareJobSearchAction(airFareLineItem, isCarRental);
          if (response !== undefined) {
            if (response.success) {
              message.success(response.message, MESSAGE_DURATION);
            } else {
              showNotificationError(response.message);
              return;
            }
            form.resetFields();
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
            if (fromPage === 'newJob') {
              let redirectUrl = '';
              form.resetFields();
              redirectUrl = '/datascout/search-details/' + airFareLineItem?.jobId;
              history.replace(redirectUrl);
              history.go(0);
            }
          }
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      },
    },
  ];
};

export default useCreateNewLineItemFetch;
