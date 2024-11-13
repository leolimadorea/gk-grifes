"use client";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

// Importação dinâmica do Bootstrap Modal
const Modal = dynamic(() => import("bootstrap").then((mod) => mod.Modal), {
  ssr: false,
});

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const modalRef = useRef(null);
  const [isModalLoaded, setIsModalLoaded] = useState(false);

  useEffect(() => {
    // Marca o modal como carregado quando o Bootstrap Modal está disponível
    if (Modal) setIsModalLoaded(true);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(res, "DATA");
      if (res.ok) {
        // Registro bem-sucedido, agora faça login automaticamente
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        console.log(signInResult, "RESULTADO DA CRICACAO");
        if (signInResult.ok) {
          // Exibir o toast de sucesso
          toast.success("Usuário registrado com sucesso!");
          router.push("/");
        } else {
          setError("Erro ao fazer login após o registro.");
        }
      } else {
        setError(data.error || "Erro ao registrar.");
      }
    } catch (error) {
      setError("Erro ao registrar. Tente novamente.");
    }
  };

  return (
    <>
      <div
        className="modal modalCentered fade form-sign-in modal-part-content"
        id="register"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="header">
              <div className="demo-title">Registro</div>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="tf-login-form">
              <form onSubmit={handleRegister} className="">
                <div className="tf-field style-1">
                  <input
                    className="tf-field-input tf-input"
                    placeholder=" "
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <label className="tf-field-label">Nome</label>
                </div>

                <div className="tf-field style-1">
                  <input
                    className="tf-field-input tf-input"
                    placeholder=" "
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <label className="tf-field-label">Email *</label>
                </div>

                <div className="tf-field style-1">
                  <input
                    className="tf-field-input tf-input"
                    placeholder=" "
                    type="password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <label className="tf-field-label">Senha *</label>
                </div>

                <div className="bottom">
                  <button
                    type="submit"
                    className="tf-btn btn-fill animate-hover-btn radius-3 w-100 justify-content-center"
                  >
                    Registrar
                  </button>
                  {error && (
                    <div className="w-100 mt-2">
                      <p style={{ color: "red" }}>{error}</p>
                    </div>
                  )}
                  <div className="w-100 mt-2">
                    <a
                      href="#login"
                      data-bs-toggle="modal"
                      className="btn-link fw-6 w-100 link"
                    >
                      Já tem uma conta? Faça login aqui
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
