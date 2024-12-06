"use client";
import { useEffect, useState } from "react";

const Callback = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obter o código da URL
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      // Fazer a solicitação para obter o token
      const fetchToken = async () => {
        try {
          const response = await fetch("/api/melhor-envio/getToken", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              grant_type: "authorization_code",
              code: authorizationCode,
            }),
          });

          if (!response.ok) {
            throw new Error("Erro ao solicitar o token");
          }

          const data = await response.json();
          setAccessToken(data.access_token);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchToken();
    } else {
      setError("Código de autorização não encontrado na URL.");
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Callback - Token de Acesso</h1>
      {error ? (
        <p style={{ color: "red" }}>Erro: {error}</p>
      ) : accessToken ? (
        <div>
          <h2>Access Token Obtido:</h2>
          <pre>{accessToken}</pre>
        </div>
      ) : (
        <p>Processando...</p>
      )}
    </div>
  );
};

export default Callback;
