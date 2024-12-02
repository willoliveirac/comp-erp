import React, { useEffect, useState } from "react";
import api from "../services/api";

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api
      .get("/usuarios")
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error("Erro ao carregar usuários:", error));
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuarioList;
