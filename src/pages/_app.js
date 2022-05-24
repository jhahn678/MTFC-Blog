import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import { theme } from '../styles/mui-theme'
import Layout from '../components/layout/Layout'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { AuthProvider } from '../store/context/auth';
import { ModalProvider } from '../store/context/modal'
import { api } from '../store/api/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
      <ApiProvider api={api}>
        <AuthProvider>
          <ModalProvider>
            <ThemeProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
                <ToastContainer
                  hideProgressBar={true}
                  position='top-right'
                  closeOnClick={true}
                />
              </Layout>
            </ThemeProvider>
          </ModalProvider>
        </AuthProvider>
      </ApiProvider>
  )
}

export default MyApp
