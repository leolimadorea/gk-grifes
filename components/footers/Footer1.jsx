"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import emailjs from "@emailjs/browser";
import { aboutLinks, footerLinks, paymentImages } from "@/data/footerLinks";

export default function Footer() {
  const paymentMethods = [
    { id: 1, src: "/images/visa.png", alt: "Visa" },
    { id: 2, src: "/images/mastercard.png", alt: "Mastercard" },
    { id: 3, src: "/images/american.png", alt: "American" },
    { id: 4, src: "/images/dinersclub.png", alt: "Diners club" },
    { id: 5, src: "/images/aura.png", alt: "Aura" },
    { id: 6, src: "/images/elo.png", alt: "Elo" },
    { id: 7, src: "/images/hipercard.png", alt: "Hipercard" },
    { id: 8, src: "/images/discover.png", alt: "Discover" },
    { id: 9, src: "/images/boleto.png", alt: "Boleto" },
    { id: 10, src: "/images/pix.png", alt: "Pix" },
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Colunas do footer */}
        <div style={styles.column}>
          <h4 style={styles.title}>institucional</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>Sobre Nós</li>
            <li style={styles.listItem}>Comunidade</li>
          </ul>
          <div style={styles.socials}>
            <a href="#" style={styles.socialIcon}>
              <img src="/images/instagram.png" alt="Instagram" style={styles.icon} />
            </a>
            <a href="#" style={styles.socialIcon}>
              <img src="/images/facebook.png" alt="Facebook" style={styles.icon} />
            </a>
            <a href="#" style={styles.socialIcon}>
              <img src="/images/tiktok.png" alt="TikTok" style={styles.icon} />
            </a>
          </div>
        </div>

        <div style={styles.column}>
          <h4 style={styles.title}>suporte</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>Contato</li>
            <li style={styles.listItem}>Guia de Medidas</li>
            <li style={styles.listItem}>Dúvidas Frequentes</li>
            <li style={styles.listItem}>Política de Privacidade</li>
            <li style={styles.listItem}>Termos e Condições de Uso</li>
            <li style={styles.listItem}>Política de Trocas e Devoluções</li>
          </ul>
        </div>

        <div style={styles.column}>
          <h4 style={styles.title}>entre em contato</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>123456789123</li>
            <li style={styles.listItem}>(00) 00000-0000</li>
            <li style={styles.listItem}>gkgrifes@gmail.com</li>
          </ul>
        </div>

        <div style={styles.column}>
          <h4 style={styles.title}>fale conosco</h4>
          <div style={styles.contactForm}>
            <input type="email" placeholder="E-mail" style={styles.input} />
            <button style={styles.button}>
              <img src="/images/Vector.svg" alt="Enviar" style={styles.buttonIcon} />
            </button>
          </div>
        </div>
      </div>

      {/* Seção de meios de pagamento e logo */}
      <div style={styles.bottomSection}>
        <div style={styles.paymentHeader}>
          <span style={styles.paymentTitle}>Meios de pagamento</span>
          <div style={styles.paymentImages}>
            {paymentMethods.map((method) => (
              <img
                key={method.id}
                src={method.src}
                alt={method.alt}
                style={styles.paymentImage}
              />
            ))}
          </div>
        </div>
        <img 
          src="/images/gkgrifes.png" 
          alt="GK Grifes" 
          style={styles.logo}
        />
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
    marginBottom: "30px"
  },
  column: {
    flex: "1",
    minWidth: "200px",
    margin: "10px",
  },
  title: {
    color: "#ffc107",
    fontSize: "12px",
    fontWeight: "500",
    marginBottom: "10px",
    textTransform: "uppercase"
  },
  list: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  },
  socials: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  socialIcon: {
    display: "inline-block",
  },
  icon: {
    width: "20px",
    height: "20px",
  },
  contactForm: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  input: {
    flex: "1",
    padding: "8px",
    fontSize: "11px",
    borderRadius: "5px 0 0 5px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "8px",
    backgroundColor: "#ffc107",
    border: "none",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
  },
  buttonIcon: {
    width: "15px",
    height: "15px",
  },
  bottomSection: {
    borderTop: "1px solid #333",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flex: "1",
  },
  paymentTitle: {
    fontSize: "12px",
    color: "#fff",
    whiteSpace: "nowrap",
  },
  paymentImages: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  paymentImage: {
    height: "25px",
    width: "auto",
    objectFit: "contain",
  },
  logo: {
    height: "80px",
    width: "auto",
    marginLeft: "20px",
  },
};
