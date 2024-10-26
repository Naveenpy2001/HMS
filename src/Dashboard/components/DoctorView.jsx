// import React, { useState } from "react";
// import axios from "axios";
// import {  useEffect } from 'react';

// import { API_URL } from "../../API";

// const DoctorView = () => {
//   // State to hold form values
//   const [patientId, setPatientId] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const [ptDiseases, setPtDiseases] = useState("");
//   const [patientTreatment, setPatientTreatment] = useState("");
//   const [prescription, setPrescription] = useState("");
//   const [tabletName1, setTabletName1] = useState("");
//   const [otherTabletName, setOtherTabletName] = useState("");
//   const [injection, setInjection] = useState("");
//   const [tests, setTests] = useState("");
//   const [doctorAdvice, setDoctorAdvice] = useState("");
//   const [tabletCount, setTabletCount] = useState(0);
//   const [tabletMedicines, setTabletMedicines] = useState([]);
//   const [medicineOptions, setMedicineOptions] = useState([]);
//   const [needsInjection, setNeedsInjection] = useState("No");
//   const [injectionSize, setInjectionSize] = useState("");
//   const [injectionName, setInjectionName] = useState("");
//   const [injectionMg, setInjectionMg] = useState("");
//   const [age, setAge] = useState("");
//   const [activeTab, setActiveTab] = useState(1);
//   const [patientsList, setPatientsList] = useState([
    
//   ]);
//   useEffect(() => {
//     fetchData(); // Fetch patients on component mount
//   }, []);
//   const [visitedPatientsList, setVisitedPatientsList] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);


//   const handleTabChange = (tabIndex) => {
//     setActiveTab(tabIndex);
//   };


//   const[treatmentId,setTreatmentId]=useState("")
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       fetchPatientData();
//     }
//   };

  
//   useEffect(() => {
//     if (treatmentId) {
//       console.log("Updated treatmentId:", treatmentId);
//     }
//   }, [treatmentId]);


//   const handleInjectionChange = (e) => {

//     setNeedsInjection(e.target.value);
//   };

//   const handleMedicineChange = (index, value) => {
//     const updatedMedicines = [...tabletMedicines];
//     updatedMedicines[index].medicine = value;
//     setTabletMedicines(updatedMedicines);
//   };

//   const handleOtherMedicineChange = (index, value) => {
//     const updatedMedicines = [...tabletMedicines];
//     updatedMedicines[index].otherName = value;
//     setTabletMedicines(updatedMedicines);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/today`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP fetching error! status: ${response.status}`);
//       }
  
//       const result = await response.json();

//       console.log(result);
//       setPatientsList(result);
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//     }
//   };
  

//   const [patientId2, setPatientId2] = useState("");
//   const fetchPatientData = async (patientId1) => {
//     try {
//       // Replace with your fetch API endpoint
//       const response = await axios.get(
//         `${API_URL}/api/record/${patientId1}`
//       );
//       const data = response.data[0]; // Assuming API returns an array with one object
//       setPatientName(data.firstName + " " + data.lastName);
//       setPtDiseases(data.disease);
//       setAge(data.age);
//       setPatientId2(patientId1)
//     } catch (error) {
//       console.error("Error fetching patient data:", error);
//       alert("Failed to fetch patient data. Please try again.");
//     }
//   };

//   // Function to handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = {
//       patientId2,
//       patientName,
//       ptDiseases,
//       prescription,
//       tabletName1,
//       otherTabletName,
//       injectionSize,
//       injectionName,
//       injectionMg,
//       tabletCount,
//       tests,
//       doctorAdvice,
//       age,
//     };

//     try {
//       const response = await axios.post(
//         `${API_URL}savetreatment`, // Update with your actual Spring Boot endpoint
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
      
