import styles from "./styles.module.scss";

export default function Section1() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.block}>
          <h1>Descubra a Chama Perfeita</h1>
          <h4>
            No Calor de lar, oferecemos uma seleção exclusiva de chaminés de
            alta qualidade que combinam eficiência, durabilidade e estilo.
          </h4>
          <button>Saber Mais</button>
        </div>
        <div className={styles.image}>
          <img src="/images/clc/foto1.png" alt="Chaminé" />
        </div>
      </div>
    </div>
  );
}
