import React, { useState, useEffect } from "react";
// css
// PatientsRegister.css

const Dashboard = () => {
  const [data, setData] = useState({
    todayPatientsCount: 0,
    totalPatientsCount: 0,
    todayAppointmentsCount: 0,
    totalAppointmentsCount: 0,
    todayPayment: 0,
    totalPayment: 0,
    patientTracking: [],
  });

  const [animatedData, setAnimatedData] = useState({
    todayPatientsCount: 0,
    totalPatientsCount: 0,
    todayAppointmentsCount: 0,
    totalAppointmentsCount: 0,
    todayPayment: 0,
    totalPayment: 0,
  });

  useEffect(() => {
    // Simulating data fetch from an API
    const fetchData = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch("/api/dashboard-data");
        const result = await response.json();
        setData(result);

        // Start the count animation
        setAnimatedData({
          todayPatientsCount: result.todayPatientsCount,
          totalPatientsCount: result.totalPatientsCount,
          todayAppointmentsCount: result.todayAppointmentsCount,
          totalAppointmentsCount: result.totalAppointmentsCount,
          todayPayment: result.todayPayment,
          totalPayment: result.totalPayment,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Use fallback data in case of an error
        setData({
          todayPatientsCount: 12,
          totalPatientsCount: 150,
          todayAppointmentsCount: 8,
          totalAppointmentsCount: 100,
          todayPayment: 1200,
          totalPayment: 15000,
          patientTracking: [
            { name: "John Doe", visited: true },
            { name: "Jane Smith", visited: false },
            { name: "Mike Johnson", visited: true },
          ],
        });
      }
    };

    fetchData();
  }, []);

  // Function to format currency in INR
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // Function to animate the count
  const countAnimation = (targetValue, element) => {
    const startValue = 0;
    const duration = 250; // Duration in milliseconds
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Normalize to [0, 1]
      const currentValue = Math.floor(
        startValue + (targetValue - startValue) * progress
      );

      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = targetValue; // Ensure final value is set
      }
    };

    requestAnimationFrame(updateCount);
  };

  useEffect(() => {
    document.querySelectorAll(".count").forEach((el) => {
      const targetValue = parseInt(el.getAttribute("data-target"), 10);
      countAnimation(targetValue, el);
    });
  }, [data]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-container">
        <div className="stats-card" style={{ backgroundColor: "#FFDDC1" }}>
          <h2>Today's Patients</h2>
          <p className="count" data-target={data.todayPatientsCount}>
            {data.todayPatientsCount}
          </p>
        </div>
        <div className="stats-card" style={{ backgroundColor: "#FFABAB" }}>
          <h2>Total Patients</h2>
          <p className="count" data-target={data.totalPatientsCount}>
            {data.totalPatientsCount}
          </p>
        </div>
        <div className="stats-card" style={{ backgroundColor: "#FFC3A0" }}>
          <h2>Today's Appointments</h2>
          <p className="count" data-target={data.todayAppointmentsCount}>
            {data.todayAppointmentsCount}
          </p>
        </div>
        <div className="stats-card" style={{ backgroundColor: "#D5AAFF" }}>
          <h2>Total Appointments</h2>
          <p className="count" data-target={data.totalAppointmentsCount}>
            {data.totalAppointmentsCount}
          </p>
        </div>
        <div className="stats-card" style={{ backgroundColor: "#B9FBC0" }}>
          <h2>Today's Payment</h2>
          <p className="count" data-target={data.todayPayment}>
            {formatCurrency(data.todayPayment)}
          </p>
        </div>
        <div className="stats-card" style={{ backgroundColor: "#C2C2F0" }}>
          <h2>Total Payment</h2>
          <p className="count" data-target={data.totalPayment}>
            {formatCurrency(data.totalPayment)}
          </p>
        </div>
      </div>

      <div className="tracking-container">
        <h2>Patient Tracking</h2>
        <table className="tracking-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.patientTracking.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.visited ? "Visited" : "Not Visited"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