//       // alert(response.data);
//       console.log("Data submitted successfully!", response.data);
//       setPatientId("");
//       setPatientTreatment("");
//       setPrescription("");
//       setTabletName1("");
//       setOtherTabletName("");
//       setInjectionSize("");
//       setInjectionName("");
//       setInjectionMg("");
//       setTabletCount(0);
//       setTests("");
//       setDoctorAdvice("");
//       setAge("");
//     } catch (error) {
//       console.error("Error submitting form data:", error);
//       alert("Failed to submit data. Please try again.");
//     }
//   };

//   const handleTabletCountChange = (e) => {
//     const count = Math.min(e.target.value, 10) || 0;
//     setTabletCount(count);
//     setTabletMedicines(
//       Array.from({ length: count }, () => ({ medicine: "", otherName: "" }))
//     );
//   };

//   const handlePatientView = (patient) => {
//     setSelectedPatient(patient);
//     fetchPatientData(patient.id)
//     setActiveTab(2); // Move to the second tab
//   };

//   const handleUpdateVisitedPatient = (index) => {
//     const updatedPatientsList = [...visitedPatientsList];
//     updatedPatientsList[index].patientName = patientName;
//     updatedPatientsList[index].disease = ptDiseases;
//     updatedPatientsList[index].age = age;
//     setVisitedPatientsList(updatedPatientsList);
//     alert("Patient updated successfully.");
//   };

//   const printCertificate = async () => {
//     try {
//       const response = await fetch(
//         `${API_URL}/api/generate-certificate/${patientId2}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/pdf",
//           },
//         }
//       );
  
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const newWindow = window.open(url);
//       if (newWindow) {
//         newWindow.onload = () => {
//           newWindow.print();
//         };
//       }
//     } catch (error) {
//       console.error("Error printing the certificate:", error);
//     }
//   };
  


//   return (
//     <>
//     <div className="dct-view">
//       <h1 className="dct-heading">Doctor View</h1>

//       <div className="billing-navigation">
//         <button
//           className={`dct-tab-button ${activeTab === 1 ? "active" : ""}`}
//           onClick={() => handleTabChange(1)}
//         >
//           Patients List
//         </button>
//         <button
//           className={`dct-tab-button ${activeTab === 2 ? "active" : ""}`}
//           onClick={() => handleTabChange(2)}
//         >
//           View/Update Patient Details
//         </button>
//         <button
//           className={`dct-tab-button ${activeTab === 3 ? "active" : ""}`}
//           onClick={() => handleTabChange(3)}
//         >
//           Visited Patients
//         </button>
//       </div>

//       {activeTab === 1 && (
//         <div className="dct-tab-content">
//           <h2 className="dct-subheading">Today  Patients List</h2>
//           <table className="dct-table">
//             <thead>
//               <tr>

//                 <th>ID</th>

//               <th>Patient id</th>

//                 <th>Patient Name</th>
//                 <th>Age</th>
//                 <th>Disease</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patientsList.map((patient) => (
//                 <tr key={patient.id}>
//                   <td>{patient.id}</td>
//                   <td>{patient.firstName+ ' ' + patient.lastName}</td>
//                   <td>{patient.age}</td>
//                   <td>{patient.disease}</td>
//                   <td>
//                     <button
//                       className="dct-view-button"
//                       onClick={() => handlePatientView(patient.id)}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

  
//         </div>
//       )}

//       {activeTab === 2 && (
//         <form onSubmit={handleSubmit} className="dct-form">
//           <h2 className="dct-subheading">Patient Treatment</h2>
//           <div className="dct-form-group">
//             <label htmlFor="patientName" className="dct-label">
//               Patient id:
//             </label>
//             <input
//               type="text"
//               id="patientName"
//               className="dct-input"
//               value={patientId2}
//               onChange={(e) => setPatientName(e.target.value)}
//               required
//               readOnly
//             />
//           </div>
//           <div className="dct-form-group">
//             <label htmlFor="patientName" className="dct-label">
//               Patient Name:
//             </label>
//             <input
//               type="text"
//               id="patientName"
//               className="dct-input"
//               value={patientName}
//               onChange={(e) => setPatientName(e.target.value)}
//               required
//               readOnly
//             />
//           </div>
//           {/* Form Fields */}
//           <div className="dct-form-group">
//             <label htmlFor="ptDiseases" className="dct-label">
//               Patient Diseases:
//             </label>
//             <input
//               type="text"
//               id="ptDiseases"
//               className="dct-input"
//               value={ptDiseases}
//               onChange={(e) => setPtDiseases(e.target.value)}
//               required
//               readOnly
//             />
//           </div>

