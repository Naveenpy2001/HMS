import React, { useState } from "react";
import "../css/dashboard.css";
import { FaBars } from "react-icons/fa";
import Dashboard from "./components/Dashboard";
import PatientRegistration from "./components/PatientRegistration";
import DoctorView from "./components/DoctorView";
import MedicalTests from "./components/MedicalTests";
import MedicalPrescription from "./components/MedicalPrescription";
import Billing from "./components/Billing";
import HospitalData from "./components/HospitalData";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "PatientRegistration":
        return <PatientRegistration />;
      case "DoctorView":
        return <DoctorView />;
      case "MedicalTests":
        return <MedicalTests />;
      case "MedicalPrescription":
        return <MedicalPrescription />;
      case "Billing":
        return <Billing />;
      case "HospitalData":
        return <HospitalData />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <div
          className="logo-details"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">TSAR-IT-HMS</span>
        </div>
        <ul className="nav-links">
          <li>
            <button
              className={activeTab === "Dashboard" ? "active" : ""}
              onClick={() => setActiveTab("Dashboard")}
            >
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "PatientRegistration" ? "active" : ""}
              onClick={() => setActiveTab("PatientRegistration")}
            >
              <i className="bx bx-box"></i>
              <span className="links_name">Patient Registration</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "DoctorView" ? "active" : ""}
              onClick={() => setActiveTab("DoctorView")}
            >
              <i className="bx bx-list-ul"></i>
              <span className="links_name">Doctor View</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "MedicalTests" ? "active" : ""}
              onClick={() => setActiveTab("MedicalTests")}
            >
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Medical Tests</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "MedicalPrescription" ? "active" : ""}
              onClick={() => setActiveTab("MedicalPrescription")}
            >
              <i className="bx bx-coin-stack"></i>
              <span className="links_name">Medical Prescription</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "Billing" ? "active" : ""}
              onClick={() => setActiveTab("Billing")}
            >
              <i className="bx bx-book-alt"></i>
              <span className="links_name">Billing</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "HospitalData" ? "active" : ""}
              onClick={() => setActiveTab("HospitalData")}
            >
              <i className="bx bx-user"></i>
              <span className="links_name">Hospital Data</span>
            </button>
          </li>
          <li className="log_out">
            <button>
              <i className="bx bx-log-out"></i>
              <span className="links_name">Log out</span>
            </button>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            {/* <FaBars className="sidebarBtn" /> */}
            <span className="dashboard">Hi! Name/Email</span>
          </div>
        </nav>
        <div className="home-content">{renderContent()}</div>
      </section>
    </div>
  );
}

export default App;
