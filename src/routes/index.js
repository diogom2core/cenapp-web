import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RouterCustom from './Route';
import AnalystPrivateRoute from './AnalystPrivateRoute';
import PrivateRoute from './PrivateRoute';

import AppointmentForm from '../pages/AppointmentForm';
import AdminLogin from '../pages/AdminLogin';
import AnalystCreate from '../pages/AnalystCreate';
import Appointments from '../pages/Appointments';
import AppointmentsRead from '../pages/AppointmentsRead';
import Analysts from '../pages/Analysts';

import AnalystLogin from '../pages/AnalystLogin';
import AnalystAppointmentsShow from '../pages/AnalystAppointmentsShow';
import AnalystAppointmentsList from '../pages/AnalystAppointmentsList';
import AnalystPasswordForgot from '../pages/AnalystPasswordForgot';
import AdminAnalystUpdate from '../pages/AdminAnalystUpdate';

function Routes() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route exact path="/agendamento" component={AppointmentForm} />
      <RouterCustom path="/admin/login" component={AdminLogin} />
      <Route exact path="/analista/login" component={AnalystLogin} />
      <Route
        exact
        path="/analista/recuperacao-senha"
        component={AnalystPasswordForgot}
      />
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
      <PrivateRoute
        exact
        path="/admin/analistas/editar/:analyst_id"
        component={AdminAnalystUpdate}
      />

      {/* Private Routes Analyst */}
      <AnalystPrivateRoute
        exact
        path="/analista/solicitacoes"
        component={AnalystAppointmentsList}
      />
      <AnalystPrivateRoute
        exact
        path="/analista/solicitacao/:appointment_id"
        component={AnalystAppointmentsShow}
      />
    </Switch>
  );
}

export default Routes;
