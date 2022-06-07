import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes';

import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
