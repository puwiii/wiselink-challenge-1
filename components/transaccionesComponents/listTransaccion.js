import Image from "next/image";
import styles from "../../styles/transacciones.module.css"

const ListTransaccion = ({cartera, handleEditar, handleEliminar}) => {
  
  return (
    <div>
      <ul className={styles.lista}>
        {cartera.transacciones.reverse().map((transaccion) => (
          <li key={transaccion.idT}>
            <div className={styles.transaccionContainer}>
              <Image
                src={transaccion.image}
                height={60}
                width={70}
                alt={transaccion.name}
              />
                <h3>{transaccion.name}</h3>
                <p>{transaccion.fecha}</p>
                <p>{transaccion.cantidad}</p>
                <p>{transaccion.precio}</p>
                <p>{transaccion.tipo}</p>
                <button className={styles.eliminarB} onClick={() => handleEliminar(transaccion.idT)}>
                  <Image src="/img/trash-x-filled.svg" alt="eliminar" width={50} height={40}/>
                </button>
                <button className={styles.editarB} onClick={() => handleEditar(transaccion)}>
                  <Image src="/img/pencil.svg" alt="editar" width={50} height={40}/>
                </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTransaccion;
