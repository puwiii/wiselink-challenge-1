
import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../context/walletProvider";
import { useRouter } from "next/router";
import ActivosSection from "../../components/idComponents/activosSection";
import ButtonSection from "../../components/idComponents/buttonSection";
import Layout from "../../components/layout/layout";
import styles from "../../styles/id.module.css"
import Error404 from "@/components/404";

const IdPage = () => {
  const { carteras, eliminarCartera } = useContext(WalletContext);

  const [total, setTotal] = useState();
  const [cartera, setCartera] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const id = parseInt(router.query.id);

    if (id) {
      (id);
      const filteredCartera = carteras.find((item) => item.id === id);

      setCartera(filteredCartera);
    }
  }, [router.query.id, carteras]);

  useEffect(() => {
    if (cartera) {
      calcularTotal();
    }
  }, [cartera]);

  const handleEditar = () => {
    router.push(`/newWallet?id=${router.query.id}&editar=true`);
  };

  const calcularTotal = () => {
    const activosConTotal = cartera.activos.map((act) => {
      const total = act.precio * act.cantidad;
      return {
        ...act,
        total,
      };
    });

    const totalCartera = activosConTotal.reduce((sum, act) => {
      return sum + act.precio * act.cantidad;
    }, 0);

    setTotal(totalCartera);
  };

  const handleClickEliminar = () => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que quieres eliminar la cartera "${cartera.nombre}"?`
    );
    if (confirmacion) {
      eliminarCartera(cartera.id);
    }
  };

  if (!cartera) {
    return <Error404></Error404>;
  }

  return (
    <Layout>
      <div className="fondo">
        <div className={styles.header}>
          <h3 className={styles.nombre}>{cartera.nombre}</h3>
          <ButtonSection handleClickEliminar={handleClickEliminar} handleEditar={handleEditar} id={cartera.id}/>
        </div>
        {cartera.activos.length === 0 ? (
          <p>Aun no tienes monedas agregadas</p>
        ) : (
          <ActivosSection activos={cartera.activos} total={total} />
        )}

      </div>
    </Layout>
  );
};

export default IdPage;