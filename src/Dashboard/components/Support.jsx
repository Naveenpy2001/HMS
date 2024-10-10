import React, { useState, useEffect } from "react";
import axios from "axios";

import '../../css/Support.css';

function Support() {
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("low");
  const [issueDescription, setIssueDescription] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [raisedTickets, setRaisedTickets] = useState([
    { id: 1, subject: "Login Issue", priority: "high", issue: "Unable to log in to the account.", status: "unresolved" },
    { id: 2, subject: "Payment Error", priority: "medium", issue: "Payment not processed successfully.", status: "resolved" },
    { id: 3, subject: "Feature Request", priority: "low", issue: "Request for new feature in the dashboard.", status: "unresolved" },
  ]);
  const [loading, setLoading] = useState(true); 
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState(""); 
  const [activeTab, setActiveTab] = useState("view"); 

  // Fetch raised tickets
  const fetchTickets = async () => {
    setLoading(true); // Start loading animation
    try {
      const response = await axios.get("http://localhost:8080/support/tickets");
      console.log(response.data); // Log the full response to check the structure
      setRaisedTickets(response.data || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
    setLoading(false); // Stop loading animation
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Submit ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:8080/support", {
        subject,
        priority,
        issueDescription,
      });
      setStatusMessage("Ticket raised successfully. Our team will contact you shortly.");
      setSubject("");
      setPriority("low");
      setIssueDescription(""); // Clear form fields after submission
      fetchTickets(); // Fetch updated tickets
      console.log("Ticket raised successfully!");
    } catch (error) {
      setStatusMessage("There was an error submitting your ticket. Please try again later.");
      console.error("Error raising ticket:", error);
    }
    setLoading(false);
  };

  // Filter tickets based on resolved/unresolved
  const filteredTickets = raisedTickets.filter((ticket) => {
    if (filter === "resolved") return ticket.status === "resolved";
    if (filter === "unresolved") return ticket.status === "unresolved";
    return true; // "all" filter
  });

  // Search tickets by description

  // const searchedTickets = filteredTickets.filter((ticket) =>
  //   ticket.issue ? ticket.issue.toLowerCase().includes(search.toLowerCase()) : false
  // );

  const searchedTickets = filteredTickets.filter((ticket) => {
    const issue = ticket.issue || ""; // If issue is undefined, use an empty string
    return issue.toLowerCase().includes(search.toLowerCase());
  });


  return (
    <div className="support-container">
      <h2 className="support-title">Support Center</h2>
      <div className="support-tabs">
        <button 
          className={`support-tab ${activeTab === "view" ? "active" : ""}`} 
          onClick={() => setActiveTab("view")}
        >
          View Raised Tickets
        </button>
        <button 
          className={`support-tab ${activeTab === "raise" ? "active" : ""}`} 
          onClick={() => setActiveTab("raise")}
        >
          Raise a New Ticket
        </button>
      </div>

      {activeTab === "view" && (
        <div className="support-view-tickets">
          <br />
          <div className="support-filter-search">
            <select
              className="support-filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="resolved">Resolved</option>
              <option value="unresolved">Unresolved</option>
            </select>
            <input
              type="text"
              className="support-search-input"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <h2 className="support-raised-tickets-title">Raised Tickets</h2>
          {loading ? (
            <div className="support-loading">Loading tickets...</div> 
          ) : (
            <ul className="support-tickets-list">
              {searchedTickets.length > 0 ? (
                searchedTickets.map((ticket, index) => (
                  <li key={index} className="support-ticket-item">
                    <strong>Ticket #{ticket.id}:</strong> {ticket.subject} <br />
                    Priority: {ticket.priority} <br />
                    {ticket.issue}
                    <p className="support-ticket-status">
                      Status: {ticket.status}
                    </p>
                  </li>
                ))
              ) : (
                <p className="support-no-tickets">No tickets found.</p>
              )}
            </ul>
          )}
        </div>
      )}

      {activeTab === "raise" && (
        <div className="support-raise-ticket">
          <form onSubmit={handleSubmit} className="support-form">
            <div className="support-form-group">
              <label htmlFor="support-subject" className="support-label">
                Subject:
              </label>
              <input
                type="text"
                id="support-subject"
                className="support-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="support-form-group">
              <label htmlFor="support-priority" className="support-label">
                Priority:
              </label>
              <select
                id="support-priority"
                className="support-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="Medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="support-form-group">
              <label htmlFor="support-issueDescription" className="support-label">
                Describe your issue:
              </label>
              <textarea
                id="support-issueDescription"
                className="support-textarea"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="support-submit-btn">Submit Ticket</button>
          </form>

          {statusMessage && <p className="support-status-message">{statusMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default Support;

