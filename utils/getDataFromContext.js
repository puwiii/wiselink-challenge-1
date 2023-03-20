import { useContext } from "react";
import { WalletContext } from "../context/walletProvider";

export const getDataFromContext = () => {
  const {carteras} = useContext(WalletContext);
  (carteras)
  const paths = carteras.map((cartera) => ({
    params: { id: cartera.id.toString() },
  }));

  return { paths, carteras };
};

