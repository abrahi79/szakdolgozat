import React, { useState } from "react";
import axios from "axios";

const CreateExam = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        "http://localhost:5000/api/exams",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(" Dolgozat sikeresen létrehozva!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Hiba a dolgozat létrehozásakor:", err);
      setMessage(" Hiba történt a dolgozat létrehozása közben.");
    }
  };

  return (
    <div className="container">
      <h2>Új dolgozat létrehozása</h2>
      {message && <p><strong>{message}</strong></p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dolgozat címe"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Dolgozat leírása"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Dolgozat létrehozása</button>
      </form>
    </div>
  );
};

export default CreateExam;
