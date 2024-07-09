import { matchesReducer } from './matchesReducer';
import { MATCHES_ACTION_TYPES, MatchesState } from './matchesReducer';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import ProductInfo from 'src/types/ProductInfo';
import { Sorting } from 'src/types/Sorting';

const productInfo: ProductInfo = {
  ID: '674627364',
  name: 'test product',
  currency: 'USD',
  price: 1.99,
  description: 'some description',
  ownerID: '1',
  ownerImage: 'http://amazon.com/logo.png',
  ownerName: 'Amazon',
  imageURL: 'http://ql2.com/productImage.png',
  productURL: 'http://amazon.com/product',
  uniqueIdentifierName1: 'SKU',
  uniqueIdentifierValue1: '0JSDHJS73',
  uniqueIdentifierName2: 'Manufacturer',
  uniqueIdentifierValue2: 'Lokar',
  category: 'Test&test2',
  status:10, 
  categoryNameGet:'Test&test2',
  lowestPrice: "",
  priceInfo:'2',
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

const productMatches: ProductMatchInfo[] = [
  {
  productId: '8',
  sourceOwnerId:'1',
  matchType: 'LIKE',
  variance: '-1',
  varianceMetric: '%',
  canonicalId: '10',
  priceCollectedTimestamp: '11',
  removeRequest: false,
  benchmarkMatch:'1',
  matchTypeFilter:'',
  region:'',
  priceType:'',
  lowerVariance:'',
  lowestPriceVariance:'',
  lowestPriceInfo:'',
    ...productInfo,
  },
  {
    productId: '8',
  sourceOwnerId:'1',
  matchType: 'LIKE',
  variance: '-1',
  varianceMetric: '%',
  canonicalId: '10',
  priceCollectedTimestamp: '11',
  removeRequest: false,
  benchmarkMatch:'1',
  matchTypeFilter:'',
  region:'',
  priceType:'',
  lowerVariance:'',
  lowestPriceVariance:'',
  lowestPriceInfo:'',
    ...productInfo,
  },
];

const state: MatchesState = {
  loading: false,
  error: false,
  data: productMatches,
  total: 2,
  offset: 1,
  size: 2,
  hasMore: false,
  sorting: null,
  page:1, 
  ownerId:'', 
  matchType:'', 
  variance:'',
  region:'', 
  priceType:''
};

const sorting: Sorting<ProductMatchInfo> = {
  field: 'matchType',
  order: 'descend',
};

describe('matchesReducer reducer ', () => {
  it('updates state offset to value that equals number of loaded items plus 1 when fetchMoreMatches action fires and hasMore equals true and data is defined ', () => {
    const matchesState: MatchesState = matchesReducer(
      { ...state, data: [productMatches[0]], hasMore: true },
      {
        type: MATCHES_ACTION_TYPES.fetchMoreMatches,
        payload: { sorting:sorting, size: 1 },
      }
    );
    expect(matchesState.size).toEqual(2);
  });
  it('updates state size prop to new size value when fetchMoreMatches action fires and new size is defined', () => {
    const matchesState: MatchesState = matchesReducer(
      { ...state, data: [productMatches[0]], hasMore: true },
      {
        type: MATCHES_ACTION_TYPES.fetchMoreMatches,
        payload: { sorting:sorting, size: 1 },
      }
    );
    expect(matchesState.offset).toEqual(1);
  });
  it('does not update state offset prop when fetchMoreMatches action fires and hasMore is false or data is not defined', () => {
    let matchesState: MatchesState = matchesReducer(
      { ...state, data: [] },
      {
        type: MATCHES_ACTION_TYPES.fetchMoreMatches,
        payload: {sorting:sorting, size: 1 },
      }
    );
    expect(matchesState.offset).toEqual(state.offset);

    matchesState = matchesReducer(
      { ...state, data: [productMatches[1]], hasMore: false },
      {
        type: MATCHES_ACTION_TYPES.fetchMoreMatches,
        payload: { sorting:sorting, size: 1 },
      }
    );
    expect(matchesState.offset).toEqual(state.offset);
  });
  it('updates state size prop to new size value when updateOptions action fires and new size is defined', () => {
    const matchesState: MatchesState = matchesReducer(
      { ...state, data: [productMatches[0]], hasMore: true },
      {
        type: MATCHES_ACTION_TYPES.updateOptions,
        payload: { sorting:sorting, size:1, offset:1, matchType:"All", region:"-1", priceType:"1", variance:'', ownerId:'' },
      }
    );
    expect(matchesState.size).toEqual(1);
  });
  it('updates state sorting prop to new sorting value and reset offset to 1 when updateOptions action fires and new size  and sorting are defined', () => {
    const matchesState: MatchesState = matchesReducer(
      { ...state, offset: 1 },
      {
        type: MATCHES_ACTION_TYPES.updateOptions,
        payload: { sorting: { ...sorting, field: 'name' }, size: 1, offset:1, matchType:"All", region:"-1", priceType:"1", variance:'', ownerId:'' },
      }
    );
    expect(matchesState.size).toEqual(1);
    expect(matchesState.sorting).toEqual({ ...sorting, field: 'name' });
    expect(matchesState.offset).toEqual(1);
  });
  it('does not update state sorting prop to new sorting value when updateOptions action fires and new sorting value is defined and equals state sorting value', () => {
    const matchesState: MatchesState = matchesReducer(
      { ...state, offset: 1, sorting: sorting },
      {
        type: MATCHES_ACTION_TYPES.updateOptions,
        payload: { sorting: sorting, size: 2, offset:1, matchType:"All", region:"-1", priceType:"1", variance:'', ownerId:'' },
      }
    );
    expect(matchesState.sorting).toEqual(sorting);
    expect(matchesState.offset).toEqual(1);
  });
  it('updates state loading prop to false when addMatches action fires', () => {
    const matchesState: MatchesState = matchesReducer(
      { ...state, offset: 1, sorting: sorting, loading: true },
      {
        type: MATCHES_ACTION_TYPES.addMatches,
        payload: { data: [productMatches[2]], total: 3, sorting:sorting, size:1, ownerId:'', matchType:'All', variance:'1', region:'-1', priceType:'1'},
      }
    );
    expect(matchesState.loading).toEqual(false);
  });
  it('updates state error prop to false when addMatches action fires', () => {
    const matchesState: MatchesState = matchesReducer(
      { ...state, error: 'Error' },
      {
        type: MATCHES_ACTION_TYPES.addMatches,
        payload: { data: [productMatches[2]], total: 3, sorting:sorting, size:1, ownerId:'', matchType:'All', variance:'1', region:'-1', priceType:'1' },
      }
    );
    expect(matchesState.error).toEqual(false);
  });
  it('updates state total prop to new total value when addMatches action fires', () => {
    const matchesState: MatchesState = matchesReducer(
      { ...state, total: 0 },
      {
        type: MATCHES_ACTION_TYPES.addMatches,
        payload: { data: [productMatches[2]], total: 3, sorting:sorting, size:1, ownerId:'', matchType:'All', variance:'1', region:'-1', priceType:'1'  },
      }
    );
    expect(matchesState.total).toEqual(3);
  });
  it('updates state data value and define hasMore value comparing loaded items and total value when addMatches action fires', () => {
    let matchesState: MatchesState = matchesReducer(
      { ...state, data: productMatches, offset: 1, total: 5, hasMore: true },
      {
        type: MATCHES_ACTION_TYPES.addMatches,
        payload: { data: productMatches, total: 5, sorting:sorting, size:1, ownerId:'', matchType:'All', variance:'1', region:'-1', priceType:'1'  },
      }
    );
    expect(matchesState.hasMore).toEqual(true);
    expect(matchesState.data!.length).toEqual(2);

    matchesState = matchesReducer(
      { ...state, data: productMatches, offset: 1, total: 3, hasMore: true },
      {
        type: MATCHES_ACTION_TYPES.addMatches,
        payload: { data: [productMatches[2]], total: 3, sorting:sorting, size:1, ownerId:'', matchType:'All', variance:'1', region:'-1', priceType:'1'  },
      }
    );
    expect(matchesState.hasMore).toEqual(true);
    expect(matchesState.data!.length).toEqual(1);

    matchesState = matchesReducer(
      { ...state, data: productMatches, offset: 1, total: 3, hasMore: true },
      {
        type: MATCHES_ACTION_TYPES.addMatches,
        payload: { data: [productMatches[2]], total: 3, sorting:sorting, size:1, ownerId:'', matchType:'All', variance:'1', region:'-1', priceType:'1'  },
      }
    );
    expect(matchesState.hasMore).toEqual(true);
    expect(matchesState.data!.length).toEqual(1);
  });
  it('updates state data prop when removeMatches action fires and there is at least one match item in state from removed match list and set removeRequest prop to true for that matches', () => {
    const matchesState: MatchesState = matchesReducer(state, {
      type: MATCHES_ACTION_TYPES.removeMatches,
      payload: { removedMatches: [productMatches[0]] },
    });
    expect(matchesState!.data!.length).toEqual(2);
    expect(matchesState.data![0].removeRequest).toEqual(true);
  });
  it('does not update state data prop when removeMatches action fires and there is no match item in state from removed match list', () => {
    let matchesState: MatchesState = matchesReducer(
      { ...state, data: [] },
      {
        type: MATCHES_ACTION_TYPES.removeMatches,
        payload: { removedMatches: [productMatches[0]] },
      }
    );
    expect(matchesState!.data!.length).toEqual(0);

    matchesState = matchesReducer(
      { ...state, data: [productMatches[1]] },
      {
        type: MATCHES_ACTION_TYPES.removeMatches,
        payload: { removedMatches: [productMatches[0]] },
      }
    );
    expect(matchesState!.data!.length).toEqual(1);
    expect(matchesState.data![0].removeRequest).toEqual(true);
  });
  it('updates state data prop when benchmarkMatches action fires and there is at least one match item in state from benchmarkMatches match list and set benchmarkMatch prop to true for that matches', () => {
    const matchesState: MatchesState = matchesReducer(state, {
      type: MATCHES_ACTION_TYPES.benchmarkMatches,
      payload: { benchmarkedMatches: [productMatches[0]] },
    });
    expect(matchesState!.data!.length).toEqual(2);
    expect(matchesState.data![0].benchmarkMatch).toEqual('1');
  });
  it('does not update state data prop when benchmarkMatches action fires and there is no match item in state from benchmarkMatches match list', () => {
    let matchesState: MatchesState = matchesReducer(
      { ...state, data: [] },
      {
        type: MATCHES_ACTION_TYPES.benchmarkMatches,
        payload: { benchmarkedMatches: [productMatches[0]] },
      }
    );
    expect(matchesState!.data!.length).toEqual(0);

    matchesState = matchesReducer(
      { ...state, data: [productMatches[1]] },
      {
        type: MATCHES_ACTION_TYPES.benchmarkMatches,
        payload: { benchmarkedMatches: [productMatches[0]] },
      }
    );
    expect(matchesState!.data!.length).toEqual(1);
    expect(matchesState.data![0].benchmarkMatch).toEqual('1');
  });


  it('updates state data prop when unBenchmarkMatches action fires and there is at least one match item in state from unBenchmarkMatches match list and set benchmarkMatch prop to true for that matches', () => {
    const matchesState: MatchesState = matchesReducer(state, {
      type: MATCHES_ACTION_TYPES.unBenchmarkMatches,
      payload: { unBenchmarkedMatches: [productMatches[0]] },
    });
    expect(matchesState!.data!.length).toEqual(2);
    expect(matchesState.data![0].benchmarkMatch).toEqual('0');
  });
  it('does not update state data prop when removeMatches action fires and there is no match item in state from removed match list', () => {
    let matchesState: MatchesState = matchesReducer(
      { ...state, data: [] },
      {
        type: MATCHES_ACTION_TYPES.unBenchmarkMatches,
        payload: { unBenchmarkedMatches: [productMatches[0]] },
      }
    );
    expect(matchesState!.data!.length).toEqual(0);

    matchesState = matchesReducer(
      { ...state, data: [productMatches[1]] },
      {
        type: MATCHES_ACTION_TYPES.unBenchmarkMatches,
        payload: { unBenchmarkedMatches: [productMatches[0]] },
      }
    );
    expect(matchesState!.data!.length).toEqual(1);
    expect(matchesState.data![0].benchmarkMatch).toEqual('0');
  });
});
