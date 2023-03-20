import styles from "../../styles/transacciones.module.css"

function InputCantidad({ cantidad, setCantidad }) {
    return (
      <div >
        <input
        className={styles.inputCantidad}
          placeholder="Ingrese Cantidad"
          type="float"
          id="myInput"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </div>
    );
  }
  
  export default InputCantidad;