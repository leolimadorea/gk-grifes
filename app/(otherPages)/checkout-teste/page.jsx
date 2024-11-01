// pages/checkout.js
"use client";
import { useEffect } from "react";
import Head from "next/head";
import { loadMercadoPago } from "@mercadopago/sdk-js";

const Checkout = () => {
  useEffect(() => {
    const initializeMercadoPago = async () => {
      try {
        await loadMercadoPago();

        const mp = new window.MercadoPago(
          "TEST-f24084ec-647b-4665-a14f-235c050018f6",
          {
            locale: "pt-BR",
          }
        );

        const cardForm = mp.cardForm({
          amount: "100.5",
          iframe: true,
          form: {
            id: "form-checkout",
            cardNumber: {
              id: "form-checkout__cardNumber",
              placeholder: "Número do cartão",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
              placeholder: "MM/YY",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "Código de segurança",
            },
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: "Titular do cartão",
            },
            issuer: {
              id: "form-checkout__issuer",
              placeholder: "Banco emissor",
            },
            installments: {
              id: "form-checkout__installments",
              placeholder: "Parcelas",
            },
            identificationType: {
              id: "form-checkout__identificationType",
              placeholder: "Tipo de documento",
            },
            identificationNumber: {
              id: "form-checkout__identificationNumber",
              placeholder: "Número do documento",
            },
            cardholderEmail: {
              id: "form-checkout__cardholderEmail",
              placeholder: "E-mail",
            },
          },
          callbacks: {
            onFormMounted: (error) => {
              if (error)
                return console.warn("Erro ao montar o formulário: ", error);
              console.log("Formulário montado");
            },
            onSubmit: (event) => {
              event.preventDefault();

              const {
                paymentMethodId: payment_method_id,
                issuerId: issuer_id,
                cardholderEmail: email,
                amount,
                token,
                installments,
                identificationNumber,
                identificationType,
              } = cardForm.getCardFormData();

              console.log(token);
              fetch("/api/payment/createCardPayment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token,
                  issuer_id,
                  payment_method_id,
                  transaction_amount: Number(amount),
                  installments: Number(installments),
                  description: "Descrição do produto",
                  payer: {
                    email,
                    identification: {
                      type: identificationType,
                      number: identificationNumber,
                    },
                  },
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Pagamento processado com sucesso:", data);
                  // Aqui você pode redirecionar o usuário ou mostrar uma mensagem de sucesso
                })
                .catch((error) => {
                  console.error("Erro ao processar o pagamento:", error);
                  // Aqui você pode mostrar uma mensagem de erro para o usuário
                });
            },
            onFetching: (resource) => {
              console.log("Buscando recurso: ", resource);

              // Anima a barra de progresso
              const progressBar = document.querySelector(".progress-bar");
              progressBar.removeAttribute("value");

              return () => {
                progressBar.setAttribute("value", "0");
              };
            },
          },
        });
      } catch (error) {
        console.error("Erro ao inicializar o MercadoPago:", error);
      }
    };

    initializeMercadoPago();
  }, []);

  return (
    <>
      <Head>
        <title>Checkout - MercadoPago</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <form id="form-checkout">
          <div id="form-checkout__cardNumber" className="container"></div>
          <div id="form-checkout__expirationDate" className="container"></div>
          <div id="form-checkout__securityCode" className="container"></div>
          <input
            type="text"
            id="form-checkout__cardholderName"
            placeholder="Titular do cartão"
          />
          <select id="form-checkout__issuer"></select>
          <select id="form-checkout__installments"></select>
          <select id="form-checkout__identificationType"></select>
          <input
            type="text"
            id="form-checkout__identificationNumber"
            placeholder="Número do documento"
          />
          <input
            type="email"
            id="form-checkout__cardholderEmail"
            placeholder="E-mail"
          />

          <button type="submit" id="form-checkout__submit">
            Pagar
          </button>
          <progress value="0" className="progress-bar">
            Carregando...
          </progress>
        </form>
      </div>

      <style jsx>{`
        #form-checkout {
          display: flex;
          flex-direction: column;
          max-width: 600px;
          width: 100%;
        }

        .container {
          height: 18px;
          display: inline-block;
          border: 1px solid rgb(118, 118, 118);
          border-radius: 2px;
          padding: 1px 2px;
          margin-bottom: 15px;
        }

        input,
        select,
        button {
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }

        button {
          background-color: #0070f3;
          color: white;
          cursor: pointer;
        }

        button:hover {
          background-color: #005bb5;
        }

        .progress-bar {
          width: 100%;
          height: 20px;
        }
      `}</style>
    </>
  );
};

export default Checkout;
