// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../css/Lab.css";

// import { API_URL } from "../../API";

// const Lab = () => {
//   const [patientId, setPatientId] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const [ptDiseases, setPtDiseases] = useState("");
//   const [age, setAge] = useState("");
//   const [labtest, setLabTest] = useState("");
//   const [formData, setFormData] = useState({
//     testName: "",
//     patientId: "",
//     // patientName,
//     // ptDiseases,
//     // age,
//     testName: "",
//     // testDate: "",
//     result: "",
//     doctorName: "",
//     technician: "",
//     sampleType: "",
//     testCost: "",
//     insuranceProvider: "",
//     status: "Pending",
//     notes: "",
//   });

//   const [customTestName, setCustomTestName] = useState("");
//   const [isOtherSelected, setIsOtherSelected] = useState(false);

//   const handleTestNameChange = (e) => {
//     const value = e.target.value;
//     if (value === "Other") {
//       setIsOtherSelected(true);
//       setFormData({ ...formData, testName: "" });
//     } else {
//       setIsOtherSelected(false);
//       setFormData({ ...formData, testName: value });
//     }
//   };

//   const handleAddCustomTestName = () => {
//     setFormData({ ...formData, testName: customTestName });
//     setIsOtherSelected(false);
//     setCustomTestName("");
//   };

//   const [labTests, setLabTests] = useState([]); // To store the data from backend
//   const [selectedPatient, setSelectedPatient] = useState(null); // For view details
//   const [data, setData] = useState();
//   useEffect(() => {
//     // Fetch data from the backend
//     const fetchLabTests = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/getlabtests`);
//         setLabTests(response.data);
//         console.log(response.data); // Log the API response
//         setLabTests(response.data || []);
//       } catch (error) {
//         console.error("Error fetching lab tests:", error);
//       }
//     };

//     fetchLabTests();
//   }, []);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       fetchPatientData();
//     }
//   };

//   const fetchPatientData = async () => {
//     try {
//       // Replace with your fetch API endpoint
//       const response = await axios.get(`${API_URL}/api/record/${patientId}`);
//       const data = response.data[0]; // Assuming API returns an array with one object
//       setPatientName(data.firstName + " " + data.lastName);
//       setPtDiseases(data.disease);
//       setAge(data.age);
//       setLabTest(data.tests);
//     } catch (error) {
//       console.error("Error fetching patient data:", error);
//       alert("Failed to fetch patient data. Please try again.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send data to backend
//       const response = await axios.post(`${API_URL}/saveLab`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       // Update the lab tests table with the new test
//       setLabTests([...labTests, response.data]);
//       setFormData({
//         testName: "",
//         patientId: "",
//         // testDate: "",
//         result: "",
//         doctorName: "",
//         technician: "",
//         sampleType: "",
//         testCost: "",
//         insuranceProvider: "",
//         status: "Pending",
//         notes: "",
//       });
//       alert(response.data);
//     } catch (error) {
//       console.error("Error submitting lab test:", error);
//     }
//   };

//   const handleView = (labTest) => {
//     // This will trigger the patient details to be shown
//     setSelectedPatient(labTest);
//   };

//   const [activeTab, setActiveTab] = useState(1);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [filterDate, setFilterDate] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   const handleTabChange = (tabIndex) => {
//     setActiveTab(tabIndex);
//   };

//   const handleSearchChange = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     filterAppointments(term, filterDate, statusFilter);
//   };

//   const handleDateFilterChange = (e) => {
//     const filter = e.target.value;
//     setFilterDate(filter);
//     filterAppointments(searchTerm, filter, statusFilter);
//   };

//   const handleStatusFilterChange = (e) => {
//     const status = e.target.value;
//     setStatusFilter(status);
//     filterAppointments(searchTerm, filterDate, status);
//   };

//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setFilterDate("");
//     setStatusFilter("");
//     setFilteredAppointments(data);
//   };

//   const filterAppointments = (term, dateFilter, statusFilter) => {
//     const filtered = data.filter((appointment) => {
//       const matchesTerm =
//         appointment.name.toLowerCase().includes(term) ||
//         appointment.reason.toLowerCase().includes(term) ||
//         appointment.age.toString().includes(term);
//       const matchesDate = dateFilter === "" || appointment.date === dateFilter;
//       const matchesStatus =
//         statusFilter === "" || appointment.status === statusFilter;

//       return matchesTerm && matchesDate && matchesStatus;
//     });

