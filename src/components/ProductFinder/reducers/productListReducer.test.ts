import { productListReducer } from './productListReducer';
import { PRODUCT_LIST_ACTION_TYPES, ProductListState } from './productListReducer';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import ProductInfo from 'src/types/ProductInfo';
import { Sorting } from 'src/types/Sorting';

const productInfo: ProductInfo = {
  ID: '674627364',
  name: 'test product',
  currency: 'USD',
  price: 1.99,
  status:1,
  description: 'some description',
  ownerID: '1',
  ownerImage: 'http://amazon.com/amazon.png',
  ownerName: 'Amazon',
  imageURL: 'http://ql2.com/productImage.png',
  productURL: 'http://amazon.com/product',
  uniqueIdentifierName1: 'SKU',
  uniqueIdentifierValue1: '0JSDHJS73',
  uniqueIdentifierName2: 'Manufacturer',
  uniqueIdentifierValue2: 'Lokar',
  category: 'Air & Fuel Delivery:Carburetors & Accessories:Carburetor Cruise Control Brackets',
  categoryNameGet:"",
  metaData: [
    {
      id: 1,
      name: 'Manufacturer',
      value: 'LOKAR',
    },
    {
      id: 2,
      name: 'Model Number',
      value: 'LOK-TCB-40LTC',
    },
    {
      id: 3,
      name: 'SKU',
      value: '0JSDHJS73',
    },
    {
      id: 4,
      name: 'UPC',
      value: '835573009484',
    },
    {
      id: 5,
      name: 'Color',
      value: '',
    },
  ],
};

const productList: ProductFinderInfo[] = [
  {
    matches: 2,
    key: '1-0',
    ...productInfo,
  },
  {
    matches: 2,
    key: '2-0',
    ...productInfo,
  },
];

const state: ProductListState = {
  loading: false,
  error: false,
  data: productList,
  total: 2,
  offset: 1,
  size: 2,
  page: 1,
  sorting: null,
  productKey: '',
  manufacturerIds: null,
  priceVarianceIds: null,
  matchesIds: null,
  ownerIds: null,
  categoryId: '',
  sourceOwnerId: '',
  activeIds:0,
  noMatchIds:0,
  insightIds: 0,
  customFilterListIds:null,
};

const sorting: Sorting<ProductFinderInfo> = {
  field: 'name',
  order: 'ascend',
};

