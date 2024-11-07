import styles from "./styles.module.scss";

export default function Section1() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftside}>
          <h2>IMUNO PUMP</h2>
          <p>Com mais vitaminas que nunca</p>
          <button>Saiba Mais</button>
        </div>
        <div className={styles.rightside}>
          <img src="/videos/creatina.svg" alt="Gloss Essencial" />
          <img
            src="/videos/creatina.svg"
            alt="Gloss Essencial"
            style={{ width: "300px" }}
          />
          <img src="/videos/creatina.svg" alt="Gloss Essencial" />
        </div>
      </div>
    </div>
  );
}
