import React, { useState } from "react";

// Sample data for patients
const initialPatients = [
  { id: 1, name: "John Doe", age: 35, condition: "Fever", status: "Admitted" },
  {
    id: 2,
    name: "Jane Smith",
    age: 45,
    condition: "Fractured Arm",
    status: "Admitted",
  },
  {
    id: 3,
    name: "Alice Johnson",
    age: 25,
    condition: "Cough",
    status: "Discharged",
  },
];

const PatientTracker = () => {
  // State to hold the list of patients
  const [patients, setPatients] = useState(initialPatients);
  // State to hold the form input values
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    condition: "",
    status: "Admitted",
  });
  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle adding a new patient
  const addPatient = () => {
    // Generate a unique id for the new patient
    const id = patients.length + 1;
    // Create a new patient object
    const newPatient = {
      id,
      name: formData.name || "New Patient",
      age: parseInt(formData.age) || 0,
      condition: formData.condition || "Condition",
      status: formData.status || "Admitted",
    };
    // Add the new patient to the list
    setPatients([...patients, newPatient]);
    // Reset the form data after adding
    setFormData({ name: "", age: "", condition: "", status: "Admitted" });
  };

  // Function to handle updating form input values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle updating patient details
  const updatePatient = (id, field, value) => {
    const updatedPatients = patients.map((patient) =>
      patient.id === id ? { ...patient, [field]: value } : patient
    );
    setPatients(updatedPatients);
  };

  // Function to filter patients based on search query
  const filteredPatients = patients.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="patient-tracker">
      <h2>Patient Tracker</h2>
      <div className="controls">
        <button className="add-patient-btn" onClick={addPatient}>
          Add Patient
        </button>
        <input
          type="text"
          placeholder="Search by name, condition, or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <table className="patient-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Condition</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>
                <input
                  type="text"
                  value={patient.name}
                  onChange={(e) =>
                    updatePatient(patient.id, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={patient.age}
                  onChange={(e) =>
                    updatePatient(patient.id, "age", parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={patient.condition}
                  onChange={(e) =>
                    updatePatient(patient.id, "condition", e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  value={patient.status}
                  onChange={(e) =>
                    updatePatient(patient.id, "status", e.target.value)
                  }
                >
                  <option value="Admitted">Admitted</option>
                  <option value="Discharged">Discharged</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-patient-form">
        <h3>Add Patient</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="condition"
          placeholder="Condition"
          value={formData.condition}
          onChange={handleInputChange}
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="Admitted">Admitted</option>
          <option value="Discharged">Discharged</option>
        </select>
        <button onClick={addPatient}>Add</button>
      </div>
    </div>
  );
};

export default PatientTracker;
