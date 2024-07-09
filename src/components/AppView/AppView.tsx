import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import routerConfig from 'src/configs/routerConfig';
import ProtectedRoute from 'src/components/common/ProtectedRoute';
import BaseLayout from 'src/components/common/BaseLayout';
import { pageView } from 'src/utils/googleTag';
import { pagePendoView } from 'src/utils/pendoTag';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import { useHistory } from 'react-router';
import { menuShow } from 'src/utils/menuDisplay';


type AppViewProps = {};
const AppView: React.FC<AppViewProps> = () => {
  const { pathname } = useLocation();
  const { user } = useAppStateContext();
  const history = useHistory();
  

  React.useEffect(() => {
    if (pathname) {
      pageView(pathname); // Record a pageview for the given page
      pagePendoView(pathname); // Record a pageview for the given page
    }
    if (user && user.appPermissions && history) {
      menuShow(history,user)
      
     }
   }, [pathname,user, history]);
  
  return (
    <BaseLayout>
      <Switch>
        {routerConfig.map((route, ind) => {
          return route.protected ? (
            <ProtectedRoute key={ind} exact={route.exact} path={route.path} title={route.title}>
              <route.component />
            </ProtectedRoute>
          ) : (
            <Route key={ind} exact={route.exact} path={route.path}>
              <route.component />
            </Route>
          );
        })} 
        <Redirect from="*" to="/" />
      </Switch>
      </BaseLayout>
  );
};

export default AppView;
