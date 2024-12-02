import React, { useState } from "react";
import api from "../services/api";

const UsuarioForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/usuarios", { nome, email, senha })
      .then(() => {
        alert("Usuário criado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
      })
      .catch((error) => console.error("Erro ao criar usuário:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar Usuário</h1>
      <label>
        Nome:
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Senha:
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </label>
      <button type="submit">Criar</button>
    </form>
  );
};

export default UsuarioForm;
