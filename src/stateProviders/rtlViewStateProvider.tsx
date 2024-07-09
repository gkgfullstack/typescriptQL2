import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
import FileTableResultType from 'src/types/FileTableResultType';
import RTLPreviewType from 'src/types/RTLPreviewType';

enum RTL_ACTION_TYPES {
  setResultid = 'SET_RESULT_ID',
  setResultList = 'SET_LINEITEMS_DTL',
  resultList = 'LINEITEMS',
  setLineItems = 'SET_SEARCH_DTL',
  lineItems = 'LINEITEMS',
}

export type RTLPreviewState = {
  resultid: string;
  resultList: FileTableResultType | undefined;
  lineItems: RTLPreviewType | undefined;
};

export type RTLPreviewAction = {
  type: RTL_ACTION_TYPES;
  payload: RTLPreviewState;
};

export const defaultState: RTLPreviewState = {
  resultid: '',
  resultList: undefined,
  lineItems:undefined,
};

const DispatchContext: Context<Dispatch<RTLPreviewAction>> = React.createContext<Dispatch<RTLPreviewAction>>(
  {} as Dispatch<RTLPreviewAction>
);
const StateContext: Context<Partial<RTLPreviewState>> = React.createContext<Partial<RTLPreviewState>>({});

export const reducer = (state: RTLPreviewState, action: RTLPreviewAction): RTLPreviewState =>
  produce(state, (draft: RTLPreviewState) => {
    switch (action.type) {
      case RTL_ACTION_TYPES.setResultList: {
        const { resultList } = action.payload;
        draft.resultList = resultList ? { ...resultList } : undefined;
        return draft;
      }
      case RTL_ACTION_TYPES.setResultid: {
        const { resultid } = action.payload;
        draft.resultid = resultid || '';
        draft.resultList = undefined;
        return draft;
      }
      case RTL_ACTION_TYPES.resultList: {
        const { resultList } = action.payload;
        draft.resultList = resultList
        return draft;
      }
      case RTL_ACTION_TYPES.setLineItems: {
        const { lineItems } = action.payload;
        draft.lineItems = lineItems
        return draft;
      }
      case RTL_ACTION_TYPES.lineItems: {
        const { lineItems } = action.payload;
        draft.lineItems = lineItems
        return draft;
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  });

export const DispatchPreviewProvider = DispatchContext.Provider;
export const RTLPreviewStateContextProvider = StateContext.Provider;
type RTLPreviewStateProviderProps = {
  children: React.ReactNode;
};

const RTLPreviewStateProvider: React.FC<RTLPreviewStateProviderProps> = ({
  children,
}: RTLPreviewStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchPreviewProvider value={dispatch}>
      <RTLPreviewStateContextProvider value={state}>{children}</RTLPreviewStateContextProvider>
    </DispatchPreviewProvider>
  );
};

export { RTLPreviewStateProvider, DispatchContext, StateContext, RTL_ACTION_TYPES };
