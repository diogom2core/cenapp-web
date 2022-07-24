import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes';

import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider as AnalystAuthProvider } from './hooks/AnalystAuthContext';
import { AuthProvider } from './hooks/AuthContext';
import GlobalStyles from './styles/global';

function App() {
  return (
    <>
      <AuthProvider>
        <AnalystAuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AnalystAuthProvider>
      </AuthProvider>

      <GlobalStyles />
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
