import Image from "next/image"
import styles from "../../styles/transacciones.module.css"

const FormData = ({selectedOption, cantidad, fecha, setFecha, handleClick, editar}) => {
  return (
    <div>
    <p>La moneda seleccionada seleccionada es: {selectedOption.name}</p>
    <p>Su valor es: {selectedOption.current_price}</p>

    <Image
      src={selectedOption.image}
      width={30}
      height={30}
      alt="Imagen de la moneda"
    />
    <p>
      El precio total es: ${selectedOption.current_price * cantidad}{" "}
    </p>
    <div>
      <label>
        Ingresa una fecha:
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </label>
      <p>Fecha: {fecha}</p>
    </div>
    <button type="button" onClick={handleClick}>
      {editar ? "EDITAR" : "AGREGAR"}
    </button>
  </div>
  )
}

export default FormData