import styles from "../../styles/transacciones.module.css"


function SelectTipo({ tipo, handleTipoChange }) {
  console.log(tipo)
  return (
    <>
      <select className={styles.selectTipo} id="tipo" value={tipo} onChange={handleTipoChange}>
        <option disabled value="">Seleccione un tipo </option>
        <option value="compra">Compra</option>
        <option value="venta">Venta</option>
      </select>
    </>
  );
}

export default SelectTipo;