import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import routes from 'src/routes';
import { useHistory } from 'react-router';
import React from 'react';

import styles from './Dashboard.module.less';

const Dashboard: React.FC = () => {
  const { user } = useAppStateContext();
  const history = useHistory();

  React.useEffect(() => {
    if (user && user.appPermissions && history) {
      let redirectUrl = '';
	  if (user.appPermissions['enable_qmatch']) {
        redirectUrl = routes.qmatchDashboard;
      }
      else if (user.appPermissions['enable_qsearch']) {
        redirectUrl = routes.qSearchDashboard;
      }
      else if (user.appPermissions['interactive_reports']) {
        redirectUrl = routes.Interactive;
      }
	  else if (user.appPermissions['enable_assortment']) {
        redirectUrl = routes.assortment;
      }
      else if (user.appPermissions['enable_opsconsole']) {
        redirectUrl = routes.optCenter;
      }
      if (redirectUrl) {
        history.replace(redirectUrl);
      }
    }
  }, [user, history]);

  

  return (
    <div >
   
     <p className={styles.no_menus}>No parameter enabled, please enable the same from accounts properties page.</p>;
    </div>
  );
};

export default Dashboard;
