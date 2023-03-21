import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import FormWallet from "../components/newWalletComponents/formWallet";

import { WalletContext } from "../context/walletProvider";
import styles from "../styles/newwallet.module.css";

const Newwallet = () => {
  const { carteras, agregarCartera, editarNombreCartera } =
    useContext(WalletContext);

  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [modoEditar, setModoEditar] = useState(false);

  const router = useRouter();
  const { id, editar } = router.query;

  useEffect(() => {
    if (id) {
      const cartera = carteras.find((cartera) => cartera.id === Number(id));
      if (cartera) {
        setNombre(cartera.nombre);
        setModoEditar(true);
      }
    }
  }, [id, carteras]);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleBlurName = (e) => {
    setNombre(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      setError("El nombre no puede estar vacío");
      return;
    }

    // Validar que el nombre no contenga caracteres especiales

    if (!/^[a-zA-Z0-9 ]+$/.test(nombre)) {
      setError("El nombre no puede contener caracteres especiales");
      return;
    }

    if (nombre.trim().length > 20) {
      setError("El nombre no puede contener más de 20 caracteres");
      return;
    }

    const nuevaCartera = {
      id: modoEditar ? id : Date.now(),
      nombre,
      activos: [],
      transacciones: [],
    };

    if (modoEditar) {
      editarNombreCartera(Number(id), nombre.trim());
    } else {
      agregarCartera(nuevaCartera);
      nuevaCartera;
      setNombre("");
      setError("");
    }
    router.push("/");
  };

  return (
    <Layout>
      <div className={styles.contenedor}>
        <div>
          <p className={styles.nueva}>
            {modoEditar ? "Editar" : "Nueva"} Cartera
          </p>
          <FormWallet
            handleSubmit={handleSubmit}
            handleNombreChange={handleNombreChange}
            handleBlurName={handleBlurName}
            nombre={nombre}
            modoEditar={modoEditar}
            error={error}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Newwallet;
