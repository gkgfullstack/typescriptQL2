import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
import SiteCodeType from 'src/types/SiteCodeType';
//import ProductMatchInfo from 'src/types/ProductMatcheInfo';

enum SITE_CODE_ACTION_TYPES {
  setAppId = 'SET_APP_ID',
  setProduct = 'SET_PRODUCT',
  // removeMatches = 'REMOVE_MATCHES',
}

export type SiteCodeState = {
 // removedMatches: ProductMatchInfo[];
  appId: string;
  product: SiteCodeType | undefined;
};

export type SiteCodeAction = {
  type: SITE_CODE_ACTION_TYPES;
  payload: SiteCodeState;
};

export const defaultState: SiteCodeState = {
 // removedMatches: [],
  product: undefined,
  appId: '',
};

const DispatchContext: Context<Dispatch<SiteCodeAction>> = React.createContext<Dispatch<SiteCodeAction>>(
  {} as Dispatch<SiteCodeAction>
);
const StateContext: Context<Partial<SiteCodeState>> = React.createContext<Partial<SiteCodeState>>({});

export const reducer = (state: SiteCodeState, action: SiteCodeAction): SiteCodeState =>
  produce(state, (draft: SiteCodeState) => {
    switch (action.type) {
      case SITE_CODE_ACTION_TYPES.setProduct: {
        const { product } = action.payload;
        draft.product = product ? { ...product } : undefined;
        return draft;
      }
      case SITE_CODE_ACTION_TYPES.setAppId: {
        const { appId } = action.payload;
        draft.appId = appId || '';
        draft.product = undefined;

        return draft;
      }
      // case SITE_CODE_ACTION_TYPES.removeMatches: {
      //   const { removedMatches } = action.payload;

      //   draft.removedMatches = draft.removedMatches
      //     ? [...draft.removedMatches, ...removedMatches]
      //     : [...removedMatches];

      //   return draft;
      // }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  });

export const DispatchSiteCodeProvider = DispatchContext.Provider;
export const SiteCodeStateContextProvider = StateContext.Provider;
type SiteCodeStateProviderProps = {
  children: React.ReactNode;
};

const SiteCodeStateProvider: React.FC<SiteCodeStateProviderProps> = ({
  children,
}: SiteCodeStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchSiteCodeProvider value={dispatch}>
      <SiteCodeStateContextProvider value={state}>{children}</SiteCodeStateContextProvider>
    </DispatchSiteCodeProvider>
  );
};

export { SiteCodeStateProvider, DispatchContext, StateContext, SITE_CODE_ACTION_TYPES };
