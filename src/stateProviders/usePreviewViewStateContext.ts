import { useContext } from 'react';

import { DispatchContext, PreviewState, StateContext } from './previewViewStateProvider';

const usePreviewViewStateContext = (): Partial<PreviewState> => {
  const state = useContext<Partial<PreviewState>>(StateContext);

  if (state === undefined) {
    throw new Error('must be used within a Search Detail');
  }

  return state;
};

const usePreviewViewDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('must be used within Search Detail');
  }

  return dispatch;
};

export { usePreviewViewDispatchContext, usePreviewViewStateContext };
