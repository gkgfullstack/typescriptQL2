import { act, renderHook } from '@testing-library/react-hooks';
import useOptionsDropdownState, { State } from './useOptionsDropdownState';
import { Dispatch } from 'react';
import { Action, Option, OPTIONS_DROPDOWN_ACTION_TYPES } from '../reducers/optionsDropdownReducer';

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
        value: '987',
        label: 'Accessories 1',
        hasChildren: true,
        children: [
          {
            value: '3928',
            label: 'Accessories 2',
            hasChildren: true,
          },
        ],
      },
    ],
  },
];

describe('useOptionsDropdownState hook ', () => {
  it('renders without crashing', () => {
    act(() => {
      renderHook((): [State, Dispatch<Action>] => useOptionsDropdownState());
    });
  });
  it('returns state value with default values', () => {
    const renderHookResults = renderHook((): [State, Dispatch<Action>] => useOptionsDropdownState());
    const { result } = renderHookResults;
    expect(result.current[0].ref).toEqual({ current: null });
    expect(result.current[0].value).not.toBeDefined();
    expect(result.current[0].options).toEqual([]);
    expect(result.current[0].expandedOptions).toEqual([]);
    expect(result.current[0].selectedOptions).toEqual([]);
    expect(result.current[0].initialSetupFinished).toEqual(true);
    expect(result.current[0].displayedOptions).toEqual([]);
    expect(result.current[0].isOverlayVisible).toEqual(false);
  });
  it('updates displayedOptions when options are changed', () => {
    const renderHookResults = renderHook((): [State, Dispatch<Action>] => useOptionsDropdownState());
    let { result } = renderHookResults;
    expect(result.current[0].displayedOptions.length).toEqual(0);
    const dispatch = result.current[1];
    act(() => {
      dispatch({ type: OPTIONS_DROPDOWN_ACTION_TYPES.updateOptions, payload: { options: optionsInfo } });
    });
    result = renderHookResults.result;
    expect(result.current[0].displayedOptions.length).toEqual(1);
  });
});
