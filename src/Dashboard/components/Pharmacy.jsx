// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import '../../css/Lab.css';

// import { API_URL } from "../../API";



// const Pharmacy = () => {
//   const [patientId, setPatientId] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const [ptDiseases, setPtDiseases] = useState("");
//   const [age, setAge] = useState("");
//   const [formData, setFormData] = useState({
//     medicineName: "",
//     customMedicineName: "",
//     quantity: "",
//     expiryDate: "",
//     startData:'',
//     price: "",
//     batchNumber: "",
//     manufacturer: "",
//     supplierName: "",
//     prescriptionRequired: "No",
//     dosageForm: "",
//     stockStatus: "Available",
//     discount: "",
//     notes: "",
//   });

//   const [medicines, setMedicines] = useState([]);
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [customMedicines, setCustomMedicines] = useState([]);

//   useEffect(() => {
//     // Fetch data from backend
//     const fetchMedicines = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/fetchpharmacy`);
//         setMedicines(response.data);
//         setMedicines(response.data|| []);
//       } catch (error) {
//         console.error("Error fetching medicines:", error);
//       }
//     };

//     fetchMedicines();
//   }, []);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       fetchPatientData();
//     }
//   };

//   const fetchPatientData = async () => {
//     try {
//       // Replace with your fetch API endpoint
//       const response = await axios.get(
//         `${API_URL}/api/record/${patientId}`
//       );
//       const data = response.data[0]; // Assuming API returns an array with one object
//       setPatientName(data.firstName + " " + data.lastName);
//       setPtDiseases(data.disease);
//       setAge(data.age);
//     } catch (error) {
//       console.error("Error fetching patient data:", error);
//       alert("Failed to fetch patient data. Please try again.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === "medicineName" && value !== "Others") {
//       setFormData((prevFormData) => ({ ...prevFormData, customMedicineName: "" }));
//     }
//   };


//   const handleAddCustomMedicine = () => {
//     if (formData.customMedicineName) {
//       // Add the custom medicine to the list
//       setCustomMedicines((prevCustomMedicines) => [
//         ...prevCustomMedicines,
//         formData.customMedicineName,
//       ]);
//       setFormData({ ...formData, medicineName: formData.customMedicineName });
//     } else {
//       alert("Please enter a medicine name before adding.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const medicineToSave =
//       formData.medicineName === "Others"
//         ? formData.customMedicineName
//         : formData.medicineName;
//     try {
//       const response = await axios.post(`${API_URL}/savepharmacy`, {formData,medicineName: medicineToSave,}
//         , {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setMedicines([...medicines, response.data]);
//       setFormData({
//         medicineName: "",
//         customMedicineName: "",
//         quantity: "",
//         expiryDate: "",
//         price: "",
//         batchNumber: "",
//         manufacturer: "",
//         supplierName: "",
//         prescriptionRequired: "No",
//         dosageForm: "",
//         stockStatus: "Available",
//         discount: "",
//         notes: "",
//       });
//       console.log("saved",response.data)
//       alert(response.data)
//     } catch (error) {
//       console.error("Error submitting pharmacy data:", error);
//     }
//   };

//   const handleView = (medicine) => {
//     setSelectedMedicine(medicine);
//   };

//   const [activeTab, setActiveTab] = useState(1);

//   const handleTabChange = (tabIndex) => {
//     setActiveTab(tabIndex);
//   };

//   const handlePrescriptionChange = (e) => {
//     const { name, value } = e.target;
//     setPrescriptionData({ ...prescriptionData, [name]: value });
//   };


//   const [prescriptionData, setPrescriptionData] = useState({
//     patientId: "",
//     medicineName: "",
//     dosage: "",
//     instructions: "",
//   });

//   const handlePrescriptionSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${API_URL}/saveprescription`, prescriptionData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       alert(response.data.message); // Adjust based on your response structure
//       setPrescriptionData({
//         patientId: "",
//         medicineName: "",
//         dosage: "",
//         instructions: "",
//       });
//     } catch (error) {
//       console.error("Error submitting prescription data:", error);
//     }
//   };



//   return (
//     <>
//     <div className="phrmcy-container">
//     <div className="billing-navigation">
//         <button
//           className={`dct-tab-button ${activeTab === 1 ? "active" : ""}`}
//           onClick={() => handleTabChange(1)}
//         >
//           Pharmacy Form
//         </button>
//         <button
//           className={`dct-tab-button ${activeTab === 2 ? "active" : ""}`}
//           onClick={() => handleTabChange(2)}
//         >
//           View/Update Pharmacy Details
//         </button>
//         <button
//             className={`dct-tab-button ${activeTab === 3 ? "active" : ""}`}
//             onClick={() => handleTabChange(3)}
//           >
//             Prescription Form
//           </button>
//       </div>
//       {activeTab === 1 && (
//         <form className="phrmcy-form" onSubmit={handleSubmit}>

