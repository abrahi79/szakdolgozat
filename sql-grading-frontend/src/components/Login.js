import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Sikeres bejelentkezés!");
      //navigate("/profile");
      if (response.data.token) {
        const token = response.data.token;
        const decoded = JSON.parse(atob(token.split('.')[1])); // egyszerű JWT dekódolás
        if (decoded.role === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/tasks"); //  diák ide kerül bejelentkezés után
        }
      }
      
    } catch (error) {
      alert("Hibás email vagy jelszó!");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
      <h2>Bejelentkezés</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Bejelentkezés</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