//     setFilteredAppointments(filtered);
//     const today = new Date().toISOString().split("T")[0];
//     // updateTodayAppointmentsCount(filtered, today); // Update today's count after filtering
//   };

//   return (
//     <>
//       <div className="billing-navigation">
//         <button
//           className={`dct-tab-button ${activeTab === 1 ? "active" : ""}`}
//           onClick={() => handleTabChange(1)}
//         >
//           Lab Test Form
//         </button>
//         <button
//           className={`dct-tab-button ${activeTab === 2 ? "active" : ""}`}
//           onClick={() => handleTabChange(2)}
//         >
//           View/Update Lab Details
//         </button>
//       </div>

//       <div className="lab-container">
//         {activeTab === 1 && (
//           <form className="lab-form" onSubmit={handleSubmit}>
//             <h1 className="lab-h1">Lab Test Form</h1>
//             <div className="lab-form-group">
//             <label className="lab-label">Test Name:</label>
//               <select
//                 className="lab-input"
//                 name="testName"
//                 value={formData.testName}
//                 onChange={handleTestNameChange}
//               >
//                 <option value="">Select Test</option>
//                 <option value="Blood Test">Blood Test</option>
//                 <option value="X-Ray">X-Ray</option>
//                 <option value="MRI">MRI</option>
//                 <option value="Other">Other</option>
//               </select>
//               {isOtherSelected && (
//                 <div className="custom-test-name">
//                   <input
//                     type="text"
//                     className="lab-input"
//                     placeholder="Enter custom test name"
//                     value={customTestName}
//                     onChange={(e) => setCustomTestName(e.target.value)}
//                   />
//                   <button
//                     type="button"
//                     className="lab-button"
//                     onClick={handleAddCustomTestName}
//                   >
//                     Add
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className="lab-form-group">
//               <label className="lab-label">Patient ID:</label>
//               <input
//                 type="text"
//                 className="lab-input"
//                 name="patientId"
//                 value={formData.patientId}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="lab-form-group">
//               <label className="lab-label">Test Date:</label>
//               <input
//                 type="date"
//                 className="lab-input"
//                 name="testDate"
//                 value={formData.testDate}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="lab-form-group">
//               <label className="lab-label">Result:</label>
//               <input
//                 type="text"
//                 className="lab-input"
//                 name="result"
//                 value={formData.result}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="lab-form-group">
//               <label className="lab-label">Doctor's Name:</label>
//               <input
//                 type="text"
//                 className="lab-input"
//                 name="doctorName"
//                 value={formData.doctorName}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="lab-form-group">
//               <label className="lab-label">Lab Technician:</label>
//               <input
//                 type="text"
//                 className="lab-input"
//                 name="technician"
//                 value={formData.technician}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="lab-form-group">
//               <label className="lab-label">Sample Type:</label>
//               <input
//                 type="text"
//                 className="lab-input"
//                 name="sampleType"
//                 value={formData.sampleType}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="lab-form-group">
//               <label className="lab-label">Test Cost:</label>
//               <input
//                 type="number"
//                 className="lab-input"
//                 name="testCost"
//                 value={formData.testCost}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="lab-form-group">
//               <label className="lab-label">Insurance Provider:</label>
//               <input
//                 type="text"
//                 className="lab-input"
//                 name="insuranceProvider"
//                 value={formData.insuranceProvider}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="lab-form-group">
//               <label className="lab-label">Status:</label>
//               <select
//                 className="lab-select"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>

//             <div className="lab-form-group">
//               <label className="lab-label">Notes:</label>
//               <textarea
//                 className="lab-input"
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//               />
//             </div>

//             <button type="submit" className="lab-button">
//               Submit
//             </button>
//           </form>
//         )}

//         {/* Display table of lab tests */}
//         {activeTab === 2 && (
//           <>
//             <h2 className="lab-h2">Lab Test Results</h2>
//             <div className="filter-container">
//               <input
//                 type="search"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder="Search by name, ID, or Date..."
//                 className="search-input"
//               />

//               <input
//                 type="date"
//                 value={filterDate}
//                 onChange={handleDateFilterChange}
//                 className="search-input date"
//               />

//               <select
//                 value={statusFilter}
//                 onChange={handleStatusFilterChange}
//                 className="search-input date"
//               >
//                 <option value="">All Statuses</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Not Completed">Not Completed</option>
//               </select>

