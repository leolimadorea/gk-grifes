import styles from "./styles.module.scss";

export default function Section2() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <img src="/images/clc/foto2.png" alt="" />
          <div className={styles.text}>
            <h4>Produtos internos</h4>
            <img src="/images/clc/seta.svg" alt="" />
          </div>
        </div>
        <div className={styles.image}>
          <img src="/images/clc/foto3.png" alt="" />
          <div className={styles.text}>
            <h4>Produtos externos</h4>
            <img src="/images/clc/seta.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
