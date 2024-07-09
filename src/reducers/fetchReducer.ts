import produce from 'immer';

export enum FETCH_ACTION_TYPES {
  loading = 'LOADING',
  setData = 'SET_DATA',
  setError = 'SET_ERROR',
}

export type FetchState<T> = {
  loading: boolean;
  error: any;
  data: T | null;
};

export type LoadingAction<T> = {
  type: FETCH_ACTION_TYPES.loading;
  payload: Pick<FetchState<T>, 'loading'>;
};

export type SetDataAction<T> = {
  type: FETCH_ACTION_TYPES.setData;
  payload: Pick<FetchState<T>, 'data'>;
};

export type SetErrorAction<T> = {
  type: FETCH_ACTION_TYPES.setError;
  payload: Pick<FetchState<T>, 'error'>;
};

export type Action<T> = LoadingAction<T> | SetDataAction<T> | SetErrorAction<T>;

export const fetchReducer = <T, K>(state: FetchState<T>, action: Action<T> | K): FetchState<T> =>
  produce(state, (draft: FetchState<T>) => {
    if ('type' in action) {
      switch (action.type) {
        case FETCH_ACTION_TYPES.loading: {
          const { loading } = action.payload;
          draft.loading = loading;
          draft.error = false;
          return draft;
        }
        case FETCH_ACTION_TYPES.setData: {
          const { data } = action.payload;
          draft.loading = false;
          draft.error = false;
          draft.data = data;
          return draft;
        }
        case FETCH_ACTION_TYPES.setError: {
          const { error } = action.payload;
          draft.loading = false;
          draft.error = error;
          draft.data = null;
          return draft;
        }
        default: {
          return draft;
        }
      }
    } else {
      return draft;
    }
  });