//         <h1 className="phrmcy-h1">Pharmacy Inventory</h1>

//         <div className="phrmcy-form-group">
//             <label className="phrmcy-label">Medicine Name:</label>
//             <select
//               className="phrmcy-select"
//               name="medicineName"
//               value={formData.medicineName}
//               onChange={handleChange}
//             >
//               <option value="">Select</option>
//               {customMedicines.map((medicine, index) => (
//                 <option key={index} value={medicine}>
//                   {medicine}
//                 </option>
//               ))}
//               <option value="Paracetamol">Paracetamol</option>
//               <option value="Ibuprofen">Ibuprofen</option>
//               <option value="Aspirin">Aspirin</option>
//               <option value="Others">Others</option>
//             </select>
//           </div>
//           {formData.medicineName === "Others" && (
//             <div className="phrmcy-form-group">
//               <label className="phrmcy-label">Custom Medicine Name:</label>
//               <input
//                 type="text"
//                 className="phrmcy-input"
//                 name="customMedicineName"
//                 value={formData.customMedicineName}
//                 onChange={handleChange}
//               />
//               <button
//                 type="button"
//                 className="phrmcy-button"
//                 onClick={handleAddCustomMedicine}
//               >
//                 Add
//               </button>
//             </div>
//           )}
      

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Quantity:</label>
//           <input
//             type="number"
//             className="phrmcy-input"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Manufacture Date:</label>
//           <input
//             type="date"
//             className="phrmcy-input"
//             name="expiryDate"
//             value={formData.startData}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Expiry Date:</label>
//           <input
//             type="date"
//             className="phrmcy-input"
//             name="expiryDate"
//             value={formData.expiryDate}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Price:</label>
//           <input
//             type="number"
//             className="phrmcy-input"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Batch Number:</label>
//           <input
//             type="text"
//             className="phrmcy-input"
//             name="batchNumber"
//             value={formData.batchNumber}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Manufacturer:</label>
//           <input
//             type="text"
//             className="phrmcy-input"
//             name="manufacturer"
//             value={formData.manufacturer}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Supplier Name:</label>
//           <input
//             type="text"
//             className="phrmcy-input"
//             name="supplierName"
//             value={formData.supplierName}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Prescription Required:</label>
//           <select
//             className="phrmcy-select"
//             name="prescriptionRequired"
//             value={formData.prescriptionRequired}
//             onChange={handleChange}
//           >
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Dosage Form:</label>
//           <input
//             type="text"
//             className="phrmcy-input"
//             name="dosageForm"
//             value={formData.dosageForm}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Stock Status:</label>
//           <select
//             className="phrmcy-select"
//             name="stockStatus"
//             value={formData.stockStatus}
//             onChange={handleChange}
//           >
//             <option value="Available">Available</option>
//             <option value="Out of Stock">Out of Stock</option>
//           </select>
//         </div>

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Discount (%):</label>
//           <input
//             type="number"
//             className="phrmcy-input"
//             name="discount"
//             value={formData.discount}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="phrmcy-form-group">
//           <label className="phrmcy-label">Notes:</label>
//           <textarea
//             className="phrmcy-input"
//             name="notes"
//             value={formData.notes}
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="phrmcy-button">Submit</button>
//       </form>
//       )}

//       {
//         activeTab === 2 && (
//             <>
//             <h2 className="phrmcy-h2">Medicine Inventory</h2>
//       <table className="phrmcy-table">
//         <thead>
//           <tr>
//             <th className="phrmcy-th">Medicine Name</th>
//             <th className="phrmcy-th">Quantity</th>
//             <th className="phrmcy-th">Price</th>
//             <th className="phrmcy-th">Stock Status</th>
//             <th className="phrmcy-th">View Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {medicines.map((medicine) => (
//             <tr key={medicine.id}>
//               <td className="phrmcy-td">{medicine.medicineName }</td>
//               <td className="phrmcy-td">{medicine.quantity}</td>
//               <td className="phrmcy-td">{medicine.price}</td>
//               <td className="phrmcy-td">{medicine.stockStatus}</td>
//               <td className="phrmcy-td">
//                 <button className="phrmcy-view-button" onClick={() => handleView(medicine)}>View</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//             </>
//         )
//       }

