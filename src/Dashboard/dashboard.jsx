
import React, { useState, useEffect } from "react";
import "../css/dashboard.css";
import { FaBars } from "react-icons/fa";
import Dashboard from "./components/Dashboard";
import PatientRegistration from "./components/PatientRegistration";
import DoctorView from "./components/DoctorView";
import MedicalTests from "./components/MedicalTests";
import MedicalPrescription from "./components/MedicalPrescription";
import Billing from "./components/Billing";
import HospitalData from "./components/HospitalData";
import Support from "./components/Support";  
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Lab from "./components/Lab";
import Pharmacy from "./components/Pharmacy";

import HMS from '../media/HMS-Transparent.png';

import { API_URL } from "../API";

function App(token) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userData, setUserData] = useState('');

  const [isPaid, setIsPaid] = useState(true);


  const UserDataFetch = async () => {
    try {
      const response = await fetch(`${API_URL}/api/dashboard`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data);

      // Ideally, set the payment status from API response like below:
      // setIsPaid(data.isPaid);     --------------------- here getting status of user paid or not
      // setIsLabEnabled(data.isLabEnabled); // Example API response key for Lab visibility
      // setIsPharmacyEnabled(data.isPharmacyEnabled);

      console.log("Data", data.firstname, data.lastname);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log('error fetching: ', error);
    }
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('token');
    try {
      await axios.post(`${API_URL}/reactlogout`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }

      });
      alert("if you want Logout click OK")
      console.log("Logout successful:");
      navigate("/login");
    } catch (error) {
      alert("Error logging out:", error)
      console.error("Error logging out:", error);
    }
  };

  const handlePayment = () => {
    const options = {
      key: "rzp_live_oRtGw5y3RbD9MH", 
      amount: userData.dueAmount * 100, 
      currency: "INR",
      name: "Hospital Payment",
      description: "Test Transaction",
      handler: async function (response) {
        try {
          await axios.post(`${API_URL}/api/payment/verify`, {
            paymentId: response.razorpay_payment_id,
          });
          alert("Payment successful!");
          setIsPaid(true); 
        } catch (error) {
          console.error("Error verifying payment:", error);
          alert("Error processing payment");
        }
      },
      prefill: {
        name: userData.firstname,
        email: userData.email,
        contact: userData.contact,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  useEffect(() => {
    UserDataFetch();
  }, []);



  const [isLabEnabled, setIsLabEnabled] = useState(true); 
  const [isPharmacyEnabled, setIsPharmacyEnabled] = useState(true); 

  // tabs

  const renderContent = () => {

    if (!isPaid) {
      return (
        <div className="ntpd-payment-prompt">
          
          <h2 className="ntpd-heading">Please pay the bill amount to <br /> access Your Account.</h2>
          <p className="ntpd-amount-due">Amount Due: {userData.dueAmount}</p>
          <button className="ntpd-pay-button" onClick={handlePayment}>
            Click to Pay with Razorpay
          </button>
          <p className="ntpd-contact-us">
          If you need assistance, please <a href="ContactUs" className="ntpd-contact-link">contact us</a>.
        </p>
        </div>
      );
    }

    switch (activeTab) {
      case "Dashboard":
        return <Dashboard setActiveTab={setActiveTab} token={token} />;
      case "PatientRegistration":
        return <PatientRegistration />;
      case "DoctorView":
        return <DoctorView />;
      case "MedicalTests":
        return <MedicalTests token={token} />;
      case "MedicalPrescription":
        return <MedicalPrescription token={token} />;
      case "Billing":
        return <Billing />;
      case "HospitalData":
        return <HospitalData  />;
      case "Support": // Support tab handler
        return <Support />;
      case "Lab": // Handle Lab component
        return <Lab />;
      case "Pharmacy": // Handle Pharmacy component
        return <Pharmacy />;
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
          <div className="logoContainer">
            <img src={HMS} alt="HMS" width={20} />
            <span className="logo_name">TSAR-IT-HMS</span>
          </div>
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
           {/* lab */}
           {isLabEnabled ? (
            <li>
              <button
                className={activeTab === "Lab" ? "active" : ""}
                onClick={() => setActiveTab("Lab")}
              >
                <i className="bx bx-test-tube"></i>
                <span className="links_name">Lab</span>
              </button>
            </li>
          ) : null}

           {/* <li>
            <button
              className={activeTab === "Lab" ? "active" : ""}
              onClick={() => setActiveTab("Lab")}
            >
              <i className="bx bx-test-tube"></i>
             
              <span className="links_name">Lab</span>
            </button>
          </li> */}
          {/* pharmacy */}
          {/* <li>
            <button
              className={activeTab === "Pharmacy" ? "active" : ""}
              onClick={() => setActiveTab("Pharmacy")}
            >
              <i className="bx bx-capsule"></i>
              <span className="links_name">Pharmacy</span>
            </button>
          </li> */}
          {isPharmacyEnabled ? (
            <li>
              <button
                className={activeTab === "Pharmacy" ? "active" : ""}
                onClick={() => setActiveTab("Pharmacy")}
              >
                <i className="bx bx-capsule"></i>
                <span className="links_name">Pharmacy</span>
              </button>
            </li>
          ) : null}
            <li>
             <button
               className={activeTab === "MedicalTests" ? "active" : ""}
               onClick={() => setActiveTab("MedicalTests")}
             >
               <i className="bx bx-pie-chart-alt-2"></i>
               <span className="links_name">Patients Tracking</span>
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
          <li>
            <button
              className={activeTab === "Support" ? "active" : ""}
              onClick={() => setActiveTab("Support")}
            >
              <i className="bx bx-support"></i>
              <span className="links_name">Support</span>
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
            <div className="flexHeaderCol">
              <span className="dashboard fullWidth">Welcome! {userData.hospitalname}</span>
              <span className="dashboard smallText">Last Login : {userData.formattedDate}</span>
            </div>
          </div>
        </nav>
        <div className="home-content">{renderContent()}</div>
      </section>
    </div>
  );
}

export default App;
