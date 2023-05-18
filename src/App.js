import { useState } from "react";
import api from "./services/api";
import { FiSearch } from "react-icons/fi";
import "./styles.css";

function App() {
  const [input, setInput] = useState("01001000");
  const [cep, setCep] = useState({});

  function validateCep() {
    if (input === "") {
      alert("Preencha o campo com o cep desejado");
      return false;
    }
    if (input.length !== 8) {
      alert("O CEP deve ter 8 dígitos");
      return false;
    }
    return true;
  }

  async function handleSearch() {
    if (!validateCep()) {
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      verification(response);
    } catch (error) {
      alert("Erro ao buscar!");
      setInput("");
    }
  }

  function verification(response) {
    if (Object.keys(response.data).length === 1) {
      alert("Verifique o campo preenchido e tente novamente!");
      return;
    }
    setCep(response.data);
    setInput("");
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de Cep</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main className="main">
          <h2 className="cep">CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span> {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
