import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/loader.css"; // Create this CSS file for styling

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStartLoading = () => setLoading(true);
    const handleStopLoading = () => setLoading(false);

    // Listen for route changes
    const unlisten = navigate((location, action) => {
      if (action === "PUSH") {
        handleStartLoading();
      }
    });

    // Stop loading when the page has finished loading
    handleStopLoading();

    // Cleanup listener on unmount
    return () => {
      unlisten();
    };
  }, [navigate]);

  return loading ? <div className="pr-loader-bar"></div> : null;
};

export default Loader;
