import React, { useState } from "react";
import axios from "../services/api"; // Altere para o caminho correto do seu serviço de API
import "../styles/LoginPage.css"; // Arquivo de estilos para a página de login
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        senha,
      });
      if (response.status === 202) {
        localStorage.setItem("token", response.data.token);
        alert("Login realizado com sucesso!");
        navigate("/home");
      } else {
        if (response.status === 204) setError("Email não cadastrado");

        if (response.status === 403) setError("Senha incorreta.");
      }
    } catch (err) {
      console.log(err);
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Entrar
        </button>
        <p className="sign-up-text">Não tem uma conta?</p>
        <button
          type="button"
          className="sign-up-button"
          onClick={() => navigate("/cadastro")}
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
