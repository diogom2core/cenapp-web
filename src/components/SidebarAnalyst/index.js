import React from 'react';
import { MdCalendarToday } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

import { Container, ModuleItens } from './styles';

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Container>
      <ModuleItens>
        <ul>
          <ModuleItens.Item active={pathname === '/analista/solicitacoes'}>
            <Link to="/analista/solicitacoes">
              <MdCalendarToday size={22} color="#111" />
              <span>Solicitações</span>
            </Link>
          </ModuleItens.Item>
        </ul>
      </ModuleItens>
    </Container>
  );
}

export default Sidebar;
