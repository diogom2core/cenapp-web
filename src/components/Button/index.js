import React from 'react';

import { Container } from './styles';

function Button({ children, loading, disable, width, height, color }) {
  return (
    <Container
      disable={disable}
      loading={loading}
      width={width}
      height={height || 50}
      color={color || '#fe7259'}
    >
      {children}
    </Container>
  );
}

export default Button;
