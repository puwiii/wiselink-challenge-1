import styles from "../../styles/newwallet.module.css"

const FormWallet = ({ nombre, handleNombreChange, handleSubmit, error, modoEditar }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className={styles.nombre} htmlFor="nombre">Nombre:</label>
        <input className={styles.input}
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={handleNombreChange}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <button  className={styles.button}type="submit">{modoEditar ? "Guardar" : "Agregar"}</button>
    </form>
  );
};

export default FormWallet