import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RouterCustom from './Route';

import AppointmentForm from '../pages/AppointmentForm';
import AdminLogin from '../pages/AdminLogin';
import AnalystCreate from '../pages/AnalystCreate';
import Analysts from '../pages/Analysts';
import Appointments from '../pages/Appointments';
import AppointmentsRead from '../pages/AppointmentsRead';
import AnalystLogin from '../pages/AnalystLogin';

import PrivateRoute from './PrivateRoute';
import AnalystPrivateRoute from './AnalystPrivateRoute';

function Routes() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route exact path="/agendamento" component={AppointmentForm} />
      <Route exact path="/analista/login" component={AnalystLogin} />

      <RouterCustom path="/admin/login" component={AdminLogin} />
      {/* Private Routes Admin */}
      <PrivateRoute path="/agendamentos" component={Appointments} />
      <PrivateRoute exact path="/" component={Appointments} />
      <PrivateRoute exact path="/analistas" component={Analysts} />
      <PrivateRoute
        exact
        path="/analistas/cadastro"
        component={AnalystCreate}
      />
      <PrivateRoute
        exact
        path="/solicitacoes/ver/:appointment_id"
        component={AppointmentsRead}
      />

      {/* Private Routes Analyst */}
      <AnalystPrivateRoute path="/analista" component={Appointments} />
    </Switch>
  );
}

export default Routes;
