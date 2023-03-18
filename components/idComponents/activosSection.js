import Image from "next/image";
import styles from "../../styles/id.module.css"

const ActivosSection = ({ activos, total }) => {
    return (
      <>
        <p className={styles.valorToal}>Valor total: ${total}</p>
        <div >
          {activos.map((act) => (
            <div className={styles.activoContainer} key={act.id}>
              <Image
              className={styles.imagen}
                src={act.image}
                width={60}
                height={60}
                alt="Imagen de la moneda"
              />
              <p className={styles.activoNombre}>{act.nombre}</p>
              <p className={styles.activoCantidad}>{act.cantidad}</p>
              <p className={styles.activoPrecio}>${act.precio}</p>
              <p className={styles.activoVT}>${act.precio * act.cantidad}</p>
            </div>
          ))}

        </div>
      </>
    );
  };

  export default ActivosSection