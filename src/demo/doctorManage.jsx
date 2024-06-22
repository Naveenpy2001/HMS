// DoctorManagement.js
import React, { useState } from "react";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Doe" },
    { id: 2, name: "Dr. Jane Smith" },
  ]);

  const [newDoctorName, setNewDoctorName] = useState("");

  const handleAddDoctor = () => {
    if (newDoctorName.trim() !== "") {
      setDoctors([...doctors, { id: doctors.length + 1, name: newDoctorName }]);
      setNewDoctorName("");
    }
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  return (
    <div>
      <h1>Doctor Management</h1>
      <input
        type="text"
        value={newDoctorName}
        onChange={(e) => setNewDoctorName(e.target.value)}
        placeholder="Enter doctor's name"
      />
      <button onClick={handleAddDoctor}>Add Doctor</button>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name}
            <button onClick={() => handleDeleteDoctor(doctor.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorManagement;
