import React, { useState, useEffect } from "react";
import axios from "axios";

const DatasetInfo = ({ datasetName }) => {
  const [columns, setColumns] = useState([]);
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    const fetchDatasetInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/dataset-info/${datasetName}`);
        setColumns(res.data.columns);
        setSampleData(res.data.sampleData);
      } catch (err) {
        console.error("Hiba a tábla információinak lekérésekor:", err);
      }
    };

    fetchDatasetInfo();
  }, [datasetName]);

  return (
    <div style={{ marginTop: "15px" }}>
      <h4 style={{ marginBottom: "5px", color: "#555" }}>{datasetName} szerkezete:</h4>
      <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "15px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "5px", background: "#f0f0f0" }}>Oszlop neve</th>
            <th style={{ border: "1px solid #ccc", padding: "5px", background: "#f0f0f0" }}>Adattípus</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((col) => (
            <tr key={col.column_name}>
              <td style={{ border: "1px solid #ccc", padding: "5px" }}>{col.column_name}</td>
              <td style={{ border: "1px solid #ccc", padding: "5px" }}>{col.data_type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 style={{ marginBottom: "5px", color: "#555" }}>Mintaadatok:</h4>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.column_name} style={{ border: "1px solid #ccc", padding: "5px", background: "#f0f0f0" }}>
                {col.column_name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.column_name} style={{ border: "1px solid #ccc", padding: "5px" }}>
                  {row[col.column_name]?.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatasetInfo;
