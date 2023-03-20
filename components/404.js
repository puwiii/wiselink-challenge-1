import React from 'react'
import Layout from './layout/layout'
import styles from "../styles/error.module.css"
import Image from 'next/image'

const Error404 = () => {
  return (
    <Layout>
    <div className={`fondo ${styles.error}`}>
        <Image src="/img/404Error.svg" width="400" height="400"></Image>
        <p className={styles.errorName}>Pagina no encontrada Lo sentimos :c</p>
    </div>
    </Layout>
  )
}

export default Error404