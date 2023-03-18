import Image from "next/image"
import Link from "next/link"
import styles from "../styles/index.module.css"

const NewWalletLink = () => {
  return (
    <Link className={styles.agregarCartera} href="/newWallet">
      <Image src="/img/circle-plus.svg" width="100" height="100"/>
    </Link>
  )
}

export default NewWalletLink
