// src/components/TabelaProdutos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TabelaProduto.css";

const TabelaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Função para buscar os produtos
  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/produtos");
      setProdutos(response.data); // Armazena os produtos no estado
    } catch (err) {
      setError("Erro ao carregar produtos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos(); // Chama a função ao montar o componente
  }, []);

  return (
    <div className="tabela-produtos">
      {loading ? (
        <p>Carregando produtos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.categoria}</td>
                <td>{produto.preco}</td>
                <td>{produto.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TabelaProdutos;
