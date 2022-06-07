import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RouterCustom from './Route';

import AppointmentForm from '../pages/AppointmentForm';
import AdminLogin from '../pages/AdminLogin';
import AnalystCreate from '../pages/AnalystCreate';
import Analysts from '../pages/Analysts';
import Appointments from '../pages/Appointments';

import PrivateRoute from './PrivateRoute';

function Routes() {
  return (
    <Switch>
      <Route exact path="/agendamento" component={AppointmentForm} />
      <RouterCustom path="/admin/login" component={AdminLogin} />
      <PrivateRoute path="/agendamentos" component={Appointments} />
      <PrivateRoute exact path="/" component={Appointments} />
      <PrivateRoute exact path="/analistas" component={Analysts} />
      <PrivateRoute
        exact
        path="/analistas/cadastro"
        component={AnalystCreate}
      />
    </Switch>
  );
}

export default Routes;
