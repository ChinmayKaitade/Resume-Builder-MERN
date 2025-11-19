import React from "react";

// Define the component's main styles using a JavaScript object
const styles = {
  body: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: "#f4f7f9",
    color: "#333",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    textAlign: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "90%",
  },
  errorCode: {
    fontSize: "6rem",
    fontWeight: "700",
    color: "#007bff", // Primary brand color
    margin: "0 0 10px 0",
    lineHeight: "1",
  },
  messageBoxH2: {
    fontSize: "1.8rem",
    color: "#333",
    marginTop: 0,
  },
  messageBoxP: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "25px",
  },
  suggestions: {
    borderTop: "1px solid #eee",
    paddingTop: "20px",
    marginTop: "20px",
  },
  suggestionsP: {
    fontWeight: "600",
    color: "#333",
    marginBottom: "15px",
  },
  suggestionsUl: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  },
  buttonLink: {
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "500",
    transition: "background-color 0.2s, opacity 0.2s",
  },
  primary: {
    backgroundColor: "#007bff",
    color: "#ffffff",
  },
  secondary: {
    backgroundColor: "#f0f0f0",
    color: "#007bff",
    border: "1px solid #dcdcdc",
  },
  helpfulTip: {
    fontSize: "0.9rem",
    color: "#888",
    marginTop: "30px",
  },
};

// Component for the 404 page
const NotFoundPage = () => {
  return (
    // Use an outer div to simulate the 'body' styles
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.errorCode}>404</h1>

        <div className="message-box">
          <h2 style={styles.messageBoxH2}>Oops! Page Not Found</h2>
          <p style={styles.messageBoxP}>
            We can't seem to find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>

        <div style={styles.suggestions}>
          <p style={styles.suggestionsP}>Try one of these options:</p>
          <ul style={styles.suggestionsUl}>
            <li>
              {/* In a real React app using React Router, you would replace <a> with <Link to="/"> */}
              <a href="/" style={{ ...styles.buttonLink, ...styles.primary }}>
                Go to Homepage
              </a>
            </li>
            <li>
              <a
                href="mailto:chinmaykaitade123@gmail.com"
                style={{ ...styles.buttonLink, ...styles.secondary }}
              >
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        <p style={styles.helpfulTip}>
          If you typed the address, double-check the spelling.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
