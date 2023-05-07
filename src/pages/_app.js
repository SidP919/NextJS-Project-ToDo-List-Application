import ContextProvider from '@/context/ContextProvider';
import '@/styles/globals.css'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

export default function App({ Component, pageProps }) {
  return <ContextProvider><CssVarsProvider><Component {...pageProps} /></CssVarsProvider></ContextProvider>
}
