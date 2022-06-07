import React from 'react';
import {
  MdCallMissedOutgoing,
  MdCreditCard,
  MdDashboard,
  MdPeople,
  MdViewList,
  MdWidgets,
} from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

import { Container, ModuleItens } from './styles';

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Container>
      <ModuleItens>
        <ul>
          <ModuleItens.Item active={pathname === '/'}>
            <Link to="/analyst/list">
              <MdDashboard size={22} color="#111" />
              <span>Analistas</span>
            </Link>
          </ModuleItens.Item>

          <ModuleItens.Item active={pathname === '/usuarios'}>
            <Link to="/usuarios">
              <MdPeople size={22} color="#111" />
              <span>Usuários</span>
            </Link>
          </ModuleItens.Item>

          <ModuleItens.Item active={pathname === '/categorias'}>
            <Link to="/categorias">
              <MdViewList size={22} color="#111" />
              <span>Categorias</span>
            </Link>
          </ModuleItens.Item>

          <ModuleItens.Item active={pathname === '/administrativo'}>
            <Link to="/administrativo">
              <MdWidgets size={22} color="#111" />
              <span>Administrativo</span>
            </Link>
          </ModuleItens.Item>

          <ModuleItens.Item active={pathname === '/anucio'}>
            <Link to="/">
              <MdCallMissedOutgoing size={22} color="#111" />
              <span>Anúcios </span>
            </Link>
          </ModuleItens.Item>

          <ModuleItens.Item active={pathname === '/cartoes'}>
            <Link to="/cartoes">
              <MdCreditCard size={22} color="#111" />
              <span>QR Cartão </span>
            </Link>
          </ModuleItens.Item>
        </ul>
      </ModuleItens>
    </Container>
  );
}

export default Sidebar;
