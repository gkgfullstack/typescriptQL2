import { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { deserializeQuery } from 'src/utils';
import { serializeQuery } from 'src/utils';

const useQueryUrlParamsDispatch = <T extends object>(): ((query: T, path?: string, clean?: boolean) => void) => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const setQuery = useCallback(
    (query: T, path?: string, clean?: boolean) => {
      if (query) {
        const queryState: T = deserializeQuery(search);
        const currQuery: T = clean
          ? { ...query }
          : {
              ...queryState,
              ...query,
            };
        const params = serializeQuery(currQuery);
        const searchQuery = params && `?${params}`;
        if (search !== searchQuery) {
          history.push({
            pathname: path || pathname,
            search: searchQuery,
          });
        }
      }
    },
    [pathname, history, search]
  );
  return (query: T, path?: string, clean?: boolean): void => {
    setQuery(query, path, clean);
  };
};
export default useQueryUrlParamsDispatch;
