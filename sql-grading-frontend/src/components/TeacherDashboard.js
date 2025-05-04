// --- importok ---
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCreate from "../components/TaskCreate";
import CreateExam from './CreateExam';

// --- Token dekódoló ---
function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Token dekódolás hiba:", err);
    return null;
  }
}

// --- Fő komponens ---
const TeacherDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [solutionsByTaskId, setSolutionsByTaskId] = useState({});
  const [examResults, setExamResults] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");

  const token = localStorage.getItem("token");
  const decoded = decodeToken(token);
  const teacherName = decoded?.name;

  // --- Feladatok betöltése ---
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
        console.log("Feladatok:", res.data); // 💡 EZ A LOG
      } catch (err) {
        console.error("Hiba a feladatok lekérésénél:", err);
      }
    };
    fetchTasks();
  }, [token]);

  // --- Vizsgák kilistázása a lenyílóhoz ---
  const examIds = [...new Set(tasks.map((t) => t.exam_id).filter(Boolean))];

  // --- Összesített eredmények ---
  const fetchExamSummary = async () => {
    if (!selectedExamId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/exams/${selectedExamId}/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExamResults(res.data);
    } catch (err) {
      console.error("Hiba az összesítés lekérésekor:", err);
    }
  };

  // --- Megoldások lekérése ---
  const fetchSolutions = async (taskId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${taskId}/solutions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSolutionsByTaskId((prev) => ({
        ...prev,
        [taskId]: res.data,
      }));
    } catch (err) {
      console.error("Hiba a megoldások lekérdezésekor:", err);
    }
  };

  // --- Megjelenítés ---
  return (
    <div className="container">
  
      <h2>Üdvözlünk, {teacherName}! 👨‍🏫</h2>
      <p>Itt láthatod a saját feltöltött feladataidat és dolgozataidat.</p>
  
      {/* 💎 Kártya: Dolgozat létrehozó */}
      <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px", borderRadius: "8px", background: "#fefefe" }}>
        <h3>📝 Új dolgozat létrehozása</h3>
        <CreateExam />
      </div>
  
      {/*  Kártya: Feladat létrehozó */}
      <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px", borderRadius: "8px", background: "#fefefe" }}>
        <h3>➕ Új feladat feltöltése</h3>
        <TaskCreate />
      </div>
  
      {/*  Kártya: Dolgozat eredmények */}
      <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px", borderRadius: "8px", background: "#fefefe" }}>
        <h3>📊 Dolgozat eredmények (összesített)</h3>
  
        <label>Válassz egy dolgozatot:</label>
        <select value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)}>
          <option value="">-- válassz --</option>
          {examIds.map(id => (
            <option key={id} value={id}>Dolgozat #{id}</option>
          ))}
        </select>
  
        <button onClick={fetchExamSummary} disabled={!selectedExamId} style={{ marginLeft: "10px" }}>
          Eredmények betöltése
        </button>
  
        {examResults.length > 0 && (
          <table style={{ width: "100%", marginTop: "15px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Diák neve</th>
                <th>Helyes feladatok</th>
                <th>Összes feladat</th>
                <th>Százalék</th>
                <th>Osztályzat</th>
              </tr>
            </thead>
            <tbody>
              {examResults.map(res => (
                <tr key={res.student_name}>
                  <td>{res.student_name}</td>
                  <td>{res.correct}</td>
                  <td>{res.total_tasks}</td>
                  <td>{res.percent}%</td>
                  <td>{res.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
  
      {/*  Kártya: Feladatlista és megoldások */}
      <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px", borderRadius: "8px", background: "#fefefe" }}>
        <h3>📚 Feltöltött feladatok és megoldások</h3>
  
        {/*  Csoportosítás exam_id alapján */}
{[...new Set(tasks.map(task => task.exam_id))].map(examId => (
  <div key={examId} style={{ marginBottom: "40px", padding: "15px", border: "2px solid #999", borderRadius: "8px" }}>
    <h3>🟣 Dolgozat #{examId}</h3>

    {tasks.filter(task => task.exam_id === examId).map((task) => (
      <div key={task.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>

        <button onClick={() => fetchSolutions(task.id)}>
          Beküldött megoldások megtekintése
        </button>

        {solutionsByTaskId[task.id] && (
          <div style={{ marginTop: "15px" }}>
            <h5>Beküldött megoldások:</h5>
            {solutionsByTaskId[task.id].length === 0 ? (
              <p>Nincs beküldött megoldás.</p>
            ) : (
              solutionsByTaskId[task.id].map((sol) => (
                <div key={sol.id} style={{
                  background: "#f5f5f5", padding: "10px", borderRadius: "6px", marginBottom: "10px"
                }}>
                  <p>👤 <strong>{sol.student_name}</strong></p>
                  <pre style={{ background: "#e8e8e8", padding: "8px" }}>
                    {sol.sql_query}
                  </pre>
                  <p>🕒 {new Date(sol.submitted_at).toLocaleString()}</p>
                  <p style={{ fontWeight: "bold", color: sol.is_correct ? "green" : "red" }}>
                    {sol.is_correct ? " Helyes megoldás" : " Helytelen megoldás"}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    ))}
  </div>
))}

      </div>
  
    </div>
  );
  
};

export default TeacherDashboard;
