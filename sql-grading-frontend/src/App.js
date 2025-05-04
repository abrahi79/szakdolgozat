import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import TaskCreate from "./components/TaskCreate";
import TeacherDashboard from "./components/TeacherDashboard";
import Navbar from "./components/Navbar";
import PracticePage from "./components/PracticePage"; // ha ide tetted
//import TaskList from "./components/TaskList";
import ExamList from "./components/ExamList";   // új import
import Footer from "./components/Footer";   



import "./styles/main.css"; // 👈 Itt marad a meglévő stílusod

function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>SQL Automatikus lekérdezés-kiértékelő rendszer</h1>
      <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "20px" }}>
        Egy modern platform SQL feladatok kijavítására és értékelésére
      </p>
      <div>
        <Link to="/login" style={{ margin: "10px", padding: "10px 20px", borderRadius: "5px", backgroundColor: "#007bff", color: "white", textDecoration: "none" }}>Bejelentkezés</Link>
        <Link to="/register" style={{ margin: "10px", padding: "10px 20px", borderRadius: "5px", backgroundColor: "#6c757d", color: "white", textDecoration: "none" }}>Regisztráció</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar /> {/* 🆕 Felül mindig megjelenik */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-task" element={<TaskCreate />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/practice" element={<PracticePage />} />
    
        <Route path="/tasks" element={<ExamList />} /> 

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
