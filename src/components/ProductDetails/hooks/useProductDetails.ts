import ProductInfo from 'src/types/ProductInfo';
import { useEffect, useReducer } from 'react';
import { ProductResponse, getProduct } from 'src/api/product';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

const initialState: FetchState<ProductInfo> = {
  loading: false,
  error: false,
  data: null,
};
const isSourceProduct="1";

const useProductDetails = (): [FetchState<ProductInfo>] => {
  const { productId, ownerId, variance, offset, size } = useProductDetailsStateContext();
  let  { region, matchTypeFilter, priceType } = useQueryUrlParams();
  const sourceOwnerId = useSourceOwnerId();
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  let ownerIdss:string = ownerId !== undefined ? ownerId :'';
  let matchTypess:string = matchTypeFilter !== undefined ? matchTypeFilter :'ALL';
  let variancess:string = variance !== undefined ? variance :'';
  let offsetss:number = offset !== undefined ? offset : 1;
  let sizess:number = size !== undefined ? size : 0;
  
//let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (productId && isSourceProduct && sourceOwnerId ) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: ProductResponse = await getProduct(
            productId,
            isSourceProduct, 
            sourceOwnerId, 
            ownerIdss, 
            matchTypess, 
            variancess,
            offsetss,
            sizess,
            initialRegionIds, 
            initialPriceTypeIds
            //regionSS
            );
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.productDetail } });
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
  }, [productId, sourceOwnerId, ownerId, variance, offset, size, region, matchTypeFilter, priceType, initialPriceTypeIds, initialRegionIds, matchTypess, offsetss, ownerIdss, sizess, variancess  ]);
  return [state as FetchState<ProductInfo>];
};

export default useProductDetails;
