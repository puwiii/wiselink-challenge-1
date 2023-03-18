import styles from "../../styles/transacciones.module.css";

function InputCantidad({ cantidad, setCantidad }) {
    return (
      <div>
        <label htmlFor="myInput">Introduzca un valor:</label>
        <input
          type="float"
          id="myInput"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </div>
    );
  }
  
  export default InputCantidad;