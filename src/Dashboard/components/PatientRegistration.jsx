import React, { useState } from "react";
import axios from "axios";
import "../../css/patientRegister.css"; 

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    pnum: "",
    Aadhar: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    address: "",
    gender: "",
    disease: "",
    diseaseOther: "",
    payment: "",
    cashAmount: "",
    upiAmount: "",
    upiTransaction: "",
    netbankingAmount: "",
    netbankingTransaction: "",
    accountAmount: "",
    accountTransaction: "",
    accountDoc: null,
    referenceAmount: "",
    reference: "",
    insurance: "",
    othersDoc: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios.post("YOUR_BACKEND_ENDPOINT_HERE", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Patient registration submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit registration. Please try again.");
    }
  };

  return (
    <div className="pr-forms">
      <h1 className="header-center">Patient Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="pr-field">
          <label htmlFor="fname">First name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />
        </div>
        <div className="pr-field">
          <label htmlFor="lname">Last name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
        </div>
        <div className="pr-field">
          <label htmlFor="email">Enter your email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="pr-field">
          <label htmlFor="pnum">Enter your phone number:</label>
          <input
            type="text"
            id="pnum"
            name="pnum"
            value={formData.pnum}
            onChange={handleChange}
          />
        </div>
        <div className="pr-field">
          <label htmlFor="Aadhar">Enter your Aadhar Number:</label>
          <input
            type="text"
            id="Aadhar"
            name="Aadhar"
            value={formData.Aadhar}
            onChange={handleChange}
          />
        </div>
        <div className="pr-field">
          <label>Date of Birth:</label>
          <div className="pr-dob">
            <select
              id="dob-day"
              name="dobDay"
              value={formData.dobDay}
              onChange={handleChange}
            >
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              id="dob-month"
              name="dobMonth"
              value={formData.dobMonth}
              onChange={handleChange}
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, i) => (
                <option key={i} value={i + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              id="dob-year"
              name="dobYear"
              value={formData.dobYear}
              onChange={handleChange}
            >
              {[...Array(100)].map((_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="pr-field">
          <label htmlFor="address">Enter your Address:</label>
          <textarea
            id="address"
            name="address"
            rows="3"
            cols="50"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="pr-field ">
          <label>Select Gender:</label>
          <div className="flex">
            <input
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            <label htmlFor="Male">Male</label>
            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            <label htmlFor="Female">Female</label>
            <input
              type="radio"
              id="Others"
              name="gender"
              value="Others"
              checked={formData.gender === "Others"}
              onChange={handleChange}
            />
            <label htmlFor="Others">Others</label>
          </div>
        </div>
        <div className="pr-field">
          <label htmlFor="disease">Select Disease:</label>
          <select
            id="disease"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
          >
            <option value="Fever">Fever</option>
            <option value="Headache">Headache</option>
            <option value="Cold">Cold</option>
            <option value="Rashes">Rashes</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {formData.disease === "Others" && (
          <div className="pr-field pr-disease-other">
            <label htmlFor="disease-other">Enter Other Disease:</label>
            <input
              type="text"
              id="disease-other"
              name="diseaseOther"
              value={formData.diseaseOther}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="pr-field">
          <label htmlFor="payment">Mode of Payment:</label>
          <select
            id="payment"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Account">Account</option>
            <option value="Reference">Reference</option>
            <option value="Insurance">Insurance</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {formData.payment === "Cash" && (
          <div className="pr-field pr-cash">
            <label htmlFor="cash-amount">Cash Amount:</label>
            <input
              type="text"
              id="cash-amount"
              name="cashAmount"
              value={formData.cashAmount}
              onChange={handleChange}
            />
          </div>
        )}
        {formData.payment === "UPI" && (
          <div className="pr-payment-details">
            <div className="pr-field pr-upi">
              <label htmlFor="upi-amount">UPI Amount:</label>
              <input
                type="text"
                id="upi-amount"
                name="upiAmount"
                value={formData.upiAmount}
                onChange={handleChange}
              />
            </div>
            <div className="pr-field pr-upi">
              <label htmlFor="upi-transaction">UPI Transaction No:</label>
              <input
                type="text"
                id="upi-transaction"
                name="upiTransaction"
                value={formData.upiTransaction}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {formData.payment === "Net Banking" && (
          <div className="pr-payment-details">
            <div className="pr-field pr-net-banking">
              <label htmlFor="netbanking-amount">Net Banking Amount:</label>
              <input
                type="text"
                id="netbanking-amount"
                name="netbankingAmount"
                value={formData.netbankingAmount}
                onChange={handleChange}
              />
            </div>
            <div className="pr-field pr-net-banking">
              <label htmlFor="netbanking-transaction">
                Net Banking Transaction No/ID:
              </label>
              <input
                type="text"
                id="netbanking-transaction"
                name="netbankingTransaction"
                value={formData.netbankingTransaction}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {formData.payment === "Account" && (
          <div className="pr-payment-details">
            <div className="pr-field pr-account">
              <label htmlFor="account-amount">Account Amount:</label>
              <input
                type="text"
                id="account-amount"
                name="accountAmount"
                value={formData.accountAmount}
                onChange={handleChange}
              />
            </div>
            <div className="pr-field pr-account">
              <label htmlFor="account-transaction">
                Account Transaction No/ID:
              </label>
              <input
                type="text"
                id="account-transaction"
                name="accountTransaction"
                value={formData.accountTransaction}
                onChange={handleChange}
              />
            </div>
            <div className="pr-field pr-account">
              <label htmlFor="account-doc">Upload Document:</label>
              <input
                type="file"
                id="account-doc"
                name="accountDoc"
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {formData.payment === "Reference" && (
          <div className="pr-payment-details">
            <div className="pr-field pr-reference">
              <label htmlFor="reference-amount">Reference Amount:</label>
              <input
                type="text"
                id="reference-amount"
                name="referenceAmount"
                value={formData.referenceAmount}
                onChange={handleChange}
              />
            </div>
            <div className="pr-field pr-reference">
              <label htmlFor="reference">Reference (Friends/Relative):</label>
              <input
                type="text"
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {formData.payment === "Insurance" && (
          <div className="pr-field pr-insurance">
            <label htmlFor="insurance">Insurance:</label>
            <input
              type="text"
              id="insurance"
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
            />
          </div>
        )}
        {formData.payment === "Others" && (
          <div className="pr-field pr-others">
            <label htmlFor="others-doc">Others (Govt Certification):</label>
            <input
              type="file"
              id="others-doc"
              name="othersDoc"
              onChange={handleChange}
            />
          </div>
        )}
        <div className="pr-button">
          <button type="submit" className="pr-button-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration;
