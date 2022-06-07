import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppointmentForm from '../pages/AppointmentForm';
import AdminLogin from '../pages/AdminLogin';
import AnalystCreate from '../pages/AnalystCreate';
import AnalystList from '../pages/AnalystList';

import PrivateRoute from './PrivateRoute';

function Routes() {
  return (
    <Switch>
      <Route path="/agendamento" component={AppointmentForm} />
      <Route path="/admin/login" component={AdminLogin} />
      <PrivateRoute path="/analyst/create" component={AnalystCreate} />
      <PrivateRoute path="/analyst/list" component={AnalystList} />
    </Switch>
  );
}

export default Routes;
