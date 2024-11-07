import styles from "./styles.module.scss";

export default function Section5() {
  return (
    <>
      <div className={styles.curve}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1440"
          height="80"
          viewBox="0 0 1440 80"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 63.4263C237.837 21.1421 477.006 0 717.505 0C958.004 0 1198.84 21.1421 1440 63.4263V79.4907H0V63.4263Z"
            fill="#FDFFF0"
          />
        </svg>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2>Descubra sua melhor versão</h2>
            <p>Fórmulas para uma rotina de autocuidado leve e eficiente</p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.leftside}>
              <img src="/videos/beach.webp" alt="beach" />
            </div>
            <div className={styles.rightside}>
              <img src="/videos/malu.webp" alt="malu" />
              <h3>Linha essencial</h3>
              <p>O kit ideal para uma pele bem cuidada</p>
              <button>COMPRAR AGORA</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.curve2}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1440"
          height="80"
          viewBox="0 0 1440 80"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 63.4263C237.837 21.1421 477.006 0 717.505 0C958.004 0 1198.84 21.1421 1440 63.4263V79.4907H0V63.4263Z"
            fill="white"
          />
        </svg>
      </div>
    </>
  );
}
