import React, { useState } from "react";
import axios from "axios";
import DatasetInfo from "../components/DatasetInfo";

const Practice = () => {
    const [datasets] = useState(["students_dataset", "employees_dataset", "products_dataset", "grades_dataset",
  "attendance_dataset" ]);
    const [selectedDataset, setSelectedDataset] = useState("");
    const [sql, setSql] = useState("");
    const [practiceResult, setPracticeResult] = useState([]);
    const [practiceError, setPracticeError] = useState("");
    const token = localStorage.getItem("token");

    const handlePractice = async () => {
        setPracticeError("");
        setPracticeResult([]);
        if (!sql.trim()) return;

        try {
            const res = await axios.post("http://localhost:5000/api/try-sql", { sql_query: sql }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPracticeResult(res.data.rows);
        } catch (err) {
            console.error("Hiba a gyakorló lekérdezésnél:", err);
            setPracticeError("Hibás lekérdezés vagy szerverhiba.");
        }
    };

    return (
        <div className="container">
            <h2>🔍 Gyakorló felület</h2>
            <p>Válassz egy adatbázist, hogy megnézd a táblát és próbálj lekérdezéseket írni!</p>

            <select value={selectedDataset} onChange={(e) => setSelectedDataset(e.target.value)}>
                <option value="">-- Válassz táblát --</option>
                {datasets.map((ds) => (
                    <option key={ds} value={ds}>{ds}</option>
                ))}
            </select>

            {selectedDataset && (
                <div style={{ marginTop: "20px" }}>
                    <DatasetInfo datasetName={selectedDataset} />

                    <div style={{ marginTop: "20px" }}>
                        <h3>SQL Lekérdezés próbálkozás</h3>
                        <textarea
                            placeholder="Írd ide az SQL lekérdezésed..."
                            value={sql}
                            onChange={(e) => setSql(e.target.value)}
                            style={{ width: "100%", minHeight: "80px" }}
                        />

                        <button onClick={handlePractice} style={{ marginTop: "10px" }}>
                            Lekérdezés futtatása
                        </button>

                        {practiceError && <p style={{ color: "red" }}>{practiceError}</p>}

                        {practiceResult.length > 0 && (
                            <table border="1" cellPadding="5" style={{ marginTop: "10px", width: "100%" }}>
                                <thead>
                                    <tr>
                                        {Object.keys(practiceResult[0]).map((col) => (
                                            <th key={col}>{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {practiceResult.map((row, i) => (
                                        <tr key={i}>
                                            {Object.values(row).map((val, j) => (
                                                <td key={j}>{val?.toString()}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Practice;
