import React from "react";
import styles from "./Slider.module.css";

export default function Slider() {
  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <div className={styles.slideTrack}>
          {/* Repetir os slides conforme necessário */}
          {[...Array(2)].map((_, index) => (
            <React.Fragment key={index}>
              <div className={styles.slide}>
                <img
                  src="/images/logo/icon.png"
                  alt=""
                  className={styles.img}
                />
              </div>
              <div className={styles.slide}>
                <img
                  src="/images/logo/icon.png"
                  alt=""
                  className={styles.img}
                />
              </div>
              <div className={styles.slide}>
                <img
                  src="/images/logo/icon.png"
                  alt=""
                  className={styles.img}
                />
              </div>
              <div className={styles.slide}>
                <img
                  src="/images/logo/icon.png"
                  alt=""
                  className={styles.img}
                />
              </div>
              <div className={styles.slide}>
                <img
                  src="/images/logo/icon.png"
                  alt=""
                  className={styles.img}
                />
              </div>
              <div className={styles.slide}>
                <img
                  src="/images/logo/icon.png"
                  alt=""
                  className={styles.img}
                />
              </div>
              <div className={styles.slide}>
                <img
                  src="/images/logo/icon.png"
                  alt=""
                  className={styles.img}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
