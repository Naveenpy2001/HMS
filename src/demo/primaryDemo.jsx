import React, { useState, useEffect } from "react";
import "../css/primary.css"; // Importing CSS file

// Sample data for demo
const sampleAppointments = [
  {
    id: 1,
    date: "2024-05-15",
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    viewed: false,
  },
  {
    id: 2,
    date: "2024-05-16",
    patientName: "Jane Doe",
    doctorName: "Dr. Johnson",
    viewed: false,
  },
  // Add more sample appointments as needed
];

const samplePatients = [
  { id: 1, name: "John Doe", age: 45 },
  { id: 2, name: "Jane Doe", age: 35 },
  // Add more sample patients as needed
];

const sampleDoctors = [
  { id: 1, name: "Dr. Smith", specialty: "Cardiology" },
  { id: 2, name: "Dr. Johnson", specialty: "Pediatrics" },
  // Add more sample doctors as needed
];

const HospitalDashboard = () => {
  const [tab, setTab] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [newAppointments, setNewAppointments] = useState(0);

  useEffect(() => {
    // For demo purposes, set sample data
    setAppointments(sampleAppointments);
    setPatients(samplePatients);
    setDoctors(sampleDoctors);

    // In a real application, you would fetch data from an API
  }, []);

  useEffect(() => {
    // Simulate new appointments arrival
    const newAppointmentsCount = sampleAppointments.filter(
      (appointment) => !appointment.viewed
    ).length;
    setNewAppointments(newAppointmentsCount);
  }, [appointments]);

  return (
    <div className="hospital-dashboard">
      <nav className="sidebar">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className={`nav-link ${tab === "dashboard" && "active"}`}
              onClick={() => setTab("dashboard")}
            >
              Dashboard{" "}
              {newAppointments > 0 && (
                <span className="badge">{newAppointments}</span>
              )}
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${tab === "appointments" && "active"}`}
              onClick={() => setTab("appointments")}
            >
              Appointments
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${tab === "patients" && "active"}`}
              onClick={() => setTab("patients")}
            >
              Patients
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${tab === "doctors" && "active"}`}
              onClick={() => setTab("doctors")}
            >
              Doctors
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${tab === "accounts" && "active"}`}
              onClick={() => setTab("accounts")}
            >
              Accounts
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${tab === "staff" && "active"}`}
              onClick={() => setTab("staff")}
            >
              Staff Details
            </a>
          </li>
        </ul>
        <div className="logout">
          <a href="#" className="nav-link">
            Logout
          </a>
        </div>
      </nav>

      <main className="content">
        {tab === "dashboard" && (
          <>
            <div className="dashboard-tabs">
              <button
                className={`tab ${newAppointments > 0 && "new"}`}
                onClick={() => console.log("Clicked on tab 1")}
              >
                Tab 1{" "}
                {newAppointments > 0 && (
                  <span className="badge">{newAppointments}</span>
                )}
              </button>
              <button
                className="tab"
                onClick={() => console.log("Clicked on tab 2")}
              >
                Tab 2
              </button>
              <button
                className="tab"
                onClick={() => console.log("Clicked on tab 3")}
              >
                Tab 3
              </button>
            </div>
            {/* Add other dashboard content here */}
          </>
        )}

        {tab === "appointments" && (
          <section className="section">
            <h2 className="section-title">Appointments</h2>
            <ul className="list">
              {appointments.map((appointment) => (
                <li key={appointment.id} className="list-item">
                  {appointment.date} - {appointment.patientName} -{" "}
                  {appointment.doctorName}
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === "patients" && (
          <section className="section">
            <h2 className="section-title">Patients</h2>
            <ul className="list">
              {patients.map((patient) => (
                <li key={patient.id} className="list-item">
                  {patient.name} - {patient.age} years old
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === "doctors" && (
          <section className="section">
            <h2 className="section-title">Doctors</h2>
            <ul className="list">
              {doctors.map((doctor) => (
                <li key={doctor.id} className="list-item">
                  {doctor.name} - {doctor.specialty}
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === "accounts" && (
          <section className="section">
            <h2 className="section-title">Accounts</h2>
            {/* Add content for Accounts tab here */}
          </section>
        )}

        {tab === "staff" && (
          <section className="section">
            <h2 className="section-title">Staff Details</h2>
            {/* Add content for Staff Details tab here */}
          </section>
        )}
      </main>
    </div>
  );
};

export default HospitalDashboard;
