import styles from "../../styles/newwallet.module.css";

const FormWallet = ({
  nombre,
  handleNombreChange,
  handleBlurName,
  handleSubmit,
  error,
  modoEditar,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className={styles.nombre} htmlFor="nombre">
          Nombre:
        </label>
        <input
          className={styles.input}
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={handleNombreChange}
          onBlur={handleBlurName}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.buttonContainer}>
        <button className={styles.button} type="submit">
          {modoEditar ? "Guardar" : "Agregar"}
        </button>
      </div>
    </form>
  );
};

export default FormWallet;
