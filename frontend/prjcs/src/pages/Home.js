import React, { useState } from "react";
import TabelaProdutos from "../components/TabelaProdutos"; // Importa o componente TabelaProdutos
import CadastroForm from "../components/CadastroForm"; // Importa o formulário de cadastro
import VendaForm from "../components/VendaForm";

const Home = () => {
  const [activeContent, setActiveContent] = useState("produtos"); // Define o conteúdo inicial como "produtos"

  // Função para mudar o conteúdo quando um botão for clicado
  const handleContentChange = (content) => {
    setActiveContent(content); // Atualiza o estado para o novo conteúdo
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <button onClick={() => handleContentChange("produtos")}>
          Produtos
        </button>
        <button onClick={() => handleContentChange("vendas")}>Vendas</button>
        <button onClick={() => handleContentChange("cadastro")}>
          Cadastro de Produto
        </button>
      </div>

      <div className="main-content">
        {/* Renderiza o conteúdo dependendo do estado */}
        {activeContent === "produtos" && <TabelaProdutos />}
        {activeContent === "vendas" && <VendaForm />}
        {activeContent === "cadastro" && <CadastroForm />}
      </div>
    </div>
  );
};

export default Home;
