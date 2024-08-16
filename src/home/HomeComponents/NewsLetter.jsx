import React from "react";

const Newsletter = () => {
  return (
    <div className="nl-newsletter">
      <h2 className="nl-heading">Subscribe to Our Newsletter</h2>
      <form className="nl-form">
        <input
          type="email"
          placeholder="Enter your email"
          className="nl-input"
        />
        <button type="submit" className="nl-submit">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
