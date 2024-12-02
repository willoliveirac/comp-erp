import React, { useState, useEffect } from "react";
import axios from "../services/api"; // Serviço de API para comunicação com o backend
import "../styles/VendaForm.css";

const VendaForm = () => {
  const [clientes, setClientes] = useState([]); // Lista de clientes para selecionar
  const [produtos, setProdutos] = useState([]); // Lista de produtos disponíveis para venda
  const [selectedCliente, setSelectedCliente] = useState(""); // Cliente selecionado
  const [selectedProduto, setSelectedProduto] = useState(""); // Produto selecionado
  const [quantidade, setQuantidade] = useState(1); // Quantidade do produto
  const [carrinho, setCarrinho] = useState([]); // Carrinho de compras
  const [valorTotal, setValorTotal] = useState(0); // Valor total da venda
  const [erro, setErro] = useState(""); // Mensagens de erro

  // Dados do novo cliente
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });

  // Carregar clientes e produtos do banco ao carregar o componente
  useEffect(() => {
    axios
      .get("/clientes")
      .then((response) => setClientes(response.data))
      .catch((err) => console.error("Erro ao carregar clientes:", err));

    axios
      .get("/produtos")
      .then((response) => setProdutos(response.data))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  // Atualiza o valor total sempre que o carrinho mudar
  useEffect(() => {
    const total = carrinho.reduce(
      (sum, item) => sum + item.preco * item.quantidade,
      0
    );
    setValorTotal(total);
  }, [carrinho]);

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = () => {
    if (!selectedProduto) {
      setErro("Selecione um produto válido.");
      return;
    }

    // Buscar o produto correspondente pelo nome
    const produto = produtos.find((p) => p.nome === selectedProduto);

    if (!produto) {
      setErro("Produto não encontrado.");
      return;
    }

    const qtd = parseInt(quantidade, 10) || 0;
    if (qtd <= 0) {
      setErro("A quantidade deve ser maior que zero.");
      return;
    }

    const produtoNoCarrinho = carrinho.find(
      (item) => item.nome === produto.nome
    );

    if (produtoNoCarrinho) {
      setCarrinho((prev) =>
        prev.map((item) =>
          item.nome === produto.nome
            ? { ...item, quantidade: item.quantidade + qtd }
            : item
        )
      );
    } else {
      setCarrinho((prev) => [
        ...prev,
        {
          produtoId: produto._id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: qtd,
        },
      ]);
    }

    setQuantidade(1);
    setSelectedProduto("");
    setErro(""); // Limpar mensagens de erro
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCliente && (!novoCliente.nome || !novoCliente.email)) {
      setErro("Por favor, preencha os campos Nome e E-mail corretamente.");
      return;
    }

    let clienteId = selectedCliente;

    if (!clienteId) {
      try {
        // Verifica se o cliente já existe pelo e-mail
        const clienteExistente = await axios.get(
          `/clientes?email=${novoCliente.email}`
        );
        if (clienteExistente.data) {
          clienteId = clienteExistente.data._id;
        } else {
          // Caso não exista, cria um novo cliente
          const response = await axios.post("/clientes", novoCliente);
          clienteId = response.data._id;
        }
      } catch (err) {
        console.error("Erro ao cadastrar/verificar cliente:", err);
        setErro("Erro ao cadastrar/verificar o cliente. Tente novamente.");
        return;
      }
    }

    const vendaData = {
      cliente: clienteId,
      valorTotal,
    };

    try {
      const response = await axios.post("/vendas", vendaData);
      if (response.status === 201) {
        alert("Venda cadastrada com sucesso!");
        // Limpar os campos após o cadastro
        setSelectedCliente("");
        setNovoCliente({ nome: "", email: "", telefone: "", endereco: "" });
        setCarrinho([]);
        setValorTotal(0);
      }
    } catch (err) {
      console.error("Erro ao cadastrar venda:", err);
      setErro("Erro ao cadastrar a venda. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Cadastrar Venda</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cliente:</label>
          <select
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
          >
            <option value="">Selecione um Cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente._id} value={cliente._id}>
                {cliente.nome}
              </option>
            ))}
          </select>
          <div>
            <h3>Ou</h3>
            <label>Nome:</label>
            <input
              type="text"
              value={novoCliente.nome}
              onChange={(e) =>
                setNovoCliente({ ...novoCliente, nome: e.target.value })
              }
              placeholder="Nome do Cliente"
            />
            <label>E-mail:</label>
            <input
              type="email"
              value={novoCliente.email}
              onChange={(e) =>
                setNovoCliente({ ...novoCliente, email: e.target.value })
              }
              placeholder="E-mail do Cliente"
            />
            <label>Telefone:</label>
            <input
              type="text"
              value={novoCliente.telefone}
              onChange={(e) =>
                setNovoCliente({ ...novoCliente, telefone: e.target.value })
              }
              placeholder="Telefone do Cliente"
            />
            <label>Endereço:</label>
            <input
              type="text"
              value={novoCliente.endereco}
              onChange={(e) =>
                setNovoCliente({ ...novoCliente, endereco: e.target.value })
              }
              placeholder="Endereço do Cliente"
            />
          </div>
        </div>

        <div>
          <label>Produtos:</label>
          {produtos.length > 0 ? (
            <>
              <select
                value={selectedProduto}
                onChange={(e) => setSelectedProduto(e.target.value)}
              >
                <option value="">Selecione um Produto</option>
                {produtos.map((produto) => (
                  <option key={produto._id} value={produto.nome}>
                    {produto.nome} - R${produto.preco}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={quantidade}
                min="1"
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="Quantidade"
              />
              <button type="button" onClick={adicionarAoCarrinho}>
                Adicionar ao Carrinho
              </button>
            </>
          ) : (
            <p>Carregando produtos...</p>
          )}
        </div>

        <div>
          <h3>Carrinho:</h3>
          {carrinho.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço Unitário</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {carrinho.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{item.quantidade}</td>
                    <td>R${item.preco.toFixed(2)}</td>
                    <td>R${(item.preco * item.quantidade).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>O carrinho está vazio.</p>
          )}
        </div>

        <div>
          <h3>Valor Total: R${valorTotal.toFixed(2)}</h3>
        </div>

        <button type="submit">Cadastrar Venda</button>
      </form>
    </div>
  );
};

export default VendaForm;
