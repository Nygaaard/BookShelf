import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Skapa en instans av navigate
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { firstname, lastname, email, username, password };

    try {
      const response = await fetch("http://localhost:3002/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Visa framgångsmeddelande
        setSuccessMessage("Registreringen lyckades! Du kan nu logga in.");
        // Rensa alla input-fält
        setFirstname("");
        setLastname("");
        setEmail("");
        setUsername("");
        setPassword("");
        setError(""); // Rensa eventuella tidigare felmeddelanden

        // Omdirigera användaren till login-sidan efter paus
        setTimeout(() => {
          navigate("/login"); // Navigera till login-sidan
        }, 2000); // Vänta i 2 sekunder
      } else {
        const data = await response.json();
        setError(data.message || "Fel vid registrering");
        setSuccessMessage(""); //Rensa meddelande
      }
    } catch {
      setError("Serverfel vid registrering");
      setSuccessMessage("");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Registrera dig</h1>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Förnamn</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Efternamn</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>E-post</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Användarnamn</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Lösenord</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrera</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