// {activeTab === 3 && (
//           <form className="phrmcy-form" onSubmit={handlePrescriptionSubmit}>
//             <h1 className="phrmcy-h1">Prescription Form</h1>
//             <div className="phrmcy-form-group">
//               <label className="phrmcy-label">Patient ID:</label>
//               <input
//                 type="text"
//                 className="phrmcy-input"
//                 name="patientId"
//                 value={prescriptionData.patientId}
//                 onChange={handlePrescriptionChange}
//                 required
//               />
//             </div>
//             <div className="phrmcy-form-group">
//               <label className="phrmcy-label">Medicine Name:</label>
//               <input
//                 type="text"
//                 className="phrmcy-input"
//                 name="medicineName"
//                 value={prescriptionData.medicineName}
//                 onChange={handlePrescriptionChange}
//                 required
//               />
//             </div>
//             <div className="phrmcy-form-group">
//               <label className="phrmcy-label">Dosage:</label>
//               <input
//                 type="text"
//                 className="phrmcy-input"
//                 name="dosage"
//                 value={prescriptionData.dosage}
//                 onChange={handlePrescriptionChange}
//                 required
//               />
//             </div>
//             <div className="phrmcy-form-group">
//               <label className="phrmcy-label">Instructions:</label>
//               <input
//                 type="text"
//                 className="phrmcy-input"
//                 name="instructions"
//                 value={prescriptionData.instructions}
//                 onChange={handlePrescriptionChange}
//                 required
//               />
//             </div>
//             <button type="submit" className="phrmcy-button">Submit Prescription</button>
//           </form>
//         )}

//       {selectedMedicine && (
//         <div className="phrmcy-medicine-details">
//           <h3>Medicine Details</h3>
//           <p><strong>Medicine Name:</strong> {selectedMedicine.medicineName}</p>
//           <p><strong>Quantity:</strong> {selectedMedicine.quantity}</p>
//           <p><strong>Expiry Date:</strong> {selectedMedicine.expiryDate}</p>
//           <p><strong>Price:</strong> {selectedMedicine.price}</p>
//           <p><strong>Batch Number:</strong> {selectedMedicine.batchNumber}</p>
//           <p><strong>Manufacturer:</strong> {selectedMedicine.manufacturer}</p>
//           <p><strong>Supplier Name:</strong> {selectedMedicine.supplierName}</p>
//           <p><strong>Prescription Required:</strong> {selectedMedicine.prescriptionRequired}</p>
//           <p><strong>Dosage Form:</strong> {selectedMedicine.dosageForm}</p>
//           <p><strong>Stock Status:</strong> {selectedMedicine.stockStatus}</p>
//           <p><strong>Discount:</strong> {selectedMedicine.discount}</p>
//           <p><strong>Notes:</strong> {selectedMedicine.notes}</p>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default Pharmacy;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../API";
import '../../css/Lab.css';

