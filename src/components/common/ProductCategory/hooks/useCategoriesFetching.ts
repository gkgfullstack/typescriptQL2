import { useEffect, useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES } from 'src/reducers/fetchReducer';
import { CategoriesResponse, getCategories } from 'src/api/categories';
import {
  PRODUCT_CATEGORY_ACTION_TYPES,
  ProductCategoryAction,
  productCategoryReducer,
  ProductCategoryState,
} from '../reducers/productCategoryReducer';
import { Option } from '../OptionsDropdown/reducers/optionsDropdownReducer';
import { CategoryOptions } from '../ProductCategory';

const initialState: ProductCategoryState = {
  loading: false,
  error: false,
  data: null,
};

const useCategoriesFetching = ({ sourceOwnerId, selectedOptions }: CategoryOptions): [ProductCategoryState] => {
  const [state, dispatch] = useReducer(
    (state: ProductCategoryState, action: ProductCategoryAction) => {
      const fetchState: ProductCategoryState = fetchReducer(state, action) as ProductCategoryState;
      return productCategoryReducer({ ...fetchState }, action);
    },
    { ...initialState }
  );

  useEffect(() => {
    let ignore = false;
    const categoryId =
      selectedOptions && selectedOptions.length > 0 ? selectedOptions[selectedOptions.length - 1].value : '';
    const fetch = async () => {
      if (sourceOwnerId) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: CategoriesResponse = await getCategories(sourceOwnerId, categoryId);
          if (!ignore && response.categories) {
            const categories: Option[] = response.categories.map(
              (item): Option => {
                return {
                  label: item.name,
                  value: item.ID,
                  hasChildren: item.hasChild === 'Y',
                } as Option;
              }
            );
            dispatch({
              type: PRODUCT_CATEGORY_ACTION_TYPES.addCategories,
              payload: { categories, expandedOptions: selectedOptions },
            });
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
  }, [selectedOptions, sourceOwnerId]);
  return [state as ProductCategoryState];
};

export default useCategoriesFetching;
