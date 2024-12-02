import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rota para a página de login */}
          <Route path="/" element={<LoginPage />} />

          {/* Rota para a página de cadastro */}
          <Route path="/cadastro" element={<CadastroPage />} />

          {/* Redireciona rotas desconhecidas para o login */}
          <Route path="*" element={<Navigate to="/" />} />
          {}
          <Route
            path="/home"
            element={isAuthenticated() ? <Home /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
