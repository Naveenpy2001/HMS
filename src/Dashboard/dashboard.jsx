import React, { useState,useEffect } from "react";
import "../css/dashboard.css";
import { FaBars } from "react-icons/fa";
import Dashboard from "./components/Dashboard";
import PatientRegistration from "./components/PatientRegistration";
import DoctorView from "./components/DoctorView";
import MedicalTests from "./components/MedicalTests";
import MedicalPrescription from "./components/MedicalPrescription";
import Billing from "./components/Billing";
import HospitalData from "./components/HospitalData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App(token) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userData,setUserData] = useState('');

  // check if data showing or not
  
  
  const UserDataFetch =async () => {
       try {
        const response = await fetch("http://hms.tsaritservices.com/dashboard",
          {method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },}
        )
          const data = await response.json()
          setUserData(data)
          console.log("Data",data.firstname,data.lastname);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }  
      } catch (error) {
      console.log('error fetching : ', error );
      }
  }
  
  // const LogoutButton = () => {
  //   const navigate = useNavigate(); // Initialize useNavigate hook
  const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        // Send a POST request to the logout endpoint
        await axios.post("http://hms.tsaritservices.com/reactlogout", { 
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Add token to headers if needed
        });
        // Clear the token from local storage
        localStorage.removeItem('token');
        console.log(" logout succesfull:");
        // Redirect to login page or home page
        navigate("/login"); 
        // Adjust the route as needed
      } catch (error) {
        console.error("Error logging out:", error);
        // Optionally handle logout errors
      }
    };
  
  useEffect(() => {
        UserDataFetch()
  },[]);
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard setActiveTab={setActiveTab} token={token}/>;
      case "PatientRegistration":
        return <PatientRegistration />;
      case "DoctorView":
        return <DoctorView />;
       case "MedicalTests":
        return <MedicalTests token={token}/>;
       case "MedicalPrescription":
         return <MedicalPrescription token={token}/>;
      case "Billing":
        return <Billing />;
      case "HospitalData":
        return <HospitalData />;
      default:
        return <Dashboard token={token} />;
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
              <span className="links_name">Patients</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "MedicalPrescription" ? "active" : ""}
              onClick={() => setActiveTab("MedicalPrescription")}
            >
              <i className="bx bx-coin-stack"></i>
              <span className="links_name">Appointements</span>
            </button>
          </li> 
          <li>
            <button
              className={activeTab === "Billing" ? "active" : ""}
              onClick={() => setActiveTab("Billing")}
            >
              <i className="bx bx-book-alt"></i>
              <span className="links_name">Accounts</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "HospitalData" ? "active" : ""}
              onClick={() => setActiveTab("HospitalData")}
            >
              <i className="bx bx-user"></i>
              <span className="links_name">Profile </span>
            </button>
          </li>
          <li className="log_out">
            <button onClick={handleLogout}>
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
            <span className="dashboard">Wellcome To! {userData.firstname} {userData.lastname}/ Doctor name :{userData.hospitalname}/</span>
            <span className="dashboard">Last Login:{userData.formattedDate}</span>

            {/* <div className="date-time">
             Date: {userData.currentDate} | Time: {userData.currentTime}
              </div> */}
          </div>
        </nav>
        <div className="home-content">{renderContent()}</div>
      </section>
    </div>
  );
}

export default App;
