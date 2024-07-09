import React from 'react';
import { Route, RouteProps } from 'react-router';
import auth from 'src/services/auth';
import { useTokenState, useUserDetailsFetch } from './hooks';

export type ProtectedRouteProps = { title: string } & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ title, children, ...rest }: ProtectedRouteProps) => {
  const token = useTokenState();
   const [{ data, loading, error }] = useUserDetailsFetch(token);

  React.useEffect(() => {
    if (error) {
      auth.logout();
    }
  }, [error]);

  const dataLoaded = !loading && data !== null;
  return (
    <Route
      {...rest}
      render={() => {
        document.title = title ? title : 'QL2';
        return token  && dataLoaded ? children : null;
      }}
    />
  );
};

export default ProtectedRoute;
