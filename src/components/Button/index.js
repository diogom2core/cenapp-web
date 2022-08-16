import React from 'react';

import { Container } from './styles';
import loadingImage from '../../assets/loading.svg';

function Button({
  children,
  loading,
  disable,
  width,
  height,
  color,
  type,
  className,
  onClick,
}) {
  return (
    <Container
      onClick={onClick}
      className={className}
      type={type}
      disable={disable}
      loading={loading}
      width={width}
      height={height || 50}
      color={color || '#fe7259'}
    >
      {!loading && children}

      {loading && <img src={loadingImage} alt="" />}
    </Container>
  );
}

export default Button;
