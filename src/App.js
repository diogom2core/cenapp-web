import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

import { AuthProvider } from './hooks/AuthContext';
import GlobalStyles from './styles/global';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>

      <GlobalStyles />
    </>
  );
}

export default App;
