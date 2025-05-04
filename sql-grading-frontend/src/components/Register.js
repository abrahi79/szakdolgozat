import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Alapértelmezett: diák
  const [name, setName] = useState(""); //  Név
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
        role, // Küldjük el a kiválasztott szerepkört is
      });
      alert("Sikeres regisztráció! Most jelentkezz be.");
      navigate("/login"); // Sikeres regisztráció után bejelentkezésre irányít
    } catch (error) {
      alert("Regisztrációs hiba! Lehet, hogy az e-mail már létezik.");
    }
  };

  return (
    <div className="container">
      <h2>Regisztráció</h2>
      <form onSubmit={handleRegister}>
      <input
          type="text"
          placeholder="Név"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
      />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Diák</option>
          <option value="teacher">Tanár</option>
        </select>
        <button type="submit">Regisztráció</button>
      </form>
    </div>
  );
};

export default Register;
