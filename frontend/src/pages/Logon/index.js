import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "./../../services/api";
import logoImage from "./../../assets/logo.svg";
import heroesImage from "./../../assets/heroes.png";

import "./styles.css";

export default function Logon() {
  const history = useHistory();

  const [id, setID] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("profile");
    } catch {
      alert("falha no Login, tente novamente !");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImage} alt="Be the Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="sua ID"
            value={id}
            onChange={event => setID(event.target.value)}
          />

          <button type="submit" className="button">
            Entrar
          </button>

          <Link className="backlink" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImage} alt="Heroes" />
    </div>
  );
}
