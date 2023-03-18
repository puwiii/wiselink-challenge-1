
import '../styles/globals.css'

import '../styles/globals.css';
import { WalletProvider } from "../context/walletProvider";


function App({ Component, pageProps }) {


  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
};

export default App