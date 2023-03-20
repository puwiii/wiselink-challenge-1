import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/index.module.css"

const Cartera = ({ cartera }) => {
  const { id, nombre, activos } = cartera;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculoTotal = activos.reduce(
      (total, activo) => total + activo.cantidad * activo.precio,
      0
    );

    setTotal(calculoTotal);
  }, [activos]);

  const activosOrdenados = activos.sort((a, b) =>
    a.precio * a.cantidad < b.precio * b.cantidad ? 1 : -1
  );
  const activosFiltrados = activosOrdenados.slice(0, 2);


  return (
    <Link className={styles.link} href={`/carteras/[id]`} as={`/carteras/${id}`}>
        <div className={styles.container}>
          <div className={styles.dataContainer}>
              <p className={styles.total}>${total.toFixed(2)}</p>
              <h2 className={styles.nombre}>{nombre}</h2>
          </div>

      <div className={styles.coinContainer}>
        <h3 className={styles.titleCoinainer}>Top Coins</h3>
      {activosFiltrados.map((activo) => (
          <div className={styles.onlyCoinContainer}>
            <Image className={styles.image} src={activo.image} width={30} height={30} />
            <span className={styles.symbol}>{activo.symbol}</span>
            <span className={styles.precio}>{activo.cantidad}</span>
          </div>
      ))}
        </div>
    </div>
      </Link>
  );
};

export default Cartera;
