import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls

const Billing = () => {
  // States to hold various data
  const [todaysPayments, setTodaysPayments] = useState([]);
  const [monthlyTotalPayments, setMonthlyTotalPayments] = useState({ monthWise: [], yearWise: [] });
  const [totalPatients, setTotalPatients] = useState(0);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [walletAmount, setWalletAmount] = useState(0);

  // Fetch data from API when the component mounts
  useEffect(() => {
    // Fetch today's payments
    axios.get('http://hms.tsaritservices.com/api/payments/today')
      .then(response => setTodaysPayments(response.data || []))
      .catch(error => console.error('Error fetching today\'s payments:', error));

    // Fetch total payments
    axios.get('http://hms.tsaritservices.com/monthly-total')
      .then(response => setMonthlyTotalPayments(response.data || { monthWise: [], yearWise: [] }))
      .catch(error => console.error('Error fetching total payments:', error));

   
    // // Fetch wallet amount
    // axios.get('http://localhost:8080/api/wallet/amount')
    //   .then(response => setWalletAmount(response.data || 0))
    //   .catch(error => console.error('Error fetching wallet amount:', error));
  }, []);

  // Function to handle clearing pending payments
  const handleClear = (type) => {
    if (type === 'pendingPayments') {
      setPendingPayments([]);
    }
  };

  return (
    <div className="billing">
      <h1 className="billing-heading">Accounts Information</h1>

      <section className="billing-section">
        <h2 className="billing-subheading">Today's Payments</h2>
        <table className="billing-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Phone</th>
              <th>Name</th>
              <th>Registration Fee</th>
            </tr>
          </thead>
          <tbody>
            {todaysPayments.length > 0 ? (
              todaysPayments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.id}</td>
                  <td>{payment.phoneNumber}</td>
                  <td>{payment.firstName} {payment.lastName}</td>
                  <td>{payment.amount} INR</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="billing-section">
        <h2 className="billing-subheading">Total Payments</h2>
        <div className="billing-summary">
          <div className="billing-summary-item">
            <h3>Month-wise</h3>
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                {monthlyTotalPayments.monthWise && monthlyTotalPayments.monthWise.length > 0 ? (
                  monthlyTotalPayments.monthWise.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.month}</td>
                      <td>{payment.totalAmount} INR</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="billing-summary-item">
            <h3>Year-wise</h3>
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                {monthlyTotalPayments.yearWise && monthlyTotalPayments.yearWise.length > 0 ? (
                  monthlyTotalPayments.yearWise.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.year}</td>
                      <td>{payment.amount} INR</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="billing-section">
        <h2 className="billing-subheading">Total Patients & Total Payments</h2>
        <p>Total Patients: {totalPatients}</p>
        <p>Total Payments: {monthlyTotalPayments.yearWise && monthlyTotalPayments.yearWise.length > 0 ? 
          monthlyTotalPayments.yearWise.reduce((acc, payment) => acc + payment.amount, 0) : 0} INR</p>
      </section>

      <section className="billing-section">
        <h2 className="billing-subheading">Pending Payments</h2>
        <table className="billing-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Phone</th>
              <th>Name</th>
              <th>Pending Amount</th>
            </tr>
          </thead>
          <tbody>
            {pendingPayments.length > 0 ? (
              pendingPayments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.patientId}</td>
                  <td>{payment.phone}</td>
                  <td>{payment.name}</td>
                  <td>{payment.pendingAmount} INR</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="billing-button" onClick={() => handleClear('pendingPayments')}>
          Clear Pending Payments
        </button>
      </section>

      <section className="billing-section">
        <h2 className="billing-subheading">Your Wallet Amount</h2>
        <p>Wallet Amount: {walletAmount} INR</p>
      </section>
    </div>
  );
};

export default Billing;
