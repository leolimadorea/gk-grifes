"use client";
import { useContextElement } from "@/context/Context";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Checkout() {
  const { cartProducts, totalPrice, userCpf } = useContextElement();
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const { data: session, status } = useSession();
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const handlePlaceOrder = async () => {
    if (
      !firstName ||
      !lastName ||
      !cpf ||
      !country ||
      !city ||
      !address ||
      !phone ||
      !email
    ) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Oculta o toast após 3 segundos
      return;
    }

    if (paymentMethod === "pix") {
      setIsLoading(true);
      const qrCode = await generatePixQRCode();
      setQrCodeBase64(qrCode);
      setIsLoading(false);
    } else {
      processCardPayment(cardDetails);
    }
  };

  const generatePixQRCode = async () => {
    const products = cartProducts.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    try {
      const response = await fetch(
        "http://localhost:3000/api/payment/mercadoPago",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transaction_amount: totalPrice,
            description: "Descrição do Produto",
            email: session.user.email,
            cpf: cpf,
            userId: session.user.id,
            products: products,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao gerar QR Code Pix");
      }

      const result = await response.json();
      const qrCodeBase64 =
        result?.point_of_interaction?.transaction_data?.qr_code_base64 || "";

      console.log("QR Code Base64:", qrCodeBase64);
      return qrCodeBase64;
    } catch (error) {
      console.error("Erro ao gerar QR Code Pix:", error.message);
      setIsLoading(false);
      return "";
    }
  };

  const processCardPayment = async (details) => {
    console.log("Processando pagamento com cartão", details);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="flat-spacing-11">
      <div className="container">
        {showToast && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "10px 20px",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
          >
            Por favor, preencha todos os campos obrigatórios.
          </div>
        )}
        <div className="tf-page-cart-wrap layout-2">
          <div className="tf-page-cart-item">
            <h5 className="fw-5 mb_20">Billing details</h5>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="form-checkout"
            >
              <div className="box grid-2">
                <fieldset className="fieldset">
                  <label htmlFor="first-name">Nome</label>
                  <input
                    required
                    type="text"
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Seu nome"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label htmlFor="last-name">Sobrenome</label>
                  <input
                    required
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Seu sobrenome"
                  />
                </fieldset>
              </div>

              <fieldset className="box fieldset">
                <label htmlFor="cpf">CPF</label>
                <input
                  required
                  type="text"
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="123.456.789-09"
                />
              </fieldset>

              <fieldset className="box fieldset">
                <label htmlFor="country">País</label>
                <div className="select-custom">
                  <select
                    required
                    className="tf-select w-100"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Selecione seu país</option>
                    <option value="Australia">Australia</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
              </fieldset>

              <fieldset className="box fieldset">
                <label htmlFor="city">Cidade</label>
                <input
                  required
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Sua cidade"
                />
              </fieldset>

              <fieldset className="box fieldset">
                <label htmlFor="address">Endereço</label>
                <input
                  required
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Seu endereço"
                />
              </fieldset>

              <fieldset className="box fieldset">
                <label htmlFor="phone">Número de Telefone</label>
                <input
                  required
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(99) 99999-9999"
                />
              </fieldset>

              <fieldset className="box fieldset">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                />
              </fieldset>

              <fieldset className="box fieldset">
                <label htmlFor="note">Notas do Pedido (opcional)</label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Instruções ou observações"
                />
              </fieldset>
            </form>
          </div>
          <div className="tf-page-cart-footer">
            <div className="tf-cart-footer-inner">
              <h5 className="fw-5 mb_20">Your order</h5>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="tf-page-cart-checkout widget-wrap-checkout"
              >
                <ul className="wrap-checkout-product">
                  {cartProducts.map((elm, i) => (
                    <li key={i} className="checkout-product-item">
                      <figure className="img-product">
                        <Image
                          alt="product"
                          src={elm.imgSrc}
                          width={720}
                          height={1005}
                        />
                        <span className="quantity">{elm.quantity}</span>
                      </figure>
                      <div className="content">
                        <div className="info">
                          <p className="name">{elm.title}</p>
                        </div>
                        <span className="price">
                          ${(elm.price * elm.quantity).toFixed(2)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                {!cartProducts.length && (
                  <div className="container">
                    <div className="row align-items-center mt-5 mb-5">
                      <div className="col-12 fs-18">
                        Your shop cart is empty
                      </div>
                      <div className="col-12 mt-3">
                        <Link
                          href={`/shop-default`}
                          className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                          style={{ width: "fit-content" }}
                        >
                          Explore Products!
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                <div className="coupon-box"></div>
                <div className="d-flex justify-content-between line pb_20">
                  <h6 className="fw-5">Total</h6>
                  <h6 className="total fw-5">${totalPrice.toFixed(2)}</h6>
                </div>
                <div className="wd-check-payment">
                  <div className="fieldset-radio mb_20">
                    <input
                      required
                      type="radio"
                      name="payment"
                      id="pix"
                      className="tf-check"
                      value="pix"
                      checked={paymentMethod === "pix"}
                      onChange={() => setPaymentMethod("pix")}
                    />
                    <label htmlFor="pix">Pix</label>
                  </div>
                  <div className="fieldset-radio mb_20">
                    <input
                      required
                      type="radio"
                      name="payment"
                      id="card"
                      className="tf-check"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <label htmlFor="card">Cartão de Crédito</label>
                  </div>

                  {paymentMethod === "pix" && qrCodeBase64 && (
                    <div className="qrCodeContainer">
                      <img
                        src={`data:image/png;base64,${qrCodeBase64}`}
                        alt="QR Code Pix"
                      />
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="cardDetailsForm" style={{ gap: "16px" }}>
                      <label>Número do Cartão</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardChange}
                        required
                        style={{
                          width: "100%",
                          borderRadius: "0",
                          border: "1px solid #ccc",
                          padding: "16px",
                        }}
                      />
                      <label>Nome no Cartão</label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={cardDetails.cardHolder}
                        onChange={handleCardChange}
                        required
                        style={{
                          width: "100%",
                          borderRadius: "0",
                          border: "1px solid #ccc",
                          padding: "16px",
                        }}
                      />
                      <label>Data de Expiração</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/AA"
                        value={cardDetails.expiryDate}
                        onChange={handleCardChange}
                        required
                        style={{
                          width: "100%",
                          borderRadius: "0",
                          border: "1px solid #ccc",
                          padding: "16px",
                        }}
                      />
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        required
                        style={{
                          width: "100%",
                          borderRadius: "0",
                          border: "1px solid #ccc",
                          padding: "16px",
                        }}
                      />
                    </div>
                  )}
                </div>

                {!qrCodeBase64 && (
                  <button
                    className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center"
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    style={{
                      backgroundColor: isLoading ? "transparent" : "",
                      border: isLoading ? "none" : "",
                      color: isLoading ? "transparent" : "",
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    {isLoading ? (
                      <div
                        style={{
                          border: "4px solid rgba(0, 0, 0, 0.1)",
                          borderTop: "4px solid #3498db",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          animation: "spin 0.8s linear infinite",
                        }}
                      ></div>
                    ) : paymentMethod === "pix" ? (
                      "Gerar QR Code Pix"
                    ) : (
                      "Realizar Pagamento com Cartão"
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
