import styles from "./styles.module.scss";

const WhatsAppButton = () => {
  return (
    <div className={styles.whatsappButton}>
      <a
        href="https://wa.me/41999274760"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-lg"
      >
        <img src="/images/clc/image.png" alt="WhatsApp" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
