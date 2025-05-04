import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [solutionQuery, setSolutionQuery] = useState("");
  const [datasetName, setDatasetName] = useState("employees_dataset");
  const [examId, setExamId] = useState(""); // új
  const [exams, setExams] = useState([]);  // új
  const [message, setMessage] = useState("");
  const [datasetName2, setDatasetName2] = useState("");


  const token = localStorage.getItem("token");

  //  Dolgozatok lekérése
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          solution_query: solutionQuery,
          dataset_name: datasetName,
          dataset_name_2: datasetName2, 
          exam_id: examId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(" Feladat sikeresen feltöltve!");
      setTitle("");
      setDescription("");
      setSolutionQuery("");
      setDatasetName("employees_dataset");
      setExamId("");
    } catch (err) {
      console.error("Hiba a feladat feltöltésekor:", err);
      setMessage(" Hiba történt a feltöltéskor.");
    }
  };

  return (
    <div className="container">
      <h2>Új feladat feltöltése</h2>
      {message && <p><strong>{message}</strong></p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Feladat címe"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Feladat leírása"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <textarea
          placeholder="Helyes megoldás SQL-lekérdezése"
          value={solutionQuery}
          onChange={(e) => setSolutionQuery(e.target.value)}
          required
        />

        {/*  Táblaválasztó */}
<label>Adattábla kiválasztása:</label>
<select value={datasetName} onChange={(e) => setDatasetName(e.target.value)}>
  <option value="">-- válassz táblát --</option>
  <option value="students_dataset">students_dataset</option>
  <option value="grades_dataset">grades_dataset</option>
  <option value="employees_dataset">employees_dataset</option>
  <option value="attendance_dataset">attendance_dataset</option>
  <option value="products_dataset">products_dataset</option>
</select>

{/*  Második tábla (opcionális) */}
<select value={datasetName2} onChange={(e) => setDatasetName2(e.target.value)}>
  <option value="">(Nincs második tábla)</option>
  <option value="employees_dataset">employees_dataset</option>
  <option value="students_dataset">students_dataset</option>
  <option value="products_dataset">products_dataset</option>
  <option value="grades_dataset">grades_dataset</option>
  <option value="attendance_dataset">attendance_dataset</option>
</select>


        {/*  Dolgozat választó */}
        <select value={examId} onChange={(e) => setExamId(e.target.value)} required>
          <option value="">Válassz dolgozatot</option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.title}
            </option>
          ))}
        </select>

        <button type="submit">Feltöltés</button>
      </form>
    </div>
  );
};

export default TaskUpload;
