import React, { useState, useEffect } from "react";
import { API_URL } from "../../API";

function MedicalTests({ token }) {
  const [data, setData] = useState({
    TodaypatientCount: 0,
    TotalpatientCount: 0,
    patientTracking: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filterVisited, setFilterVisited] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/records`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP fetching error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result);

        const patientTrackingData = Array.isArray(result) ? result : [result];
        const records = result.records || [];
        setData({
          TodaypatientCount: result.TodaypatientCount || 0,
          TotalpatientCount: result.TotalpatientCount || 0,
          patientTracking: records,
        });
        setFilteredPatients(records);
       
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [token]);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterPatients(term, filterVisited, filterDate);
  };

  const handleFilterVisitedChange = (e) => {
    const filter = e.target.value;
    setFilterVisited(filter);
    filterPatients(searchTerm, filter, filterDate);
  };

  const handleDateFilterChange = (e) => {
    const filter = e.target.value;
    setFilterDate(filter);
    filterPatients(searchTerm, filterVisited, filter);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterVisited("all");
    setFilterDate("");
    setFilteredPatients(data.patientTracking);
  };

  const filterPatients = (term, visitedFilter, dateFilter) => {
    const filtered = data.patientTracking.filter((patient) => {
      const matchesTerm =
        patient.firstName.toLowerCase().includes(term) ||
        patient.disease.toLowerCase().includes(term) ||
        patient.age.toString().includes(term);
      const matchesVisited =
        visitedFilter === "all" ||
        (visitedFilter === "visited" && patient.visited) ||
        (visitedFilter === "not_visited" && !patient.visited);
      const matchesDate = dateFilter === "" || patient.date === dateFilter;

      return matchesTerm && matchesVisited && matchesDate;
    });

    setFilteredPatients(filtered);
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleBackClick = () => {
    setSelectedPatient(null);
  };

  return (
    <div>
      <h1>Patients Data</h1>

      {selectedPatient ? (
        <div className="patient-details">
          <button onClick={handleBackClick} className="back-button">
            Back
          </button>
          <h2>Patient Details</h2>
          <p><strong>ID:</strong> {selectedPatient.id}</p>
          <p><strong>First Name:</strong> {selectedPatient.firstName}</p>
          <p><strong>Last Name:</strong> {selectedPatient.lastName}</p>
          <p><strong>Email:</strong> {selectedPatient.email}</p>
          <p><strong>Disease:</strong> {selectedPatient.disease}</p>
          <p><strong>Phone Number:</strong> {selectedPatient.phoneNumber}</p>
          <p><strong>Visits:</strong> {selectedPatient.visitsCount} times</p>
          {/* Add other patient details as necessary */}
        </div>
      ) : (
        <>
          <div className="tracking-summary">
            <p>Today's Patients: {data.TodaypatientCount}</p>
            <p>Total Patients: {data.TotalpatientCount}</p>
          </div>
          <div className="tracking-container">
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

              <input
                type="date"
                value={filterDate}
                onChange={handleDateFilterChange}
                className="search-input date"
              />

              <button onClick={handleClearFilters} className="clear-filters-button">
                Clear Filters
              </button>
            </div>

            <table className="tracking-table">
              <thead>
                <tr>
                  <th className="patients-id">ID</th>
                  <th className="patients-firstName">First Name</th>
                  <th className="patients-lastName">Last Name</th>
                  <th className="patients-email">Email</th>
                  <th className="patients-phoneNumber">Phone Number</th>
                  <th className="patients-aadharNumber">Aadhar Number</th>
                  <th className="patients-address">Address</th>
                  <th className="patients-gender">Gender</th>
                  <th className="patients-day">Date of birth</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient, index) => (
                    <tr key={index} onClick={() => handlePatientClick(patient)} style={{ cursor: "pointer" }}>
                      <td className="patients-id">{patient.id}</td>
                      <td className="patients-firstName">{patient.firstName}</td>
                      <td className="patients-lastName">{patient.lastName}</td>
                      <td className="patients-email">{patient.email}</td>
                      <td className="patients-phoneNumber">{patient.phoneNumber}</td>
                      <td className="patients-aadharNumber">{patient.aadharNumber}</td>
                      <td className="patients-address">{patient.address}</td>
                      <td className="patients-gender">{patient.gender}</td>
                      <td className="patients-day">{patient.day} / {patient.month} / {patient.year}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="patients-noData">No patients found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default MedicalTests;
