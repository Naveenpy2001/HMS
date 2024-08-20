import React, { useState } from 'react';


    const Billing = () => {
  // States to hold various data
  const [todaysPayments, setTodaysPayments] = useState([
    // Example data format
    { patientId: 'P001', phone: '1234567890', name: 'John Doe', registrationFee: 500 },
  ]);

  const [totalPayments, setTotalPayments] = useState({
    monthWise: [
      { month: 'January', amount: 1000 },
      { month: 'February', amount: 1200 },
    ],
    yearWise: [
      { year: 2023, amount: 15000 },
    ],
  });

  const [totalPatients, setTotalPatients] = useState(50);
  const [pendingPayments, setPendingPayments] = useState([
    // Example data format
    { patientId: 'P002', phone: '0987654321', name: 'Jane Smith', pendingAmount: 200 },
  ]);

  const [walletAmount, setWalletAmount] = useState(5000);

  // Function to handle clearing patients and pending payments
  const handleClear = (type) => {
    if (type === 'patients') {
      setTotalPatients(0);
    } else if (type === 'pendingPayments') {
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
            {todaysPayments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.patientId}</td>
                <td>{payment.phone}</td>
                <td>{payment.name}</td>
                <td>{payment.registrationFee} INR</td>
              </tr>
            ))}
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
                {totalPayments.monthWise.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.month}</td>
                    <td>{payment.amount} INR</td>
                  </tr>
                ))}
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
                {totalPayments.yearWise.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.year}</td>
                    <td>{payment.amount} INR</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="billing-section">
        <h2 className="billing-subheading">Total Patients & Total Payments</h2>
        <p>Total Patients: {totalPatients}</p>
        <p>Total Payments: {totalPayments.yearWise.reduce((acc, payment) => acc + payment.amount, 0)} INR</p>
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
            {pendingPayments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.patientId}</td>
                <td>{payment.phone}</td>
                <td>{payment.name}</td>
                <td>{payment.pendingAmount} INR</td>
              </tr>
            ))}
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
