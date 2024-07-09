import { renderHook } from '@testing-library/react-hooks';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import location from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

const mockLocation = {
  pathname: 'test.com',
  search: '',
  hash: '',
  state: null,
  key: '',
};
const searchQuery = '?test=value';
describe('useQueryUrlParams hook ', () => {
  it('returns with default mockLocation where search query is not defined', () => {
    jest.spyOn(location, 'useLocation').mockReturnValue(mockLocation);
    const renderHookResults = renderHook(() => useQueryUrlParams());
    const { result } = renderHookResults;
    expect(result.current).toEqual({});
  });
  it('returns with search query is defined and is equal to searchQuery value', () => {
    jest.spyOn(location, 'useLocation').mockReturnValue({ ...mockLocation, search: searchQuery });
    const renderHookResults = renderHook(() => useQueryUrlParams());
    const { result } = renderHookResults;
    expect(result.current).toEqual({ test: 'value' });
  });
  it('updates when search query is changing from default query to "?test2=value2"', () => {
    jest.spyOn(location, 'useLocation').mockReturnValue({ ...mockLocation, search: searchQuery });
    const renderHookResults = renderHook(() => useQueryUrlParams());
    const { result, rerender } = renderHookResults;
    expect(result.current).toEqual({ test: 'value' });
    jest.spyOn(location, 'useLocation').mockReturnValue({ ...mockLocation, search: '?test2=value2' });
    rerender();
    expect(result.current).toEqual({ test2: 'value2' });
  });
});
