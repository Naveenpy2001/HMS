import React, { useState, useEffect } from "react";
// import "./PatientsRegister.css";

const Dashboard = ({ setActiveTab }) => {
  const [data, setData] = useState({
    todayPatientsCount: 0,
    totalPatientsCount: 0,
    todayAppointmentsCount: 0,
    totalAppointmentsCount: 0,
    todayPayment: 0,
    totalPayment: 0,
    patientTracking: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filterVisited, setFilterVisited] = useState("all"); // Default to showing all patients

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard-data");
        const result = await response.json();
        setData(result);
        setFilteredPatients(result.patientTracking);
      } catch (error) {
        console.error("Error fetching data:", error);

        // Fallback data
        const fallbackData = [
          { name: "John Doe", visited: true, disease: "Flu", age: 45 },
          { name: "Jane Smith", visited: false, disease: "Diabetes", age: 38 },
          { name: "Mike Johnson", visited: true, disease: "Asthma", age: 50 },
        ];
        setData({
          todayPatientsCount: 12,
          totalPatientsCount: 150,
          todayAppointmentsCount: 8,
          totalAppointmentsCount: 100,
          todayPayment: 1200,
          totalPayment: 15000,
          patientTracking: fallbackData,
        });
        setFilteredPatients(fallbackData);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.patientTracking.filter((patient) => {
      const matchesTerm =
        patient.name.toLowerCase().includes(term) ||
        patient.disease.toLowerCase().includes(term) ||
        patient.age.toString().includes(term);
      const matchesVisited =
        filterVisited === "all" ||
        (filterVisited === "visited" && patient.visited) ||
        (filterVisited === "not_visited" && !patient.visited);

      return matchesTerm && matchesVisited;
    });

    setFilteredPatients(filtered);
  };

  const handleFilterVisitedChange = (e) => {
    const filter = e.target.value;
    setFilterVisited(filter);

    const filtered = data.patientTracking.filter((patient) => {
      const matchesTerm =
        patient.name.toLowerCase().includes(searchTerm) ||
        patient.disease.toLowerCase().includes(searchTerm) ||
        patient.age.toString().includes(searchTerm);
      const matchesVisited =
        filter === "all" ||
        (filter === "visited" && patient.visited) ||
        (filter === "not_visited" && !patient.visited);

      return matchesTerm && matchesVisited;
    });

    setFilteredPatients(filtered);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-container">
        <div
          className="stats-card"
          style={{ backgroundColor: "#FFDDC1", cursor: "pointer" }}
          onClick={() => setActiveTab("Billing")}
        >
          <h2>Today's Patients</h2>
          <p className="count" data-target={data.todayPatientsCount}>
            {data.todayPatientsCount}
          </p>
        </div>
        <div
          className="stats-card"
          style={{ backgroundColor: "#FFABAB", cursor: "pointer" }}
          onClick={() => setActiveTab("Billing")}
        >
          <h2>Total Patients</h2>
          <p className="count" data-target={data.totalPatientsCount}>
            {data.totalPatientsCount}
          </p>
        </div>
        <div className="stats-card" style={{ backgroundColor: "#FFC3A0" }}>
          <h2>Today's Appointments</h2>
          <p className="count" data-target={data.todayAppointmentsCount}>
            {data.todayAppointmentsCount}
          </p>
        </div>
        <div className="stats-card" style={{ backgroundColor: "#D5AAFF" }}>
          <h2>Total Appointments</h2>
          <p className="count" data-target={data.totalAppointmentsCount}>
            {data.totalAppointmentsCount}
          </p>
        </div>
        <div
          className="stats-card"
          style={{ backgroundColor: "#B9FBC0", cursor: "pointer" }}
          onClick={() => setActiveTab("Billing")}
        >
          <h2>Today's Payment</h2>
          <p className="count" data-target={data.todayPayment}>
            ₹{data.todayPayment.toLocaleString("en-IN")} /-
          </p>
        </div>
        <div
          className="stats-card"
          style={{ backgroundColor: "#C2C2F0", cursor: "pointer" }}
          onClick={() => setActiveTab("Billing")}
        >
          <h2>Total Payment</h2>
          <p className="count" data-target={data.totalPayment}>
            ₹{data.totalPayment.toLocaleString("en-IN")} /-
          </p>
        </div>
      </div>

      <div className="tracking-container">
        <h2>Patient Tracking</h2>
        <div className="filter-container">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, disease, or age..."
            className="search-input"
          />

          <select
            value={filterVisited}
            onChange={handleFilterVisitedChange}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="visited">Visited</option>
            <option value="not_visited">Not Visited</option>
          </select>
        </div>

        <table className="tracking-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Disease</th>
              <th>Age</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.name}</td>
                  <td>{patient.disease}</td>
                  <td>{patient.age}</td>
                  <td>{patient.visited ? "Visited" : "Not Visited"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
