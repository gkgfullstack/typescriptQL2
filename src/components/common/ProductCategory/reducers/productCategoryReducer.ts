import produce from 'immer';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Option } from '../OptionsDropdown/reducers/optionsDropdownReducer';

export enum PRODUCT_CATEGORY_ACTION_TYPES {
  addCategories = 'ADD_CATEGORY',
}

export type ProductCategoryState = FetchState<Option[]>;

export type AddCategoriesAction = {
  type: PRODUCT_CATEGORY_ACTION_TYPES.addCategories;
  payload: { categories: Option[]; expandedOptions?: Option[] };
};

export type ProductCategoryAction = Action<Array<Option>> | AddCategoriesAction;

export const productCategoryReducer = (
  state: ProductCategoryState,
  action: ProductCategoryAction
): ProductCategoryState =>
  produce(state, (draft: ProductCategoryState) => {
    if ('type' in action) {
      switch (action.type) {
        case PRODUCT_CATEGORY_ACTION_TYPES.addCategories: {
          const { categories, expandedOptions } = action.payload;
          const { data } = state;
          if (expandedOptions && expandedOptions.length > 0 && data) {
            const newData = JSON.parse(JSON.stringify(data));
            let newCategories = newData;
            expandedOptions.every((option: Option, level: number) => {
              const index = newCategories.findIndex((category: Option) => {
                return category.value === option.value;
              });
              if (index > -1) {
                if (level === expandedOptions.length - 1) {
                  newCategories[index].children = categories;
                  return false;
                } else {
                  const { children } = newCategories[index];
                  newCategories = children ? children : [];
                }
              }
              return true;
            });
            draft.data = newData;
          } else {
            draft.data = [...categories];
          }

          draft.loading = false;
          draft.error = false;

          return draft;
        }
        default: {
          return draft;
        }
      }
    } else {
      return draft;
    }
  });
