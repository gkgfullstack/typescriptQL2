import { useContext } from 'react';

import { DispatchContext, RTLPreviewState, StateContext } from './rtlViewStateProvider';

const useRTLViewStateContext = (): Partial<RTLPreviewState> => {
  const state = useContext<Partial<RTLPreviewState>>(StateContext);

  if (state === undefined) {

    throw new Error('must be used within a Search Detail');
  }

  return state;   
};

const useRTLViewDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('must be used within Search Detail');
  }

  return dispatch;
};

export { useRTLViewDispatchContext, useRTLViewStateContext };
