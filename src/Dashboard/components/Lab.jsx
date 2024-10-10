import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Lab.css'

const Lab = () => {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [ptDiseases, setPtDiseases] = useState("");
  const [age, setAge] = useState("");
  const [labtest, setLabTest] = useState("");
  const [formData, setFormData] = useState({
    testName: "",
    patientId: "",
    // patientName,
    // ptDiseases,
    // age,
    testName: "",
    // testDate: "",
    result: "",
    doctorName: "",
    technician: "",
    sampleType: "",
    testCost: "",
    insuranceProvider: "",
    status: "Pending",
    notes: "",
  });
  
  const [labTests, setLabTests] = useState([]); // To store the data from backend
  const [selectedPatient, setSelectedPatient] = useState(null); // For view details
  const [data,setData] = useState()
  useEffect(() => {
    // Fetch data from the backend
    const fetchLabTests = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getlabtests");
        setLabTests(response.data);
        console.log(response.data); // Log the API response
        setLabTests(response.data || []);
      } catch (error) {
        console.error("Error fetching lab tests:", error);
      }
    };

    fetchLabTests();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchPatientData();
    }
  };

  const fetchPatientData = async () => {
    try {
      // Replace with your fetch API endpoint
      const response = await axios.get(
        `https://hms.tsaritservices.com/api/record/${patientId}`
      );
      const data = response.data[0]; // Assuming API returns an array with one object
      setPatientName(data.firstName + " " + data.lastName);
      setPtDiseases(data.disease);
      setAge(data.age);
      setLabTest(data.tests);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to fetch patient data. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend
      const response = await axios.post("http://localhost:8080/saveLab", formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Update the lab tests table with the new test
      setLabTests([...labTests, response.data]);
      setFormData({
        testName: "",
        patientId: "",
        // testDate: "",
        result: "",
        doctorName: "",
        technician: "",
        sampleType: "",
        testCost: "",
        insuranceProvider: "",
        status: "Pending",
        notes: "",
      });
      alert("lab test succ")
    } catch (error) {
      console.error("Error submitting lab test:", error);
    }
  };

  const handleView = (labTest) => {
    // This will trigger the patient details to be shown
    setSelectedPatient(labTest);
  };

  const [activeTab, setActiveTab] = useState(1);


  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterAppointments(term, filterDate, statusFilter);
  };

  const handleDateFilterChange = (e) => {
    const filter = e.target.value;
    setFilterDate(filter);
    filterAppointments(searchTerm, filter, statusFilter);
  };

  const handleStatusFilterChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterAppointments(searchTerm, filterDate, status);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterDate("");
    setStatusFilter("");
    setFilteredAppointments(data);
  };

  const filterAppointments = (term, dateFilter, statusFilter) => {
    const filtered = data.filter((appointment) => {
      const matchesTerm =
        appointment.name.toLowerCase().includes(term) ||
        appointment.reason.toLowerCase().includes(term) ||
        appointment.age.toString().includes(term);
      const matchesDate = dateFilter === "" || appointment.date === dateFilter;
      const matchesStatus = statusFilter === "" || appointment.status === statusFilter;

      return matchesTerm && matchesDate && matchesStatus;
    });

    setFilteredAppointments(filtered);
    const today = new Date().toISOString().split("T")[0];
    // updateTodayAppointmentsCount(filtered, today); // Update today's count after filtering
  };

  return (
    <>
    <div className="billing-navigation">
        <button
          className={`dct-tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Lab Test Form
        </button>
        <button
          className={`dct-tab-button ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabChange(2)}
        >
          View/Update Lab Details
        </button>
      </div>


    <div className="lab-container">
      {activeTab === 1 && (
        <form className="lab-form" onSubmit={handleSubmit}>
        <h1 className="lab-h1">Lab Test Form</h1>
        <label htmlFor="patientId" className="dct-label">
            Patient ID:
          </label>
        <input
            type="text"
            id="patientId"
            className="dct-input"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={fetchPatientData}
            required
          />
           <button type="button" onClick={fetchPatientData} className="dct-fetch-button">
            Fetch Patient Data
          </button>
       

        <div className="dct-form-group">
          <label htmlFor="patientName" className="dct-label">
            Patient Name:
          </label>
          <input
            type="text"
            id="patientName"
            className="dct-input"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            readOnly
          />
        </div>

        <div className="dct-form-group">
          <label htmlFor="ptDiseases" className="dct-label">
            Patient Diseases:
          </label>
          <input
            type="text"
            id="ptDiseases"
            className="dct-input"
            value={ptDiseases}
            onChange={(e) => setPtDiseases(e.target.value)}
            required
            readOnly
          />
        </div>

        <div className="dct-form-group">
          <label htmlFor="ptDiseases" className="dct-label">
            Patient Age:
          </label>
          <input
            type="text"
            id="ptDiseases"
            className="dct-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            readOnly
          />
        </div>
        <div className="dct-form-group">
          <label htmlFor="pttests" className="dct-label">
            Patient Tests:
          </label>
          <input
            type="text"
            id="pttests"
            className="dct-input"
            value={labtest}
            onChange={(e) => setAge(e.target.value)}
            required
            readOnly
          />
        </div>
        <hr />
        <hr />
        <h2 className="dct-subheading">Lab Treatment</h2>
        <div className="lab-form-group">
          <label className="lab-label">Test Name:</label>
          <input
            type="text"
            className="lab-input"
            name="testName"
            value={formData.testName}
            onChange={handleChange}
          />
        </div>

        <div className="lab-form-group">
          <label className="lab-label">Patient ID:</label>
          <input
            type="text"
            className="lab-input"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
          />
        </div>

        <div className="lab-form-group">
          <label className="lab-label">Test Date:</label>
          <input
            type="date"
            className="lab-input"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
          />
        </div>

        <div className="lab-form-group">
          <label className="lab-label">Result:</label>
          <input
            type="text"
            className="lab-input"
            name="result"
            value={formData.result}
            onChange={handleChange}
          />
        </div>

        <div className="lab-form-group">
          <label className="lab-label">Doctor's Name:</label>
          <input
            type="text"
            className="lab-input"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
          />
        </div>

        <div className="lab-form-group">
          <label className="lab-label">Lab Technician:</label>
          <input
            type="text"
            className="lab-input"
            name="technician"
            value={formData.technician}
            onChange={handleChange}
          />
        </div>

        <div className="lab-form-group">
          <label className="lab-label">Sample Type:</label>
          <input
            type="text"
            className="lab-input"
            name="sampleType"
            value={formData.sampleType}
            onChange={handleChange}
          />
        </div>

        <div className="lab-form-group">
          <label className="lab-label">Test Cost:</label>
          <input
            type="number"
            className="lab-input"
            name="testCost"
            value={formData.testCost}
            onChange={handleChange}
          />
        </div>

        <div className="lab-form-group">
          <label className="lab-label">Insurance Provider:</label>
          <input
            type="text"
            className="lab-input"
            name="insuranceProvider"
            value={formData.insuranceProvider}
            onChange={handleChange}
          />
        </div>

        <div className="lab-form-group">
          <label className="lab-label">Status:</label>
          <select
            className="lab-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="lab-form-group">
          <label className="lab-label">Notes:</label>
          <textarea
            className="lab-input"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="lab-button">Submit</button>
      </form>
      )}

      {/* Display table of lab tests */}
     {activeTab === 2 && (
        <>
         <h2 className="lab-h2">Lab Test Results</h2>
         <div className="filter-container">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, ID, or Date..."
            className="search-input"
          />

          <input
            type="date"
            value={filterDate}
            onChange={handleDateFilterChange}
            className="search-input date"
          />

          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="search-input date"
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>

          <button onClick={handleClearFilters} className="clear-filters-button">
            Clear Filters
          </button>
        </div>
      <table className="lab-table">
        <thead>
          <tr>
            <th className="lab-th">Test Name</th>
            <th className="lab-th">Patient ID</th>
            <th className="lab-th">Test Date</th>
            <th className="lab-th">Status</th>
            <th className="lab-th">View Details</th>
          </tr>
        </thead>
        <tbody>
          {labTests.map((test) => (
            <tr key={test.id}>
              <td className="lab-td">{test.testName}</td>
              <td className="lab-td">{test.patientId}</td>
              <td className="lab-td">{test.testDate}</td>
              <td className="lab-td">{test.status}</td>
              <td className="lab-td">
                <button className="lab-view-button" onClick={() => handleView(test)}>View</button> | <button>Download</button>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
        </>
     )}

      {/* Display patient details if selected */}
      {selectedPatient && (
        <div className="lab-patient-details">
          <h3>Patient Details</h3>
          <p><strong>Test Name:</strong> {selectedPatient.testName}</p>
          <p><strong>Patient ID:</strong> {selectedPatient.patientId}</p>
          <p><strong>Test Date:</strong> {selectedPatient.testDate}</p>
          <p><strong>Doctor's Name:</strong> {selectedPatient.doctorName}</p>
          <p><strong>Lab Technician:</strong> {selectedPatient.technician}</p>
          <p><strong>Sample Type:</strong> {selectedPatient.sampleType}</p>
          <p><strong>Test Cost:</strong> {selectedPatient.testCost}</p>
          <p><strong>Insurance Provider:</strong> {selectedPatient.insuranceProvider}</p>
          <p><strong>Status:</strong> {selectedPatient.status}</p>
          <p><strong>Notes:</strong> {selectedPatient.notes}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Lab;
