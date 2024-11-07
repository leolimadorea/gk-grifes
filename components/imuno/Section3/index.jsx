import styles from "./styles.module.scss";

export default function Section3() {
  return (
    <div className={styles.imageSection}>
      <img src="/videos/Vector.svg" alt="" className={styles.topImage} />
      <img src="/videos/girls.svg" alt="" className={styles.bottomImage} />
    </div>
  );
}
