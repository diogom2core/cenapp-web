/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import HeaderAnalyst from '../components/HeaderAnalyst';
import Main from '../components/Main';
import SidebarAnalyst from '../components/SidebarAnalyst';
import { useAuth } from '../hooks/AnalystAuthContext';

function AnalystPrivateRoute({ isPublic, component: Component, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        (user ? (
          <>
            <HeaderAnalyst />

            <Main>
              <SidebarAnalyst />
              <Component />
            </Main>
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/analista/login',
              state: { from: props.location },
            }}
          />
        ))}
    />
  );
}

export default AnalystPrivateRoute;
