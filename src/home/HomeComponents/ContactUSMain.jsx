import React, { useState } from "react";
import axios from "axios";
import "../../css/Contact.css"; // Import your custom CSS here

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/contact", formData)
      .then((response) => {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      })
      .catch((error) => {
        alert("Failed to send message. Please try again later.");
      });
  };

  return (
    <>
      <section className="contact_us">
        <div className="container">
          <div className="row2">
            <div className="col-md-10 offset-md-1">
              <div className="contact_inner">
                <div className="row">
                  <div className="col-md-10">
                    <div className="contact_form_inner">
                      <form onSubmit={handleSubmit} className="nl-form">
                        <div className="contact_field">
                          <h3>Contact Us</h3>
                          <p>
                            Feel free to contact us any time. We will get back
                            to you as soon as we can!
                          </p>
                          <div className="flexFields">
                            <input
                              type="text"
                              name="name"
                              className="form-control form-group"
                              placeholder="Name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                            <input
                              type="email"
                              name="email"
                              className="form-control form-group"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                            <input
                              type="text"
                              name="phone"
                              className="form-control form-group"
                              placeholder="Phone Number"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                            <textarea
                              name="message"
                              className="form-control form-group"
                              placeholder="Message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                            ></textarea>
                            <button
                              type="submit"
                              className="contact_form_submit"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="right_conatct_social_icon d-flex align-items-end">
                      <div className="socil_item_inner d-flex">
                        <li>
                          <a href="#!">
                            <i className="fab fa-facebook-square">fb</i>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <i className="fab fa-instagram">ins</i>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact_info_sec">
                  <h4>Contact Info</h4>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-headset"></i>
                    <span>+91 8009 054294</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-envelope-open-text"></i>
                    <span>info@flightmantra.com</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-map-marked-alt"></i>
                    <span>
                      1000+ Travel partners and 65+ Service cities across India,
                      USA, Canada & UAE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="map_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="map_inner">
                <h4>Find Us on Google Map</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Tempore quo beatae quasi assumenda, expedita aliquam minima
                  tenetur maiores neque incidunt repellat aut voluptas hic
                  dolorem sequi ab porro, quia error.
                </p>
                <div className="map_bind">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471220.5631094339!2d88.04952462217592!3d22.6757520733225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1596988408134!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default ContactUs;
