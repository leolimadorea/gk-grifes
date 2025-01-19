"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import emailjs from "@emailjs/browser";
import { aboutLinks, footerLinks, paymentImages } from "@/data/footerLinks";
export default function Footer1({ bgColor = "" }) {
  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it only runs on the client

    const headings = document.querySelectorAll(".footer-heading-moblie");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      parent.classList.toggle("open");
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount

  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = (e) => {
    emailjs
      .sendForm("service_noj8796", "template_fs3xchn", formRef.current, {
        publicKey: "iG4SCmR-YtJagQ4gV",
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          handleShowMessage();
          formRef.current.reset();
        } else {
          setSuccess(false);
          handleShowMessage();
        }
      });
  };

  return (
    <footer
      id="footer"
      className={`footer md-pb-70`}
      style={{ backgroundColor: "#2D3736", color: "#FFFFFF" }}
    >
      <div className="footer-wrap">
        <div className="footer-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-6 col-12">
                <div className="footer-infor">
                  <div className="footer-logo">
                    <Link href={`/`}>
                      <Image
                        alt=""
                        src="/images/logo/clclogo.svg "
                        width="136"
                        height="21"
                      />
                    </Link>
                  </div>
                  <ul>
                    <li>
                      <p>
                        Endereço: R. José Brito, 136 - Roça Grande, Colombo - PR
                      </p>
                    </li>
                  </ul>

                  <ul className="tf-social-icon d-flex gap-10">
                    <li>
                      <a
                        href="https://www.instagram.com/chamine_clc/"
                        className="box-icon w_34 round social-instagram social-line"
                      >
                        <i className="icon fs-14 icon-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                <div className="footer-heading footer-heading-desktop">
                  <h6 style={{ color: "#FFFFFF" }}>Horário de Funcionamento</h6>
                </div>
                <div className="footer-heading footer-heading-moblie">
                  <h6 style={{ color: "#FFFFFF" }}>Horário de Funcionamento</h6>
                </div>
                <ul className="footer-menu-list tf-collapse-content">
                  {footerLinks.map((link, index) => (
                    <li key={index}>{link.text}</li>
                  ))}
                </ul>
              </div>
              <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                <div className="footer-heading footer-heading-desktop">
                  <h6 style={{ color: "#FFFFFF" }}>Fale Conosco</h6>
                </div>
                <div className="footer-heading footer-heading-moblie">
                  <h6 style={{ color: "#FFFFFF" }}>Fale Conosco</h6>
                </div>
                <ul className="footer-menu-list tf-collapse-content">
                  {aboutLinks.slice(0, 4).map((link, index) => (
                    <li key={index}>
                      <h6 style={{ color: "#FFFFFF" }}> {link.title}</h6>
                      {link.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-xl-3 col-md-6 col-12">
                <div className="footer-newsletter footer-col-block">
                  <div className="footer-heading footer-heading-desktop">
                    <h6 style={{ color: "#FFFFFF" }}>Métodos de pagamento</h6>
                  </div>
                  <div className="footer-heading footer-heading-moblie">
                    <h6 style={{ color: "#FFFFFF" }}>Métodos de pagamento</h6>
                  </div>
                  <div className="tf-payment">
                    <Image
                      src="/images/payments/metodoPag.webp"
                      alt="Método de Pagamento"
                      width={150}
                      height={50}
                      layout="fixed"
                      objectFit="contain"
                    />
                  </div>
                  {/* <div className="tf-collapse-content">
                    <div className="footer-menu_item">
                      Sign up to get first dibs on new arrivals, sales,
                      exclusive content, events and more!
                    </div>
                    <div
                      className={`tfSubscribeMsg ${
                        showMessage ? "active" : ""
                      }`}
                    >
                      {success ? (
                        <p style={{ color: "rgb(52, 168, 83)" }}>
                          You have successfully subscribed.
                        </p>
                      ) : (
                        <p style={{ color: "red" }}>Something went wrong</p>
                      )}
                    </div>
                    <form
                      ref={formRef}
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMail();
                      }}
                      className="form-newsletter subscribe-form"
                      action="#"
                      method="post"
                      acceptCharset="utf-8"
                      data-mailchimp="true"
                    >
                      <div className="subscribe-content">
                        <fieldset className="email">
                          <input
                            required
                            type="email"
                            name="email-form"
                            className="subscribe-email"
                            placeholder="Enter your email...."
                            tabIndex={0}
                            aria-required="true"
                            autoComplete="abc@xyz.com"
                          />
                        </fieldset>
                        <div className="button-submit">
                          <button
                            className="subscribe-button tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
                            type="submit"
                          >
                            Subscribe
                            <i className="icon icon-arrow1-top-left" />
                          </button>
                        </div>
                      </div>
                      <div className="subscribe-msg" />
                    </form>
                    <div className="tf-cur">
                      <div className="tf-currencies">
                        <CurrencySelect />
                      </div>
                      <div className="tf-languages">
                        <LanguageSelect />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="footer-bottom-wrap d-flex gap-20 flex-wrap justify-content-between align-items-center">
                  <div className="footer-menu_item">
                    <p style={{ color: "#FFFFFF" }}>
                      © {new Date().getFullYear()} CLC - Chaminé
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
