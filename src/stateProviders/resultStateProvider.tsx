import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
//import TableResultlistType from 'src/types/TableResultlistType';
import FileTableResultType from 'src/types/FileTableResultType';

enum RESULT_DETAILS_ACTION_TYPES {
  setRunId = 'SET_RUN_ID',
  setJobsname = 'SET_JOBSNAME',
  setRdDtlSummary = 'SET_JOB_DTLSUMMARY',
  deleteds = 'DELETEDS',
  removeSearchDtl = "removeSearchDtl",
  setResultid = 'SET_RESULT_ID',
}

export type ResultDetailsState = {
  removeSearchDtl: FileTableResultType[];
  runId: string;
  resultid:string;
  jobname: FileTableResultType | undefined;
  deleted: boolean;
  deleteds: boolean;
  rdDtlSummary:FileTableResultType | undefined
};

export type ResultDetailsAction = {
  type: RESULT_DETAILS_ACTION_TYPES;
  payload: ResultDetailsState;
};

export const defaultState: ResultDetailsState = {
  removeSearchDtl: [],
  jobname: undefined,
  runId: '',
  resultid:'',
  deleted: false,
  deleteds:false,
  rdDtlSummary: undefined
};

const DispatchContext: Context<Dispatch<ResultDetailsAction>> = React.createContext<Dispatch<ResultDetailsAction>>(
  {} as Dispatch<ResultDetailsAction>
);
const StateContext: Context<Partial<ResultDetailsState>> = React.createContext<Partial<ResultDetailsState>>({});

export const reducer = (state: ResultDetailsState, action: ResultDetailsAction): ResultDetailsState =>
  produce(state, (draft: ResultDetailsState) => {
    switch (action.type) {
      case RESULT_DETAILS_ACTION_TYPES.setJobsname: {
        const { jobname } = action.payload;
        draft.jobname = jobname ? { ...jobname } : undefined;
        return draft;
      }
      case RESULT_DETAILS_ACTION_TYPES.removeSearchDtl: {
        const { removeSearchDtl, deleted } = action.payload;
        draft.removeSearchDtl = removeSearchDtl
        draft.deleted=deleted
        return draft;
      }

      case RESULT_DETAILS_ACTION_TYPES.setResultid: {
        const { resultid } = action.payload;
        draft.resultid = resultid || '';
        draft.rdDtlSummary = undefined;
        return draft;
      }

      case RESULT_DETAILS_ACTION_TYPES.setRunId: {
        const { runId } = action.payload;
        draft.runId = runId || '';
        draft.jobname = undefined;
        return draft;
      }
      case RESULT_DETAILS_ACTION_TYPES.setRdDtlSummary: {
        const {rdDtlSummary } = action.payload;
        draft.rdDtlSummary = rdDtlSummary ? { ...rdDtlSummary } : undefined;
        return draft;
      }
      case RESULT_DETAILS_ACTION_TYPES.deleteds: {
        const {deleteds } = action.payload;
       draft.deleteds=deleteds;
        return draft;
      }

      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  });

export const ResultProductDetailsProvider = DispatchContext.Provider;
export const ResultStateContextProvider = StateContext.Provider;
type ResultDetailsStateProviderProps = {
  children: React.ReactNode;
};

const ResultDetailsStateProvider: React.FC<ResultDetailsStateProviderProps> = ({
  children,
}: ResultDetailsStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <ResultProductDetailsProvider value={dispatch}>
      <ResultStateContextProvider value={state}>{children}</ResultStateContextProvider>
    </ResultProductDetailsProvider>
  );
};

export { ResultDetailsStateProvider, DispatchContext, StateContext, RESULT_DETAILS_ACTION_TYPES };
