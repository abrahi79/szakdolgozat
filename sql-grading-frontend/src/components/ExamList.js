import React, { useEffect, useState } from "react";
import axios from "axios";
import DatasetInfo from './DatasetInfo';


const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [solutions, setSolutions] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({}); // <- így objektum lesz belőle

  
  const [evaluation, setEvaluation] = useState(null);  //  dolgozat kiértékelése
const [showEvaluation, setShowEvaluation] = useState(false); // értékelés láthatósága


  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/exams");
        setExams(res.data);
      } catch (err) {
        console.error("Hiba a dolgozatok lekérésekor:", err);
      }
    };

    fetchExams();
  }, []);

  // Jegy számítás segédfüggvény
const calculateGrade = (percent) => {
    if (percent >= 90) return 5;
    if (percent >= 75) return 4;
    if (percent >= 60) return 3;
    if (percent >= 40) return 2;
    return 1;
  };
  

  const fetchTasksForExam = async (examId) => {
    setMessage("");
    try {
      const res = await axios.get(`http://localhost:5000/api/exams/${examId}/tasks`);
      setTasks(res.data);
      setSelectedExam(examId);
    } catch (err) {
      console.error("Hiba a feladatok lekérésekor:", err);
    }
  };

  const fetchEvaluation = async (examId) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/exams/${examId}/evaluation`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setEvaluation(res.data);
        setShowEvaluation(true);
    } catch (err) {
        console.error("Hiba az értékelés lekérésekor:", err);
    }
};


  const handleSolutionChange = (taskId, value) => {
    setSolutions((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleSubmitSolution = async (taskId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/solutions",
        {
          task_id: taskId,
          sql_query: solutions[taskId],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(prev => ({ ...prev, [taskId]: " Megoldás sikeresen elmentve!" }));
      await fetchTasksForExam(selectedExam);  //  újratöltjük a feladatokat
    } catch (error) {
      console.error("Hiba a beküldéskor:", error);
      setMessages(prev => ({ ...prev, [taskId]: " Hiba a megoldás beküldésekor." }));
    }
  };


  return (
    <div className="container">
      <h2>Elérhető dolgozatok</h2>

      {message && <p><strong>{message}</strong></p>}

      {/* Dolgozatok listája - Szépített */}
<h3>Elérhető dolgozatok</h3>
<ul style={{ listStyle: "none", padding: 0 }}>
  {exams.map(exam => (
    <li key={exam.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", background: "#fafafa" }}>
      <strong>{exam.title}</strong>
      <button style={{ marginLeft: "10px" }} onClick={() => fetchTasksForExam(exam.id)}>Megnyitás</button>
    </li>
  ))}
</ul>


      {/* Feladatok, ha választottunk dolgozatot */}
      {selectedExam && (
        <>
          <h3>Feladatok ebben a dolgozatban:</h3>

             {/*  Kiértékelő */}
      <button style={{marginTop: "10px"}} onClick={() => fetchEvaluation(selectedExam)}>
          Dolgozat kiértékelése
      </button>

      {showEvaluation && evaluation && (
          <div style={{marginTop: "15px", padding: "10px", background: "#f9f9f9", borderRadius: "5px"}}>
              <p><strong>Dolgozat értékelés:</strong></p>
              <p>Feladatok száma: {evaluation.total}</p>
              <p>Helyes megoldások: {evaluation.correct}</p>
              <p>Százalék: {evaluation.percent}%</p>
              <p>Osztályzat: {evaluation.grade}</p>
          </div>
      )}  



          {tasks.length === 0 ? (
            <p>Nincs feladat ehhez a dolgozathoz.</p>
          ) : (
            tasks.map((task) => (
                <div key={task.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", background: "#fefefe" }}>
                  <h4 style={{ color: "#333" }}>{task.title}</h4>
                  <p style={{ marginBottom: "10px", color: "#555" }}>{task.description}</p>
              
                  <div style={{ padding: "8px", background: "#f9f9f9", borderRadius: "5px" }}>
                    <strong> Minta tábla:</strong>
                    <DatasetInfo datasetName={task.dataset_name} />
{task.dataset_name_2 && (
  <DatasetInfo datasetName={task.dataset_name_2} />
)}

                  </div>

                <textarea
                  placeholder="Írd ide az SQL megoldásod..."
                  value={solutions[task.id] || ""}
                  onChange={(e) => handleSolutionChange(task.id, e.target.value)}
                  style={{ width: "100%", minHeight: "80px" }}
                />
               {messages[task.id] && (
  <p style={{ color: messages[task.id].includes("sikeresen") ? "green" : "red" }}>
    {messages[task.id]}
  </p>
)}



                <button onClick={() => handleSubmitSolution(task.id)}>Beküldés</button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ExamList;
