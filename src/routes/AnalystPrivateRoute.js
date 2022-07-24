/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../hooks/AnalystAuthContext';

function AnalystPrivateRoute({ isPublic, component: Component, ...rest }) {
  const { user } = useAuth();
  console.log('Analista', user);
  return (
    <Route
      {...rest}
      render={props =>
        (user ? (
          <>
            <Header />

            <Main>
              <Sidebar />
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
