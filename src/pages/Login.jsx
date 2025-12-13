import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!values.email.trim() || !values.password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      setError("");
      await login(values.email, values.password);
      navigate("/catalog");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <h1 className="page-title">Login</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </main>
  );
}

export default Login;
