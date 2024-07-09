import React from 'react';
import { shallow } from 'enzyme';
import AppView from './AppView';
import location from 'react-router-dom';
import { Action } from 'history';
import history  from 'react-router';
import { pageView } from 'src/utils/googleTag';
import { pagePendoView } from 'src/utils/pendoTag';
//import { menuShow } from 'src/utils/menuDisplay';
//import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
jest.mock('src/utils/googleTag');
jest.mock('src/utils/pendoTag');
//jest.mock('src/utils/menuDisplay');
jest.mock('src/configs/routerConfig', () => [
  {
    path: '/some/path',
    exact: true,
    protected: true,
    component: 'Dashboard',
  },
  {
    path: '/some/path2',
    exact: false,
    component: 'ProductDetails',
  },
]);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));


const pageViewMock = pageView as jest.Mock;
const pagePendoViewMock = pagePendoView as jest.Mock;
//const historyViewMock = menuShow as jest.Mock;
//const history = useHistory();
const mockLocation = {
  pathname: 'test.com',
  search: '',
  hash: '',
  state: null,
  key: '',
};
const mockHistory = {
  replace: jest.fn(),
  length: 0,
  location: {
    pathname: 'test.com',
    search: '',
    hash: '',
    state: null,
    key: '',
  },
  push: jest.fn(),
  go: jest.fn(),
  action: 'REPLACE' as Action,
  goBack: jest.fn(),
  goForward: jest.fn(),
  block: jest.fn(),
  listen: jest.fn(),
  createHref: jest.fn(),
}
//const useAppStateContextMock = useAppStateContext as jest.Mock;

describe('AppView component', () => {
  let useEffect: jest.Mock;
  let useHistory: jest.Mock;
  const mockUseEffect = (): void => {
    useEffect.mockImplementationOnce(f => f());
  };
  
  beforeEach(() => {
    useHistory = jest.spyOn(history, 'useHistory') as jest.Mock;
    useHistory.mockReturnValueOnce(mockHistory);
    useEffect = jest.spyOn(React, 'useEffect') as jest.Mock;
    mockUseEffect();
    pageViewMock.mockImplementation(jest.fn);
    pagePendoViewMock.mockImplementation(jest.fn);
  });
  afterEach(() => {
    useEffect.mockRestore();
    useHistory.mockRestore();
    pageViewMock.mockRestore();
    pagePendoViewMock.mockRestore();
  });
  it('renders without crashing', () => {
    jest.spyOn(history, 'useHistory').mockReturnValue(mockHistory);
    jest.spyOn(location, 'useLocation').mockReturnValue(mockLocation);
    shallow(<AppView />);
  });
  it('renders BaseLayout component with Routes where ProtectedRoute component is used for protected routes', () => {
    jest.spyOn(history, 'useHistory').mockReturnValue(mockHistory);
    jest.spyOn(location, 'useLocation').mockReturnValue(mockLocation);
    const wrapper = shallow(<AppView />);
    expect(wrapper.find('BaseLayout')).toHaveLength(1);
    const protectedRoute = wrapper.find('ProtectedRoute');
    expect(protectedRoute).toHaveLength(1);
    expect(protectedRoute.prop('exact')).toEqual(true);
    expect(protectedRoute.prop('path')).toEqual('/some/path');
    expect(protectedRoute.children()).toHaveLength(1);
    const route = wrapper.find('Route');
    expect(route).toHaveLength(1);
    expect(route.prop('exact')).toEqual(false);
    expect(route.prop('path')).toEqual('/some/path2');
    expect(route.children()).toHaveLength(1);
  });
  it('calls pageView google tag when pathname is changed', () => {
    jest.spyOn(history, 'useHistory').mockReturnValue(mockHistory);
    jest.spyOn(location, 'useLocation').mockReturnValue(mockLocation);
    shallow(<AppView />);
    expect(pageViewMock).toHaveBeenCalled();
    expect(pagePendoViewMock).toHaveBeenCalled();
    expect(pageViewMock).toHaveBeenCalledWith(mockLocation.pathname);
    expect(pagePendoViewMock).toHaveBeenCalledWith(mockLocation.pathname);
  });
});


