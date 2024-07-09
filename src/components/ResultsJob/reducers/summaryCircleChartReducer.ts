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
  inputList:any;
  outputList:any;
  completed: string;
  completedOut:string;
};

export type UpdateOptionsAction = {
  type: SUMMARYCIRCLE_ACTION_TYPES.updateOptions;
  payload: Pick<SummaryCircleChartState, 'inputList' | 'outputList' |'completed' | 'completedOut'>;
};

export type SetSummaryCircleChartAction = {
  type: SUMMARYCIRCLE_ACTION_TYPES.setData;
  payload: Pick<SummaryCircleChartState, 'inputList' | 'outputList' | 'completed' | 'completedOut'>;
};

export type SummaryCircleChartAction = Action<Array<SummaryChartType>> | UpdateOptionsAction | SetSummaryCircleChartAction;


export const summaryCircleChartReducer = (
  state: SummaryCircleChartState,
  action: SummaryCircleChartAction
): SummaryCircleChartState =>
  produce(state, (draft: SummaryCircleChartState) => {
    switch (action.type) {
      case SUMMARYCIRCLE_ACTION_TYPES.setData: {
        const { inputList,outputList, completed, completedOut } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.completed = completed;
        draft.completedOut = completedOut;
        if (inputList) {
          draft.inputList = inputList;
        }
        if (outputList) {
          draft.outputList = outputList;
        }
        return draft;
      }
      
      default: {
        return draft;
      }
    }
  });
