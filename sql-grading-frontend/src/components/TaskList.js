import React, { useEffect, useState } from "react";
import axios from "axios";
import DatasetInfo from './DatasetInfo';


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
  

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [solutions, setSolutions] = useState({}); // feladatID -> SQL
  const [message, setMessage] = useState("");
  let userName = "";

  const token = localStorage.getItem("token");

  if (token) {
    try {
        const decoded = decodeToken(token);

     

      console.log("Frontend - tokenből kiolvasott név:", decoded.name);
      userName = decoded.name;
    } catch (err) {
      console.error("Token dekódolás hiba:", err);
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Hiba a feladatok betöltésekor:", err);
      }
    };

    fetchTasks();
  }, []);

  const handleSolutionChange = (taskId, value) => {
    setSolutions((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleSubmitSolution = async (taskId) => {
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/solutions",
        {
          task_id: taskId,
          sql_query: solutions[taskId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ Megoldás sikeresen elmentve!");
    } catch (error) {
      console.error("Hiba beküldéskor:", error);
      setMessage("❌ Hiba a megoldás beküldésekor.");
    }
  };

  return (
    <div className="container">
      <h2>Üdvözlünk, {userName}!</h2>
      <p>Válassz egy feladatot, és küldd be az SQL megoldásod:</p>

      {message && <p><strong>{message}</strong></p>}

            {tasks.length === 0 ? (
        <p>Nincs elérhető feladat.</p>
      ) : (
        tasks.map((task) => {    

          console.log("Task:", task);  

          return (   // <<< most már kell a return
            <div
              key={task.id}
              style={{
                background: "#fff",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <DatasetInfo datasetName={task.dataset_name} />
{task.dataset_name_2 && (
  <DatasetInfo datasetName={task.dataset_name_2} />
)}

            
              <p style={{ fontSize: "0.9rem", color: "#777" }}>
                Feltöltötte: {task.teacher_name} –{" "}
                {new Date(task.created_at).toLocaleString()}
              </p>

              <textarea
                placeholder="Írd ide az SQL megoldásod..."
                value={solutions[task.id] || ""}
                onChange={(e) => handleSolutionChange(task.id, e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "80px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />

              <button onClick={() => handleSubmitSolution(task.id)}>
                Beküldés
              </button>
            </div>
          );
        })   
      )}

    </div>
    
  );
};

export default TaskList;
