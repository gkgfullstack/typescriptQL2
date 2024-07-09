import React from 'react';
import { shallow } from 'enzyme';
import AddMatch from './AddMatch';
import { FetchState } from 'src/reducers/fetchReducer';
import { ResponseHeader } from 'src/types/ResponseHeader';
import useMatchAddingState, { AddMatchRequest, DispatchAddMatch } from './hooks/useMatchAddingState';
import useCompetitorsFetching from 'src/hooks/useCompetitorsFetching';
import Competitor from 'src/types/Competitor';

const responseHeader: ResponseHeader = {
  statusCode: '200',
  statusMessage: 'success',
};

const competitors: Competitor[] = [
  {
    ownerId: '1',
    ownerName: 'Amazone',
  },
];

const addMatch = jest.fn();

const getMatchAddingState = (
  loading = false,
  data: ResponseHeader | null = responseHeader
): [FetchState<ResponseHeader>, DispatchAddMatch] => {
  return [
    {
      loading: loading,
      data: data,
      error: null,
    } as FetchState<ResponseHeader>,
    {
      addMatch,
    },
  ];
};

const getCompetitorsState = (
  loading = false,
  data: Competitor[] | null = competitors
): [FetchState<ResponseHeader>] => {
  return [
    {
      loading: loading,
      data: data,
      error: null,
    } as FetchState<ResponseHeader>,
  ];
};

const addMatchRequest: AddMatchRequest = {
  matchType: 'EXACT',
  productUniqueId: 'CSJ7S02234',
  ownerId: '1',
  productURL: 'http://amazon.com/product',
};

jest.mock('src/hooks/useCompetitorsFetching');
jest.mock('./hooks/useMatchAddingState');

const useMatchAddingStateMock = useMatchAddingState as jest.Mock;
const useCompetitorsFetchingMock = useCompetitorsFetching as jest.Mock;