//           <div className="dct-form-group">
//             <label htmlFor="age" className="dct-label">
//               Patient Age:
//             </label>
//             <input
//               type="text"
//               id="age"
//               className="dct-input"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               required
//               readOnly
//             />
//           </div>

//           {/* Other fields */}

//         <h2 className="dct-subheading">Patient Treatment</h2>
//          <div className="dct-form-group">
//            <label htmlFor="prescription" className="dct-label">
//              Doctor's Prescription:
//            </label>
      
//          </div>

//           {/* Tablets */}
      
//           <label>Number of Tablets:</label>
//          <input
//            type="number"
//            value={tabletCount}
//            onChange={handleTabletCountChange}
//            className="dct-input"
//          />
//          <br />
//          {tabletCount > 0 && tabletMedicines.map((tablet, index) => (
//            <div key={index}>
//              <label>Select Medicine for Tablet {index + 1}:</label>
//              <select
//                value={tablet.medicine}
//                onChange={(e) => handleMedicineChange(index, e.target.value)}
//                className="dct-input"
//              >
//                <option value="">Select Medicine</option>
//                {medicineOptions.map((medicine) => (
//                  <option key={medicine.id} value={medicine.name}>
//                    {medicine.name}
//                  </option>
//                ))}
//                <option value="Paracetamol">Paracetamol
              
//                </option>
//                <option value="Ibuprofen">Ibuprofen</option>
//                <option value="Aspirin">Aspirin</option>
//                <option value="Amoxicillin">Amoxicillin</option>
//                <option value="Metformin">Metformin</option>
//                <option value="Atorvastatin">Atorvastatin</option>
//                <option value="Omeprazole">Omeprazole</option>
//                <option value="Amlodipine">Amlodipine</option>
//                <option value="Losartan">Losartan</option>
//                <option value="Cetirizine">Cetirizine</option>
//                <option value="Other">Other</option>
//              </select>
//              {tablet.medicine === "Other" && (
//                <div>
//                  <label>Enter Tablet Name:</label>
//                  <input
//                    type="text"
//                    value={tablet.otherName}
//                    onChange={(e) => handleOtherMedicineChange(index, e.target.value)}
//                    className="dct-input"
//                  />
//                </div>
//              )}
//              <br />
//            </div>
//          ))}
      
//          <br />
//          {/* Injection */}
      
