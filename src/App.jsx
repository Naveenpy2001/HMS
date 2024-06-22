import React from "react";
import Header from "./header/header";
import Home from "./home/home";
import HospitalDashboard from "./demo/primaryDemo";
import DoctorManagement from "./demo/doctorManage";
import HospitalAccountsPage from "./demo/accountManagement";
import PatientRegistration from "./demo/patientRegistration";
import PatientTracker from "./demo/patientTrack";

import { Routes,Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Primary" element={<HospitalDashboard />} />
        <Route path="/DoctorManagement" element={<DoctorManagement />} />
        <Route path="/PatientRegistration" element={<PatientRegistration />} />
        <Route path="/PatientTracker" element={<PatientTracker />} />
        <Route
          path="/HospitalAccountsPage"
          element={<HospitalAccountsPage />}
        />
      </Routes>
    </>
  );
};

export default App;
