"use client";
import { paymentImages } from "@/data/footerLinks";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export default function Footer2({ bgColor = "background-black" }) {
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
    <footer id="footer" className={`footer ${bgColor}`}>
      <div className="footer-wrap wow fadeIn" data-wow-delay="0s">
        <div className="footer-body">
          <div className="container">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="col-xl-3 col-md-6 col-12">
                <div className="footer-infor">
                  <div className="footer-logo">
                    <svg
                      width="229"
                      height="76.77713730922076"
                      viewBox="0 0 362.076537030007 64.8"
                      class="looka-1j8o68f"
                    >
                      <defs id="SvgjsDefs1345"></defs>
                      <g
                        id="SvgjsG1346"
                        featurekey="nameLeftFeature-0"
                        transform="matrix(1.076554822516794,0,0,1.076554822516794,-3.444980103459955,7.894738274057428)"
                        fill="#d94343"
                      >
                        <path d="M35.08 6.600000000000001 c0.6 0 0.8 0.36 0.88 0.56 c0.08 0.28 0.04 0.6 -0.12 1 l-11.12 27.68 c-0.6 1.44 -1.16 2.4 -1.76 2.92 c-0.16 0.16 -0.36 0.28 -0.6 0.4 c-0.8 0.56 -1.76 0.88 -2.76 0.88 c-2.2 0 -4.16 -1.48 -4.76 -3.6 l-0.28 -0.6 l-11.2 -27.68 c-0.16 -0.4 -0.2 -0.72 -0.12 -1 c0.04 -0.16 0.24 -0.56 0.84 -0.56 l4.32 0 c0.56 0 0.96 0.28 1.12 0.84 l9.96 24.76 c0.04 0.08 0.04 0.12 0.04 0.12 l0.16 -0.04 s0.04 0 0.04 -0.08 l9.8 -24.76 c0.24 -0.56 0.64 -0.84 1.16 -0.84 l4.4 0 z M64.689 26.28 l6.92 12 c0.16 0.2 0.2 0.52 0.16 0.92 c-0.04 0.52 -0.36 0.84 -0.92 0.84 l-4.32 0 c-0.4 0 -0.68 -0.08 -0.84 -0.24 c-0.16 -0.12 -0.32 -0.32 -0.44 -0.56 l-6.24 -10.96 c-0.44 -0.8 -0.88 -1.32 -1.32 -1.56 c-0.48 -0.28 -1.2 -0.4 -2.16 -0.4 l-4.04 0 l0 12.32 c0 1.24 -0.8 1.4 -1.12 1.4 l-3.68 0 c-0.32 0 -1.16 -0.16 -1.16 -1.4 l0 -30.2 c0 -1.28 0.84 -1.4 1.16 -1.4 l3.68 0 c0.32 0 1.12 0.12 1.12 1.4 l0 11.96 l3.68 0 c0.52 0 0.96 -0.04 1.28 -0.08 s0.6 -0.12 0.84 -0.24 c0.2 -0.12 0.44 -0.32 0.64 -0.56 c0.2 -0.28 0.44 -0.6 0.68 -1 l6.04 -10.68 c0.12 -0.28 0.28 -0.44 0.44 -0.56 c0.16 -0.16 0.44 -0.24 0.88 -0.24 l3.96 0 c0.48 0 0.8 0.24 0.92 0.68 c0.04 0.36 0 0.68 -0.12 0.96 l-6.6 11.6 l-1.08 1.8 l-0.76 1.04 c0.8 0.76 1.6 1.84 2.4 3.16 z M104.418 34.08 c0.36 0 1.12 0.16 1.12 1.4 l0 3.16 c0 1.24 -0.76 1.4 -1.12 1.4 l-13.2 0 c-1.76 0 -3.28 -0.24 -4.48 -0.68 c-1.28 -0.44 -2.32 -1.2 -3.12 -2.24 c-0.8 -1 -1.36 -2.32 -1.72 -3.92 c-0.36 -1.56 -0.56 -3.48 -0.56 -5.72 l0 -19.04 c0 -1.28 0.8 -1.4 1.16 -1.4 l3.68 0 c0.32 0 1.12 0.12 1.12 1.4 l0 19.72 c0 1.2 0.04 2.2 0.2 3 c0.12 0.72 0.36 1.32 0.68 1.76 c0.28 0.44 0.68 0.72 1.16 0.88 c0.56 0.2 1.24 0.28 2.08 0.28 l13 0 z"></path>
                      </g>
                      <g
                        id="SvgjsG1347"
                        featurekey="inlineSymbolFeature-0"
                        transform="matrix(0.11977818853974122,0,0,0.11977818853974122,130,0)"
                        fill="#d94343"
                      >
                        <g xmlns="http://www.w3.org/2000/svg">
                          <path
                            class="st0"
                            d="M270.5,0C131.2,0,15.2,104.9,1.2,243.1C0,251.9,0,261.2,0,270.5C0,419.8,121.3,541,270.5,541   S541,419.8,541,270.5S419.8,0,270.5,0z M5.8,270.5c0-8.7,0.6-18.1,1.2-26.8c1.2-10.5,2.9-21,5.2-31.5h203.5   c14.6,0,26.2,11.7,26.2,26.2v295c-18.1-1.7-35-5.8-51.9-11.1V302.6c0-18.1-14.6-32.1-32.1-32.1h-47.2   c-1.7-14.6-13.4-25.7-28.6-25.7c-15.7,0-28.6,12.8-28.6,28.6S66.5,302,82.2,302c14.6,0,26.8-11.1,28.6-25.7H158   c14.6,0,26.2,11.7,26.2,26.2v218.1C81,485.1,5.8,386.5,5.8,270.5z M105.5,273.4c0,12.8-10.5,22.7-22.7,22.7   c-12.2,0-22.7-10.5-22.7-22.7c0-12.8,10.5-22.7,22.7-22.7C95,250.7,105.5,260.6,105.5,273.4z M358.6,520.1V337   c0-14.6,11.7-26.2,26.2-26.2h32.1c1.7,14.6,13.4,25.7,28.6,25.7c15.7,0,28.6-12.8,28.6-28.6c0-15.7-12.8-28.6-28.6-28.6   c-14.6,0-26.8,11.1-28.6,25.7h-32.1c-18.1,0-32.1,14.6-32.1,32.1v184.8c-15.2,4.7-30.3,8.7-46.6,10.5v-358   c0-18.1-14.6-32.1-32.1-32.1h-67.6c-1.7-14.6-13.4-25.7-28.6-25.7c-15.7,0-28.6,12.8-28.6,28.6c0,15.7,12.8,28.6,28.6,28.6   c14.6,0,26.8-11.1,28.6-25.7H274c14.6,0,26.2,11.7,26.2,26.2v359.1c-9.9,1.2-19.8,1.7-29.7,1.7c-7.6,0-14.6-0.6-22.2-1.2V238.5   c0-18.1-14.6-32.1-32.1-32.1H13.4C42.6,89.8,146.9,5.8,270.5,5.8c28.6,0,56,4.7,82.2,12.8v149.3c0,18.1,14.6,32.1,32.1,32.1h32.1   c1.7,14.6,13.4,25.7,28.6,25.7c15.7,0,28.6-12.8,28.6-28.6s-12.8-28.6-28.6-28.6c-14.6,0-26.8,11.1-28.6,25.7h-32.1   c-14.6,0-26.2-11.7-26.2-26.2V21c102.6,36.1,176.7,134.7,176.7,249.5S461.2,483.9,358.6,520.1z M422.7,307.8   c0-12.8,10.5-22.7,22.7-22.7s22.7,10.5,22.7,22.7c0,12.2-10.5,22.7-22.7,22.7S422.7,320.7,422.7,307.8z M200.6,145.2   c0,12.8-10.5,22.7-22.7,22.7s-22.7-10.5-22.7-22.7s10.5-22.7,22.7-22.7S200.6,132.3,200.6,145.2z M422.7,197.6   c0-12.8,10.5-22.7,22.7-22.7s22.7,10.5,22.7,22.7s-10.5,22.7-22.7,22.7S422.7,210.5,422.7,197.6z"
                            style={{ fill: "#d94343" }}
                          ></path>
                        </g>
                      </g>
                      <g
                        id="SvgjsG1348"
                        featurekey="nameRightFeature-0"
                        transform="matrix(1.088270798286477,0,0,1.088270798286477,185.73748241987406,7.425635721339838)"
                        fill="#d94343"
                      >
                        <path d="M54.528999999999996 7.039999999999999 c0.36 0 1.16 0.12 1.16 1.36 l0 3.12 c0 1.32 -0.8 1.44 -1.16 1.44 l-10.28 0 l0 25.68 c0 1.24 -0.76 1.36 -1.12 1.36 l-3.68 0 c-0.32 0 -1.12 -0.12 -1.12 -1.36 l0 -25.68 l-10.28 0 c-0.36 0 -1.16 -0.12 -1.16 -1.44 l0 -3.12 c0 -1.24 0.8 -1.36 1.16 -1.36 l26.48 0 z M89.258 32.84 c0.36 0 1.16 0.12 1.16 1.36 l0 4.4 c0 1.24 -0.8 1.36 -1.16 1.36 l-14.2 0 c-1.76 0 -3.24 -0.2 -4.48 -0.68 c-1.28 -0.44 -2.32 -1.16 -3.12 -2.2 c-0.76 -1 -1.36 -2.32 -1.72 -3.92 c-0.28 -1.32 -0.48 -2.92 -0.52 -4.8 l0 -0.2 l0.08 -5.04 c0.08 -0.36 0.24 -0.68 0.44 -1 c0.56 -1 1.56 -1.6 2.72 -1.68 l20.64 -0.04 c0.32 0 1.12 0.12 1.12 1.36 l0 3.16 c0 1.24 -0.8 1.4 -1.12 1.4 l-17.88 0 c-0.04 0 -0.08 2.88 -0.08 2.88 l0.08 0.68 c0.12 0.76 0.36 1.36 0.68 1.8 c0.32 0.4 0.68 0.68 1.2 0.88 c0.56 0.16 1.24 0.28 2.08 0.28 l14.08 0 z M89.298 6.960000000000001 c0.32 0 1.12 0.16 1.12 1.4 l0 3.16 c0 1.24 -0.8 1.4 -1.12 1.4 l-23 -0.04 c-0.32 0 -1.08 -0.12 -1.08 -1.36 l0 -3.12 c0 -1.28 0.76 -1.44 1.08 -1.44 l23 0 z M124.387 7.039999999999999 c0.32 0 1.12 0.16 1.12 1.4 l0 3.08 c0 1.28 -0.8 1.44 -1.12 1.44 l-14.36 0 c-0.84 0 -1.56 0.08 -2.08 0.28 c-0.52 0.16 -0.88 0.44 -1.2 0.88 s-0.52 1 -0.68 1.76 c-0.12 0.76 -0.2 1.76 -0.2 2.96 l0 9.32 c0 1.2 0.08 2.2 0.2 3 c0.16 0.76 0.36 1.36 0.68 1.76 c0.32 0.44 0.68 0.72 1.2 0.88 c0.52 0.2 1.24 0.28 2.08 0.28 l14.36 0 c0.32 0 1.12 0.16 1.12 1.4 l0 3.16 c0 1.24 -0.8 1.4 -1.12 1.4 l-14.56 0 c-1.76 0 -3.28 -0.24 -4.52 -0.68 s-2.28 -1.2 -3.08 -2.2 c-0.8 -1.04 -1.4 -2.36 -1.76 -3.92 c-0.36 -1.6 -0.52 -3.52 -0.52 -5.76 l0 -7.92 c0 -2.2 0.16 -4.12 0.52 -5.68 c0.36 -1.6 0.96 -2.92 1.76 -3.92 c0.76 -1 1.8 -1.76 3.08 -2.24 c1.24 -0.44 2.76 -0.68 4.52 -0.68 l14.56 0 z M160.876 7.039999999999999 c0.36 0 1.16 0.16 1.16 1.4 l0 30.2 c0 1.24 -0.8 1.4 -1.16 1.4 l-3.68 0 c-0.32 0 -1.08 -0.16 -1.08 -1.4 l0 -12.32 l-15.16 0 l0 12.32 c0 1.24 -0.76 1.4 -1.12 1.4 l-3.64 0 c-0.36 0 -1.16 -0.16 -1.16 -1.4 l0 -30.2 c0 -1.24 0.8 -1.4 1.16 -1.4 l3.64 0 c0.36 0 1.12 0.16 1.12 1.4 l0 11.96 l15.16 0 l0 -11.96 c0 -1.24 0.76 -1.4 1.08 -1.4 l3.68 0 z"></path>
                      </g>
                    </svg>
                  </div>
                  <ul>
                    <li>
                      <p>
                        Rua do príncipe 41 Joinville <br />
                        Centro
                      </p>
                    </li>
                    <li>
                      <p>
                        Email: <a href="#">vklteech@gmail.com</a>
                      </p>
                    </li>
                    <li>
                      <p>
                        Celular: <a href="#">(41) 99984-7482</a>
                      </p>
                    </li>
                  </ul>
                  <Link href={`/contact-1`} className="tf-btn btn-line">
                    Ver no mapa
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                  <ul className="tf-social-icon d-flex gap-10 style-white">
                    <li>
                      <a
                        href="#"
                        className="box-icon w_34 round social-facebook social-line"
                      >
                        <i className="icon fs-14 icon-fb" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="box-icon w_34 round social-twiter social-line"
                      >
                        <i className="icon fs-12 icon-Icon-x" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="box-icon w_34 round social-instagram social-line"
                      >
                        <i className="icon fs-14 icon-instagram" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="box-icon w_34 round social-tiktok social-line"
                      >
                        <i className="icon fs-14 icon-tiktok" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="box-icon w_34 round social-pinterest social-line"
                      >
                        <i className="icon fs-14 icon-pinterest-1" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                <div className="footer-heading footer-heading-desktop">
                  <h6>Help</h6>
                </div>
                <div className="footer-heading footer-heading-moblie">
                  <h6>Help</h6>
                </div>
                <ul className="footer-menu-list tf-collapse-content">
                  {footerLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href} className="footer-menu_item">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
              {/* <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                <div className="footer-heading footer-heading-desktop">
                  <h6>About us</h6>
                </div>
                <div className="footer-heading footer-heading-moblie">
                  <h6>About us</h6>
                </div>
                <ul className="footer-menu-list tf-collapse-content">
                  {aboutLinks.slice(0, 4).map((link, index) => (
                    <li key={index}>
                      <Link href={link.href} className="footer-menu_item">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
              <div className="col-xl-3 col-md-6 col-12">
                <div className="footer-newsletter footer-col-block">
                  <div className="footer-heading footer-heading-desktop">
                    <h6>Cadastre-se para Receber Novidades</h6>
                  </div>
                  <div className="footer-heading footer-heading-moblie">
                    <h6>Cadastre-se para Receber Novidades</h6>
                  </div>
                  <div className="tf-collapse-content">
                    <div className="footer-menu_item">
                      Cadastre-se para ser o primeiro a saber sobre novos
                      lançamentos, promoções, conteúdo exclusivo, eventos e
                      muito mais!
                    </div>
                    <div
                      className={`tfSubscribeMsg ${
                        showMessage ? "active" : ""
                      }`}
                    >
                      {success ? (
                        <p style={{ color: "rgb(52, 168, 83)" }}>
                          Você se inscreveu com sucesso.
                        </p>
                      ) : (
                        <p style={{ color: "red" }}>Algo deu errado</p>
                      )}
                    </div>
                    <form
                      ref={formRef}
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMail();
                      }}
                      className="form-newsletter"
                      action="#"
                      method="post"
                      acceptCharset="utf-8"
                      data-mailchimp="true"
                    >
                      <div id="subscribe-content">
                        <fieldset className="email">
                          <input
                            required
                            type="email"
                            name="email-form"
                            placeholder="Digite seu e-mail..."
                            tabIndex={0}
                            aria-required="true"
                            autoComplete="abc@xyz.com"
                          />
                        </fieldset>
                        <div className="button-submit">
                          <button
                            className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
                            type="submit"
                          >
                            Inscrever-se
                            <i className="icon icon-arrow1-top-left" />
                          </button>
                        </div>
                      </div>
                      <div id="subscribe-msg" />
                    </form>
                    {/* <div className="tf-cur">
      <div className="tf-currencies">
        <CurrencySelect light />
      </div>
      <div className="tf-languages">
        <LanguageSelect
          parentClassName={
            "image-select center style-default type-languages color-white"
          }
        />
      </div>
    </div> */}
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
                    © {new Date().getFullYear()} Ecomus Store. All Rights
                    Reserved
                  </div>
                  <div className="tf-payment">
                    {paymentImages.map((image, index) => (
                      <Image
                        key={index}
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                      />
                    ))}
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
