import styles from "./styles.module.scss";

export default function Section3() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.row}>
          <img src="/images/clc/foto4.png" alt="" />
          <div className={styles.text}>
            <h2>Qualidade que Aquece</h2>
            <h5>
              Cada chaminé em nosso catálogo é escolhida com rigor para
              assegurar não só beleza, mas também a máxima eficiência energética
              e facilidade de uso. De designs clássicos a modernos, nossos
              produtos são construídos para serem o ponto central acolhedor de
              qualquer lar.
            </h5>
          </div>
        </div>
        <div className={styles.row2}>
          <div className={styles.text}>
            <h2>Instalação e Manutenção Sem Esforço</h2>
            <h5>
              Oferecemos serviços completos de instalação e suporte, garantindo
              que sua nova chaminé seja montada com precisão e segurança. Nossa
              equipe de especialistas está sempre pronta para ajudá-lo a manter
              seu sistema funcionando perfeitamente.
            </h5>
          </div>
          <img src="/images/clc/foto5.png" alt="" />
        </div>
      </div>
    </div>
  );
}
