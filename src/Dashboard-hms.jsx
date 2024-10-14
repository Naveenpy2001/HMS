import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/hms-dash.css';

const DashboardHms = () => {
  const [hospitals, setHospitals] = useState([
    // { id: 1, name: 'City Hospital', paid: true, remainingFee: 0, clearedAmount: 10000, balanceAmount: 0 },
    // { id: 2, name: 'Green Valley Hospital', paid: false, remainingFee: 5000, clearedAmount: 2000, balanceAmount: 3000 },
  ]);
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [freezeStatus, setFreezeStatus] = useState({});
  const [contactMessages, setContactMessages] = useState([
    // { id: 1, message: 'Urgent: Need more beds!', replied: false },
    // { id: 2, message: 'Supply issues with medicines.', replied: true },
  ]);
  const [newsletterEmails, setNewsletterEmails] = useState([]);
  const [tickets, setTickets] = useState([
    // { id: 1, subject: "Login Issue", priority: "high", issue: "Unable to log in to the account.", status: "unresolved" },
    // { id: 2, subject: "Payment Error", priority: "medium", issue: "Payment not processed successfully.", status: "resolved" },
    // { id: 3, subject: "Feature Request", priority: "low", issue: "Request for new feature in the dashboard.", status: "unresolved" },
  ]);
  
  const [reply, setReply] = useState('');
  const [currentTicketId, setCurrentTicketId] = useState(null);

  const [currentMessage, setCurrentMessage] = useState(null);
  const [currentTicket,   setCurrentTicket] = useState(null);
  const [currentEmail, setCurrentEmail] = useState(null);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  const handleFreezeAccount = (hospitalId) => {
    setFreezeStatus((prevState) => ({
      ...prevState,
      [hospitalId]: true,
    }));
  };

  const handleClearAmount = (hospitalId) => {
    setFreezeStatus((prevState) => ({
      ...prevState,
      [hospitalId]: false,
    }));
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleContactReply = (id) => {
    console.log(`Replying to contact message ${id}: ${reply}`);
    setReply('');
  };

  const handleNewsletterReply = (email) => {
    console.log(`Replying to newsletter email ${email}: ${reply}`);
    setReply('');
  };

  const handleTicketReply = (ticketId) => {
    console.log(`Replying to ticket ${ticketId}: ${reply}`);
    setReply('');
    setCurrentTicketId(null);
  };

  useEffect(() => {
    // Fetch data from backend
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("https://hms.tsaritservices.com/fetchAll-hospitals");
        setHospitals(response.data)
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    fetchMedicines();
  }, []);

  useEffect(() => {
    // Fetch data from backend
    const fetchTickets = async () => {
      try {
        const response = await axios.get("https://hms.tsaritservices.com/support/tickets");
        setTickets(response.data)
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    fetchTickets();
  }, []);

  
  useEffect(() => {
    // Fetch data from backend
    const fetchTouchmessages
    = async () => {
      try {
        const response = await axios.get("https://hms.tsaritservices.com/fetchTouchmessages");
        setContactMessages(response.data)
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    fetchTouchmessages
  ();
  }, []);


  const renderContent = () => {
    switch (selectedOption) {
      case 'dashboard':
        return (
          <div>
            <h2 className="dsh-heading">Dashboard Overview</h2>
            <div className="dsh-summary">
              <div
                className="dsh-summary-card dsh-card-hospitals"
                onClick={() => setSelectedOption('hospitalList')}
              >
                <h3>Hospitals</h3>
                <p>{hospitals.length}</p>
              </div>
              <div
                className="dsh-summary-card dsh-card-tickets"
                onClick={() => setSelectedOption('ticketRise')}
              >
                <h3>Tickets</h3>
                <p>{tickets.length}</p>
              </div>
              <div
                className="dsh-summary-card dsh-card-newsletter"
                onClick={() => setSelectedOption('newsletter')}
              >
                <h3>Newsletter Emails</h3>
                <p>{newsletterEmails.length}</p>
              </div>
              <div
                className="dsh-summary-card dsh-card-contact"
                onClick={() => setSelectedOption('contactUs')}
              >
                <h3>Contact Us Messages</h3>
                <p>{contactMessages.length}</p>
              </div>
            </div>
          </div>
        );
      case 'hospitalList':
      case 'accountTracking':
      case 'contactUs':
      case 'newsletter':
      case 'ticketRise':
        return (
          <div>
            <button className="dsh-back-button" onClick={() => setSelectedOption('dashboard')}>
              Back to Dashboard
            </button>
            {renderSelectedTabContent()}
          </div>
        );
      default:
        return <div>Please select an option from the left.</div>;
    }
  };

  const renderSelectedTabContent = () => {
    switch (selectedOption) {
      case 'hospitalList':
        return (
          <div>
            <h2 className="dsh-heading">Hospitals List</h2>
            <table className="dsh-hospital-details-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hospital Name</th>
                  <th>address</th>
                  <th>emailid</th> 
                  <th>full name</th>
                  <th>phonnumber</th>
                  <th>Hospital Total patents</th>
                  <th>Hospital Today patents</th>
                  <th>pending Amount</th>
                  <th>Cleared Amount</th>
                  <th>Paid/Not Paid</th>
                  {/* <th>Remaining Fee</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital) => (
                  <tr key={hospital.id}>
                    <td>{hospital.id}</td>
                    <td>{hospital.hospitalname}</td>
                    <td>{hospital.address}</td>
                    <td>{hospital.emailid}</td>
                    <td>{hospital.firstname}{hospital.lastname}</td>
                    <td>{hospital.phonenumber}</td>
                    <td>{hospital.totalpatents}</td>
                    <td>{hospital.todaypatents}</td>
                    <td>{hospital.pendingAmount} INR</td>
                    <td>{hospital.clearedAmount} INR</td>
                    <td>{hospital.paid ? 'Paid' : 'Not Paid'}</td>
                    {/* <td>{hospital.remainingFee} INR</td> */}
                    <td>
                      <button
                        onClick={() => handleFreezeAccount(hospital.id)}
                        disabled={freezeStatus[hospital.id]}
                      >
                        {freezeStatus[hospital.id] ? 'Account Frozen' : 'Freeze Account'}
                      </button>
                      <button onClick={() => handleClearAmount(hospital.id)}>
                        Clear Amount
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'accountTracking':
        return (
          <div>
            <h2 className="dsh-heading">Account Tracking</h2>
            <table className="dsh-account-details-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Paid/Not Paid</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital) => (
                  <tr key={hospital.id}>
                    <td>{hospital.id}</td>
                    <td>{hospital.name}@hospital.com</td>
                    <td>{hospital.paid ? 'Paid' : 'Not Paid'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        case 'contactUs':
          return (
            <div>
              <h2 className="dsh-heading">Contact Us Messages</h2>
              {currentMessage ? (
                <div>
                  <p><strong>Message:</strong> {currentMessage.message}</p>
                  <input
                    type="text"
                    value={reply}
                    onChange={handleReplyChange}
                    placeholder="Type your reply"
                  />
                  <button onClick={() => handleContactReply(currentMessage.id)}>Reply</button>
                  <button onClick={() => setCurrentMessage(null)}>Back</button>
                </div>
              ) : (
                <table className="dsh-contact-messages-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>name</th>
                      <th>email</th>
                      <th>Message</th>
                      <th>Replied</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactMessages.map((message) => (
                      <tr key={message.id}>
                        <td>{message.id}</td>
                        <td>{message.name}</td>
                        <td>{message.email}</td>
                        <td>{message.message}</td>
                        <td>{message.replied ? 'Yes' : 'No'}</td>
                        {!message.replied && (
                          <td>
                            <button onClick={() => setCurrentMessage(message)}>Reply</button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );

          case 'newsletter':
            return (
              <div>
                <h2 className="dsh-heading">Newsletter Emails</h2>
                {currentEmail ? (
                  <div>
                    <p><strong>Email:</strong> {currentEmail}</p>
                    <input
                      className="reply-input"
                      type="text"
                      value={reply}
                      onChange={handleReplyChange}
                      placeholder="Type your reply"
                    />
                    <button className="reply-btn" onClick={() => handleNewsletterReply(currentEmail)}>Reply</button>
                    <button className="back-btn" onClick={() => setCurrentEmail(null)}>Back</button>
                  </div>
                ) : (
                  <table className="dsh-newsletter-table">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsletterEmails.map((email, index) => (
                        <tr key={index}>
                          <td>{email}</td>
                          <td>
                            <button className="reply-btn" onClick={() => setCurrentEmail(email)}>Reply</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
        
        case 'ticketRise':
          return (
            <div>
              <h2 className="dsh-heading">Tickets</h2>
              {currentTicket ? (
                <div>
                  <p><strong>Issue:</strong> {currentTicket.issue}</p>
                  <p><strong>Priority:</strong> {currentTicket.priority}</p>
                  <input
                    type="text"
                    value={reply}
                    onChange={handleReplyChange}
                    placeholder="Type your reply"
                  />
                  <button onClick={() => handleTicketReply(currentTicket.id)}>Reply</button>
                  <button onClick={() => setCurrentTicket(null)}>Back</button>
                </div>
              ) : (
                <table className="dsh-tickets-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Issue</th>
                      <th>Priority</th>
                      <th>subject</th>
                      <th>Replied</th>
                      <th>Action</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td>{ticket.id}</td>
                        <td>{ticket.issueDescription}</td>
                        <td>{ticket.priority}</td>
                        <td>{ticket.subject}</td>
                        <td>{ticket.replied ? 'Yes' : 'No'}</td>
                        {/* <td>{ticket.Action}</td> */}
                        <td>{ticket.status}</td>
                        {!ticket.replied && (
                          <td>
                            <button onClick={() => setCurrentTicket(ticket)}>Reply</button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        default:
          return <div>Please select an option from the left.</div>;
      }
  };

  return (
    <div className="dsh-dashboard">
      <div className="dsh-side-nav">
        <h2 className="dsh-heading">Dashboard</h2>
        <ul className="dsh-nav-list">
          <li
            onClick={() => setSelectedOption('dashboard')}
            className={selectedOption === 'dashboard' ? 'dsh-active' : ''}
          >
            Dashboard Overview
          </li>
          <li
            onClick={() => setSelectedOption('hospitalList')}
            className={selectedOption === 'hospitalList' ? 'dsh-active' : ''}
          >
            Hospitals List
          </li>
          <li
            onClick={() => setSelectedOption('accountTracking')}
            className={selectedOption === 'accountTracking' ? 'dsh-active' : ''}
          >
            Account Tracking
          </li>
          <li
            onClick={() => setSelectedOption('contactUs')}
            className={selectedOption === 'contactUs' ? 'dsh-active' : ''}
          >
            Contact Us
          </li>
          <li
            onClick={() => setSelectedOption('newsletter')}
            className={selectedOption === 'newsletter' ? 'dsh-active' : ''}
          >
            Newsletter
          </li>
          <li
            onClick={() => setSelectedOption('ticketRise')}
            className={selectedOption === 'ticketRise' ? 'dsh-active' : ''}
          >
            Ticket Rise
          </li>
          <br /><br /><br /><br /><br /> <br /><br /><br /><br /> <br />
          <li onClick={handleLogout} className="dsh-logout">Logout</li>
        </ul>
      </div>

      <div className="dsh-main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardHms;
