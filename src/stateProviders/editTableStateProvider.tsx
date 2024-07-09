import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
import ApplicationFilterType from 'src/types/ApplicationFilterType';
import TablePageEditType from 'src/types/TablePageEditType';

enum EDITTABLE_ACTION_TYPES {
  setAppIdData = 'SET_APPID_DATA',  
  setPostEditTable = 'SET_SITENOTIFICATIONS'
}

export type EditTableState = {
  vertical:ApplicationFilterType[]
  EditTableData:TablePageEditType | '';
};

export type EditTableAction = {
  type: EDITTABLE_ACTION_TYPES;
  payload: EditTableState;
};
export const defaultState: EditTableState = {
  vertical:[],
  EditTableData:''
};

const DispatchContext: Context<Dispatch<EditTableAction>> = React.createContext<Dispatch<EditTableAction>>(
  {} as Dispatch<EditTableAction>
);
const StateContext: Context<Partial<EditTableState>> = React.createContext<Partial<EditTableState>>({});

export const reducer = (state: EditTableState, action: EditTableAction): EditTableState =>
  produce(state, (draft: EditTableState) => {
    switch (action.type) {
      case EDITTABLE_ACTION_TYPES.setAppIdData: {
        const { vertical } = action.payload;
        draft.vertical = vertical;
        return draft;
      }
      case EDITTABLE_ACTION_TYPES.setPostEditTable: {
        const { EditTableData } = action.payload;
        draft.EditTableData = EditTableData;
        return draft;
      }     
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  });

export const DispatchEditTableProvider = DispatchContext.Provider;
export const EditTableStateContextProvider = StateContext.Provider;
type EditTableStateProviderProps = {
  children: React.ReactNode;
};

const EditTableStateProvider: React.FC<EditTableStateProviderProps> = ({
  children,
}: EditTableStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchEditTableProvider value={dispatch}>
      <EditTableStateContextProvider value={state}>{children}</EditTableStateContextProvider>
    </DispatchEditTableProvider>
  );
};

export { EditTableStateProvider, DispatchContext, StateContext, EDITTABLE_ACTION_TYPES };
