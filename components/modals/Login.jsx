"use client";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const closeModalButtonRef = useRef(null); // Referência para o botão de fechar o modal

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError("Credenciais inválidas. Tente novamente.");
    } else {
      // Exibe o toast de sucesso
      toast.success("Login bem-sucedido!");

      // Simula o clique no botão de fechar o modal
      if (closeModalButtonRef.current) {
        closeModalButtonRef.current.click();
      }

      // Redireciona para a página inicial
      router.push("/");
    }
  };

  return (
    <>
      <div
        className="modal modalCentered fade form-sign-in modal-part-content"
        id="login"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="header">
              <div className="demo-title">Logar</div>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
                ref={closeModalButtonRef} // Adiciona referência ao botão de fechar
              />
            </div>
            <div className="tf-login-form">
              <form onSubmit={handleLogin} acceptCharset="utf-8">
                <div className="tf-field style-1">
                  <input
                    className="tf-field-input tf-input"
                    placeholder=" "
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="tf-field-label">Email *</label>
                </div>
                <div className="tf-field style-1">
                  <input
                    className="tf-field-input tf-input"
                    placeholder=" "
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="tf-field-label">Senha *</label>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                  <a
                    href="#forgotPassword"
                    data-bs-toggle="modal"
                    className="btn-link link"
                  >
                    Esqueceu a Senha?
                  </a>
                </div>
                <div className="bottom">
                  <div className="w-100">
                    <button
                      type="submit"
                      className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                    >
                      <span>Entrar</span>
                    </button>
                  </div>
                  <div className="w-100">
                    <a
                      href="#register"
                      data-bs-toggle="modal"
                      className="btn-link fw-6 w-100 link"
                    >
                      Novo por aqui? Cadastre-se
                      <i className="icon icon-arrow1-top-left" />
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
