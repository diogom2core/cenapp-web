import React from 'react';
import { MdCalendarToday, MdPeople } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

import { Container, ModuleItens } from './styles';

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Container>
      <ModuleItens>
        <ul>
          <ModuleItens.Item
            active={pathname === '/' || pathname === '/agendamentos'}
          >
            <Link to="/agendamentos">
              <MdCalendarToday size={22} color="#111" />
              <span>Solicitações</span>
            </Link>
          </ModuleItens.Item>

          <ModuleItens.Item active={pathname === '/analistas'}>
            <Link to="/analistas">
              <MdPeople size={22} color="#111" />
              <span>Analistas</span>
            </Link>
          </ModuleItens.Item>
        </ul>
      </ModuleItens>
    </Container>
  );
}

export default Sidebar;
