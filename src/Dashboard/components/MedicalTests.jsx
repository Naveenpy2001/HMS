import React, { useState, useEffect } from "react";

function MedicalTests({ token }) {
  const [data, setData] = useState({
    TodaypatientCount: 0,
    TotalpatientCount: 0,
    patientTracking: []
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filterVisited, setFilterVisited] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(token)}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP fetching error! status: ${response.status}`);
        }

        const result = await response.json();
        setData({
          TodaypatientCount: result.TodaypatientCount || 0,
          TotalpatientCount: result.TotalpatientCount || 0,
          patientTracking: result.patientTracking || [],
        });
        setFilteredPatients(result.patientTracking || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., show a notification or retry fetching
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
        patient.name.toLowerCase().includes(term) ||
        patient.disease.toLowerCase().includes(term) ||
        patient.age.toString().includes(term);
      const matchesVisited =
        visitedFilter === "all" ||
        (visitedFilter === "visited" && patient.visited) ||
        (visitedFilter === "not_visited" && !patient.visited);
      const matchesDate =
        dateFilter === "" || patient.date === dateFilter;

      return matchesTerm && matchesVisited && matchesDate;
    });

    setFilteredPatients(filtered);
  };

  return (
    <div>
      <h1>Patients Data</h1>
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
              <th>Patient Name</th>
              <th>Disease</th>
              <th>Age</th>
              <th>Status</th>
              <th>Date</th>
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
                  <td>{patient.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicalTests;
