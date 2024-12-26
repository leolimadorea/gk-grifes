import { socialLinksWithBorder } from "@/data/socials";
import React from "react";

export default function Map2() {
  return (
    <section className="flat-spacing-9">
      <div className="container">
        <div className="tf-grid-layout gap-0 lg-col-2">
          <div className="w-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.7624180502853!2d-49.22618550000001!3d-25.345752200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce791e7a882ab%3A0x7282301e90c7b6eb!2sClc%20Chamin%C3%A9s!5e0!3m2!1spt-BR!2sbr!4v1735194656693!5m2!1spt-BR!2sbr"
              width="100%"
              height={646}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="tf-content-left has-mt">
            <div className="sticky-top">
              <h5 className="mb_20">Venha nos visitar</h5>
              <div className="mb_20">
                <p className="mb_15">
                  <strong>Endereço</strong>
                </p>
                <p>R. José Brito, 136 - Roça Grande, Colombo - PR,</p>
              </div>
              <div className="mb_20">
                <p className="mb_15">
                  <strong>Telefone</strong>
                </p>
                <p>(41) 99927-4760</p>
              </div>

              <div>
                <ul className="tf-social-icon d-flex gap-20 style-default">
                  {socialLinksWithBorder.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={`box-icon link round ${link.className} ${link.borderClass}`}
                      >
                        <i
                          className={`icon ${link.iconSize} ${link.iconClass}`}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
