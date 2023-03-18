

function SelectTipo({ tipo, handleTipoChange }) {
  return (
    <>
      <label htmlFor="tipo">Tipo de transacción:</label>
      <select id="tipo" value={tipo} onChange={handleTipoChange}>
        <option value="">-- Seleccione una opción --</option>
        <option value="compra">Compra</option>
        <option value="venta">Venta</option>
      </select>
    </>
  );
}

export default SelectTipo;