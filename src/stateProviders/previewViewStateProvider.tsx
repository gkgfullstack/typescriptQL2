import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
//import ProductInfo from 'src/types/ProductInfo';
import PreviewTypeVIew from 'src/types/PreviewTypeVIew';

enum PREVIEW_ACTION_TYPES {
  setSearchId = 'SET_SEARCH_ID',
  setLineitems = 'SET_SEARCH_DTL',
  lineitems = 'LINEITEMS',
  
}

export type PreviewState = {
 // lineitems: PreviewTypeVIew[];
  searchId: string;
  lineitems: PreviewTypeVIew | undefined;
};

export type PreviewAction = {
  type: PREVIEW_ACTION_TYPES;
  payload: PreviewState;
};

export const defaultState: PreviewState = {
  //lineitems: [],
  searchId: '',
  lineitems: undefined,
  
};

const DispatchContext: Context<Dispatch<PreviewAction>> = React.createContext<Dispatch<PreviewAction>>(
  {} as Dispatch<PreviewAction>
);
const StateContext: Context<Partial<PreviewState>> = React.createContext<Partial<PreviewState>>({});

export const reducer = (state: PreviewState, action: PreviewAction): PreviewState =>
  produce(state, (draft: PreviewState) => {
    switch (action.type) {
      case PREVIEW_ACTION_TYPES.setLineitems: {
        const { lineitems } = action.payload;
        draft.lineitems = lineitems ? { ...lineitems } : undefined;
        return draft;
      }
      case PREVIEW_ACTION_TYPES.setSearchId: {
        const { searchId } = action.payload;
        draft.searchId = searchId || '';
        draft.lineitems = undefined;

        return draft;
      }
      case PREVIEW_ACTION_TYPES.lineitems: {
        const { lineitems } = action.payload;

        draft.lineitems = lineitems
        return draft;
      }

      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  });

export const DispatchPreviewProvider = DispatchContext.Provider;
export const PreviewStateContextProvider = StateContext.Provider;
type PreviewStateProviderProps = {
  children: React.ReactNode;
};

const PreviewStateProvider: React.FC<PreviewStateProviderProps> = ({
  children,
}: PreviewStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchPreviewProvider value={dispatch}>
      <PreviewStateContextProvider value={state}>{children}</PreviewStateContextProvider>
    </DispatchPreviewProvider>
  );
};

export { PreviewStateProvider, DispatchContext, StateContext, PREVIEW_ACTION_TYPES };
