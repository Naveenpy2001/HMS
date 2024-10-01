import React, { useState } from "react";
import axios from "axios";

const DoctorView = () => {
  // State to hold form values
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [ptDiseases, setPtDiseases] = useState("");
  const [patientTreatment, setPatientTreatment] = useState("");
  const [prescription, setPrescription] = useState("");
  const [tabletName1, setTabletName1] = useState("");
  const [otherTabletName, setOtherTabletName] = useState("");
  const [injection, setInjection] = useState("");
  // const [mg, setMg] = useState("");
  const [tests, setTests] = useState("");
  const [doctorAdvice, setDoctorAdvice] = useState("");
  

  const [tabletCount, setTabletCount] = useState(0);
  const [tabletMedicines, setTabletMedicines] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]);

  const [needsInjection, setNeedsInjection] = useState("No");
  const [injectionSize, setInjectionSize] = useState("");
  const [injectionName, setInjectionName] = useState("");
  const [injectionMg, setInjectionMg] = useState("");

  const [age,setAge] = useState('')


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchPatientData();
    }
  };

  const fetchPatientData = async () => {
    try {
      // Replace with your fetch API endpoint
      const response = await axios.get(`http://localhost:8080/api/record/${patientId}`);
      const data = response.data[0]; // Assuming API returns an array with one object
      setPatientName(data.firstName+" "+data.lastName);
      setPtDiseases(data.disease);
      setAge(data.age);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to fetch patient data. Please try again.");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Form data to be sent to the backend
    const formData = {
      patientId,
      patientName,
      ptDiseases,
      // patientTreatment,
      prescription,
      tabletName1,
      otherTabletName,
      injectionSize,
      injectionName,
      injectionMg,
      tabletCount,
      tests,
      doctorAdvice,
      age,
    };

    try {
      // Replace with your Spring Boot endpoint URL
      const response = await axios.post(
        "http://localhost:8080/savetreatment", // Update with your actual Spring Boot endpoint
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form Data Submitted:", response.data);
      alert("Data submitted successfully!",response.data);

      // Clear form after submission
      setPatientId("");
      // setPatientName("");
      // setPtDiseases("");
      setPatientTreatment("");
      setPrescription("");
      setTabletName1("");
      setOtherTabletName("");
      setInjectionSize("");
      setInjectionName("");
      setInjectionMg("");
      setTabletCount("");
      setTests("");
      setDoctorAdvice("");
      setAge('')
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit data. Please try again.");
    }
    // try {
    //   // Replace with your Spring Boot endpoint URL
    //   const printCertificate = (patientId) => {
    //     fetch(`http://localhost:8080/api/generate-certificate/${patientId}`)
    //       .then(response => response.blob())
    //       .then(blob => {
    //         const url = window.URL.createObjectURL(blob);
    //         const newWindow = window.open(url);
    //         newWindow.print();  // Automatically opens the print dialog
    //       });
    //   };
    //   console.log("certificate created ");
      
    // } catch (error) {
    //     console.error("certificate not suessfull");
    //     // alert("Failed to submit data. Please try again.");
    //   }
    
  };

  

  

  // try {
  //   const newMedicines = tabletMedicines
  //     .filter(m => m.medicine === "Other" && m.otherName)
  //     .map(m => ({ name: m.otherName }));

  //   // Submit prescription details
  //    axios.post('', {
  //     tablets: tabletMedicines.map(({ medicine, otherName }) => ({
  //       medicine: medicine === "Other" ? otherName : medicine,
  //     })),
  //     injection: needsInjection === "Yes" ? {
  //       size: injectionSize,
  //       name: injectionName,
  //       mg: injectionMg,
  //     } : null,
  //   });

  //   // Add new medicines to the database if any
  //   if (newMedicines.length > 0) {
  //      axios.post('', newMedicines);
  //     // Refresh the medicine options
  //     const response =  axios.get('');
  //     setMedicineOptions(response.data);
  //   }

  //   console.log('Prescription submitted successfully!');
  //   // alert('Prescription submitted successfully!');
  // } catch (error) {
  //   console.error('Error submitting prescription:', error);
  //   // alert('There was an error submitting the prescription!');
  // }


  const handleInjectionChange = (e) => {
    setNeedsInjection(e.target.value);
  };

  const handleMedicineChange = (index, value) => {
    const updatedMedicines = [...tabletMedicines];
    updatedMedicines[index].medicine = value;
    setTabletMedicines(updatedMedicines);
  };

  const handleOtherMedicineChange = (index, value) => {
    const updatedMedicines = [...tabletMedicines];
    updatedMedicines[index].otherName = value;
    setTabletMedicines(updatedMedicines);
  };

  const handleTabletCountChange = (e) => {
    const count = Math.min(e.target.value, 10) || 0;
    setTabletCount(count);
    setTabletMedicines(Array.from({ length: count }, () => ({ medicine: "", otherName: "" })));
  };
  const printCertificate = async () => {
    try {
      // Make API call to generate the certificate
      const response = await fetch(`http://localhost:8080/api/generate-certificate/${patientId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      // Convert the response to a Blob
      const blob = await response.blob();

      // Create a URL from the Blob
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new browser window/tab
      const newWindow = window.open(url);

      // Automatically trigger the print dialog once the PDF is loaded
      if (newWindow) {
        newWindow.onload = () => {
          newWindow.print();
        };
      }
    } catch (error) {
      console.error("Error printing the certificate:", error);
    }
  }
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
            // onKeyDown={handleKeyDown}
            onBlur={fetchPatientData}
            required
          />
           {/* <button type="button" onClick={fetchPatientData} className="dct-fetch-button">
            Fetch Patient Data
          </button> */}
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
            readOnly
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
            readOnly
          />
        </div>

        <div className="dct-form-group">
          <label htmlFor="ptDiseases" className="dct-label">
            Patient Age:
          </label>
          <input
            type="text"
            id="ptDiseases"
            className="dct-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            readOnly
          />
        </div>
<hr />
<hr />
        <h2 className="dct-subheading">Patient Treatment</h2>

        <div className="dct-form-group">
          <label htmlFor="prescription" className="dct-label">
            Doctor's Prescription:
          </label>
        
        </div>

        {/* <div className="dct-form-group">
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
        </div> */}

         {/* Tablets */}
        
         <label>Number of Tablets:</label>
        <input
          type="number"
          value={tabletCount}
          onChange={handleTabletCountChange}
          className="dct-input"
        />
        <br />

        {tabletCount > 0 && tabletMedicines.map((tablet, index) => (
          <div key={index}>
            <label>Select Medicine for Tablet {index + 1}:</label>
            <select
              value={tablet.medicine}
              onChange={(e) => handleMedicineChange(index, e.target.value)}
              className="dct-input"
            >
              <option value="">Select Medicine</option>
              {medicineOptions.map((medicine) => (
                <option key={medicine.id} value={medicine.name}>
                  {medicine.name}
                </option>
              ))}
              <option value="Paracetamol">Paracetamol
                
              </option>
              <option value="Ibuprofen">Ibuprofen</option>
              <option value="Aspirin">Aspirin</option>
              <option value="Amoxicillin">Amoxicillin</option>
              <option value="Metformin">Metformin</option>
              <option value="Atorvastatin">Atorvastatin</option>
              <option value="Omeprazole">Omeprazole</option>
              <option value="Amlodipine">Amlodipine</option>
              <option value="Losartan">Losartan</option>
              <option value="Cetirizine">Cetirizine</option>
              <option value="Other">Other</option>
            </select>
            {tablet.medicine === "Other" && (
              <div>
                <label>Enter Tablet Name:</label>
                <input
                  type="text"
                  value={tablet.otherName}
                  onChange={(e) => handleOtherMedicineChange(index, e.target.value)}
                  className="dct-input"
                />
              </div>
            )}
            <br />
          </div>
        ))}


        
        <br />

        {/* Injection */}
        

        <label>Need Injection:</label>
        <div>
          <input
            type="radio"
            name="needsInjection"
            value="Yes"
            checked={needsInjection === 'Yes'}
            onChange={handleInjectionChange}
          /> Yes
          <input
            type="radio"
            name="needsInjection"
            value="No"
            checked={needsInjection === 'No'}
            onChange={handleInjectionChange}
          /> No
        </div>
        <br />

        {/* Injection Details */}
        {needsInjection === "Yes" && (
          <div>
            <label>Select Injection Size:</label>
            <div>
              <input
                type="radio"
                name="injectionSize"
                value="Small"
                checked={injectionSize === 'Small'}
                onChange={(e) => setInjectionSize(e.target.value)}
              /> Small
              <input
                type="radio"
                name="injectionSize"
                value="Big"
                checked={injectionSize === 'Big'}
                onChange={(e) => setInjectionSize(e.target.value)}
              /> Big
            </div>
            <br />

            <label>Injection Name:</label>
            <input
              type="text"
              value={injectionName}
              onChange={(e) => setInjectionName(e.target.value)}
            />
            <br />

            <label>Injection mg:</label>
            <input
              type="text"
              value={injectionMg}
              onChange={(e) => setInjectionMg(e.target.value)}
            />
            <br />

            <button type="button" onClick={() => alert('Injection details updated!')}>Update</button>
            <br />
          </div>
        )}

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
        <div>
        <button type="submit" className="dct-submit-button">
          Submit
        </button>
        <button onClick={printCertificate} type="submit" className="dct-submit-button">
          download prescription
    </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorView;
