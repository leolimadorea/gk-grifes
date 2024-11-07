"use client";

import styles from "./styles.module.scss";

export default function Hero() {
  return (
    <div className={styles.container}>
      <video src="/videos/video2.mp4" autoPlay loop muted></video>
      <div className={styles.overlay}>
        <h1>Comece o seu dia investindo em você</h1>
        <button>Saiba Mais</button>
      </div>
    </div>
  );
}
