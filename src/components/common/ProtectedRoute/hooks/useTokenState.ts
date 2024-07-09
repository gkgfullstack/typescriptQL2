import { useEffect, useState } from 'react';
import auth from 'src/services/auth';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import { useHistory } from 'react-router';
import serializeQuery from 'src/utils/serializeQuery';

type queryParams = {
  token: string;
  skinName:string;
};

const useTokenState = (): string | undefined => {
  const history = useHistory();
  const query = useQueryUrlParams<queryParams>();
  const [token, setToken] = useState<string | undefined>();
  useEffect(() => {

    if (query) {
      let storedToken = auth.getToken();
      let storedSkin = auth.getSkin();
      if (query.token && ((storedToken && query.token !== storedToken) || !storedToken)) {
        auth.setToken(query.token);
        storedToken = query.token;
      }
      if (storedToken) {
        setToken(storedToken);
        if (query.token) {
          const params = { ...query };
          delete params.token;
          history.push({ search: params ? '?' + serializeQuery(params) : '' });
        }
      } else {
        auth.logout();
      }
      if (query.skinName && ((storedSkin && query.skinName !== storedSkin) || !storedSkin)) {
        auth.setSkin(query.skinName);
        storedSkin = query.skinName;
      }
    }
  }, [query, history]);

  return token ;
};

export default useTokenState;
