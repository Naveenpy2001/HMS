import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./HospitalData.css"; // Import the CSS file for styling

const API_URL = "http://hms.tsaritservices.com/get/api/"; // Replace with your actual API URL

const HospitalData = () => {
  // States for handling data
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [hospitalImages, setHospitalImages] = useState([]); // Initialize as empty array
  const [newImage, setNewImage] = useState("");

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const data = response.data;
        setProfilePhoto(data.profilePhoto);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.emailid);
        setPhone(data.phonenumber);
        setAddress(data.address);
        setPassword(data.password);
        setConfirmPassword(data.repetepassword);
        setHospitalName(data.hospitalname);
        setBankName(data.bankName);
        setIfscCode(data.ifscCode);
        setAccountNumber(data.accountNumber);
        setHospitalImages(Array.isArray(data.hospitalImages) ? data.hospitalImages : []); // Ensure it's an array
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handlers for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") setFirstName(value);
    if (name === "lastName") setLastName(value);
    if (name === "email") setEmail(value);
    if (name === "phone") setPhone(value);
    if (name === "address") setAddress(value);
    if (name === "newImage") setNewImage(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    if (name === "hospitalName") setHospitalName(value);
    if (name === "bankName") setBankName(value);
    if (name === "ifscCode") setIfscCode(value);
    if (name === "accountNumber") setAccountNumber(value);
  };

  // Handlers for file uploads
  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleAddImage = () => {
    if (newImage && hospitalImages.length < 4) {
      setHospitalImages([...hospitalImages, newImage]);
      setNewImage("");
    }
  };

  // Submit form data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("hospitalName", hospitalName);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("bankName", bankName);
    formData.append("ifscCode", ifscCode);
    formData.append("accountNumber", accountNumber);
    formData.append("hospitalImages", JSON.stringify(hospitalImages));

    axios
      .post(API_URL, formData)
      .then((response) => {
        console.log("Success:", response.data);
        alert("Data submitted successfully!");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="hospital-data">
      <h1 className="hospital-data-heading">Profile</h1>

      <form onSubmit={handleSubmit}>
        <section className="hospital-data-section">
          <h2 className="hospital-data-subheading">Profile Photo</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePhotoChange}
            className="hospital-data-input"
          />
          {profilePhoto && (
            <img
              src={profilePhoto}
              alt="Profile"
              className="hospital-data-photo"
            />
          )}
        </section>

        <section className="hospital-data-section">
          <h2 className="hospital-data-subheading">Personal Information</h2>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Hospital Name:
            <input
              type="text"
              name="hospitalName"
              value={hospitalName}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
         <fieldset className="legend-tag">
          <legend> Bank Details : </legend>
          <label>
            Bank Name:
            <input
              type="text"
              name="bankName"
              value={bankName}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            IFSC Code:
            <input
              type="text"
              name="ifscCode"
              value={ifscCode}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
          <label>
            Account Number:
            <input
              type="text"
              name="accountNumber"
              value={accountNumber}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
         </fieldset>
        </section>

        <section className="hospital-data-section">
          <h2 className="hospital-data-subheading">Hospital Images</h2>
          <input
            type="text"
            name="newImage"
            value={newImage}
            onChange={handleInputChange}
            placeholder="Add image URL"
            className="hospital-data-input"
          />
          <button
            className="hospital-data-button"
            type="button"
            onClick={handleAddImage}
          >
            Add Image
          </button>
          {hospitalImages.length > 0 && (
            <div className="hospital-data-images">
              {hospitalImages.map((img, index) => (
                <div key={index} className="hospital-data-image-container">
                  <img
                    src={img}
                    alt={`Hospital ${index}`}
                    className="hospital-data-image"
                  />
                  <span>{index + 1}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <button className="hospital-data-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HospitalData;
