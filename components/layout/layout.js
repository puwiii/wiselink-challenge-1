import Head from "next/head"
import Header from "./header"
import styles from '../../styles/layout.module.css'

const Layout = ({children, title = '', description = ''}) => {
  return (
    <> 
        <Head>
            <title>{`CyptoWallet - ${title}`}</title>
            <meta name='description' content={description} />
        </Head>

        <Header />
        {children}

    </>
  )
}

export default Layout