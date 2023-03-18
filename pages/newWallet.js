import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import FormWallet from "../components/newWalletComponents/formWallet";

import { WalletContext } from "./context/walletProvider";
import styles from "../styles/newwallet.module.css"

const Newwallet = () => {
  const { carteras, agregarCartera, editarNombreCartera } = useContext(WalletContext);

  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [modoEditar, setModoEditar] = useState(false);

  const router = useRouter();
  const { id, editar } = router.query;


  useEffect(() => {
    if (editar === "true") {
      const cartera = carteras.find((cartera) => cartera.id === Number(id));
      if (cartera) {
        setNombre(cartera.nombre);
        setModoEditar(true);
      }
    }
  }, [editar, id, carteras]);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      setError("El nombre no puede estar vacío");
      return;
    }
    if (/[\W_]+/.test(nombre)) {
      setError("El nombre no puede contener caracteres especiales");
      return;
    }
    const nuevaCartera = {
      id: modoEditar ? id : Date.now(),
      nombre,
      activos: [],
      transacciones: [],
    };

    if (modoEditar) {
      editarNombreCartera(Number(id), nombre);
    } else {
      agregarCartera(nuevaCartera);
      console.log(nuevaCartera);
      setNombre("");
      setError("");
    }
    router.push("/");
  };

  return (
    <Layout>
      <div className={styles.contenedor}>
        <div>
          <p className={styles.nueva}>{modoEditar ? "Editar" : "Nueva"} Cartera</p>
          <FormWallet handleSubmit={handleSubmit}  handleNombreChange={handleNombreChange} nombre={nombre} modoEditar={modoEditar} error={error}/> 
        </div>
      </div>
    </Layout>
  );
};

export default Newwallet;
