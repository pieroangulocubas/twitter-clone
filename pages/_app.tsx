import { Toaster } from 'react-hot-toast'
import { Layout, Modal } from '../components'
import { LoginModal } from '../components/modals/LoginModal'
import { RegisterModal } from '../components/modals/RegisterModal'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {

  return  <>
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout> 
    </SessionProvider>
  </>
} 
export default MyApp
