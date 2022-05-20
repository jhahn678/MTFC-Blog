import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import { theme } from '../styles/mui-theme'
import Layout from '../components/layout/Layout'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { AuthProvider } from '../store/context/auth';
import { api } from '../store/api/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
      <ApiProvider api={api}>
        <AuthProvider>
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
        </AuthProvider>
      </ApiProvider>
  )
}

export default MyApp
