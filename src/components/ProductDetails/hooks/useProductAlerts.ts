import { InfoAlertsResponse, getInfoAlerts } from 'src/api/insights';
import { useEffect, useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';

const initialState: FetchState<InfoAlertsResponse> = {
  loading: false,
  error: false,
  data: null,
};

const useProductAlerts = ( 
  sourceOwnerId : string): [FetchState<InfoAlertsResponse>] => {
  const { productId, ownerId, variance, offset, size, 
    matchTypeFilter,
    region,
    priceType,
    //matchTypeFilter 
  } = useProductDetailsStateContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  let ownerIdss:string = ownerId !== undefined ? ownerId :'';
  let matchTypess:string = matchTypeFilter !== undefined ? matchTypeFilter :'ALL';
  let variancess:string = variance !== undefined ? variance :'';
  let offsetss:number = offset !== undefined ? offset :1;
  let sizess:number = size !== undefined ? size :-1;
 
  //let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"-1";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (sourceOwnerId && productId ) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: InfoAlertsResponse = await getInfoAlerts(
            sourceOwnerId, 
            productId,
            ownerIdss,
            matchTypess,
            variancess,
            offsetss,
            sizess,
            initialRegionIds, 
            initialPriceTypeIds
           
            );
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
          }
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [sourceOwnerId, productId, ownerIdss, initialRegionIds, initialPriceTypeIds]);
  return [state as FetchState<InfoAlertsResponse>];
};

export default useProductAlerts;