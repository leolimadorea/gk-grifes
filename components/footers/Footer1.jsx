"use client";
import { aboutLinks, footerLinks } from "@/data/footerLinks";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export default function Footer1({ bgColor = "" }) {
  useEffect(() => {
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
  }, []);

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
      className={`footer md-pb-70 ${bgColor}`}
      style={{ background: "#DA781F" }}
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
                        src="/videos/logoWhite.png"
                        width="136"
                        height="21"
                      />
                    </Link>
                  </div>
                  <ul>
                    <li>
                      <p style={{ color: "#fff" }}>
                        Endereço: Rua João Fernandes Camisa Nova Júnior n808,{" "}
                        <br />
                        Jardim São Luís São Paulo
                      </p>
                    </li>
                  </ul>

                  <ul className="tf-social-icon d-flex gap-10">
                    <li>
                      <a
                        href="https://www.facebook.com/bifarmasaoluis/?_rdc=1&_rdr"
                        className="box-icon w_34 round social-facebook social-line"
                      >
                        <i className="icon fs-14 icon-fb" />
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://www.instagram.com/drogaria_vivamais/"
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
                  <h6 style={{ color: "#fff" }}>Horário de Funcionamento</h6>
                </div>
                <div className="footer-heading footer-heading-moblie">
                  <h6 style={{ color: "#fff" }}>Horário de Funcionamento</h6>
                </div>
                <ul className="footer-menu-list tf-collapse-content">
                  {footerLinks.map((link, index) => (
                    <li key={index}>{link.text}</li>
                  ))}
                </ul>
              </div>
              <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                <div className="footer-heading footer-heading-desktop">
                  <h6 style={{ color: "#fff" }}>Fale Conosco</h6>
                </div>
                <div className="footer-heading footer-heading-moblie">
                  <h6 style={{ color: "#fff" }}>Fale Conosco</h6>
                </div>
                <ul className="footer-menu-list tf-collapse-content">
                  {aboutLinks.slice(0, 4).map((link, index) => (
                    <li key={index}>
                      <h6 style={{ color: "#fff" }}> {link.title}</h6>
                      {link.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-xl-3 col-md-6 col-12">
                <div className="footer-newsletter footer-col-block">
                  <div className="footer-heading footer-heading-desktop">
                    <h6 style={{ color: "#fff" }}>Métodos de pagamento</h6>
                  </div>
                  <div className="footer-heading footer-heading-moblie">
                    <h6 style={{ color: "#fff" }}>Métodos de pagamento</h6>
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
                    <p style={{ color: "#fff" }}>
                      © {new Date().getFullYear()} VKLTech
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
