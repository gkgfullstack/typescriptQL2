import React from 'react';
import { shallow } from 'enzyme';
import FilterWithMultiSelection from './FilterWithMultiSelection';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';

jest.mock('src/hooks/useQueryUrlParams');
jest.mock('src/hooks/useQueryUrlParamsDispatch');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: (): {} => ({}),
  useLocation: (): {} => ({}),
}));

const useQueryUrlParamsDispatchMock = useQueryUrlParamsDispatch as jest.Mock;

const props = {
  options: [
    {
      value: '104',
      label: 'IMPERIAL',
    },
    {
      value: '206',
      label: 'UNKNOWN',
    },
  ],
  keyName: 'brands',
  onOptionsSelected: jest.fn(),
};

describe('FilterWithMultiSelection component ', () => {
  let setQuery = jest.fn();
  let useEffect: jest.Mock;
  const mockUseEffect = (): void => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    useQueryUrlParamsDispatchMock.mockReturnValue(setQuery);
    useEffect = jest.spyOn(React, 'useEffect') as jest.Mock;
    mockUseEffect();
  });
  afterEach(() => {
    useEffect.mockRestore();
  });
  afterAll(() => {
    useQueryUrlParamsDispatchMock.mockRestore();
  });
  it('renders without crashing', () => {
    shallow(<FilterWithMultiSelection {...props} />);
  });
  it('renders Accordion component when header is not defined from props', () => {
    const wrapper = shallow(<FilterWithMultiSelection {...props} />);
    const view = wrapper.find('Accordion');
    expect(view).toHaveLength(1);
   // expect(view.prop('header')).toEqual('filter');
  });
  it('renders Accordion panel with panel header value is defined', () => {
    const wrapper = shallow(<FilterWithMultiSelection {...props} header={'Header'} />);
    const accordion = wrapper.find('Accordion');
    const view = accordion.find('MultiSelectionList');
    expect(view).toHaveLength(1);
    //expect(accordion.prop('header')).toEqual('header');
  });
  it('renders MultiSelectionList component when default props are defined', () => {
    const wrapper = shallow(<FilterWithMultiSelection {...props} />);
    const accordion = wrapper.find('Accordion');
    expect(accordion).toHaveLength(1);
    const view = accordion.find('MultiSelectionList');
    expect(view).toHaveLength(1);
    expect(view.prop('data')).toEqual([
      {
        value: '104',
        label: 'IMPERIAL',
      },
      {
        value: '206',
        label: 'UNKNOWN',
      },
    ]);
    expect(view.prop('defaultValue')).toEqual(undefined);
    expect(view.prop('onChange')).toBeDefined();
    expect(view.prop('onSearch')).toBeDefined();
  });
  it('renders Checkbox group component when withSearch value is false and default props are defined', () => {
    const wrapper = shallow(<FilterWithMultiSelection {...props} withSearch={false} />);
    const accordion = wrapper.find('Accordion');
    expect(accordion).toHaveLength(1);
    const view = accordion.find('CheckboxGroup');
    expect(view).toHaveLength(1);
    expect(view.prop('options')).toEqual([
      {
        value: '104',
        label: 'IMPERIAL',
      },
      {
        value: '206',
        label: 'UNKNOWN',
      },
    ]);
    expect(view.prop('defaultValue')).toEqual(undefined);
    expect(view.prop('value')).toEqual(undefined);
    expect(view.prop('onChange')).toBeDefined();
  });
  it('calls MultiSelectionList component method onChange for selecting elements with value is equal [1]', () => {
    const onChangeSpy = jest.spyOn(props, 'onOptionsSelected');
    const wrapper = shallow(<FilterWithMultiSelection {...props} />);
    const accordion = wrapper.find('Accordion');
    expect(accordion).toHaveLength(1);
    const view = accordion.find('MultiSelectionList');
    const onChange: Function = view.prop('onChange') as Function;
    onChange(['1']);
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toBeCalledWith('brands', ['1']);
  });
  it('calls MultiSelectionList component method onSearch which filter array of data to "[ { label: AMAZONE, value: 1 } ]" with value "amazon"', () => {
    const newProps = {
      ...props,
      options: [
        {
          value: '1',
          label: 'AMAZONE',
        },
        {
          value: '2',
          label: 'HOME',
        },
      ],
    };
    const wrapper = shallow(<FilterWithMultiSelection {...newProps} />);
    let accordion = wrapper.find('Accordion');
    expect(accordion).toHaveLength(1);
    let view = accordion.find('MultiSelectionList');
    const onSearch: Function = view.prop('onSearch') as Function;
    onSearch('amazon');
    accordion = wrapper.find('Accordion');
    view = accordion.find('MultiSelectionList');
    expect(view.prop('data')).toEqual([{ label: 'AMAZONE', value: '1' }]);
  });
});
