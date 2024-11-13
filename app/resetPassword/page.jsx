"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error("Token não encontrado na URL", { autoClose: 3000 });
    }
  }, [searchParams]);

  const handleResetPassword = async () => {
    if (!token) {
      toast.error("Token inválido ou ausente!", { autoClose: 3000 });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem!", { autoClose: 3000 });
      return;
    }

    try {
      await axios.post("/api/auth/resetPassword", {
        token,
        newPassword,
      });
      toast.success("Senha redefinida com sucesso!", { autoClose: 3000 });
      router.push("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erro ao redefinir senha. Tente novamente.",
        {
          autoClose: 3000,
        }
      );
      console.error("Erro ao redefinir senha:", error.response || error);
    }
  };

  return (
    <div>
      <input
        type="password"
        placeholder="Nova Senha"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword} disabled={!token}>
        Redefinir
      </button>
    </div>
  );
};

export default ResetPasswordPage;
