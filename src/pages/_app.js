import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import { theme } from '../styles/mui-theme'
import Layout from '../components/layout/Layout'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { AuthProvider } from '../store/context/auth';
import { ModalProvider } from '../store/context/modal'
import { api } from '../store/api/index'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
      <ApiProvider api={api}>
        <AuthProvider>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT}>
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
          </GoogleOAuthProvider>
        </AuthProvider>
      </ApiProvider>
  )
}

export default MyApp
