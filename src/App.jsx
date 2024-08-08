import React from "react";
import Header from "./header/header";
import Home from "./home/home";
import { Routes,Route } from "react-router-dom";
import DashboardHMS from "./Dashboard/dashboard";
import Login from "./Dashboard/Login";
import Register from "./Dashboard/Register";
import ForgotPswd from "./Dashboard/components/ForgotPswd";
import Loader from "./loader";
const App = () => {
  return (
    <>
    <Loader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<DashboardHMS />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/pswd" element={<ForgotPswd />} />
      </Routes>
    </>
  );
};

export default App;
