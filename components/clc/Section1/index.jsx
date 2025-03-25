import styles from "./styles.module.scss";

export default function Section1() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.block}>
          <h1>Encontre seu estilo único!</h1>
          <h4>
            Na GK GRIFES transformamos tendências em looks incríveis. Aproveite
            ofertas exclusivas e eleve seu guarda-roupa agora mesmo.
          </h4>
          <button>@GKGRIFES</button>
        </div>
        <div className={styles.image}>
          <img src="/images/banner/image.png" alt="Imagem da home" />
        </div>
      </div>
    </div>
  );
}