//               <button
//                 onClick={handleClearFilters}
//                 className="clear-filters-button"
//               >
//                 Clear Filters
//               </button>
//             </div>
//             <table className="lab-table">
//               <thead>
//                 <tr>
//                   <th className="lab-th">Test Name</th>
//                   <th className="lab-th">Patient ID</th>
//                   <th className="lab-th">Test Date</th>
//                   <th className="lab-th">Status</th>
//                   <th className="lab-th">View Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {labTests.map((test) => (
//                   <tr key={test.id}>
//                     <td className="lab-td">{test.testName}</td>
//                     <td className="lab-td">{test.patientId}</td>
//                     <td className="lab-td">{test.testDate}</td>
//                     <td className="lab-td">{test.status}</td>
//                     <td className="lab-td">
//                       <button
//                         className="lab-view-button"
//                         onClick={() => handleView(test)}
//                       >
//                         View
//                       </button>{" "}
//                       | <button>Download</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}

//         {/* Display patient details if selected */}
//         {selectedPatient && (
//           <div className="lab-patient-details">
//             <h3>Patient Details</h3>
//             <p>
//               <strong>Test Name:</strong> {selectedPatient.testName}
//             </p>
//             <p>
//               <strong>Patient ID:</strong> {selectedPatient.patientId}
//             </p>
//             <p>
//               <strong>Test Date:</strong> {selectedPatient.testDate}
//             </p>
//             <p>
//               <strong>Doctor's Name:</strong> {selectedPatient.doctorName}
//             </p>
//             <p>
//               <strong>Lab Technician:</strong> {selectedPatient.technician}
//             </p>
//             <p>
//               <strong>Sample Type:</strong> {selectedPatient.sampleType}
//             </p>
//             <p>
//               <strong>Test Cost:</strong> {selectedPatient.testCost}
//             </p>
//             <p>
//               <strong>Insurance Provider:</strong>{" "}
//               {selectedPatient.insuranceProvider}
//             </p>
//             <p>
//               <strong>Status:</strong> {selectedPatient.status}
//             </p>
//             <p>
//               <strong>Notes:</strong> {selectedPatient.notes}
//             </p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Lab;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Lab.css";
import { API_URL } from "../../API";

