/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

function RouterWrapper({ isPublic, component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        (!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        ))}
    />
  );
}

export default RouterWrapper;
