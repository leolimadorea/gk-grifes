import React from "react";
import styles from "./styles.module.scss";

const MovingBars = () => {
  // Array com os itens das barras
  const barItems = [
    { img: "/images/diesel.png", text: "" },
    { img: "/images/armani.png", text: "" },
    { img: "/images/balenciaga.png", text: "" },
    { img: "/images/boss.png", text: "" },
    { img: "/images/gucci.png", text: "" },
    { img: "/images/diesel.png", text: "" },
    { img: "/images/armani.png", text: "" },
    { img: "/images/balenciaga.png", text: "" },
    { img: "/images/boss.png", text: "" },
    { img: "/images/gucci.png", text: "" },
    { img: "/images/diesel.png", text: "" },
    { img: "/images/armani.png", text: "" },
    { img: "/images/balenciaga.png", text: "" },
    { img: "/images/boss.png", text: "" },
    { img: "/images/gucci.png", text: "" },
    { img: "/images/diesel.png", text: "" },
    { img: "/images/armani.png", text: "" },
    { img: "/images/balenciaga.png", text: "" },
    { img: "/images/boss.png", text: "" },
    { img: "/images/gucci.png", text: "" },
  ];

  return (
    <>
      <div className={styles.movingBars}>
        {/* Barra Superior */}
        <div className={styles.topBar}>
          <div className={styles.topBarContent}>
            {barItems.map((item, index) => (
              <React.Fragment key={index}>
                <img src={item.img} alt="Ícone" />
                {item.text && <span>{item.text}</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Barra Inferior */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomBarContent}>
            {barItems.map((item, index) => (
              <React.Fragment key={`bottom-${index}`}>
                <img src={item.img} alt="Ícone" />
                {item.text && <span>{item.text}</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovingBars;