//          <label>Need Injection:</label>
//          <div>
//            <input
//              type="radio"
//              name="needsInjection"
//              value="Yes"
//              checked={needsInjection === 'Yes'}
//              onChange={handleInjectionChange}
//            /> Yes
//            <input
//              type="radio"
//              name="needsInjection"
//              value="No"
//              checked={needsInjection === 'No'}
//              onChange={handleInjectionChange}
//            /> No
//          </div>
//          <br />
//          {/* Injection Details */}
//          {needsInjection === "Yes" && (
//            <div>
//              <label>Select Injection Size:</label>
//              <div>
//                <input
//                  type="radio"
//                  name="injectionSize"
//                  value="Small"
//                  checked={injectionSize === 'Small'}
//                  onChange={(e) => setInjectionSize(e.target.value)}
//                /> Small
//                <input
//                  type="radio"
//                  name="injectionSize"
//                  value="Big"
//                  checked={injectionSize === 'Big'}
//                  onChange={(e) => setInjectionSize(e.target.value)}
//                /> Big
//              </div>
//              <br />
//              <label>Injection Name:</label>
//              <input
//                type="text"
//                value={injectionName}
//                onChange={(e) => setInjectionName(e.target.value)}
//              />
//              <br />
//              <label>Injection mg:</label>
//              <input
//                type="text"
//                value={injectionMg}
//                onChange={(e) => setInjectionMg(e.target.value)}
//              />
//              <br />
//              <button type="button" onClick={() => alert('Injection details updated!')}>Update</button>
//              <br />
//            </div>
//          )}
//          <div className="dct-form-group">
//            <label htmlFor="tests" className="dct-label">
//              Tests:
//            </label>
//            <input
//              type="text"
//              id="tests"
//              className="dct-input"
//              value={tests}
//              onChange={(e) => setTests(e.target.value)}
//              required
//            />
//          </div>
//          <div className="dct-form-group">
//            <label htmlFor="doctorAdvice" className="dct-label">
//              Doctor's Advice:
//            </label>
//            <textarea
//              id="doctorAdvice"
//              className="dct-textarea"
//              value={doctorAdvice}
//              onChange={(e) => setDoctorAdvice(e.target.value)}
//              required
//            />
//          </div>
//           <button type="submit" className="dct-submit-button">
//             Submit
//           </button>
//           <button
//             type="button"
//             onClick={printCertificate}
//             className="dct-submit-button"
//           >
//             Download Prescription
//           </button>
//         </form>
//       )}

//       {activeTab === 3 && (
//         <div className="dct-tab-content">
//           <h2 className="dct-subheading">Visited Patients</h2>
//           <ul className="dct-visited-list">
//             {visitedPatientsList.map((patient, index) => (
//               <li key={index}>
//                 {patient.patientName} (Age: {patient.age}) - {patient.disease}
//                 <button
//                   className="dct-update-button"
//                   onClick={() => handleUpdateVisitedPatient(index)}
//                 >
//                   Update
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
   
//     </>
//   )
// }

// export default DoctorView;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../API";

