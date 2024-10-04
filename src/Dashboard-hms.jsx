import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/hms-dash.css'
const DashboardHms = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [freezeStatus, setFreezeStatus] = useState({});

  useEffect(() => {
    // Fetch hospitals data from API
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/hospitals');
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals data:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleFreezeAccount = (hospitalId) => {
    setFreezeStatus((prevState) => ({
      ...prevState,
      [hospitalId]: true,
    }));


  };

  const handleClearAmount = (hospitalId) => {

  };

  return (
    <div className="dashboard">
      <div className="side-nav">
        <h2>Hospitals List</h2>
        <ul>
          {hospitals.map((hospital) => (
            <li
              key={hospital.id}
              onClick={() => setSelectedHospital(hospital)}
              className={selectedHospital?.id === hospital.id ? 'active' : ''}
            >
              {hospital.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        {selectedHospital ? (
          <div>
            <h2>{selectedHospital.name}</h2>
            <table className="hospital-details-table">
              <thead>
                <tr>
                  <th>Hospital Name</th>
                  <th>Paid/Not Paid</th>
                  <th>Remaining Fee</th>
                  <th>Cleared Amount</th>
                  <th>Balance Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedHospital.name}</td>
                  <td>{selectedHospital.paid ? 'Paid' : 'Not Paid'}</td>
                  <td>{selectedHospital.remainingFee} INR</td>
                  <td>{selectedHospital.clearedAmount} INR</td>
                  <td>{selectedHospital.balanceAmount} INR</td>
                  <td>
                    <button
                      onClick={() => handleFreezeAccount(selectedHospital.id)}
                      disabled={freezeStatus[selectedHospital.id]}
                    >
                      {freezeStatus[selectedHospital.id] ? 'Account Frozen' : 'Freeze Account'}
                    </button>
                    <button onClick={() => handleClearAmount(selectedHospital.id)}>
                      Clear Amount
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>Please select a hospital from the left to see details.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardHms;