describe('AddMatch component ', () => {
  let useEffect: jest.Mock;
  const mockUseEffect = (): void => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    // using fake timers
    jest.useFakeTimers();
    /* mocking useEffect */
    useEffect = jest.spyOn(React, 'useEffect') as jest.Mock;
    mockUseEffect();
  });
  afterEach(() => {
    useEffect.mockRestore();
    useMatchAddingStateMock.mockRestore();
    useCompetitorsFetchingMock.mockRestore();
  });
  it('renders without crashing', () => {
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState(false, null));
    useMatchAddingStateMock.mockReturnValue(getMatchAddingState(false, null));
    shallow(<AddMatch>Child</AddMatch>);
  });
  it('renders SubmittedRequestPopover component', () => {
    const fetchResults = getMatchAddingState();
    useMatchAddingStateMock.mockReturnValue(fetchResults);
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    expect(wrapper.find('SubmittedRequestPopover')).toHaveLength(1);
  });
  it('renders Popover component', () => {
    const fetchResults = getMatchAddingState();
    useMatchAddingStateMock.mockReturnValue(fetchResults);
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    const popover = wrapper.find('Popover');
    expect(popover).toHaveLength(1);
    expect(popover.prop('trigger')).toEqual('click');
    expect(popover.prop('visible')).toEqual(false);
    expect(popover.prop('onVisibleChange')).toBeDefined();
    expect(popover.prop('content')).toBeDefined();
    const content = shallow(<div>{popover.prop('content')}</div>);
    expect(content.find('Form(AddMatchForm)')).toHaveLength(1);
  });
  it('renders SubmittedRequestPopover and Popover component where placement value equals "bottom" as default value when tooltipPlacement prop is not defined', () => {
    const fetchResults = getMatchAddingState();
    useMatchAddingStateMock.mockReturnValue(fetchResults);
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    expect(wrapper.find('SubmittedRequestPopover').prop('placement')).toEqual('bottom');
    expect(wrapper.find('Popover').prop('placement')).toEqual('bottom');
  });
  it('renders SubmittedRequestPopover and Popover component where placement value equals tooltipPlacement prop value if it is set up ', () => {
    const fetchResults = getMatchAddingState();
    useMatchAddingStateMock.mockReturnValue(fetchResults);
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch tooltipPlacement={'top'}>Child</AddMatch>);
    expect(wrapper.find('SubmittedRequestPopover').prop('placement')).toEqual('top');
    expect(wrapper.find('Popover').prop('placement')).toEqual('top');
  });
  it('renders Popover with updated visible property when onVisibleChange fires', () => {
    const fetchResults = getMatchAddingState();
    useMatchAddingStateMock.mockReturnValue(fetchResults);
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());

    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    let popover = wrapper.find('Popover');
    expect(popover.prop('visible')).toEqual(false);
    let contentWrapper = shallow(<div>{popover.prop('content')}</div>);
    expect(contentWrapper.find('Form(AddMatchForm)').prop('visible')).toEqual(false);

    const onVisibleChange: Function = popover.prop('onVisibleChange');
    onVisibleChange(true);
    popover = wrapper.find('Popover');
    expect(popover.prop('visible')).toEqual(true);
    contentWrapper = shallow(<div>{popover.prop('content')}</div>);
    expect(contentWrapper.find('Form(AddMatchForm)').prop('visible')).toEqual(true);

    onVisibleChange(false);
    popover = wrapper.find('Popover');
    expect(popover.prop('visible')).toEqual(false);
    contentWrapper = shallow(<div>{popover.prop('content')}</div>);
    expect(contentWrapper.find('Form(AddMatchForm)').prop('visible')).toEqual(false);
  });
  it('renders AddMatchForm with loading equals true when competitors fetching is in progress or adding match is in progress', () => {
    useMatchAddingStateMock.mockReturnValue(getMatchAddingState(true));
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    let wrapper = shallow(<AddMatch>Child</AddMatch>);
    let contentWrapper = shallow(<div>{wrapper.find('Popover').prop('content')}</div>);
    expect(contentWrapper.find('Form(AddMatchForm)').prop('loading')).toEqual(true);

    useMatchAddingStateMock.mockReturnValue(getMatchAddingState(false));
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState(true));
    wrapper = shallow(<AddMatch>Child</AddMatch>);
    contentWrapper = shallow(<div>{wrapper.find('Popover').prop('content')}</div>);
    expect(contentWrapper.find('Form(AddMatchForm)').prop('loading')).toEqual(true);
  });
  it('renders AddMatchForm with loading equals false when data is loaded', () => {
    useMatchAddingStateMock.mockReturnValue(getMatchAddingState());
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    const contentWrapper = shallow(<div>{wrapper.find('Popover').prop('content')}</div>);
    expect(contentWrapper.find('Form(AddMatchForm)').prop('loading')).toEqual(false);
  });
  it('renders AddMatchForm with competitors equal data that is returned from useCompetitorsFetching hook', () => {
    useMatchAddingStateMock.mockReturnValue(getMatchAddingState());
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    const contentWrapper = shallow(<div>{wrapper.find('Popover').prop('content')}</div>);
    expect(contentWrapper.find('Form(AddMatchForm)').prop('competitors')).toEqual(competitors);
  });
  it('renders AddMatchForm with error equals false when there is no errors', () => {
    const fetchResults = getMatchAddingState();
    useMatchAddingStateMock.mockReturnValue(fetchResults);
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    const contentWrapper = shallow(<div>{wrapper.find('Popover').prop('content')}</div>);
    expect(contentWrapper.find('Form(AddMatchForm)').prop('error')).toEqual(false);
  });
  it('renders AddMatchForm with error message there is an match adding error', () => {
    const fetchResults = getMatchAddingState();
    useMatchAddingStateMock.mockReturnValue([{ ...fetchResults[0], error: 'Something went wrong!' }, fetchResults[1]]);
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    const contentWrapper = shallow(<div>{wrapper.find('Popover').prop('content')}</div>);
    expect(contentWrapper.find('Form(AddMatchForm)').prop('error')).toEqual('Something went wrong!');
  });
  it('renders AddMatchForm with error message there is an competitors fetching error', () => {
    useMatchAddingStateMock.mockReturnValue(getMatchAddingState());
    const fetchResults = getCompetitorsState();
    useCompetitorsFetchingMock.mockReturnValue([{ ...fetchResults[0], error: 'Something went wrong!' }]);
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    const contentWrapper = shallow(<div>{wrapper.find('Popover').prop('content')}</div>);
    expect(contentWrapper.find('Form(AddMatchForm)').prop('error')).toEqual(
      'An error has occurred when trying to get competitors! Please try again later!'
    );
  });
  it('renders SubmittedRequestPopover for 1000 seconds when data is loaded and statusCode is 200', () => {
    useMatchAddingStateMock.mockReturnValue(getMatchAddingState());
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    expect(wrapper.find('SubmittedRequestPopover').prop('visible')).toEqual(true);
    jest.advanceTimersByTime(1010);
    expect(wrapper.find('SubmittedRequestPopover').prop('visible')).toEqual(false);
  });
  it('does not render SubmittedRequestPopover when data is loaded and statusCode is not 200', () => {
    useMatchAddingStateMock.mockReturnValue(getMatchAddingState(false, { statusCode: '400', statusMessage: 'error' }));
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    expect(wrapper.find('SubmittedRequestPopover').prop('visible')).toEqual(false);
    jest.advanceTimersByTime(1010);
    expect(wrapper.find('SubmittedRequestPopover').prop('visible')).toEqual(false);
  });
  it('hides Popover when data is loaded and statusCode is 200', () => {
    useMatchAddingStateMock.mockReturnValue(getMatchAddingState());
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const wrapper = shallow(<AddMatch>Child</AddMatch>);
    expect(wrapper.find('Popover').prop('visible')).toEqual(false);
    jest.advanceTimersByTime(1010);
    expect(wrapper.find('Popover').prop('visible')).toEqual(false);
  });
  it('calls addMatch when AddMatchForm fires onSubmit', () => {
    const matchRemovingState = getMatchAddingState();
    const addSpy = jest.spyOn(matchRemovingState[1], 'addMatch');
    useMatchAddingStateMock.mockReturnValue(matchRemovingState);
    useCompetitorsFetchingMock.mockReturnValue(getCompetitorsState());
    const content = shallow(<AddMatch>Child</AddMatch>)
      .find('Popover')
      .prop('content');
    const contentWrapper = shallow(<div>{content}</div>);
    const onSubmit: Function = contentWrapper.find('Form(AddMatchForm)').prop('onSubmit') as Function;
    onSubmit(addMatchRequest);
    expect(addSpy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalledWith(addMatchRequest);
  });
});