const DoctorView = () => {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [ptDiseases, setPtDiseases] = useState("");
  const [prescription, setPrescription] = useState("");
  const [tablets, setTablets] = useState([]);
  const [injectionRequired, setInjectionRequired] = useState(false);
  const [injectionDetails, setInjectionDetails] = useState({ name: "", size: "", dosage: "" });
  const [tests, setTests] = useState("");
  const [doctorAdvice, setDoctorAdvice] = useState("");
  const [age, setAge] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [patientsList, setPatientsList] = useState([]);
  const [visitedPatientsList, setVisitedPatientsList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicineOptions, setMedicineOptions] = useState([
    "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin",
    "Metformin", "Atorvastatin", "Omeprazole", "Amlodipine",
    "Losartan", "Cetirizine", "Other"
  ]);

const [customInjection, setCustomInjection] = useState("");
const [injectionName, setInjectionName] = useState("");
const [selectedTest, setSelectedTest] = useState("");
  const [otherTest, setOtherTest] = useState("");

  const [testOptions, setTestOptions] = useState([
    {
      name : "Complete Blood Count (CBC)",
    },
    { name: "Complete Blood Count (CBC)" },
      { name: "Lipid Profile" },
      { name: "Liver Function Test (LFT)" },
      { name: "Kidney Function Test (KFT)" },
      { name: "Blood Glucose Test" },
      { name: "X-Ray" },
      { name: "Ultrasound" },
      { name: "MRI" },
      { name: "CT Scan" },
      { name: "Mammogram" },
      { name: "Urinalysis" },
      { name: "Urine Culture" },
      { name: "Electrocardiogram (ECG/EKG)" },
      { name: "Echocardiogram" },
      { name: "Stress Test" },
  ]); 
  const [injectionOptions, setInjectionOptions] = useState([]);


  useEffect(() => {
    fetchData(); // Fetch patients on component mount
  }, []);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };


  const handleTestChange = (e) => {
    setSelectedTest(e.target.value);
    if (e.target.value !== "Other") {
      setOtherTest(""); 
    }
  };



  const fetchData = async () => {
    try {

      const response = await fetch(`${API_URL}/api/today`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP fetching error! status: ${response.status}`);
      }

      const result = await response.json();
      setPatientsList(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchPatientData = async (patientId1) => {
    try {
      const response = await axios.get(`${API_URL}/api/record/${patientId1}`);
      const data = response.data[0]; // Assuming API returns an array with one object
      setPatientName(data.firstName + " " + data.lastName);
      setPtDiseases(data.disease);
      setAge(data.age);
      setPatientId(patientId1);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to fetch patient data. Please try again.");
    }
  };

  const handleTabletCountChange = (count) => {
    const updatedTablets = Array.from({ length: count }, () => ({ name: "", count: 0 }));
    setTablets(updatedTablets);
  };

  const handleTabletChange = (index, field, value) => {
    const updatedTablets = [...tablets];
    updatedTablets[index][field] = value;
    setTablets(updatedTablets);
  };

  const handleInjectionChange = (field, value) => {
    setInjectionDetails((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Fetch available tests and injections on component mount
    const fetchOptions = async () => {
      try {
        const testResponse = await axios.get(`${API_URL}/api/tests`);
        const injectionResponse = await axios.get(`${API_URL}/api/injections`);
        setTestOptions(testResponse.data);
        setInjectionOptions(injectionResponse.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      patientId,
      patientName,
      ptDiseases,
      tablets,
      injectionName: injectionName === "Other" ? customInjection : injectionName,
      tests,
      doctorAdvice,
      age,
      selectedTest: selectedTest === "Other" ? otherTest : selectedTest,
      
    };

    try {
      const response = await axios.post(`${API_URL}/savetreatment`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Data submitted successfully!", response.data);
      // Reset fields after submission
      setPatientName("");
      setPtDiseases("");
      setTablets([]);
      setInjectionRequired(false);
      setInjectionDetails({ name: "", size: "", dosage: "" });
      setTests("");
      setDoctorAdvice("");
      setAge("");
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };


    const handlePatientView = (patient) => {
    setSelectedPatient(patient);
    fetchPatientData(patient.id)
    setActiveTab(2); // Move to the second tab
  };

  const addCustomInjection = (name) => {
    if (name) {
      console.log("Custom Injection Added:", name);
      setInjectionName(name); // Update the injection name with the custom one
      setCustomInjection(""); // Reset the input field
    } else {
      alert("Please enter a valid injection name.");
    }
  };
  

  return (
    <div className="dct-view">
      <h1 className="dct-heading">Doctor View</h1>

      <div className="billing-navigation">
        <button className={`dct-tab-button ${activeTab === 1 ? "active" : ""}`} onClick={() => handleTabChange(1)}>Patients List</button>
        <button className={`dct-tab-button ${activeTab === 2 ? "active" : ""}`} onClick={() => handleTabChange(2)}>View/Update Patient Details</button>
        <button className={`dct-tab-button ${activeTab === 3 ? "active" : ""}`} onClick={() => handleTabChange(3)}>Visited Patients</button>
      </div>

      {activeTab === 1 && (
        <div className="dct-tab-content">
          <h2 className="dct-subheading">Today's Patients List</h2>
          <table className="dct-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Disease</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientsList.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.firstName + ' ' + patient.lastName}</td>
                  <td>{patient.age}</td>
                  <td>{patient.disease}</td>
                  <td>
                    <button className="dct-view-button" onClick={() => handlePatientView(patient.id)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 2 && (
        <form onSubmit={handleSubmit} className="dct-form">
          <h2 className="dct-subheading">Patient Treatment</h2>
          {/* Display patient details */}
          <div className="dct-form-group">
            <label htmlFor="patientName" className="dct-label">Patient Name:</label>
            <input type="text" className="dct-input" value={patientName} readOnly />
          </div>
          <div className="dct-form-group">
            <label htmlFor="ptDiseases" className="dct-label">Patient Diseases:</label>
            <input type="text" className="dct-input" value={ptDiseases} readOnly />
          </div>
          <div className="dct-form-group">
            <label htmlFor="age" className="dct-label">Age:</label>
            <input type="text" className="dct-input" value={age} readOnly />
          </div>

          {/* Tablet prescription */}
          <div className="dct-form-group">
            <label htmlFor="tabletCount" className="dct-label">Number of Tablets:</label>
            <input type="number" className="dct-input" onChange={(e) => handleTabletCountChange(e.target.value)} />
          {/* <label>Tablet {index + 1}:</label> */}
          </div>
          {tablets.map((tablet, index) => (
            <div key={index} className="dct-form-group flex">
              <select value={tablet.name} onChange={(e) => handleTabletChange(index, 'name', e.target.value)} className="dct-input">
                {medicineOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Count"
                value={tablet.count}
                onChange={(e) => handleTabletChange(index, 'count', e.target.value)}
                className="dct-input"
              />
              <select name="" id="" className="dct-input">
                <option value="" selected disabled>select MG</option>
                <option value="">1 MG</option>
                <option value="">2 MG</option>
              </select>
            </div>
          ))}

          {/* Injection details */}
          <div className="dct-form-group">
            <label>Injection Required : </label> <input type="checkbox" checked={injectionRequired} onChange={(e) => setInjectionRequired(e.target.checked)} />
          </div>
          {injectionRequired && (
            <>
              <label>Injection Name:</label>
  <select
    className="dct-input"
    value={injectionName}
    onChange={(e) => setInjectionName(e.target.value)}
    required
  >
    <option value="">Select Injection</option>
    <option value="Injection A">Injection A</option>
    <option value="Injection B">Injection B</option>
    <option value="Injection C">Injection C</option>
    <option value="Other">Other</option> 
  </select>


{injectionName === "Other" && (
  <div className="dct-form-group">
    <label>Enter Custom Injection Name:</label>
    <input
      type="text"
      className="dct-input"
      value={customInjection}
      onChange={(e) => setCustomInjection(e.target.value)}
      required
    />
    <button
      type="button"
      onClick={() => addCustomInjection(customInjection)}
      className="dct-add-button"
    >
      Add
    </button>
  </div>
)}
              <div className="dct-form-group">
                <label>Size:</label>
                <select value={injectionDetails.size} onChange={(e) => handleInjectionChange("size", e.target.value)} className="dct-input">
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="dct-form-group">
                <label>Dosage:</label>
                <input type="text" className="dct-input" value={injectionDetails.dosage} onChange={(e) => handleInjectionChange("dosage", e.target.value)} />
              </div>
            </>
          )}

          {/* Tests and advice */}
          

          <div className="dct-form-group">
        <label htmlFor="tests" className="dct-label">Select Test:</label>
        <select
          id="tests"
          className="dct-input"
          value={selectedTest}
          onChange={handleTestChange}
          required
        >
          <option value="">Select Test</option>
          {testOptions.map((test) => (
            <option key={test.id} value={test.name}>
              {test.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {selectedTest === "Other" && (
          <div>
            <label>Enter Test Name:</label>
            <input
              type="text"
              value={otherTest}
              onChange={(e) => setOtherTest(e.target.value)}
              className="dct-input"
            />
          </div>
        )}
      </div>

          <div className="dct-form-group">
            <label>Doctor's Advice:</label>
            <textarea className="dct-input" value={doctorAdvice} onChange={(e) => setDoctorAdvice(e.target.value)} />
          </div>

          <button type="submit" className="dct-submit-button">Save Prescription</button>
        </form>
      )}

      {activeTab === 3 && (
        <div className="dct-tab-content">
          <h2 className="dct-subheading">Visited Patients</h2>
          <table className="dct-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Disease</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visitedPatientsList.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.firstName + ' ' + patient.lastName}</td>
                  <td>{patient.age}</td>
                  <td>{patient.disease}</td>
                  <td>
                    <button className="dct-view-button" onClick={() => handlePatientView(patient.id)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorView;
