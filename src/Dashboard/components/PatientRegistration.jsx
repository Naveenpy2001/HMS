import React, { useState } from "react";
import axios from "axios";
import "../../css/patientRegister.css";


const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    aadharNumber: "",
    address: "",
    gender: "",
    disease: "",
    otherDisease: "",
    day: "",
    month: "",
    year: "",
    age: "",
    modeOfPayment: "",
    amount: "",
    upiTransactionNo: "",
    netBankingTransactionId: "",
    netBankingScreenshot: "",
    accountTransactionId: "",
    accountDocument: "",
    reference: "",
    insurance: "",
    otherPayment: "",
    weight: "",
    bp: "",
    appointmentTaken: "",
    appointmentDetails: "",
    modeOfPatient: "",
    bedAssign: "",
    bedDetails: "",
    bedNo: "",
    bedDays: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateAge = () => {
    if (formData.day && formData.month && formData.year) {
      const birthDate = new Date(
        formData.year,
        formData.month - 1,
        formData.day
      );
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      setFormData({ ...formData, age: calculatedAge });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("your-api-endpoint", formData);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="pr-forms">
      <h1>Patient Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>First name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Last name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Aadhar Number:</label>
        <input
          type="text"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="pr-textarea"
        />
        <br />
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          onChange={handleInputChange}
          className="pr-radio"
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={handleInputChange}
          className="pr-radio"
        />{" "}
        Female
        <input
          type="radio"
          name="gender"
          value="Others"
          onChange={handleInputChange}
          className="pr-radio"
        />{" "}
        Others
        <br />
        <label>Disease:</label>
        <select
          name="disease"
          value={formData.disease}
          onChange={handleInputChange}
          className="pr-select"
        >
          <option value="Fever">Fever</option>
          <option value="Headache">Headache</option>
          <option value="Cold">Cold</option>
          <option value="Rashes">Rashes</option>
          <option value="Others">Others</option>
        </select>
        {formData.disease === "Others" && (
          <input
            type="text"
            name="otherDisease"
            value={formData.otherDisease}
            onChange={handleInputChange}
            className="pr-input"
            placeholder="Enter other disease"
          />
        )}
        <br />
        <label>Date of Birth:</label>
        <select
          name="day"
          value={formData.day}
          onChange={(e) => {
            handleInputChange(e);
            calculateAge();
          }}
          className="pr-select"
        >
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          name="month"
          value={formData.month}
          onChange={(e) => {
            handleInputChange(e);
            calculateAge();
          }}
          className="pr-select"
        >
          <option value="">Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          name="year"
          value={formData.year}
          onChange={(e) => {
            handleInputChange(e);
            calculateAge();
          }}
          className="pr-select"
        >
          <option value="">Year</option>
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i + 1920} value={i + 1920}>
              {i + 1920}
            </option>
          ))}
        </select>
        <br />
        {formData.age && (
          <div>
            <label>Age:</label>
            <input
              type="text"
              value={formData.age}
              className="pr-input"
              readOnly
            />
            <br />
          </div>
        )}
        <label>Mode of Payment:</label>
        <select
          name="modeOfPayment"
          value={formData.modeOfPayment}
          onChange={handleInputChange}
          className="pr-select"
        >
          <option value="">Select Payment Mode</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="NetBanking">Net Banking</option>
          <option value="Account">Account</option>
          <option value="Reference">Reference</option>
          <option value="Insurance">Insurance</option>
          <option value="Others">Others</option>
        </select>
        <br />
        {formData.modeOfPayment === "Cash" && (
          <div>
            <label>Amount:</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="pr-input"
            />
          </div>
        )}
        {formData.modeOfPayment === "UPI" && (
          <div>
            <label>Amount:</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="pr-input"
            />
            <br />
            <label>UPI Transaction No:</label>
            <input
              type="text"
              name="upiTransactionNo"
              value={formData.upiTransactionNo}
              onChange={handleInputChange}
              className="pr-input"
            />
          </div>
        )}
        {formData.modeOfPayment === "NetBanking" && (
          <div>
            <label>Amount:</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="pr-input"
            />
            <br />
            <label>Transaction ID:</label>
            <input
              type="text"
              name="netBankingTransactionId"
              value={formData.netBankingTransactionId}
              onChange={handleInputChange}
              className="pr-input"
            />
            <br />
            <label>Screenshot:</label>
            <input
              type="file"
              name="netBankingScreenshot"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  netBankingScreenshot: e.target.files[0],
                })
              }
              className="pr-input"
            />
          </div>
        )}
        {formData.modeOfPayment === "Account" && (
          <div>
            <label>Amount:</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="pr-input"
            />
            <br />
            <label>Transaction ID:</label>
            <input
              type="text"
              name="accountTransactionId"
              value={formData.accountTransactionId}
              onChange={handleInputChange}
              className="pr-input"
            />
            <br />
            <label>Upload Document:</label>
            <input
              type="file"
              name="accountDocument"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  accountDocument: e.target.files[0],
                })
              }
              className="pr-input"
            />
          </div>
        )}
        {formData.modeOfPayment === "Reference" && (
          <div>
            <label>Amount:</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="pr-input"
            />
            <br />
            <label>Reference:</label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              className="pr-input"
            />
          </div>
        )}
        {formData.modeOfPayment === "Insurance" && (
          <div>
            <label>Insurance Details:</label>
            <input
              type="text"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
              className="pr-input"
            />
          </div>
        )}
        {formData.modeOfPayment === "Others" && (
          <div>
            <label>Other Payment Details:</label>
            <input
              type="text"
              name="otherPayment"
              value={formData.otherPayment}
              onChange={handleInputChange}
              className="pr-input"
            />
          </div>
        )}
        <br />
        <label>Weight:</label>
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>BP:</label>
        <input
          type="text"
          name="bp"
          value={formData.bp}
          onChange={handleInputChange}
          className="pr-input"
        />
        <br />
        <label>Already Taken Any Appointment:</label>
        <input
          type="radio"
          name="appointmentTaken"
          value="Yes"
          onChange={handleInputChange}
          className="pr-radio"
        />{" "}
        Yes
        <input
          type="radio"
          name="appointmentTaken"
          value="No"
          onChange={handleInputChange}
          className="pr-radio"
        />{" "}
        No
        <br />
        {formData.appointmentTaken === "Yes" && (
          <div>
            <label>Details (Phone/Email/Token No.):</label>
            <input
              type="text"
              name="appointmentDetails"
              value={formData.appointmentDetails}
              onChange={handleInputChange}
              className="pr-input"
            />
          </div>
        )}
        <br />
        <label>Mode of Patient:</label>
        <select
          name="modeOfPatient"
          value={formData.modeOfPatient}
          onChange={handleInputChange}
          className="pr-select"
        >
          <option value="">Select Mode</option>
          <option value="OPD">OPD</option>
          <option value="IPD">IPD</option>
          <option value="Emergency">Emergency</option>
        </select>
        <br />
        <label>Bed Assigned:</label>
        <input
          type="radio"
          name="bedAssign"
          value="Yes"
          onChange={handleInputChange}
          className="pr-radio"
        />{" "}
        Yes
        <input
          type="radio"
          name="bedAssign"
          value="No"
          onChange={handleInputChange}
          className="pr-radio"
        />{" "}
        No
        <br />
        {formData.bedAssign === "Yes" && (
          <div>
            <label>Select Bed:</label>
            <input
              type="text"
              name="bedDetails"
              value={formData.bedDetails}
              onChange={handleInputChange}
              className="pr-input"
              placeholder="Bed details"
            />
            <br />
            <label>Bed No:</label>
            <input
              type="text"
              name="bedNo"
              value={formData.bedNo}
              onChange={handleInputChange}
              className="pr-input"
            />
            <br />
            <label>How Many Days:</label>
            <input
              type="text"
              name="bedDays"
              value={formData.bedDays}
              onChange={handleInputChange}
              className="pr-input"
              placeholder="Number of days"
            />
          </div>
        )}
        <br />
        <button type="submit" className="pr-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientRegistration;
