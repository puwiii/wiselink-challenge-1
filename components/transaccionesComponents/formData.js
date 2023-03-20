import styles from "../../styles/transacciones.module.css"

import Image from "next/image";

const FormData = ({
  selectedOption,
  cantidad,
  fecha,
  setFecha,
  handleClick,
  editar,
}) => {
  return (
    <div className={styles.dataContainer}>
      <div className={styles.coinData}>

        <p>Moneda: {selectedOption.name}</p>
        <Image
          src={selectedOption.image}
          width={60}
          height={60}
          alt="Imagen de la moneda"
          />
      </div>
      <div className={styles.valorCoin}>
      <p >Su valor unitario es: ${selectedOption.current_price}</p>

      </div>
      <div>
        <div className={styles.dataFecha}>
        <label>
          Ingresa una fecha: {""}
          <input
          className={styles.inputFecha}
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </label>
        <p>Fecha: {fecha}</p>
        </div>
        <p className={styles.valorTotal}>El precio total es: ${selectedOption.current_price * cantidad} </p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} type="button" onClick={handleClick}>
          {editar ? "EDITAR" : "AGREGAR"}
        </button>

      </div>
    </div>
  );
};

export default FormData;
