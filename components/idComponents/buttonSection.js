import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/id.module.css"

const ButtonSection = ({ handleClickEliminar, handleEditar, id }) => {
    return (
      <div className={styles.containerB}>
        <Link href={`/carteras/${id}/transacciones`}>
          <button className={styles.transaccionB} type="button"><Image src="/img/arrows-transfer-down.svg" width={40} height={30}/></button>
        </Link>
        <button className={styles.eliminarB} onClick={handleClickEliminar}><Image src="/img/trash-x-filled.svg" width={40} height={30}/></button>
        <button className={styles.editarB} onClick={handleEditar}><Image src="/img/pencil.svg" width={40} height={30}/></button>
      </div>
    );
  };


  export default ButtonSection