import { Dispatch, MutableRefObject, useEffect, useReducer, useRef } from 'react';
import {
  Action,
  OPTIONS_DROPDOWN_ACTION_TYPES,
  optionsDropdownReducer,
  OptionsDropdownState,
} from '../reducers/optionsDropdownReducer';

export type State = OptionsDropdownState & { ref: MutableRefObject<HTMLDivElement> | null };

const initialState: State = {
  ref: null,
  options: [],
  displayedOptions: [],
  expandedOptions: [],
  selectedOptions: [],
  isOverlayVisible: false,
  initialSetupFinished: true,
};

const useOptionsDropdownState = (): [State, Dispatch<Action>] => {
  const ref = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(optionsDropdownReducer, {
    ...initialState,
  });
  const { selectedOptions, expandedOptions, options } = state;

  const handleClickOutside = (event: Event) => {
    const current: HTMLElement | null = ref && ref.current ? ref.current : null;
    if (current && !current.contains(event.target as HTMLElement)) {
      dispatch({ type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility, payload: false });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    if (options && options.length > 0) {
      dispatch({
        type: OPTIONS_DROPDOWN_ACTION_TYPES.updateDisplayedOptions,
      });
    }
  }, [options, selectedOptions, expandedOptions]);

  return [{ ...state, ref: ref } as State, dispatch];
};

export default useOptionsDropdownState;
