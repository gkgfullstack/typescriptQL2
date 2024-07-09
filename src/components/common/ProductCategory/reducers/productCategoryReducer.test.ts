import { PRODUCT_CATEGORY_ACTION_TYPES, productCategoryReducer, ProductCategoryState } from './productCategoryReducer';
import { Option } from '../OptionsDropdown/reducers/optionsDropdownReducer';

const optionsInfo: Option[] = [
  {
    value: '1234',
    label: 'Auto',
    hasChildren: true,
  },
  {
    value: '3456',
    label: 'Accessories',
    hasChildren: true,
    children: [
      {
        value: '3985',
        label: 'Accessories 2',
        hasChildren: false,
      },
    ],
  },
];

const addOptions = [
  {
    value: '9832',
    label: 'Accessories2',
    hasChildren: false,
  },
];

const state: ProductCategoryState = {
  loading: false,
  error: false,
  data: optionsInfo,
};

describe('productCategoryReducer reducer ', () => {
  it('updates state loading prop to false when addCategories action fires', () => {
    const productCategoryState: ProductCategoryState = productCategoryReducer(
      { ...state, loading: true },
      {
        type: PRODUCT_CATEGORY_ACTION_TYPES.addCategories,
        payload: { categories: addOptions, expandedOptions: [optionsInfo[0]] },
      }
    );
    expect(productCategoryState.loading).toEqual(false);
  });
  it('updates state error prop to false when addCategories action fires', () => {
    const productCategoryState: ProductCategoryState = productCategoryReducer(
      { ...state, error: 'Error' },
      {
        type: PRODUCT_CATEGORY_ACTION_TYPES.addCategories,
        payload: { categories: addOptions, expandedOptions: [optionsInfo[0]] },
      }
    );
    expect(productCategoryState.error).toEqual(false);
  });
  it('updates state data value and add received categories as children to last item in expandedOptions when addCategories action fires', () => {
    let productCategoryState: ProductCategoryState = productCategoryReducer(
      { ...state },
      {
        type: PRODUCT_CATEGORY_ACTION_TYPES.addCategories,
        payload: { categories: addOptions, expandedOptions: [optionsInfo[0]] },
      }
    );
    expect(productCategoryState.data!.length).toEqual(2);
    expect(productCategoryState.data![0].children).toHaveLength(1);
    expect(productCategoryState.data![0].children![0].value).toEqual(addOptions[0].value);

    productCategoryState = productCategoryReducer(
      { ...state },
      {
        type: PRODUCT_CATEGORY_ACTION_TYPES.addCategories,
        payload: { categories: addOptions, expandedOptions: [optionsInfo[1], optionsInfo[1].children![0]] },
      }
    );
    expect(productCategoryState.data!.length).toEqual(2);
    expect(productCategoryState.data![1].children).toHaveLength(1);
    expect(productCategoryState.data![1].children![0].children![0].value).toEqual(addOptions[0].value);

    productCategoryState = productCategoryReducer(
      { ...state, data: [] },
      {
        type: PRODUCT_CATEGORY_ACTION_TYPES.addCategories,
        payload: { categories: addOptions },
      }
    );
    expect(productCategoryState.data!.length).toEqual(1);
    expect(productCategoryState.data![0].value).toEqual(addOptions[0].value);
  });
});
