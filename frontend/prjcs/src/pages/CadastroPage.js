import React, { useState } from "react";
import axios from "../services/api";
import "../styles/CadastroPage.css";
import { useNavigate } from "react-router-dom";

const CadastroPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/usuarios", {
        nome,
        email,
        senha,
      });

      if (response.status == 201) {
        alert("Conta criada com sucesso!");
        navigate("/");
      } else if (response.status == 302) {
        alert("Email já cadastrado.");
      }
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        // Erro da resposta HTTP (status, mensagem de erro)
        setErro("Erro ao criar a conta: Email Cadastrado " + err);
      } else if (err.request) {
        // Erro na requisição (problema com a conexão de rede, por exemplo)
        setErro("Erro na requisição: Não foi possível se conectar ao servidor");
      } else {
        // Outro tipo de erro
        setErro("Erro desconhecido: " + err.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2>Criar Conta</h2>
        {erro && <p className="error-message">{erro}</p>}
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="signup-button">
          Cadastrar
        </button>
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/")}
        >
          Voltar para Login
        </button>
      </form>
    </div>
  );
};

export default CadastroPage;
