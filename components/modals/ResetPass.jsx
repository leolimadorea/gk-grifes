"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPass() {
  const [email, setEmail] = useState("");

  const handleGenerateResetLink = async () => {
    if (!email) {
      toast.error("Por favor, insira seu email.");
      return;
    }

    try {
      const response = await axios.post("/api/generateResetPasswordLink", {
        email,
      });

      toast.success("Link de redefinição enviado para seu email!");
      console.log("Reset Link:", response.data.resetLink);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(
          "Usuário não encontrado. Verifique o email e tente novamente."
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Erro ao gerar o link de redefinição. Tente novamente."
        );
      }
      console.error("Erro ao gerar o link:", error.response || error);
    }
  };

  return (
    <div
      className="modal modalCentered fade form-sign-in modal-part-content"
      id="forgotPassword"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Redefinir sua senha</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="tf-login-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGenerateResetLink();
              }}
              className=""
            >
              <div>
                <p>Insira seu e-mail para enviarmos a redefinição de senha.</p>
              </div>
              <div className="tf-field style-1">
                <input
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="tf-field-label" htmlFor="email">
                  Email *
                </label>
              </div>
              <div>
                <a
                  href="#login"
                  data-bs-toggle="modal"
                  className="btn-link link"
                >
                  Cancelar
                </a>
              </div>
              <div className="bottom">
                <div className="w-100">
                  <button
                    type="submit"
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                  >
                    <span>Redefinir senha</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
