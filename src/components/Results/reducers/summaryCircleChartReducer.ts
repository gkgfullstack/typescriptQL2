import produce from 'immer';
import SummaryChartType from 'src/types/SummaryChartType';
import { Action, FetchState } from 'src/reducers/fetchReducer';
//import { Sorting } from 'src/types/Sorting';

export enum SUMMARYCIRCLE_ACTION_TYPES {
  updateOptions = 'UPDATE_OPTIONS',
  setData = 'SET_DATA',
  setError = "setError",
  loading = "loading"
}

export type SummaryCircleChartState = FetchState<Array<SummaryChartType>> & {
  inputdata: any;
  outputdata: any;
  completed: string;
  completedOut:string;
};

export type UpdateOptionsAction = {
  type: SUMMARYCIRCLE_ACTION_TYPES.updateOptions;
  payload: Pick<SummaryCircleChartState, 'inputdata'|'outputdata'|'completed' | 'completedOut'>;
};

export type SetSummaryCircleChartAction = {
  type: SUMMARYCIRCLE_ACTION_TYPES.setData;
  payload: Pick<SummaryCircleChartState, 'inputdata'|'outputdata' | 'completed' | 'completedOut'>;
};

export type SummaryCircleChartAction = Action<Array<SummaryChartType>> | UpdateOptionsAction | SetSummaryCircleChartAction;


export const summaryCircleChartReducer = (
  state: SummaryCircleChartState,
  action: SummaryCircleChartAction
): SummaryCircleChartState =>
  produce(state, (draft: SummaryCircleChartState) => {
    switch (action.type) {
      case SUMMARYCIRCLE_ACTION_TYPES.setData: {
        const { inputdata,outputdata, completed, completedOut } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.completed = completed;
        draft.completedOut = completedOut;
        if (inputdata) {
          draft.inputdata = inputdata;
        }
        if (outputdata) {
          draft.outputdata = outputdata;
        }
        return draft;
      }
      
      default: {
        return draft;
      }
    }
  });
