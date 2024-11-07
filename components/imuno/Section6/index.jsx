import styles from "./styles.module.scss";

export default function Section6() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftside}>
          <img src="/videos/canCup.webp" alt="depoimentos" />
        </div>
        <div className={styles.rightside}>
          <h3>Depoimentos</h3>
          <p>
            Depois que a Influenciadora Manu Cit transformou a sua vida através
            da mudança de hábitos, ela foi inspirada a criar a Guday e ajudar
            outras pessoas a fazer mesmo, mas dessa vez de uma forma mais fácil:
            consumindo suplementos gostosos e eficazes.
          </p>
          <button>Saiba Mais</button>
        </div>
      </div>
    </div>
  );
}
