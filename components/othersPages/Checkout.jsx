"use client";
import { useContextElement } from "@/context/Context";
import { products } from "@/data/categories";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cartProducts, totalPrice, userCpf } = useContextElement();
  const cardFormElementRef = useRef(null);

  const [selectedShipping, setSelectedShipping] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("pix");
  const { data: session, status } = useSession();
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [qrCodeText, setQrCodeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [paymentApproved, setPaymentApproved] = useState(false);
  const cardFormRef = useRef(null);
  const [userId, setUserId] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    city: "",
    address: "",
    zipCode: "",
    phone: "",
    number: "",
    complement: "",
  });

  const [useSameAddress, setUseSameAddress] = useState(false);

  const [formKey, setFormKey] = useState(0);
  const [zipCode, setZipCode] = useState("");

  const [shippingOptions, setShippingOptions] = useState([]);

  const [isCalculating, setIsCalculating] = useState(false);
  const fetchAddressByZipCode = async (zipCode) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
      if (!response.ok) {
        throw new Error("Erro ao buscar endereço.");
      }
      const data = await response.json();
      if (data.erro) {
        toast.error("CEP inválido. Tente novamente.");
        return;
      }
      setShippingAddress((prev) => ({
        ...prev,
        address: data.logradouro || "",
        city: data.localidade || "",
        complement: data.complemento || "",
      }));
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      toast.error("Não foi possível buscar o endereço. Tente novamente.");
    }
  };

  const calculateShipping = async () => {
    if (!shippingAddress.zipCode) return;

    setIsCalculating(true);

    const productsData = cartProducts.map((product) => ({
      id: product.id,
      width: 11,
      height: 17,
      length: 11,
      weight: 0.3,
      insurance_value: product.price,
      quantity: product.quantity,
    }));

    try {
      const response = await fetch("/api/shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: { postal_code: "80420080" },
          zipCode: shippingAddress.zipCode,
          products: productsData,
        }),
      });

      const data = await response.json();
      setShippingOptions(data);
    } catch (error) {
      console.error("Erro ao calcular o frete:", error);
      toast.error("Erro ao calcular o frete. Tente novamente.");
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (shippingAddress.zipCode.length === 8) {
      calculateShipping();
      fetchAddressByZipCode(shippingAddress.zipCode);
    }
  }, [shippingAddress.zipCode]);

  useEffect(() => {
    if (!paymentId) {
      return;
    }

    const pusher = new Pusher("92ce80a4f49372f48d51", {
      cluster: "us2",
    });

    const channel = pusher.subscribe(`payment-channel-${paymentId}`);

    channel.bind("payment-approved", (data) => {
      setPaymentApproved(true);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [paymentId]);
  const resetCardForm = () => {
    if (cardFormRef.current) {
      cardFormRef.current = null;
    }
    setFormKey((prevKey) => prevKey + 1);
    SetTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  useEffect(() => {
    if (paymentMethod === "card") {
      initializeMercadoPago();
    }

    return () => {
      cardFormRef.current = null;
    };
  }, [paymentMethod, formKey]);

  const registerUser = async (email, name) => {
    const password = generateRandomPassword();
    try {
      const response = await fetch("/api/auth/registerCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data.user.id);
        return true;
      } else {
        const data = await response.json();

        return false;
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);

      return false;
    }
  };
  const shippingData = {
    service: selectedShipping?.id || "",
    from: {
      name: "Imuno Pump",
      postal_code: "80420080",
      document: "06223391501",
      phone: "79999847482",
      address: "Rua Emiliano Perneta",
      complement: "805",
      number: "659",
      city: "Curitiba",
      state_abbr: "PR",
    },
    to: {
      name: `${firstName} ${lastName}`,
      postal_code: shippingAddress.zipCode,
      document: cpf,
      phone: phone,
      address: shippingAddress.address,
      complement: shippingAddress.complement || "",
      number: shippingAddress.number,
      city: shippingAddress.city,
      state_abbr: "SP",
    },
    products: cartProducts.map((product) => ({
      name: product.title,
      quantity: product.quantity,
      unitary_value: product.price,
    })),
    volumes: cartProducts.map((product) => ({
      height: 11,
      width: 17,
      length: 11,
      weight: 0.3,
    })),
    options: {
      insurance_value: totalPrice,
      non_commercial: true,
    },
  };

  const checkUserExists = async (email) => {
    try {
      const response = await fetch("/api/user/checkUserExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setUserId(data.userId);
        return data.userId;
      }
      return data.exists;
    } catch (error) {
      console.error("Error checking user existence:", error);
      toast.error("Erro ao verificar a existência do usuário.");
      return false;
    }
  };
  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
  };
  const handlePlaceOrder = async () => {
    if (!firstName) {
      toast.error("Preencha seu nome!");
      return;
    }
    if (!lastName) {
      toast.error("Preencha seu sobrenome!");
      return;
    }
    if (!cpf) {
      toast.error("Preencha seu CPF!");
      return;
    }
    if (!shippingAddress.zipCode) {
      toast.error("Preencha seu CEP!");
      return;
    }
    if (!shippingAddress.city) {
      toast.error("Preencha sua cidade!");
      return;
    }
    if (!shippingAddress.address) {
      toast.error("Preencha seu endereço!");
      return;
    }
    if (!phone) {
      toast.error("Preencha seu telefone!");
      return;
    }
    if (!email) {
      toast.error("Preencha seu email!");
      return;
    }

    if (!selectedShipping) {
      toast.error("Selecione uma opção de frete!");
      return;
    }

    const userExists = await checkUserExists(email);
    if (!userExists) {
      const registered = await registerUser(email, firstName + " " + lastName);
      if (!registered) {
        return; // Stop the process if registration fails
      }
    }
    if (paymentMethod === "pix") {
      setIsLoading(true);
      const qrCode = await generatePixQRCode({
        shipping: selectedShipping,
      });
      setQrCodeBase64(qrCode);
      setIsLoading(false);
    } else if (paymentMethod === "card") {
      if (cardFormElementRef.current) {
        cardFormElementRef.current.requestSubmit();
      } else {
        console.error("Card form reference is not available.");
      }
    }
  };

  const generatePixQRCode = async ({ shipping }) => {
    const products = cartProducts.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    const idToUse = await checkUserExists(session?.user?.email ?? email);

    console.log("products", products);
    try {
      const response = await fetch("/api/payment/mercadoPago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction_amount: parseFloat(
            (totalPrice + Number(shipping.price)).toFixed(2)
          ),
          description: "Produto Imuno Pump",
          email: email,
          cpf: cpf,
          userId: idToUse,
          products: products,
          orderData: shippingData,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar QR Code Pix");
      }

      const result = await response.json();
      const qrCodeBase64 =
        result?.point_of_interaction?.transaction_data?.qr_code_base64 || "";
      const paymentId = result.id;
      setPaymentId(paymentId);
      const qrCodeText =
        result?.point_of_interaction?.transaction_data?.qr_code || "";
      setQrCodeText(qrCodeText);
      return qrCodeBase64;
    } catch (error) {
      console.error("Erro ao gerar QR Code Pix:", error.message);
      toast.error("Erro ao gerar QR Code Pix. Tente novamente.");
      setIsLoading(false);
      return "";
    }
  };
  const copyPixCode = () => {
    navigator.clipboard
      .writeText(qrCodeText)
      .then(() => {
        toast.success("Código Pix copiado para a área de transferência!");
      })
      .catch((error) => {
        toast.error("Erro ao copiar o código Pix.");
        console.error("Erro ao copiar o código Pix:", error);
      });
  };

  const validatePaymentFields = () => {
    if (!firstName) {
      toast.error("Preencha seu nome!");
      return false;
    }
    if (!lastName) {
      toast.error("Preencha seu sobrenome!");
      return false;
    }
    if (!cpf) {
      toast.error("Preencha seu CPF!");
      return false;
    }
    if (!shippingAddress.zipCode) {
      toast.error("Preencha seu CEP!");
      return false;
    }
    if (!shippingAddress.city) {
      toast.error("Preencha sua cidade!");
      return false;
    }
    if (!shippingAddress.address) {
      toast.error("Preencha seu endereço!");
      return false;
    }
    if (!phone) {
      toast.error("Preencha seu telefone!");
      return false;
    }
    if (!email) {
      toast.error("Preencha seu email!");
      return false;
    }
    if (!selectedShipping) {
      toast.error("Selecione uma opção de frete!");
      return false;
    }

    return true;
  };

  const initializeMercadoPago = async () => {
    try {
      await loadMercadoPago();

      const mp = new window.MercadoPago(
        "TEST-f24084ec-647b-4665-a14f-235c050018f6",
        {
          locale: "pt-BR",
        }
      );

      cardFormRef.current = mp.cardForm({
        amount: totalPrice.toFixed(2),
        iframe: true,
        form: {
          id: "form-checkout-card",
          cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número do cartão",
          },
          expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "MM/AA",
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
          onSubmit: async (event) => {
            event.preventDefault();

            if (!cardFormRef.current) {
              console.error("CardForm não está inicializado.");
              return;
            }

            const userExists = await checkUserExists(
              session?.user?.email ?? email
            );
            if (!userExists) {
              const registered = await registerUser(
                email,
                firstName + " " + lastName
              );
              if (!registered) {
                return;
              }
            }
            const products = cartProducts.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            }));

            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardFormRef.current.getCardFormData();

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
                  email: cardholderEmail,
                  identification: {
                    type: identificationType,
                    number: identificationNumber,
                  },
                },
                orderData: shippingData,
                userId: userExists,
                products: products,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Pagamento processado com sucesso:", data);
                if (data.status === "approved") {
                  setPaymentApproved(true);
                  toast.success("PAGAMENTO APROVADO");
                } else {
                  resetCardForm();
                  toast.error("Pagamento não aprovado, tente novamente");
                }
              })
              .catch((error) => {
                console.error("Erro ao processar o pagamento:", error);
                toast.error("Erro ao processar o pagamento. Tente novamente.");
              });
          },
          onFetching: (resource) => {
            console.log("Buscando recurso: ", resource);

            const progressBar = document.querySelector(".progress-bar");
            if (progressBar) {
              progressBar.removeAttribute("value");
            }

            return () => {
              if (progressBar) {
                progressBar.setAttribute("value", "0");
              }
            };
          },
        },
      });
    } catch (error) {
      console.error("Erro ao inicializar o MercadoPago:", error);
    }
  };
  return (
    <>
      <Head>
        <title>Checkout - Sua Loja</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Adicione qualquer outro meta necessário */}
      </Head>
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
              <h5 className="fw-5 mb_20">Detalhes de Cobrança</h5>
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

                <h5 className="fw-5 mb_20">Endereço de Entrega</h5>
                <fieldset className="box fieldset">
                  <label htmlFor="shipping-zipcode">CEP</label>
                  <input
                    id="shipping-zipcode"
                    value={shippingAddress.zipCode}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        zipCode: e.target.value,
                      })
                    }
                    className="tf-select w-100"
                  />
                </fieldset>

                <fieldset className="box fieldset">
                  <label htmlFor="shipping-city">Cidade</label>
                  <input
                    id="shipping-city"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                    className="tf-select w-100"
                  />
                </fieldset>
                <fieldset className="box fieldset">
                  <label htmlFor="shipping-address">Endereço</label>
                  <input
                    id="shipping-address"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        address: e.target.value,
                      })
                    }
                    className="tf-select w-100"
                  />
                </fieldset>
                <fieldset className="box fieldset">
                  <label htmlFor="shipping-number">Número</label>
                  <input
                    id="shipping-number"
                    value={shippingAddress.number}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        number: e.target.value,
                      })
                    }
                    className="tf-select w-100"
                  />
                </fieldset>
                <fieldset className="box fieldset">
                  <label htmlFor="shipping-complement">Complemento</label>
                  <input
                    id="shipping-complement"
                    value={shippingAddress.complement}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        complement: e.target.value,
                      })
                    }
                    className="tf-select w-100"
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
                <h5 className="fw-5 mb_20">Seu Pedido</h5>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="tf-page-cart-checkout widget-wrap-checkout"
                >
                  <ul className="wrap-checkout-product">
                    {cartProducts.map((elm, i) => (
                      <li key={i} className="checkout-product-item">
                        <figure className="img-product">
                          <Image
                            alt="produto"
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
                            R${(elm.price * elm.quantity).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {!cartProducts.length && (
                    <div className="container">
                      <div className="row align-items-center mt-5 mb-5">
                        <div className="col-12 fs-18">
                          Seu carrinho está vazio
                        </div>
                        <div className="col-12 mt-3">
                          <Link
                            href={`/shop-default`}
                            className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                            style={{ width: "fit-content" }}
                          >
                            Explore Produtos!
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  <h5 className="fw-5 mb_20">Opções de Frete</h5>
                  {shippingOptions.length > 0 ? (
                    <ul>
                      {shippingOptions
                        .filter((option) => !option.error) // Filtra opções sem erro
                        .map((option, index) => (
                          <li key={index}>
                            <label>
                              <input
                                type="radio"
                                name="shippingOption"
                                value={option.price}
                                onChange={() => setSelectedShipping(option)}
                              />
                              <strong>Transportadora:</strong>{" "}
                              {option.company.name}
                              <br />
                              <strong>Prazo:</strong> {option.delivery_time}{" "}
                              dias
                              <br />
                              <strong>Preço:</strong> R$ {option.price}
                            </label>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p>Preencha o CEP para calcular o frete.</p>
                  )}
                  <div className="coupon-box"></div>
                  <div className="d-flex justify-content-between line pb_20">
                    <h6 className="fw-5">Total</h6>
                    <h6 className="total fw-5">
                      R$
                      {(
                        totalPrice + Number(selectedShipping?.price || 0)
                      ).toFixed(2)}
                    </h6>
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
                          style={{ width: "100%", height: "auto" }}
                        />
                        <button
                          onClick={copyPixCode}
                          className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center w-100"
                        >
                          Copiar Código Pix
                        </button>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="cardDetailsForm" key={formKey}>
                        {/* O formulário do MercadoPago será inserido aqui */}
                        <form
                          id="form-checkout-card"
                          ref={cardFormElementRef}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            id="form-checkout__cardNumber"
                            style={{
                              border: "1px solid rgb(204, 204, 204)",
                              borderRadius: "4px",
                              height: "30px",
                              marginBottom: "15px",
                              paddingLeft: "10px",
                            }}
                          ></div>
                          <div
                            id="form-checkout__expirationDate"
                            style={{
                              border: "1px solid rgb(204, 204, 204)",
                              borderRadius: "4px",
                              height: "30px",
                              marginBottom: "15px",
                              paddingLeft: "10px",
                            }}
                          ></div>
                          <div
                            id="form-checkout__securityCode"
                            style={{
                              border: "1px solid rgb(204, 204, 204)",
                              borderRadius: "4px",
                              marginBottom: "15px",
                              height: "30px",
                              paddingLeft: "10px",
                            }}
                          ></div>
                          <input
                            type="text"
                            id="form-checkout__cardholderName"
                            placeholder="Titular do cartão"
                            style={{
                              width: "100%",
                              borderRadius: "4px",
                              padding: "15px",
                              marginBottom: "15px",
                              border: "1px solid #ccc",
                              fontSize: "16px",
                            }}
                          />
                          <select
                            id="form-checkout__issuer"
                            className="tf-select w-100"
                            style={{ display: "none" }}
                          ></select>
                          <select
                            id="form-checkout__installments"
                            className="tf-select w-100"
                            style={{ display: "none" }}
                          ></select>
                          <select
                            id="form-checkout__identificationType"
                            className="tf-select w-100"
                            style={{ marginBottom: "15px" }}
                          ></select>
                          <input
                            type="text"
                            id="form-checkout__identificationNumber"
                            placeholder="Número do documento"
                            style={{
                              width: "100%",
                              borderRadius: "4px",
                              padding: "15px",
                              marginBottom: "15px",
                              border: "1px solid #ccc",
                              fontSize: "16px",
                            }}
                          />

                          <input
                            type="email"
                            id="form-checkout__cardholderEmail"
                            placeholder="E-mail"
                            style={{
                              width: "100%",
                              borderRadius: "4px",
                              padding: "15px",
                              marginBottom: "15px",
                              border: "1px solid #ccc",
                              fontSize: "16px",
                            }}
                          />

                          <button
                            type="submit"
                            id="form-checkout__submit"
                            className="tf-btn radius-3 btn-fill btn-icon animate-hover-btn justify-content-center"
                            style={{ display: "none" }}
                          >
                            Pagar
                          </button>
                          <progress
                            value="0"
                            className="progress-bar"
                            style={{ display: "none" }}
                          >
                            Carregando...
                          </progress>
                        </form>
                      </div>
                    )}
                  </div>
                  {paymentApproved && (
                    <div className="container">
                      <div className="row align-items-center mt-5 mb-5">
                        <div className="col-12 fs-18">Pagamento Aprovado</div>
                        <div className="col-12 mt-3">
                          <Link
                            href={`/shop-default`}
                            className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                            style={{ width: "fit-content" }}
                          >
                            Explore Produtos!
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

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
      </section>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        /* Adicione estilos adicionais conforme necessário */
      `}</style>
    </>
  );
};

export default Checkout;
