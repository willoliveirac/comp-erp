import React, { useState } from "react";
import "../styles/CadastroForm.css";
import axios from "axios";

const FormCadastroProduto = ({ onCadastrar }) => {
  const [produto, setProduto] = useState({
    nome: "",
    categoria: "",
    preco: "",
    quantidade: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Para mostrar o estado de carregamento

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Limpa mensagens de erro antes de enviar

    try {
      // Faz a requisição POST para o servidor Spring
      const response = await axios.post(
        "http://localhost:8080/produtos",
        produto
      );

      if (response.status === 200) {
        alert("Produto cadastrado com sucesso!");
        setProduto({
          nome: "",
          categoria: "",
          preco: "",
          quantidade: "",
        });
        onCadastrar(); // Chama a função para alterar o estado na Home ou realizar outra ação
      }
    } catch (err) {
      setError("Erro ao cadastrar produto. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-cadastro">
      <h2>Cadastro de Produto</h2>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Categoria:</label>
        <input
          type="text"
          name="categoria"
          value={produto.categoria}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Preço:</label>
        <input
          type="number"
          name="preco"
          value={produto.preco}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Quantidade:</label>
        <input
          type="number"
          name="quantidade"
          value={produto.quantidade}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Cadastrar Produto</button>
    </form>
  );
};

export default FormCadastroProduto;
