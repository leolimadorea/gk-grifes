import Link from "next/link";
import styles from "./styles.module.scss";

export default function Section2() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.yellowStrip}>
          <div className={styles.stripContent}>
            <div className={styles.item}>
              <img src="/images/truck.svg" alt="Ícone de entrega" className={styles.icon} />
              <h2>ENVIO PARA TODO O BRASIL</h2>
              <h5>Entrega rápida e com total segurança.</h5>
            </div>
            <div className={styles.item}>
              <img src="/images/credit-card.svg" alt="Ícone de cartão" className={styles.icon} />
              <h2>PARCELE SUA COMPRA</h2>
              <h5>Compre no cartão de crédito em até 12x.</h5>
            </div>
            <div className={styles.item}>
              <img src="/images/security.svg" alt="Ícone de segurança" className={styles.icon} />
              <h2>SITE 100% SEGURO</h2>
              <h5>Proteção de seus dados para uma compra segura.</h5>
            </div>
            <div className={styles.item}>
              <img src="/images/whatsapp-line.svg" alt="Ícone do WhatsApp" className={styles.icon} />
              <h2>PRECISANDO DE AJUDA?</h2>
              <h5>Entre em contato com a nossa equipe diretamente pelo WhatsApp.</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}