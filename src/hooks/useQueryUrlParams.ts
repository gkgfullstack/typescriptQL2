import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { deserializeQuery } from 'src/utils';

const useQueryUrlParams = <T>(): any => {
  const { search } = useLocation();
  const [query, setQuery] = useState<any>(deserializeQuery(search));
  React.useEffect(() => {
    if (search) {
      setQuery(deserializeQuery(search));
    }
    if (!search) {
      setQuery({} as T);
    }
  }, [search]);

  return query;
};

export default useQueryUrlParams;
