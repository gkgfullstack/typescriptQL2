import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { getCategories } from 'src/api/categories';
import useCategoriesFetching from './useCategoriesFetching';
import ProductCategory from 'src/types/ProductCategory';
import { FetchState } from 'src/reducers/fetchReducer';
import { ProductCategoryState } from '../reducers/productCategoryReducer';
import { Option } from '../OptionsDropdown/reducers/optionsDropdownReducer';
import { CategoryOptions } from '../ProductCategory';

jest.mock('src/api/categories');

const categories: ProductCategory[] = [
  {
    ID: '1234',
    name: 'Auto',
    hasChild: 'Y',
  },
  {
    ID: '3456',
    name: 'Accessories',
    hasChild: 'N',
  },
];

const mockSuccessCategoriesResponse = jest.fn(() =>
  Promise.resolve({
    categories: categories,
  })
);
const mockSuccessCategoriesResponse2 = jest.fn(() =>
  Promise.resolve({
    categories: [{ ...categories[0], ID: '94875' }],
  })
);
const mockFailureCategoriesResponse = jest.fn(() =>
  Promise.reject({
    message: 'Something went wrong',
  })
);

let getCategoriesMock: jest.Mock;

const getOptions = (): CategoryOptions => {
  return {
    sourceOwnerId: '1',
    selectedOptions: [],
  };
};

describe('useCategoriesFetching hook ', () => {
  beforeEach(() => {
    getCategoriesMock = getCategories as jest.Mock;
  });
  afterEach(() => {
    getCategoriesMock.mockRestore();
  });
  it('renders without crashing', async () => {
    getCategoriesMock.mockImplementationOnce(mockSuccessCategoriesResponse);
    const options = getOptions();
    await act(async () => {
      renderHook((): [ProductCategoryState] => useCategoriesFetching(options));
    });
  });
  it('returns state value such as data that is transformed category list (getCategories api) to option list, loading should be false and there is no error when fetch was successful', async () => {
    getCategoriesMock.mockImplementationOnce(mockSuccessCategoriesResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<Option[]>]>;
    const options = getOptions();
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<Option[]>] => useCategoriesFetching(options));
    });
    const { result } = renderHookResults;
    expect(getCategoriesMock).toHaveBeenCalled();
    expect(getCategoriesMock).toHaveBeenCalledWith(options.sourceOwnerId, '');
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toBeDefined();
    expect(result.current[0].data!.length).toEqual(2);
    let categoryOption = result.current[0].data![0];
    expect(categoryOption.value).toEqual(categories[0].ID);
    expect(categoryOption.label).toEqual(categories[0].name);
    expect(categoryOption.hasChildren).toEqual(true);
    categoryOption = result.current[0].data![1];
    expect(categoryOption.value).toEqual(categories[1].ID);
    expect(categoryOption.label).toEqual(categories[1].name);
    expect(categoryOption.hasChildren).toEqual(false);
  });
  it('returns state value such as data is null, loading is false and error is no false when fetch categories was failed', async () => {
    getCategoriesMock.mockImplementationOnce(mockFailureCategoriesResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<Option[]>]>;
    const options = getOptions();
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<Option[]>] => useCategoriesFetching(options));
    });
    const { result } = renderHookResults;
    expect(getCategoriesMock).toHaveBeenCalled();
    expect(getCategoriesMock).toHaveBeenCalledWith(options.sourceOwnerId, '');
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual({ message: 'Something went wrong' });
    expect(result.current[0].data).toEqual(null);
  });
  it('returns updated state with updated options as children options into selectedItem when selectedOptions are changed', async () => {
    getCategoriesMock.mockImplementationOnce(mockSuccessCategoriesResponse);
    getCategoriesMock.mockImplementationOnce(mockSuccessCategoriesResponse2);
    const selectedOptions: Option[] = [];
    let renderHookResults = {} as RenderHookResult<{ selectedOptions: Option[] }, [FetchState<Option[]>]>;
    await act(async () => {
      renderHookResults = renderHook(
        ({ selectedOptions }): [FetchState<Option[]>] => useCategoriesFetching({ sourceOwnerId: '1', selectedOptions }),
        { initialProps: { selectedOptions: selectedOptions } }
      );
    });
    const { result, rerender } = renderHookResults;
    await act(async () => {
      rerender({ selectedOptions: [{ value: '1234', label: 'Auto', hasChildren: true }] as Option[] });
    });
    expect(getCategoriesMock).toHaveBeenCalledTimes(2);
    expect(getCategoriesMock).toHaveBeenCalledWith('1', '');
    expect(getCategoriesMock).toHaveBeenCalledWith('1', '1234');
    const categories = result.current[0].data;
    expect(categories!.length).toEqual(2);
    expect(categories![0].children).toHaveLength(1);
    expect(categories![0].children![0].value).toEqual('94875');
  });
  it('returns state value such as data is null, loading is false and error is no false and do not call getCategories when source owner id is not defined', async () => {
    getCategoriesMock.mockImplementationOnce(mockFailureCategoriesResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<Option[]>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<Option[]>] =>
        useCategoriesFetching({ sourceOwnerId: '', selectedOptions: [] })
      );
    });
    const { result } = renderHookResults;
    expect(getCategoriesMock).not.toHaveBeenCalled();
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toEqual(null);
  });
});