const Lab = () => {
  const [patientId, setPatientId] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);
  const [labTests, setLabTests] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLabTests, setFilteredLabTests] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [newTestName, setNewTestName] = useState("");
  const [selectedTestName, setSelectedTestName] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [newTest, setNewTest] = useState({
    testName: "",
    testDate: "",
    status: "",
    price: "",
    patientId: "",
  });

  useEffect(() => {
    fetchAvailableTests(); 
  }, []);

  const fetchAvailableTests = async () => {
    try {
      const response = await axios.get(`${API_URL}/getAvailableTests`);
      if (Array.isArray(response.data)) {
        setAvailableTests(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching available tests:", error);
    }
  };

  const handleAddTest = async () => {
    if (newTestName) {
      try {
        await axios.post(`${API_URL}/addLabTest`, { name: newTestName });
        alert("Test added successfully!");
        setNewTestName("");
        fetchAvailableTests();
      } catch (error) {
        console.error("Error adding new test:", error);
        alert("Failed to add test. Please try again.");
      }
    } else {
      alert("Please enter a test name.");
    }
  };

  useEffect(() => {
    if (patientDetails) {
      fetchLabTests(patientDetails.patientId);
    }
  }, [patientDetails]);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/record/${patientId}`);
      setPatientDetails(response.data[0]);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to fetch patient data. Please try again.");
    }
  };

  const fetchLabTests = async (patientId) => {
    try {
      const response = await axios.get(`${API_URL}/getLabTests/${patientId}`);
      setLabTests(response.data);
      setFilteredLabTests(response.data);
    } catch (error) {
      console.error("Error fetching lab tests:", error);
    }
  };

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = labTests.filter((test) =>
      test.patientId.toString().includes(term) || 
      test.phone?.toString().includes(term) // Assuming you have a phone property in test
    );
    setFilteredLabTests(filtered);
  };
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilteredLabTests(labTests);
  };

  const handleNewTestChange = (e) => {
    const { name, value } = e.target;
    setNewTest((prevTest) => ({ ...prevTest, [name]: value }));
  };

  const handleSubmitNewTest = async (e) => {
    e.preventDefault();
    if (newTest.testName && newTest.testDate && patientDetails) {
      try {
        await axios.post(`${API_URL}/addLabTest`, {
          ...newTest,
          patientId: patientDetails.patientId,
        });
        alert("Lab test added successfully!");
        setNewTest({ testName: "", testDate: "", status: "", price: "", patientId: "" });
        fetchLabTests(patientDetails.patientId);
      } catch (error) {
        console.error("Error adding lab test:", error);
        alert("Failed to add lab test. Please try again.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (patientId) {
      fetchPatientData();
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(`${API_URL}/downloadLabTests/${patientDetails.patientId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'lab_tests.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    }
  };

  const handleTestChange = (e) => {
    const value = e.target.value;
    setSelectedTestName(value);
    setIsOtherSelected(value === "Other");
  };

  return (
    <>
      <div className="lab-navigation">
        <button
          className={`lab-tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Lab Test Form
        </button>
        <button
          className={`lab-tab-button ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabChange(2)}
        >
          View Lab Tests
        </button>
      </div>
  
      <div className="lab-container">
        {activeTab === 1 && (
          <form className="lab-form" onSubmit={handleSubmit}>
            <h1 className="lab-title">Lab Test Form</h1>
            <div className="lab-form-group">
              <label className="lab-label">Patient ID:</label>
              <input
                type="text"
                className="lab-input"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
              <button type="submit" className="lab-fetch-button">
                Fetch Patient
              </button>
            </div>
  
            {patientDetails && (
              <div>
                <h2 className="lab-details-title">Patient Details</h2>
                <p><strong>Name:</strong> {patientDetails.firstName} {patientDetails.lastName}</p>
                <p><strong>Phone No:</strong> {patientDetails.phone}</p>
                <p><strong>Disease:</strong> {patientDetails.disease}</p>
              </div>
            )}
  
            <h2 className="lab-add-title">Add New Lab Test</h2>
            <div>
              <label className="lab-select-label">Select Test Name:</label>
              <select value={selectedTestName} onChange={handleTestChange} className="lab-select">
                <option value="">-- Select a test --</option>
                {availableTests.map((test) => (
                  <option key={test.id} value={test.name}>
                    {test.name}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
  
            {isOtherSelected && (
              <div>
                <label className="lab-input-label">Enter Custom Test Name:</label>
                <input
                  type="text"
                  value={newTestName}
                  onChange={(e) => setNewTestName(e.target.value)}
                  placeholder="Enter new test name"
                  className="lab-input"
                />
                <button onClick={handleAddTest} className="lab-add-test-button">Add Test</button>
              </div>
            )}
  
            <div className="lab-form-group">
              <label className="lab-label">Test Date:</label>
              <input
                type="date"
                className="lab-input"
                name="testDate"
                value={newTest.testDate}
                onChange={handleNewTestChange}
                required
              />
            </div>
            <div className="lab-form-group">
              <label className="lab-label">Status:</label>
              <input
                type="text"
                className="lab-input"
                name="status"
                value={newTest.status}
                onChange={handleNewTestChange}
                required
              />
            </div>
            <div className="lab-form-group">
              <label className="lab-label">Price:</label>
              <input
                type="number"
                className="lab-input"
                name="price"
                value={newTest.price}
                onChange={handleNewTestChange}
                required
              />
            </div>
            <button type="submit" className="lab-submit-button" onClick={handleSubmitNewTest}>
              Add Lab Test
            </button>
            <button type="button" className="lab-download-button" onClick={handleDownloadPDF}>
              Download Lab Test as PDF
            </button>
          </form>
        )}
  
        {activeTab === 2 && (
          <>
            <h2 className="lab-results-title">Lab Test Results</h2>
            <div className="lab-filter-container">
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by Patient ID or Phone"
                className="lab-search-input"
              />
              <button onClick={handleClearFilters} className="lab-clear-filters-button">
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
                  <th className="lab-th">Price</th>
                  <th className="lab-th">View Details</th>
                  <th className="lab-th">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredLabTests.map((test) => (
                  <tr key={test.id}>
                    <td className="lab-td">{test.testName}</td>
                    <td className="lab-td">{test.patientId}</td>
                    <td className="lab-td">{test.testDate}</td>
                    <td className="lab-td">{test.status}</td>
                    <td className="lab-td">${test.price}</td>
                    <td className="lab-td">
                      <button className="lab-view-button">View</button>
                    </td>
                    <td className="lab-td">
                      <button className="lab-download-button" onClick={() => handleDownloadPDF(test.patientId)}>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
  
};

export default Lab;
