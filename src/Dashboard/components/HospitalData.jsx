import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./HospitalData.css"; // Import the CSS file for styling

const API_URL = "http://localhost:8080/get/api/"; // Replace with your actual API URL

const HospitalData = () => {
  // States for handling data
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hospitalname, sethospitalname] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [hospitalImages, setHospitalImages] = useState([]); // Initialize as empty array
  const [newImage, setNewImage] = useState("");
  const [showForm, setShowForm] = useState(false); // To show or hide the popup form
  const [links, setLinks] = useState({
    details: "",
    fetchHospital: "",
    appointment: "",
  });

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
        setResetPassword(data.repetepassword);
        sethospitalname(data.hospitalname);
        setHospitalImages(Array.isArray(data.hospitalImages) ? data.hospitalImages : []); // Ensure it's an array
        setLinks(data.links);
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
    if (name === "resetPassword") setResetPassword(value);
    if (name.startsWith("link_")) {
      setLinks({ ...links, [name.replace("link_", "")]: value });
    }
  };

  // Handlers for file uploads
  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleAddImage = () => {
    if (newImage && hospitalImages.length < 5) {
      setHospitalImages([...hospitalImages, newImage]);
      setNewImage("");
    }
  };

  // Submit form data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("password", password);
    formData.append("resetPassword", resetPassword);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("hospitalImages", JSON.stringify(hospitalImages));

    axios
      .post(API_URL, formData)
      .then((response) => {
        console.log("Success:", response.data);
        alert("Data submitted successfully!");
      })
      .catch((error) => console.error("Error:", error));
  };

  // Toggle form visibility
  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="hospital-data">
      <h1 className="hospital-data-heading">Profile</h1>

      <button className="hospital-data-button" onClick={toggleForm}>
        {showForm ? "Hide Appointment Form" : "Show Appointment Form"}
      </button>

      {showForm && (
        <div className="hospital-data-popup">
          <h2>Appointment Form</h2>
          {/* Include Patient Registration Form here */}
          <form>
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
            hospitalname:
              <input
                type="text"
                name="hospitalname"
                value={hospitalname}
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
              Reset Password:
              <input
                type="password"
                name="resetPassword"
                value={resetPassword}
                onChange={handleInputChange}
                className="hospital-data-input"
              />
            </label>
            <button className="hospital-data-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}

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
            Reset Password:
            <input
              type="password"
              name="resetPassword"
              value={resetPassword}
              onChange={handleInputChange}
              className="hospital-data-input"
            />
          </label>
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
          {hospitalImages && hospitalImages.length > 0 && (
            <div className="hospital-data-images">
              {hospitalImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Hospital ${index}`}
                  className="hospital-data-image"
                />
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
