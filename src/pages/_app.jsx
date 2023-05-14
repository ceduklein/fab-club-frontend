import 'bootswatch/dist/zephyr/bootstrap.min.css';
import '@/styles/globals.css'

import "primereact/resources/themes/soho-light/theme.css";
import "primereact/resources/primereact.min.css";                                       

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} theme='colored' />
    </AuthProvider>
  )
}
