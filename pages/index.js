
import Cartera from '../components/cartera'

import { useContext } from "react";
import {WalletContext} from "./context/walletProvider";

import NewWalletLink from '../components/newWalletLink';
import Layout from '../components/layout/layout';

import styles from "../styles/index.module.css"



export default function Home() {

  const {carteras} = useContext(WalletContext);

 

  return (
    <Layout>
      <div className="fondo">
      <div className={styles.layoutContainer}>
        {carteras.map(cartera => (
          <Cartera key={cartera.id} cartera={cartera}/>
        ))}

        <NewWalletLink/>
      </div>

      </div>

      
    </Layout>
  )
}
