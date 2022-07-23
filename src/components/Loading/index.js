import React from 'react';
import loading from '../../assets/loading-2.svg';
import { Container } from './styles';

function Loading() {
  return (
    <Container>
      <img src={loading} alt="" />
    </Container>
  );
}

export default Loading;