const Pharmacy = () => {
  const [searchId, setSearchId] = useState(""); // State for searching patient by ID/phone number
  const [patientDetails, setPatientDetails] = useState(null); // Store fetched patient details
  const [prescribedMedicines, setPrescribedMedicines] = useState([]); // Store prescribed medicines
  const [givenMedicines, setGivenMedicines] = useState([]); // Store medicines given to the patient
  const [activeTab, setActiveTab] = useState(1); // Active tab state
  const [filterId, setFilterId] = useState(""); // State for filtering by patient ID/phone
  const [filterDate, setFilterDate] = useState(""); // State for filtering by date
  const [filteredGivenMedicines, setFilteredGivenMedicines] = useState([]); // Filtered given medicines

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/record/${searchId}`);
      const data = response.data[0];

      if (data) {
        setPatientDetails({
          id: data.id,
          name: `${data.firstName} ${data.lastName}`,
          phone: data.phone,
          diseases: data.disease,
        });

        const medicinesResponse = await axios.get(`${API_URL}/api/prescriptions/${data.id}`);
        setPrescribedMedicines(medicinesResponse.data);
      } else {
        alert("No patient found with this ID or phone number.");
        setPatientDetails(null);
        setPrescribedMedicines([]);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to fetch patient data. Please try again.");
    }
  };

  const handleGiveMedicine = () => {
    if (patientDetails) {
      const givenData = {
        patientId: patientDetails.id,
        medicines: prescribedMedicines.map(medicine => ({
          name: medicine.name,
          quantity: medicine.quantity, // Assuming quantity based on prescription
          price: medicine.price // Assuming price based on prescription
        })),
      };
      setGivenMedicines((prev) => [...prev, givenData]);
      alert("Medicines given successfully.");
    } else {
      alert("No patient details available. Please search for a patient first.");
    }
  };

  // Function to fetch PDF bill from backend
  const fetchPDF = async (patientId) => {
    try {
      const response = await axios.get(`${API_URL}/api/bill/${patientId}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bill_${patientId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error fetching PDF:", error);
      alert("Failed to fetch bill PDF. Please try again.");
    }
  };

  // Filter given medicines based on patient ID/phone and date
  const handleFilter = () => {
    const filtered = givenMedicines.filter((given) => {
      const matchesIdOrPhone = 
        given.patientId === filterId || (given.patientDetails && given.patientDetails.phone === filterId);
      const matchesDate = filterDate ? new Date(given.date).toISOString().split('T')[0] === filterDate : true; // Assuming date is stored in the format YYYY-MM-DD
      return matchesIdOrPhone && matchesDate;
    });
    setFilteredGivenMedicines(filtered);
  };

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    if (tabIndex === 2) {
      handleFilter(); // Apply filter when switching to Tab 2
    }
  };

  return (
    <>
      <div className="pharmacy-container">
        <div className="billing-navigation">
          <button
            className={`dct-tab-button ${activeTab === 1 ? "active" : ""}`}
            onClick={() => handleTabChange(1)}
          >
            Give Medicines
          </button>
          <button
            className={`dct-tab-button ${activeTab === 2 ? "active" : ""}`}
            onClick={() => handleTabChange(2)}
          >
            Given Medicines
          </button>
        </div>
  
        {activeTab === 1 && (
          <div>
            <h1 className="pharmacy-h1">Give Medicines</h1>
            <div className="pharmacy-form-group flex">
              <div className="flexBox">
                <label className="pharmacy-label">Search by Patient ID or Phone Number:</label>
                <input
                  type="text"
                  className="pharmacy-input"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                />
              </div>
            </div>
            <button type="button" className="pharmacy-button" onClick={handleSearch}>
              Search
            </button>
  
            {patientDetails && (
              <div>
                <h2>Patient Details:</h2>
                <p><strong>Name:</strong> {patientDetails.name}</p>
                <p><strong>Phone:</strong> {patientDetails.phone}</p>
                <p><strong>Diseases:</strong> {patientDetails.diseases}</p>
  
                <h2>Prescribed Medicines:</h2>
                <table className="pharmacy-table">
                  <thead>
                    <tr>
                      <th className="pharmacy-th">Medicine Name</th>
                      <th className="pharmacy-th">Quantity</th>
                      <th className="pharmacy-th">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescribedMedicines.map((medicine, index) => (
                      <tr key={index}>
                        <td className="pharmacy-td">{medicine.name}</td>
                        <td className="pharmacy-td">{medicine.quantity}</td>
                        <td className="pharmacy-td">{medicine.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" className="pharmacy-button" onClick={handleGiveMedicine}>
                  Give Medicines
                </button>
                <button
                  className="pharmacy-button"
                  onClick={() => fetchPDF(patientDetails.patientId)}
                >
                  Download Bill
                </button>
              </div>
            )}
          </div>
        )}
  
        {activeTab === 2 && (
          <div>
            <h2 className="pharmacy-h2">Given Medicines</h2>
            <div className="pharmacy-form-group searchBar">
              <div className="flexBox">
                <label className="pharmacy-label">Search by ID or Phone No.:</label>
                <input
                  type="text"
                  className="pharmacy-input"
                  value={filterId}
                  onChange={(e) => setFilterId(e.target.value)}
                />
              </div>
              <div className="flexBox">
                <label className="pharmacy-label">Filter by Date:</label>
                <input
                  type="date"
                  className="pharmacy-input"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
              <div className="flexBox-al-end">
                <button type="button" className="pharmacy-button" onClick={handleFilter}>
                  Search
                </button>
              </div>
            </div>
  
            <table className="pharmacy-table">
              <thead>
                <tr>
                  <th className="pharmacy-th">Patient ID</th>
                  <th className="pharmacy-th">Medicine Names</th>
                  <th className="pharmacy-th">Total Quantity</th>
                  <th className="pharmacy-th">Total Price</th>
                  <th className="pharmacy-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(filterId || filterDate ? filteredGivenMedicines : givenMedicines).map((given, index) => (
                  <tr key={index}>
                    <td className="pharmacy-td">{given.patientId}</td>
                    <td className="pharmacy-td">{given.medicines.map(m => m.name).join(', ')}</td>
                    <td className="pharmacy-td">{given.medicines.reduce((sum, m) => sum + m.quantity, 0)}</td>
                    <td className="pharmacy-td">{given.medicines.reduce((sum, m) => sum + (m.price * m.quantity), 0)}</td>
                    <td className="pharmacy-td">
                      <button
                        className="pharmacy-button"
                        onClick={() => fetchPDF(given.patientId)}
                      >
                        Download Bill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
  
};

export default Pharmacy;
