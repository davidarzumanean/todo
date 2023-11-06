import styles from './Footer.module.scss';
import {CheckIcon} from "../../../assets";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`main-container ${styles.content}`}>
        <div className={styles.copy}>Todo © {year}</div>
      </div>
    </footer>
  );
}