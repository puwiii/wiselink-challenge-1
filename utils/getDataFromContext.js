import { useContext } from "react";
import { WalletContext } from "../pages/context/walletProvider";

export const getDataFromContext = () => {
  const {carteras} = useContext(WalletContext);
  console.log(carteras)
  const paths = carteras.map((cartera) => ({
    params: { id: cartera.id.toString() },
  }));

  return { paths, carteras };
};

