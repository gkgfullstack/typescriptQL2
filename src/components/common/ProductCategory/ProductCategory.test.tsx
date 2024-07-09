import React from 'react';
import { shallow } from 'enzyme';
import ProductCategory, { ProductCategoryProps } from './ProductCategory';
import useCategoriesFetching from './hooks/useCategoriesFetching';
import { ProductCategoryState } from './reducers/productCategoryReducer';
import { Option } from './OptionsDropdown/reducers/optionsDropdownReducer';

jest.mock('./hooks/useCategoriesFetching');

const optionsInfo: Option[] = [
  {
    value: '1234',
    label: 'Auto',
    hasChildren: true,
  },
  {
    value: '3456',
    label: 'Accessories',
    hasChildren: false,
  },
];

const getProps = (): ProductCategoryProps => {
  return {
    sourceOwnerId: '1',
    value: ['1234'],
    onChange: jest.fn,
  };
};

const useCategoriesFetchingMock = useCategoriesFetching as jest.Mock;

const getCategoriesFetchingResults = (
  loading = false,
  options: Option[] | null = optionsInfo
): [ProductCategoryState] => {
  return [
    {
      loading: loading,
      data: options,
      error: null,
    } as ProductCategoryState,
  ];
};

describe('ProductCategory component ', () => {
  let useEffect: jest.Mock;
  const mockUseEffect = (): void => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    /* mocking useEffect */
    useEffect = jest.spyOn(React, 'useEffect') as jest.Mock;
    mockUseEffect();
    useCategoriesFetchingMock.mockReturnValue(getCategoriesFetchingResults());
  });
  afterEach(() => {
    useCategoriesFetchingMock.mockRestore();
    useEffect.mockRestore();
  });
  it('renders without crashing', () => {
    const props = getProps();
    delete props.value;
    shallow(<ProductCategory {...props} />);
  });

  it('renders OptionsDropdown component', () => {
    const props = getProps();
    const wrapper = shallow(<ProductCategory {...props} />);
    const dropdown = wrapper.find('OptionsDropdown');
    expect(dropdown).toHaveLength(1);
    expect(dropdown.prop('value')).toEqual(props.value);
    expect(dropdown.prop('options')).toEqual(optionsInfo);
    expect(dropdown.prop('placeholder')).toEqual('Categories');
    expect(dropdown.prop('loadData')).toBeDefined();
    expect(dropdown.prop('onChange')).toBeDefined();
  });
  it('renders OptionsDropdown component with error prop that equals fetching error message', () => {
    const res = getCategoriesFetchingResults();
    res[0].error = 'Something went wrong!';
    useCategoriesFetchingMock.mockReturnValue(res);
    const props = getProps();
    const wrapper = shallow(<ProductCategory {...props} />);
    const dropdown = wrapper.find('OptionsDropdown');
    expect(dropdown.prop('error')).toEqual('Something went wrong!');
  });
  it('calls onChange component prop with new selected option value when OptionsDropdown fires onChange event', () => {
    const props = getProps();
    const onChangeSpy = jest.spyOn(props, 'onChange');
    const wrapper = shallow(<ProductCategory {...props} />);
    const onChange: Function = wrapper.find('OptionsDropdown').prop('onChange') as Function;
    onChange(['87564']);
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toHaveBeenCalledWith(['87564']);
  });
  it('calls useCategoriesFetching with new expanded options when OptionsDropdown fires loadData event', () => {
    const props = getProps();
    const wrapper = shallow(<ProductCategory {...props} />);
    const loadData: Function = wrapper.find('OptionsDropdown').prop('loadData') as Function;
    loadData([{ value: '87564', label: 'Auto2', hasChildren: false } as Option]);
    expect(useCategoriesFetchingMock).toHaveBeenCalled();
    expect(useCategoriesFetchingMock).toHaveBeenCalledWith({
      sourceOwnerId: '1',
      selectedOptions: [{ value: '87564', label: 'Auto2', hasChildren: false }],
    });
  });
});
