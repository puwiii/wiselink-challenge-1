import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from '../../styles/layout.module.css'

const Header = () => {
  return (
    <header >
        <div className={styles.container}>
          <Link href="/">
            <Image className={styles.image} src="/img/wallet.svg" alt="wallet" width="100" height="100"/>
          </Link>
        </div>
    </header>
  );
};

export default Header;
