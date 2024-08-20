import React, { useState } from "react";
import axios from 'axios';

const DoctorView = () => {
  // State to hold form values
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [ptDiseases, setPtDiseases] = useState("");
  const [patientTreatment, setPatientTreatment] = useState("");
  const [prescription, setPrescription] = useState("");
  const [tabletName, setTabletName] = useState("");
  const [otherTabletName, setOtherTabletName] = useState("");
  const [injection, setInjection] = useState("");
  const [mg, setMg] = useState("");
  const [tabletCount, setTabletCount] = useState("");
  const [tests, setTests] = useState("");
  const [doctorAdvice, setDoctorAdvice] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const formData = {
      patientId,
      patientName,
      ptDiseases,
      patientTreatment,
      prescription,
      tabletName,
      otherTabletName,
      injection,
      mg,
      tabletCount,
      tests,
      doctorAdvice,
    };
    console.log("Form Data Submitted:", formData);
    // Clear form after submission
    setPatientId("");
    setPatientName("");
    setPtDiseases("");
    setPatientTreatment("");
    setPrescription("");
    setTabletName("");
    setOtherTabletName("");
    setInjection("");
    setMg("");
    setTabletCount("");
    setTests("");
    setDoctorAdvice("");
  };

  return (
    <div className="dct-view">
      <h1 className="dct-heading">Doctor View</h1>
      <form onSubmit={handleSubmit} className="dct-form">
        <div className="dct-form-group">
          <label htmlFor="patientId" className="dct-label">
            Patient ID:
          </label>
          <input
            type="text"
            id="patientId"
            className="dct-input"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>

        <div className="dct-form-group">
          <label htmlFor="patientName" className="dct-label">
            Patient Name:
          </label>
          <input
            type="text"
            id="patientName"
            className="dct-input"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>

        <div className="dct-form-group">
          <label htmlFor="ptDiseases" className="dct-label">
            Patient Diseases:
          </label>
          <input
            type="text"
            id="ptDiseases"
            className="dct-input"
            value={ptDiseases}
            onChange={(e) => setPtDiseases(e.target.value)}
            required
          />
        </div>

        <h2 className="dct-subheading">Patient Treatment</h2>

        <div className="dct-form-group">
          <label htmlFor="prescription" className="dct-label">
            Doctor's Prescription:
          </label>
          <input
            type="text"
            id="prescription"
            className="dct-input"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            required
          />
        </div>

        <div className="dct-form-group">
          <label htmlFor="tabletName" className="dct-label">
            Select Tablet Name:
          </label>
          <select
            id="tabletName"
            className="dct-select"
            value={tabletName}
            onChange={(e) => {
              setTabletName(e.target.value);
              if (e.target.value !== "others") {
                setOtherTabletName("");
              }
            }}
            required
          >
            <option value="">Select...</option>
            <option value="dolo">Dolo</option>
            <option value="paracetamol">Paracetamol</option>
            <option value="others">Others</option>
          </select>
          {tabletName === "others" && (
            <input
              type="text"
              id="otherTabletName"
              className="dct-input"
              value={otherTabletName}
              onChange={(e) => setOtherTabletName(e.target.value)}
              placeholder="Enter tablet name"
            />
          )}
        </div>

        <div className="dct-form-group">
          <label className="dct-label">Injection:</label>
          <div>
            <input
              type="radio"
              id="needlesSmall"
              name="injection"
              value="needlesSmall"
              checked={injection === "needlesSmall"}
              onChange={(e) => setInjection(e.target.value)}
              className="dct-radio"
            />
            <label htmlFor="needlesSmall" className="dct-radio-label">
              Needles Small
            </label>

            <input
              type="radio"
              id="needlesBig"
              name="injection"
              value="needlesBig"
              checked={injection === "needlesBig"}
              onChange={(e) => setInjection(e.target.value)}
              className="dct-radio"
            />
            <label htmlFor="needlesBig" className="dct-radio-label">
              Needles Big
            </label>
          </div>
        </div>

        <div className="dct-form-group">
          <label htmlFor="mg" className="dct-label">
            MG:
          </label>
          <input
            type="text"
            id="mg"
            className="dct-input"
            value={mg}
            onChange={(e) => setMg(e.target.value)}
            required
          />
        </div>

        <div className="dct-form-group">
          <label htmlFor="tabletCount" className="dct-label">
            Count of Tablets:
          </label>
          <input
            type="number"
            id="tabletCount"
            className="dct-input"
            value={tabletCount}
            onChange={(e) => setTabletCount(e.target.value)}
            required
          />
        </div>

        <div className="dct-form-group">
          <label htmlFor="tests" className="dct-label">
            Tests:
          </label>
          <input
            type="text"
            id="tests"
            className="dct-input"
            value={tests}
            onChange={(e) => setTests(e.target.value)}
            required
          />
        </div>

        <div className="dct-form-group">
          <label htmlFor="doctorAdvice" className="dct-label">
            Doctor's Advice:
          </label>
          <textarea
            id="doctorAdvice"
            className="dct-textarea"
            value={doctorAdvice}
            onChange={(e) => setDoctorAdvice(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="dct-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorView;
