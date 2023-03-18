import styles from "../../styles/transacciones.module.css"
  import React from "react";

  function SelectOption({ data, tipo, activos, handleOptionChange, selectedOption }) {
    return (
      <div className={styles.selectOption}>
        <label htmlFor="options">Seleccionar opción:</label>
        <select id="options" onChange={handleOptionChange} value={selectedOption?.name || ""}>
          <option value="">-- Seleccione una opción --</option>
          {data.map((option) => {
            if (tipo === "venta") {
              if (activos.some((activo) => activo.id === option.id)) {
                return (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                );
              } else {
                return null;
              }
            } else {
              return (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              );
            }
          })}
        </select>
      </div>
    );
  }
  
  export default SelectOption;