describe('productListReducer reducer ', () => {
  it('updates state size prop to new size value when updateOptions action fires and new size is defined', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, data: [productList[0]] },
      {
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: sorting,
          size: 1,
          page: 1,
          productKey: '',
          manufacturerIds: null,
          priceVarianceIds: null,
          matchesIds: null,
          ownerIds: null,
          categoryId: '',
          sourceOwnerId: '',
          activeIds:0,
          noMatchIds:0,
          insightIds:0,
          customFilterListIds:null,
        },
      }
    );
    expect(productListState.size).toEqual(1);
  });
  it('updates state manufacturerIds prop to new manufacturerIds value when updateOptions action fires and new manufacturerIds is defined', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, data: [productList[0]] },
      {
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: sorting,
          size: 1,
          page: 1,
          productKey: '',
          manufacturerIds: ['111'],
          priceVarianceIds: null,
          matchesIds: null,
          ownerIds: null,
          categoryId: '',
          sourceOwnerId: '',
          activeIds:0,
          noMatchIds:0,
          insightIds:0,
          customFilterListIds:null,
        },
      }
    );
    expect(productListState.manufacturerIds).toEqual(['111']);
  });
  it('updates state priceVarianceIds prop to new priceVarianceIds value when updateOptions action fires and new priceVarianceIds is defined', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, data: [productList[0]] },
      {
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: sorting,
          size: 1,
          page: 1,
          productKey: '',
          manufacturerIds: null,
          priceVarianceIds: ['1'],
          matchesIds: null,
          ownerIds: null,
          categoryId: '',
          sourceOwnerId: '',
          activeIds:0,
          noMatchIds:0,
          insightIds:0,
          customFilterListIds:null
        },
      }
    );
    expect(productListState.priceVarianceIds).toEqual(['1']);
  });
  it('updates state matchesIds prop to new matchesIds value when updateOptions action fires and new matchesIds is defined', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, data: [productList[0]] },
      {
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: sorting,
          size: 1,
          page: 1,
          productKey: '',
          manufacturerIds: null,
          priceVarianceIds: null,
          matchesIds: ['12'],
          ownerIds: null,
          categoryId: '',
          sourceOwnerId: '',
          activeIds:0,
          noMatchIds:0,
          insightIds:0,
          customFilterListIds:null
        },
      }
    );
    expect(productListState.matchesIds).toEqual(['12']);
  });
  it('updates state ownerIds prop to new ownerIds value when updateOptions action fires and new ownerIds is defined', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, data: [productList[0]] },
      {
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: sorting,
          size: 1,
          page: 1,
          productKey: '',
          manufacturerIds: null,
          priceVarianceIds: null,
          matchesIds: null,
          ownerIds: ['555'],
          categoryId: '',
          sourceOwnerId: '',
          activeIds:0,
          noMatchIds:0,
          insightIds:0,
          customFilterListIds:null
        },
      }
    );
    expect(productListState.ownerIds).toEqual(['555']);
  });
  it('updates state categoryId prop to new categoryId value when updateOptions action fires and new categoryId is defined', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, data: [productList[0]] },
      {
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: sorting,
          size: 1,
          page: 1,
          productKey: '',
          manufacturerIds: null,
          priceVarianceIds: null,
          matchesIds: null,
          ownerIds: ['555'],
          categoryId: '111',
          sourceOwnerId: '',
          activeIds:0,
          noMatchIds:0,
          insightIds:0,
          customFilterListIds:null
        },
      }
    );
    expect(productListState.categoryId).toEqual('111');
  });
  it('updates state sourceOwnerId prop to new sourceOwnerId value when updateOptions action fires and new sourceOwnerId is defined', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, data: [productList[0]] },
      {
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: sorting,
          size: 1,
          page: 1,
          productKey: '',
          manufacturerIds: null,
          priceVarianceIds: null,
          matchesIds: null,
          ownerIds: null,
          categoryId: '',
          sourceOwnerId: '1',
          activeIds:0,
          noMatchIds:0,
          insightIds:0,
          customFilterListIds:null
        },
      }
    );
    expect(productListState.sourceOwnerId).toEqual('1');
  });
  it('updates state sorting prop to new sorting value and reset offset to 1 when updateOptions action fires and new size and sorting are defined', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, page: 2 },
      {
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: { ...sorting, field: 'price' },
          size: 1,
          page: 1,
          productKey: '',
          manufacturerIds: null,
          priceVarianceIds: null,
          matchesIds: null,
          ownerIds: null,
          categoryId: '',
          sourceOwnerId: '',
          activeIds:0,
          noMatchIds:0,
          insightIds:0,
          customFilterListIds:null
        },
      }
    );
    expect(productListState.size).toEqual(1);
    expect(productListState.sorting).toEqual({ ...sorting, field: 'price' });
    expect(productListState.offset).toEqual(1);
  });
  it('does not update state sorting prop to new sorting value when updateOptions action fires and new sorting value is defined and equals state sorting value', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, page: 2, sorting: sorting },
      {
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: sorting,
          size: 2,
          page: 1,
          productKey: '',
          manufacturerIds: null,
          priceVarianceIds: null,
          matchesIds: null,
          ownerIds: null,
          categoryId: '',
          sourceOwnerId: '',
          activeIds:0,
          noMatchIds:0,
          insightIds:0,
          customFilterListIds:null
        },
      }
    );
    expect(productListState.sorting).toEqual(sorting);
    expect(productListState.size).toEqual(2);
  });
  it('updates state loading prop to false when setProducts action fires', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, page: 2, sorting: sorting, loading: true },
      {
        type: PRODUCT_LIST_ACTION_TYPES.setProducts,
        payload: { data: [productList[2]], total: 3 },
      }
    );
    expect(productListState.loading).toEqual(false);
  });
  it('updates state error prop to false when setProducts action fires', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, error: 'Error' },
      {
        type: PRODUCT_LIST_ACTION_TYPES.setProducts,
        payload: { data: [productList[2]], total: 3 },
      }
    );
    expect(productListState.error).toEqual(false);
  });
  it('updates state total prop to new total value when setProducts action fires', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, total: 0 },
      {
        type: PRODUCT_LIST_ACTION_TYPES.setProducts,
        payload: { data: [productList[2]], total: 3 },
      }
    );
    expect(productListState.total).toEqual(3);
  });
  it('updates state page prop to new page value when updateOptions action fires on pagination', () => {
    const productListState: ProductListState = productListReducer(
      { ...state, page: 1 },
      {
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: sorting,
          size: 2,
          page: 2,
          productKey: '',
          manufacturerIds: null,
          priceVarianceIds: null,
          matchesIds: null,
          ownerIds: null,
          categoryId: '',
          sourceOwnerId: '',
          activeIds:0,
          noMatchIds:0,
          insightIds:0,
          customFilterListIds:null
        },
      }
    );
    expect(productListState.page).toEqual(2);
  });
});
